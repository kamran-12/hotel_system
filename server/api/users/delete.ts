import { default as db } from "../../database.js";
import argon2 from 'argon2';

export default defineEventHandler(async (event) => {
    let { id } = await readBody(event);
    if (event.context.account_type != "admin" && id != "me") throw createError({ statusCode: 401, statusMessage: 'unauthorized' })
    if (id == "me") id = event.context.account_id;
    await db.execute("DELETE FROM user WHERE id=?", [id])
    return { message: 'updated' }
})