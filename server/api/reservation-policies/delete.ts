import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { ids } = await readBody(event)
    await db.execute(`DELETE FROM reservation_policy WHERE id IN (${ids.map(() => '?').join(',')})`, [...ids])
    return { message: 'deleted' }
})