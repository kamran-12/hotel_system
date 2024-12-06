import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { id } = await readBody(event)
    if (id) {
        let [[room]] = await db.execute("SELECT * FROM room WHERE id=?", [id]);
        return room;
    } else {
        let [rooms] = await db.execute("SELECT id, property_id, room_number, room_name FROM room")
        return rooms
    }
})