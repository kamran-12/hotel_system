import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    try {
        let { property_type_id, property_name, property_rating, review_score, meal_option_policy_id, kitchen_available, reservation_policy_id, parking, restaurant, pets_allowed, room_service, front_desk, fitness_center, smoking_room_option_id, airport_shuttle, family_rooms, spa_and_wellnes_center, swimming_pool, private_bathroom, private_pool, sea_view, air_conditioning, washing_machine, distance_from_center, description } = await readBody(event);
        function sanitizeParams(params) {
            return params.map(param => param === undefined ? null : param);
        }
        if (typeof property_rating == 'string') property_rating = property_rating.trim()
        if (typeof description == 'string') description = description.trim()
        if (typeof property_name == 'string') {
            property_name = property_name.trim()
            if (!property_name?.length) throw createError({ statusCode: 422, statusMessage: 'no_name' })
        } else {
            throw createError({ statusCode: 422, statusMessage: 'no_name' })
        }
        await db.execute("INSERT INTO property (property_type_id, property_name, property_rating, review_score, meal_option_policy_id, kitchen_available, reservation_policy_id, parking, restaurant, pets_allowed, room_service, front_desk, fitness_center, smoking_room_option_id, airport_shuttle, family_rooms, spa_and_wellnes_center, swimming_pool, private_bathroom, private_pool, sea_view, air_conditioning, washing_machine, distance_from_center, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", sanitizeParams([property_type_id, property_name, property_rating, review_score, meal_option_policy_id, kitchen_available, reservation_policy_id, parking, restaurant, pets_allowed, room_service, front_desk, fitness_center, smoking_room_option_id, airport_shuttle, family_rooms, spa_and_wellnes_center, swimming_pool, private_bathroom, private_pool, sea_view, air_conditioning, washing_machine, distance_from_center, description]))
        return { message: "success" }
    }
    catch (error) {
        throw createError({ statusCode: 422, statusMessage: JSON.stringify(error) })
    }
})