export const API_BASE_URL = "http://localhost:8000"

export async function callKrishiSatAPI(
  endpoint: string,
  apiKey: string,
  body: object
) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  })
  return response.json()
}
