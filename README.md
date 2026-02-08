# Weather Test API

A NestJS REST API for managing weather reports with authentication, validation, and data sanitization.

## Base URL

```
http://localhost:6000
```

## Authentication

Most endpoints require authentication via the `x-auth-weather` header with the value `JOECOOL123`.

## Endpoints

### Create Weather Report

**POST** `/weather`

Creates a new weather report. Requires authentication.

**Request Headers:**
- `Content-Type: application/json`
- `x-auth-weather: JOECOOL123` (required)

**Request Body:**
```json
{
  "city": "string",
  "country": "string",
  "temperature": number,  // Range: -70 to 50
  "condition": "sunny" | "rainy" | "cloudy" | "stormy" | "snowy",
  "userId": "string"
}
```

**Features:**
- City name is automatically sanitized (removes HTML tags and extra spaces)
- City name is automatically capitalized
- Temperature is automatically rounded to the nearest integer

**Response:** `200 OK` - Returns the created weather report object

**Example:**
```bash
curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "city": "  pAris<script>  ",
       "country": "France",
       "temperature": 18,
       "condition": "sunny",
       "userId": "user-1"
     }'
```

---

### Get All Weather Reports

**GET** `/weather`

Retrieves all weather reports. No authentication required.

**Response:** `200 OK` - Returns an array of weather reports

**Example:**
```bash
curl -X GET http://localhost:6000/weather
```

---

### Get Weather Report by ID

**GET** `/weather/:id`

Retrieves a specific weather report by its ID. No authentication required.

**Path Parameters:**
- `id` (string) - The unique identifier of the weather report

**Response:** `200 OK` - Returns the weather report object  
**Error:** `404 Not Found` - If the report doesn't exist

**Example:**
```bash
curl -X GET http://localhost:6000/weather/<UUID>
```

---

### Get Weather Reports by City

**GET** `/weather/city/:city`

Retrieves all weather reports for a specific city. No authentication required.

**Path Parameters:**
- `city` (string) - The name of the city

**Response:** `200 OK` - Returns an array of weather reports for the specified city

**Example:**
```bash
curl http://localhost:6000/weather/city/Tokyo
```

---

### Get Weather Reports by Country

**GET** `/weather/country/:country`

Retrieves all weather reports for a specific country. No authentication required.

**Path Parameters:**
- `country` (string) - The name of the country

**Response:** `200 OK` - Returns an array of weather reports for the specified country

**Example:**
```bash
curl http://localhost:6000/weather/country/USA
```

---

### Update Weather Report

**PATCH** `/weather/:id`

Partially updates a weather report. Requires authentication.

**Request Headers:**
- `Content-Type: application/json`
- `x-auth-weather: JOECOOL123` (required)

**Path Parameters:**
- `id` (string) - The unique identifier of the weather report

**Request Body:** (all fields are optional)
```json
{
  "city": "string",
  "country": "string",
  "temperature": number,  // Range: -70 to 50
  "condition": "sunny" | "rainy" | "cloudy" | "stormy" | "snowy",
  "userId": "string"
}
```

**Response:** `200 OK` - Returns the updated weather report object  
**Error:** `404 Not Found` - If the report doesn't exist  
**Error:** `400 Bad Request` - If validation fails (e.g., temperature out of range)

**Example (successful update):**
```bash
curl -X PATCH http://localhost:6000/weather/<UUID> \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "temperature": -10
     }'
```

**Example (failed update - temperature out of range):**
```bash
curl -X PATCH http://localhost:6000/weather/<UUID> \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "temperature": 80
     }'
```

**Example (failed update - wrong authentication):**
```bash
curl -X PATCH http://localhost:6000/weather/<UUID> \
     -H "Content-Type: application/json" \
     -d '{"condition": "sunny"}'
```

---

### Delete Weather Report

**DELETE** `/weather/:id`

Deletes a specific weather report. Requires authentication.

**Request Headers:**
- `x-auth-weather: JOECOOL123` (required)

**Path Parameters:**
- `id` (string) - The unique identifier of the weather report

**Response:** `200 OK` - Successfully deleted  
**Error:** `404 Not Found` - If the report doesn't exist  
**Error:** `401 Unauthorized` - If authentication fails

**Example (successful deletion):**
```bash
curl -X DELETE http://localhost:6000/weather/<UUID> \
     -H "x-auth-weather: JOECOOL123"
```

**Example (failed deletion - wrong authentication):**
```bash
curl -X DELETE http://localhost:6000/weather/<UUID> \
     -H "x-auth-weather: WRONG_TOKEN"
```

---

### Delete All Weather Reports

**DELETE** `/weather`

Deletes all weather reports. Requires authentication. **Development only.**

**Request Headers:**
- `x-auth-weather: JOECOOL123` (required)

**Response:** `200 OK` - Successfully deleted all reports  
**Error:** `401 Unauthorized` - If authentication fails

**Example:**
```bash
curl -X DELETE http://localhost:6000/weather \
     -H "x-auth-weather: JOECOOL123"
```

---

## Complete cURL Examples

### Create Weather Reports

**POST request that will pass thanks to the pipe that sanitizes it:**
```bash
curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "city": "  pAris<script>  ",
       "country": "France",
       "temperature": 18,
       "condition": "sunny",
       "userId": "user-1"
     }'
```

**POST request that will not pass:**
```bash
curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{"city": "<>", "country": "FR", "temperature": 20, "condition": "sunny", "userId": "user-1"}'
```

**Create reports:**
```bash
curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "city": "chamonix",
       "country": "France",
       "temperature": -5,
       "condition": "snowy",
       "userId": "user-1"
     }'

curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "city": "london",
       "country": "UK",
       "temperature": 10.4312,
       "condition": "rainy",
       "userId": "user-2"
     }'

curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "city": "Tokyo",
       "country": "Japan",
       "temperature": 15,
       "condition": "cloudy",
       "userId": "user-3"
     }'

curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "city": "Tokyo",
       "country": "Japan",
       "temperature": 34,
       "condition": "sunny",
       "userId": "user-3"
     }'

curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "city": "New York",
       "country": "USA",
       "temperature": 22,
       "condition": "stormy",
       "userId": "user-3"
     }'

curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "city": "Madrid",
       "country": "Spain",
       "temperature": 28,
       "condition": "sunny",
       "userId": "user-1"
     }'
```

### Update Weather Reports

**UPDATE (that works) a report:**
```bash
curl -X PATCH http://localhost:6000/weather/<UUID> \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "temperature": -10
     }'
```

**UPDATE (that fails due to temperature) a report:**
```bash
curl -X PATCH http://localhost:6000/weather/<UUID> \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "temperature": 80
     }'
```

**UPDATE (that fails due to wrong auth) a report:**
```bash
curl -X PATCH http://localhost:6000/weather/<UUID> \
     -H "Content-Type: application/json" \
     -d '{"condition": "sunny"}'
```

### Retrieve Weather Reports

**Get Tokyo city:**
```bash
curl http://localhost:6000/weather/city/Tokyo
```

**Get USA:**
```bash
curl http://localhost:6000/weather/country/USA
```

**Get all weather reports:**
```bash
curl -X GET http://localhost:6000/weather
```

**Get a report:**
```bash
curl -X GET http://localhost:6000/weather/<UUID>
```

### Error Examples

**POST with wrong auth token:**
```bash
curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: MAUVAIS_CODE" \
     -d '{"city": "Paris", "country": "France", "temperature": 20, "condition": "sunny", "userId": "user-1"}'
```

**POST with wrong temperature:**
```bash
curl -X POST http://localhost:6000/weather \
     -H "Content-Type: application/json" \
     -H "x-auth-weather: JOECOOL123" \
     -d '{
       "city": "Mars",
       "country": "Espace",
       "temperature": -100,
       "condition": "stormy",
       "userId": "user-1"
     }'
```

**Delete with good auth:**
```bash
curl -X DELETE http://localhost:6000/weather/<UUID> \
     -H "x-auth-weather: JOECOOL123"
```

**Delete with wrong auth:**
```bash
curl -X DELETE http://localhost:6000/weather/<UUID> \
     -H "x-auth-weather: WRONG_TOKEN"
```

---

## Data Validation

- **Temperature:** Must be between -70 and 50 degrees
- **Condition:** Must be one of: `sunny`, `rainy`, `cloudy`, `stormy`, `snowy`
- **City:** Automatically sanitized (HTML tags removed) and capitalized
- **Temperature:** Automatically rounded to the nearest integer

## Error Responses

- `400 Bad Request` - Validation error (e.g., temperature out of range, invalid condition)
- `401 Unauthorized` - Missing or invalid authentication token
- `404 Not Found` - Weather report not found
