import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { checkin, checkout, room_id } = await readBody(event);
    await db.execute("INSERT INTO booking (checkin, checkout, room_id, user_id) VALUES (?,?,?,?)", [checkin, checkout, room_id, event.context.account_id])
    return { message: "success" }
})