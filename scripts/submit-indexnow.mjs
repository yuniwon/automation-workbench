import { indexNow } from "./indexnow-config.mjs";

const response = await fetch(indexNow.endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    host: indexNow.host,
    key: indexNow.key,
    keyLocation: indexNow.keyLocation,
    urlList: indexNow.urlList,
  }),
});

const body = await response.text();
const okStatuses = new Set([200, 202]);

if (!okStatuses.has(response.status)) {
  throw new Error(`IndexNow submission failed: HTTP ${response.status} ${body}`);
}

console.log(
  JSON.stringify(
    {
      endpoint: indexNow.endpoint,
      status: response.status,
      submittedUrls: indexNow.urlList.length,
      keyLocation: indexNow.keyLocation,
      response: body,
    },
    null,
    2,
  ),
);
