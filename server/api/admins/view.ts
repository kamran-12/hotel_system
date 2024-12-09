import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { id } = await readBody(event);
    if (id == "me") {
        let admin = {
            id: event.context.account_id,
            type: event.context.account_type,
            username: event.context.username
        }
        return admin
    } else if (id) {
        let [[admin]] = await db.execute("SELECT id, username FROM admin WHERE id=?", [id])
        return admin
    } else {
        let [admins] = await db.execute("SELECT id, username FROM admin")
        return admins
    }
})