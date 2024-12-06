import { default as db } from "../../database.js";

export default defineEventHandler(async (event) => {
    let { id } = await readBody(event)
    await db.execute("DELETE FROM room WHERE id=?", [id])
})