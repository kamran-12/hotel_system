import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { id } = await readBody(event)
    if (id) {
        let [[property]] = await db.execute("SELECT * FROM property WHERE id=?", [id]);
        return property;
    } else {
        let [properties] = await db.execute("SELECT id, property_name FROM property")
        return properties
    }
})