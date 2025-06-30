import {loadUserData} from "../api/loadData";
import {useEffect, useState} from "react";
export default function useLoadUserData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const result = await loadUserData();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, loading, error };
}