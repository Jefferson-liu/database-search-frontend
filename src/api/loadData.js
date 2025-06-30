export async function loadUserData(userId = "1") {
    const baseUrl = "http://127.0.0.1:8000/api/sales/messages";
    const url = new URL(baseUrl);
    url.searchParams.append("user_id", userId);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}