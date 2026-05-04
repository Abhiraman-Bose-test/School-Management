# School Management API

Node.js, Express.js and MySQL API project for managing school data.

This project allows users to:

- Add new schools to a MySQL database.
- Retrieve all schools sorted by proximity to a user-provided latitude and longitude.

## Features

- Add new schools using `POST /addSchool`
- Validate request data before inserting into MySQL
- Fetch all schools using `GET /listSchools`
- Sort schools by proximity to the user's latitude and longitude
- Uses parameterized SQL queries with `mysql2`
- Uses the Haversine formula for distance calculation
- Includes Postman collection support

## Tech Stack

- Node.js
- Express.js
- MySQL
## Project Structure

```txt
school-management-api/
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── schoolController.js
│   ├── routes/
│   │   └── schoolRoutes.js
│   ├── utils/
│   │   └── distance.js
│   └── validators/
│       └── schoolValidator.js
├── schema.sql
├── postman_collection.json
├── .env
├── package.json
├── package-lock.json
└── server.js
```

## Database Setup

In this project:

```txt
Database name: schools
Table name: schools
```

Run the following SQL in MySQL Workbench or from your terminal:

```sql
CREATE DATABASE IF NOT EXISTS schools;

USE schools;

CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Optional sample data:

```sql
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Delhi Public School', 'Mathura Road, New Delhi', 28.5931, 77.2507),
('Modern School', 'Barakhamba Road, New Delhi', 28.6287, 77.2295),
('Springdales School', 'Pusa Road, New Delhi', 28.6422, 77.1817);
```

## How to Run `schema.sql`

### Option 1: Using MySQL Workbench

1. Open MySQL Workbench.
2. Connect to your local MySQL server.
3. Open `schema.sql` or paste the SQL code above.
4. Click the lightning/run icon.
5. Verify using:

```sql
SHOW DATABASES;
USE schools;
SHOW TABLES;
```

You should see the `schools` table.

### Option 2: Using Terminal

Go to your project folder:

```bash
cd path/to/school-management-api
```

Run:

```bash
mysql -u root -p < schema.sql
```

Enter your MySQL password when asked.

## Environment Setup

Create a `.env` file in the root folder where `package.json` and `server.js` exist.

```env
PORT=8080

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=schools
```

Important:

- `DB_NAME` should be `schools` because the database name is `schools`.
- The table name is also `schools`.
- Make sure `.env` is not placed inside the `src` folder.

## Installation

Install dependencies:

```bash
npm install
```

## Run Locally

For development:

```bash
npm run dev
```

For production/local normal run:

```bash
npm start
```

Expected terminal output:

```txt
MySQL connected successfully
School Management API is running on port 8080
```

Base URL:

```txt
http://localhost:8080
```

## API Documentation

## 1. Add School API

### Endpoint

```txt
POST /addSchool
```

### Purpose

Adds a new school record to the `schools` table.

### Request Body

In Postman, select:

```txt
Body → raw → JSON
```

Then add:

```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5931,
  "longitude": 77.2507
}
```

### Validation Rules

The API validates that:

- `name` is required and must be a non-empty string.
- `address` is required and must be a non-empty string.
- `latitude` is required and must be a valid number between `-90` and `90`.
- `longitude` is required and must be a valid number between `-180` and `180`.

### Success Response

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi",
    "latitude": 28.5931,
    "longitude": 77.2507
  }
}
```

### Validation Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "name is required and must be a non-empty string"
  ]
}
```

## 2. List Schools API

### Endpoint

```txt
GET /listSchools
```

### Purpose

Fetches all schools from the database and returns them sorted by distance from the user's location.

### Query Parameters

| Parameter | Required | Description |
|---|---:|---|
| latitude | Yes | User latitude, between -90 and 90 |
| longitude | Yes | User longitude, between -180 and 180 |

### Example Request

```txt
GET http://localhost:8080/listSchools?latitude=28.6139&longitude=77.2090
```

No request body is required for this API.

### Success Response

```json
{
  "success": true,
  "message": "Schools fetched successfully",
  "count": 2,
  "data": [
    {
      "id": 2,
      "name": "Modern School",
      "address": "Barakhamba Road, New Delhi",
      "latitude": 28.6287,
      "longitude": 77.2295,
      "distanceKm": 2.6
    },
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi",
      "latitude": 28.5931,
      "longitude": 77.2507,
      "distanceKm": 4.71
    }
  ]
}
```

### Validation Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "latitude query parameter is required and must be a number between -90 and 90"
  ]
}
```

## Distance Sorting

The API uses the Haversine formula to calculate the geographical distance between the user's location and each school's location.

Schools are sorted in ascending order of:

```txt
distanceKm
```

## Postman Testing

### Add School API

```txt
Method: POST
URL: http://localhost:8080/addSchool
Body: raw JSON
```

Request body:

```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5931,
  "longitude": 77.2507
}
```

### List Schools API

```txt
Method: GET
URL: http://localhost:8080/listSchools?latitude=28.6139&longitude=77.2090
Body: Not required
```

## Postman Collection

Import this file into Postman:

```txt
postman_collection.json
```

After deployment, update the Postman variable `base_url` from:

```txt
http://localhost:8080
```

to your deployed API URL.

## Deployment Notes

You can deploy the API on any Node.js hosting provider that supports environment variables and outbound MySQL connections.

Suggested deployment flow:

1. Push this project to GitHub.
2. Create a MySQL database named `schools` on your hosting provider or use a managed MySQL service.
3. Run `schema.sql` on the production database.
4. Set environment variables on the hosting platform:
   - `PORT`
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME=schools`
5. Use this start command:

```bash
npm start
```

6. Test the deployed APIs using Postman.

## Live API Endpoint Format

After deployment, your endpoints will look like this:

```txt
POST https://your-api-domain.com/addSchool
GET  https://your-api-domain.com/listSchools?latitude=28.6139&longitude=77.2090
```

Replace `https://your-api-domain.com` with your actual deployed backend URL.

## Common Errors

### 1. Access denied for user ''@'localhost'

This means your `.env` file is missing, misplaced, or the DB variables are not loading.

Check that `.env` exists in the root folder and contains:

```env
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=schools
```

Then restart the server.

### 2. Unknown database

This means the `schools` database was not created.

Run:

```sql
CREATE DATABASE IF NOT EXISTS schools;
```

Then run the full schema again.

### 3. Table does not exist

This means the database exists, but the `schools` table was not created.

Run:

```sql
USE schools;

CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
