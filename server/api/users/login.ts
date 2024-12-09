import { default as db } from "../../database.js";
import argon2 from 'argon2';
import { phone } from 'phone';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
    let { login, password } = await readBody(event);
    let user = null;
    login = login.trim()
    if (phone(login).isValid) {
        login = phone(login).phoneNumber;
        [[user]] = await db.execute("SELECT * FROM user WHERE phone=?", [login])
    } else if (isEmail(login)) {
        [[user]] = await db.execute("SELECT * FROM user WHERE email=?", [login])
    }
    if (!user) throw createError({ statusCode: 404, statusMessage: "no_user" })
    if (await argon2.verify(user.password, password)) {
        const authToken = crypto.randomBytes(15).toString('base64');
        const hash = crypto.createHash('sha256');
        hash.update(authToken);
        let hashedToken = hash.digest('base64').substring(0, 20);
        await db.execute("INSERT INTO session (hashed_token, user_id, start_date) VALUES (?, ?, ?)", [hashedToken, user.id, Date.now()])
        return { authToken, user_id: user.id, full_name: `${user.name} ${user.surname}` }
    } else {
        throw createError({ statusCode: 422, statusMessage: "wrong_password" })
    }
})