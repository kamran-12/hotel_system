export function api(url: string, body = {}, authToken) {
    if (!authToken) authToken = (process.client) ? localStorage.getItem('authToken') : useCookie('authToken').value;
    return $fetch('/api/' + url, { headers: { authToken }, body, method: "POST" })
}