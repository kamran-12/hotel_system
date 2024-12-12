import { default as db } from "../../database.js";
import { phone } from "phone";

export default defineEventHandler(async (event) => {
    let { name, surname, email, id } = await readBody(event);
    let phoneNumber = (await readBody(event)).phone;
    if (event.context.account_type != "admin" && id != "me") throw createError({ statusCode: 401, statusMessage: 'unauthorized' })
    if (id == "me") id = event.context.account_id;
    [name, surname, email, phoneNumber] = [name.trim(), surname.trim(), email.trim(), phoneNumber.trim()]
    if (!name.length || name.length > 20) throw createError({ statusCode: 422, statusMessage: 'no_name' })
    if (!surname.length || surname.length > 20) throw createError({ statusCode: 422, statusMessage: 'no_surname' })
    if (!phone(phoneNumber).isValid) throw createError({ statusCode: 422, statusMessage: 'no_phone' })
    if (!isEmail(email)) throw createError({ statusCode: 422, statusMessage: 'no_email' })
    phoneNumber = phone(phoneNumber).phoneNumber
    await db.execute("UPDATE user SET name=?, surname=?, email=?, phone=? WHERE id=?", [name, surname, email, phoneNumber, id])
    return { message: 'updated' }
})