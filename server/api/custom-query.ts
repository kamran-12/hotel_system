import { default as db } from "../database.js";

export default defineEventHandler(async (event) => {
    // This code is not secure if there is an untrusted user
    const { query } = await readBody(event)
    let results: any = [];
    const queries = query.split(';').map((x: string) => x.trim()).filter((x: string) => x.length)
    for await (const x of queries) {
        let result
        try {
            result = await db.execute(x)
        } catch (error) {
            result = JSON.stringify(error)
        }
        results.push(result)
    }
    return results
})