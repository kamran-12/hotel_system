import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { name } = await readBody(event)
    name = name.trim()
    if (!name.length) throw createError({ statusCode: 422, statusMessage: 'no_name' })
    await db.execute("INSERT INTO property_type (name) VALUES (?)", [name])
    return { message: 'added' }
})