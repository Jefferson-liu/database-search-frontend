export function autosaveToWebhook(data) {
  const url = "http://127.0.0.1:8000/webhook/autosave/user";
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
} 