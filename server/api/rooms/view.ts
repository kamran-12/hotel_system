import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { id, property_id } = await readBody(event)
    if (id) {
        let [[room]] = await db.execute("SELECT * FROM room WHERE id=?", [id]);
        return room;
    } else if (property_id) {
        let [rooms] = await db.execute("SELECT id, property_id, room_number, room_name FROM room WHERE property_id=?", [property_id])
        return rooms
    } else {
        let [rooms] = await db.execute("SELECT id, property_id, room_number, room_name FROM room")
        return rooms
    }
})