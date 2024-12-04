import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { name, notes } = await readBody(event);
    [name, notes] = [name.trim(), notes.trim()]
    if (!name.length) throw createError({ statusCode: 422, statusMessage: 'no_name' })
    await db.execute("INSERT INTO smoking_room_option (name, notes) VALUES (?, ?)", [name, notes])
    return { message: 'added' }
})