/**
 * Proxy for Educine entities API (avoids browser CORS).
 * Deploy on Vercel: GET /api/entities?parentId=xxx → forwards to upstream.
 * 
 * Set ENTITIES_API_TOKEN environment variable for authentication.
 */
const DEFAULT_UPSTREAM = "https://portal.ssfkerala.org/api/entities";

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const upstream = process.env.ENTITIES_API_UPSTREAM || DEFAULT_UPSTREAM;
  const apiToken = process.env.ENTITIES_API_TOKEN;

  try {
    // Get parentId from query parameters
    const parentId = req.query.parentId;
    
    // Build upstream URL with query parameter
    const upstreamUrl = `${upstream}/?parentId=${parentId || 'null'}`;

    const headers = { 
      "Content-Type": "application/json"
    };

    // Add authentication token if available
    if (apiToken) {
      headers["Authorization"] = apiToken.startsWith("Bearer ") 
        ? apiToken 
        : `Bearer ${apiToken}`;
    }

    const upstreamRes = await fetch(upstreamUrl, {
      method: "GET",
      headers: headers,
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
    console.error("entities proxy:", err);
    return res.status(502).json({
      error: "Upstream request failed",
      message: err && err.message ? String(err.message) : "Unknown error",
    });
  }
};
