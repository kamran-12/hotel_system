import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { username, id } = await readBody(event);
    username = username.toLowerCase().trim()
    if (!isUsername(username)) throw createError({ statusCode: 422, statusMessage: 'wrong_username' })
    await db.execute("UPDATE admin SET username=? WHERE id=?", [username, id])
    return { message: 'updated' }
})