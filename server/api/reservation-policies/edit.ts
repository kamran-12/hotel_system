import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { id, newName } = await readBody(event)
    newName = newName.trim()
    id = parseInt(id)
    if (!newName.length) throw createError({ statusCode: 422, statusMessage: 'no_name' })
    await db.execute("UPDATE reservation_policy SET name=? WHERE id=?", [newName, id])
    return { message: 'updated' }
})