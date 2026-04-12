/**
 * Same-origin proxy for Educine portal API (avoids browser CORS on static frontends).
 * Deploy on Vercel: POST /api/educine → forwards to upstream.
 *
 * Optional env: EDUCINE_API_UPSTREAM (default: portal-dev URL below)
 */
const DEFAULT_UPSTREAM = "https://portal.ssfkerala.org/api/educine";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const upstream = process.env.EDUCINE_API_UPSTREAM || DEFAULT_UPSTREAM;

  try {
    const body =
      typeof req.body === "string"
        ? req.body
        : JSON.stringify(req.body ?? {});

    const upstreamRes = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const text = await upstreamRes.text();
    const contentType = upstreamRes.headers.get("content-type") || "";

    res.status(upstreamRes.status);
    if (contentType.includes("application/json")) {
      try {
        return res.json(JSON.parse(text));
      } catch {
        return res.send(text);
      }
    }
    return res.send(text);
  } catch (err) {
    console.error("educine proxy:", err);
    return res.status(502).json({
      error: "Upstream request failed",
      message: err && err.message ? String(err.message) : "Unknown error",
    });
  }
};
