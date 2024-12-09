import { default as db } from "../../database.js";
import argon2 from 'argon2';

export default defineEventHandler(async (event) => {
    let { password, id } = await readBody(event);
    if (event.context.account_type != "admin") throw createError({ statusCode: 401, statusMessage: 'unauthorized' })
    if (id == "me") id = event.context.account_id;
    password = await argon2.hash(password)
    await db.execute("UPDATE admin SET password=? WHERE id=?", [password, id])
    return { message: 'updated' }
})