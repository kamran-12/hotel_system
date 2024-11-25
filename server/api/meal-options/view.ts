import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let [propertyTypes] = await db.execute("SELECT * FROM meal_option")
    return propertyTypes
})