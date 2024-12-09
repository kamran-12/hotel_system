import { default as db } from "../../database.js";
import argon2 from 'argon2';

export default defineEventHandler(async (event) => {
    let { username, password } = await readBody(event);
    username = username.toLowerCase().trim()
    if (!isUsername(username)) throw createError({ statusCode: 422, statusMessage: 'wrong_username' })
    password = await argon2.hash(password)
    await db.execute("INSERT INTO admin (username, password) VALUES (?, ?)", [username, password])
    return { message: 'added' }
})