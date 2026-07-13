export const api = {
  get: (url) =>
    fetch(url).then(res => {
      if (!res.ok) throw new Error("GET failed");
      return res.json();
    }),

  post: (url, data) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  put: (url, data) =>
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),
};