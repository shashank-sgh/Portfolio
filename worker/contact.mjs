export async function saveContact(request, bucket) {
  const reply = (message, status) =>
    Response.json(message, {
      status,
      headers: { "Cache-Control": "no-store" },
    });
  if (request.method !== "POST") return reply({ error: "Use POST" }, 405);
  if (
    request.headers.get("origin") &&
    request.headers.get("origin") !== new URL(request.url).origin
  )
    return reply({ error: "Invalid origin" }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply({ error: "JSON required" }, 415);
  if (Number(request.headers.get("content-length")) > 32000)
    return reply({ error: "Message too large" }, 413);
  let data;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return reply({ error: "Message too large" }, 413);
    data = JSON.parse(raw);
  } catch {
    return reply({ error: "Invalid JSON" }, 400);
  }
  const record = {};
  for (const field of ["name", "email", "company", "subject", "message"]) {
    const value = data?.[field] ?? "";
    if (
      typeof value !== "string" ||
      (field !== "company" && !value.trim()) ||
      value.length > (field === "message" ? 5000 : 240)
    )
      return reply({ error: "Invalid " + field }, 400);
    record[field] = value.trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email))
    return reply({ error: "Invalid email" }, 400);
  try {
    const created = new Date().toISOString();
    await bucket.put(
      "enquiries/" + created + "-" + crypto.randomUUID() + ".json",
      JSON.stringify({ ...record, created }),
      { httpMetadata: { contentType: "application/json" } },
    );
    return reply({ saved: true }, 201);
  } catch {
    return reply({ error: "Storage unavailable" }, 503);
  }
}
