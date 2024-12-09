import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { id } = await readBody(event);
    if (id == "me") {
        let user = {
            id: event.context.account_id,
            type: event.context.account_type,
            name: event.context.name,
            surname: event.context.surname,
            phone: event.context.phone,
            email: event.context.email,
        };
        return user;
    } else if (id) {
        let [[user]] = await db.execute("SELECT id, name, surname, email, phone FROM user WHERE id=?", [id])
        return user
    } else {
        let [users] = await db.execute("SELECT id, name, surname, email, phone FROM user")
        return users
    }
})