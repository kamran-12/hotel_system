import { default as db } from "../../database.js";
import argon2 from 'argon2';
import { phone  } from 'phone';
import crypto from 'crypto';

export default defineEventHandler(async (event) => {
    let { name, surname, email, password } = await readBody(event);
    let phoneNumber = (await readBody(event)).phone;
    [name, surname, email, phoneNumber] = [name.trim(), surname.trim(), email.trim(), phoneNumber.trim()]
    if (!name.length || name.length > 20) throw createError({ statusCode: 422, statusMessage: 'no_name' })
    if (!surname.length || surname.length > 20) throw createError({ statusCode: 422, statusMessage: 'no_surname' })
    if (!phone(phoneNumber).isValid) throw createError({ statusCode: 422, statusMessage: 'no_phone' })
    if (!isEmail(email)) throw createError({ statusCode: 422, statusMessage: 'no_email' })
    phoneNumber = phone(phoneNumber).phoneNumber
    password = await argon2.hash(password)
    const [result] = await db.execute("INSERT INTO user (name, surname, email, phone, password) VALUES (?, ?, ?, ?, ?)", [name, surname, email, phoneNumber, password]);
    const authToken = crypto.randomBytes(15).toString('base64');
    const hash = crypto.createHash('sha256');
    hash.update(authToken);
    let hashedToken = hash.digest('base64').substring(0, 20);
    await db.execute("INSERT INTO session (hashed_token, user_id, start_date) VALUES (?, ?, ?)", [hashedToken, result.insertId, new Date()])
    return { authToken, user_id: result.insertId, full_name: `${name} ${surname}` }
})