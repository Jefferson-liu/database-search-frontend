export async function sendMessage(searchMessage) {
    const baseUrl = "http://127.0.0.1:8000/api/message/";
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchMessage),
    });
}