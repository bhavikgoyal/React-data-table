import axios from 'axios'
import type { Product } from '../types/product'

const BASE = 'https://dummyjson.com'

export async function fetchProducts(limit = 1000): Promise<Product[]> {
    // DummyJSON supports limit & skip on /products
    const perRequest = 100
    let all: Product[] = []
    let skip = 0

    try {
        while (all.length < limit) {
            const toFetch = Math.min(perRequest, limit - all.length)

            const res = await axios.get(`${BASE}/products`, {
                params: { limit: toFetch, skip },
                validateStatus: (status) => status === 200, 
            });

            const products: Product[] = res.data?.products || [];

            if (!products.length) break;

            all = all.concat(products);
            skip += products.length;

            if (products.length < toFetch) break;
        }
        
        return all;

    } catch (error: any) {
        console.error("Error fetching products:", error.message || error);
        throw new Error("Failed to fetch products from API (status not 200).");
    }
}
