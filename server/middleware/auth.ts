import crypto from 'crypto';
import { default as db } from "../database.js";

export default eventHandler(async (event) => {
    let token = getRequestHeader(event, "authToken")
    if (token && token != 'null') {
        let hash = crypto.createHash('sha256')
        hash.update(token)
        let hashedToken = hash.digest('base64').substring(0, 20)
        let [[session]] = await db.execute(`SELECT 
    s.id as session_id,
    s.hashed_token,
    s.start_date,
    COALESCE(u.id, a.id) as account_id,
    COALESCE(u.name, a.username) as username,
    CASE 
        WHEN u.id IS NOT NULL THEN 'user'
        WHEN a.id IS NOT NULL THEN 'admin'
        ELSE NULL
    END as account_type,
    a.username,
    u.name,
    u.surname,
    u.email,
    u.phone
FROM session s
LEFT JOIN user u ON s.user_id = u.id
LEFT JOIN admin a ON s.admin_id = a.id
WHERE s.hashed_token=?`, [hashedToken])
        if (session) {
            event.context.account_id = session.account_id
            event.context.account_type = session.account_type
            if (session.username) event.context.username = session.username
            if (session.name) event.context.name = session.name
            if (session.surname) event.context.surname = session.surname
            if (session.phone) event.context.phone = session.phone
            if (session.email) event.context.email = session.email
        }
    }
})
