const API_URL = "https://fakestoreapi.com/products";

export const getProducts = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        return await response.json();
    } catch (error) {
        console.error("API error:", error);
        throw error;
    }
};
