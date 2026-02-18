import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved !== null ? JSON.parse(saved) : initialValue;
        } catch (error) {
            console.error("LocalStorage read error:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            if (value !== undefined) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error("LocalStorage write error:", error);
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;