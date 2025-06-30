import { sendMessage } from "../api/sendMessage"
import { useState } from "react";
export default function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const send = async (searchMessage) => {
        setLoading(true);
        setError(null);
        try {
            const res = await sendMessage(searchMessage);
            if (!res.ok) {
                throw new Error(res.statusText || "Failed to send message");
            }
            const data = await res.json();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { send, loading, error };
}