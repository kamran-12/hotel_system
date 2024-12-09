import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { id, name, notes } = await readBody(event);
    [name, notes] = [name.trim(), notes.trim()]
    if (!name.length) throw createError({ statusCode: 422, statusMessage: 'no_name' })
    await db.execute("UPDATE reservation_policy SET name=?, notes=? WHERE id=?", [name, notes, id])
    return { message: 'updated' }
})