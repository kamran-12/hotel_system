import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let [bookings] = await db.execute("SELECT user.name, user.surname, room.room_name, room.room_number, property.property_name, booking.checkin, booking.checkout FROM booking INNER JOIN user ON booking.user_id=user.id INNER JOIN room ON booking.room_id=room.id INNER JOIN property ON room.property_id=property.id")
    return bookings
})