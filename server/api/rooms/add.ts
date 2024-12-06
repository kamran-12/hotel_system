import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    try {
        let { property_id, room_name, room_number, floor_number, meal_option_id, kitchen_available, reservation_policy_id, pets_allowed, smoking_room_option_id, family_rooms, private_bathroom, sea_view, air_conditioning, washing_machine } = await readBody(event);
        function sanitizeParams(params) {
            return params.map(param => param === undefined ? null : param);
        }
        await db.execute("INSERT INTO room (property_id, room_name, room_number, floor_number, meal_option_id, kitchen_available, reservation_policy_id, pets_allowed, smoking_room_option_id, family_rooms, private_bathroom, sea_view, air_conditioning, washing_machine) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", sanitizeParams([property_id, room_name, room_number, floor_number, meal_option_id, kitchen_available, reservation_policy_id, pets_allowed, smoking_room_option_id, family_rooms, private_bathroom, sea_view, air_conditioning, washing_machine]))
        return { message: "success" }
    }
    catch (error) {
        throw createError({ statusCode: 422, statusMessage: JSON.stringify(error) })
    }
})