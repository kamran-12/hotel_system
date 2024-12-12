import { default as db } from "../../database.js";
import argon2 from 'argon2';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
    let { username, password } = await readBody(event);
    username = username.toLowerCase().trim()
    if (!isUsername(username)) throw createError({ statusCode: 422, statusMessage: 'wrong_username' })
    let [[admin]] = await db.execute("SELECT * FROM admin WHERE username=?", [username])
    if (!admin) throw createError({ statusCode: 422, statusMessage: 'wrong_username' })
    if (await argon2.verify(admin.password, password)) {
        const authToken = crypto.randomBytes(15).toString('base64');
        const hash = crypto.createHash('sha256');
        hash.update(authToken);
        let hashedToken = hash.digest('base64').substring(0, 20);
        await db.execute("INSERT INTO session (hashed_token, admin_id, start_date) VALUES (?, ?, ?)", [hashedToken, admin.id, new Date()])
        return { authToken, admin_id: admin.id, username: admin.username }
    } else {
        throw createError({ statusCode: 422, statusMessage: 'wrong_password' })
    }
})