import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let [propertyTypes] = await db.execute("SELECT * FROM property_type")
    return propertyTypes
})