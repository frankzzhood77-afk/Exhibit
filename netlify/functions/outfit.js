import { getStore } from "@netlify/blobs";

// ── 频率上限（想改就改这里）──
const IP_DAILY = 10;      // 每个 IP 每天
const SITE_HOURLY = 120;  // 全站每小时

const SYS =
  "你是一位顶尖时尚造型师兼本地生活向导。根据用户信息推荐一套今日穿搭。" +
  "只返回一个 JSON 对象，不要任何前后缀、解释或 markdown 代码块。所有文案用简体中文。" +
  "JSON 结构：{" +
  '"reading":"一段有温度的整体解读，2-3句",' +
  '"logic":"为什么这样搭：配色/廓形/温度的逻辑，2-3句",' +
  '"palette":[{"hex":"#色值","name":"颜色名"} ×3-4],' +
  '"items":[{"category":"外套/上装/下装/鞋/包或配饰","name":"具体单品描述（鞋请写明颜色）","color":"#色值","brand":"一个具体真实品牌"} ×4-5，必须含 外套或上装、下装、鞋],' +
  '"food":{"name":"该城市一家知名且很可能真实存在的餐厅名","area":"具体街区或地标","desc":"为什么今天推荐它，1-2句"},' +
  '"transit":{"mode":"推荐交通方式（含emoji）","line":"若该城市有地铁则给真实线路名，否则留空","lineColor":"#该线路官方代表色，没有地铁则给个呼应配色的色值","why":"这条线/这个颜色为何呼应今天的穿搭，1句"},' +
  '"persona":"今日人设：一句俏皮稍幽默的身份设定。公司/街道等用该城市本地真实地点；其中大学可点名一所符合该调性的真实大学（本地或海外名校均可）",' +
  '"music":{"vibe":"一句话描述这身穿搭适配的音乐气质","tracks":[{"title":"歌名","artist":"歌手"} ×3]}' +
  "}";

const num = (v) => Number(v || 0);

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return { statusCode: 500, body: JSON.stringify({ error: "服务器缺少 DEEPSEEK_API_KEY" }) };

  // ── 频率限制：每 IP 每天 5 次、全站每小时 25 次 ──
  const ip =
    event.headers["x-nf-client-connection-ip"] ||
    (event.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    "unknown";
  const iso = new Date().toISOString();
  const day = iso.slice(0, 10);   // YYYY-MM-DD
  const hour = iso.slice(0, 13);  // YYYY-MM-DDTHH

  try {
    const store = getStore("ratelimit");
    const ipKey = `ip:${ip}:${day}`;
    const siteKey = `site:${hour}`;
    const ipCount = num(await store.get(ipKey));
    const siteCount = num(await store.get(siteKey));

    if (ipCount >= IP_DAILY) {
      return { statusCode: 429, body: JSON.stringify({ error: "今天的次数已经用完啦（每人每天 10 次），明天再来～" }) };
    }
    if (siteCount >= SITE_HOURLY) {
      return { statusCode: 429, body: JSON.stringify({ error: "本小时全站名额已满（每小时 120 次），请稍后再试～" }) };
    }
    await store.set(ipKey, String(ipCount + 1));
    await store.set(siteKey, String(siteCount + 1));
  } catch (e) {
    console.error("ratelimit error:", e); // 存储异常时放行，避免整站不可用
  }

  let input = {};
  try { input = JSON.parse(event.body || "{}"); } catch (_) {}
  const { gender = "", city = "", temp = 18, scene = "", vibe = "" } = input;
  const user = `性别：${gender}\n城市：${city}\n气温：${temp}°C\n场景：${scene}\n想要的风格：${vibe}`;

  try {
    const resp = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYS },
          { role: "user", content: user },
        ],
        max_tokens: 1500,
        temperature: 1.0,
        response_format: { type: "json_object" },
      }),
    });

    const data = await resp.json();
    if (data.error) return { statusCode: 502, body: JSON.stringify({ error: data.error.message || "上游错误" }) };
    const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
    return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify({ text }) };
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: String((e && e.message) || e) }) };
  }
};
