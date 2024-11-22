import { default as db } from "../database.js";

export default defineEventHandler(async (event) => {
    // This code is not secure if there is an untrusted user
    const { query } = await readBody(event)
    const result = await db.execute(query)
    return result
})