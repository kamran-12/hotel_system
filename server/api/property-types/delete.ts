import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { ids } = await readBody(event)
    await db.execute(`DELETE FROM property_type WHERE id IN (${ids.map(() => '?').join(',')})`, [...ids])
    return { message: 'deleted' }
})