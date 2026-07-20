// api/client.js
export const api = {
  get: (url) =>
    fetch(url).then((res) => res.json()),

  post: (url, data) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
};
