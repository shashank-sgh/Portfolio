import assert from "node:assert/strict";
import test from "node:test";
import { saveContact } from "../worker/contact.mjs";
const url = "https://example.org/api/contact";
const body = {
  name: "Test",
  email: "fixture@example.org",
  subject: "Test",
  message: "Test only",
};
const post = (data) =>
  new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
test("success follows durable write", async () => {
  let saved;
  const response = await saveContact(post(body), {
    put: async (k, v) => {
      assert.match(k, /^enquiries\//);
      saved = JSON.parse(v);
    },
  });
  assert.equal(response.status, 201);
  assert.equal(saved.email, body.email);
});
test("invalid email rejected", async () =>
  assert.equal(
    (await saveContact(post({ ...body, email: "invalid" }), {})).status,
    400,
  ));
test("storage errors do not report success", async () =>
  assert.equal((await saveContact(post(body), {})).status, 503));
