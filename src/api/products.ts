import axios from 'axios'
import type { Product } from '../types/product'

const BASE = 'https://dummyjson.com'

export async function fetchProducts(limit = 1000): Promise<Product[]> {
    // DummyJSON supports limit & skip on /products
    const perRequest = 100
    let all: Product[] = []
    let skip = 0


    // We'll fetch in chunks to avoid single large request issues
    while (all.length < limit) {
        const toFetch = Math.min(perRequest, limit - all.length)
        const res = await axios.get(`${BASE}/products`, {
            params: { limit: toFetch, skip },
        })
        const products: Product[] = res.data.products
        if (!products || products.length === 0) break
        all = all.concat(products)
        skip += products.length
        // safety to prevent infinite loop if API returns less
        if (products.length < toFetch) break
    }


    return all
}