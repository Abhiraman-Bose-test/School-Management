# School Management API

A Node.js, Express.js, and MySQL based REST API project for managing school data.

The application allows users to:

- Add new schools with name, address, latitude, and longitude.
- Retrieve schools sorted by proximity to a user-provided location.
- Validate all request inputs before database insertion or query execution.

## Tech Stack

- Node.js
- Express.js
- MySQL

## Features

- Add school API
- List schools API
- Input validation
- MySQL database integration
- Haversine formula based distance calculation
- Schools sorted by nearest distance
- Postman collection for API testing
- Railway deployment compatible setup

## Live API Base URL

```txt
https://school-management-production-1288.up.railway.app
```

## Live API Endpoints

### Health Check

```txt
GET https://school-management-production-1288.up.railway.app/
```

### Add School

```txt
POST https://school-management-production-1288.up.railway.app/addSchool
```

### List Schools

```txt
GET https://school-management-production-1288.up.railway.app/listSchools?latitude=28.6139&longitude=77.2090
```

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
├── .env.example
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

Run the following SQL in MySQL:

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

## Environment Variables

Create a `.env` file in the root folder.

```env
PORT=8080

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=schools
```

Important:

- Do not push `.env` to GitHub.
- Add `.env` inside `.gitignore`.
- For Railway deployment, add these variables in Railway dashboard instead of using `.env`.

## Installation

Clone the repository:

```bash
git clone https://github.com/Abhiraman-Bose-test/School-Management.git
```

Go to the project folder:

```bash
cd School-Management
```

Install dependencies:

```bash
npm install
```

## Run Locally

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Expected output:

```txt
School Management API is running on port 8080
MySQL connected successfully
```

Local Base URL:

```txt
http://localhost:8080
```

# API Documentation

## 1. Health Check API

### Endpoint

```txt
GET /
```

### Success Response

```json
{
  "success": true,
  "message": "School Management API is running",
  "endpoints": {
    "addSchool": "POST /addSchool",
    "listSchools": "GET /listSchools?latitude=28.6139&longitude=77.2090"
  }
}
```

## 2. Add School API

### Endpoint

```txt
POST /addSchool
```

### Live URL

```txt
POST https://school-management-production-1288.up.railway.app/addSchool
```

### Description

Adds a new school to the `schools` table.

### Request Body

```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5931,
  "longitude": 77.2507
}
```

### Validation Rules

- `name` is required and must be a non-empty string.
- `address` is required and must be a non-empty string.
- `latitude` is required and must be a number between `-90` and `90`.
- `longitude` is required and must be a number between `-180` and `180`.

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

## 3. List Schools API

### Endpoint

```txt
GET /listSchools
```

### Live URL

```txt
GET https://school-management-production-1288.up.railway.app/listSchools?latitude=28.6139&longitude=77.2090
```

### Description

Fetches all schools from the database and returns them sorted by distance from the user's location.

### Query Parameters

| Parameter | Required | Description |
|---|---:|---|
| latitude | Yes | User latitude between -90 and 90 |
| longitude | Yes | User longitude between -180 and 180 |

### Example Request

```txt
GET /listSchools?latitude=28.6139&longitude=77.2090
```

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

## Distance Calculation

The API uses the Haversine formula to calculate the geographical distance between the user's coordinates and each school's coordinates.

The schools are sorted in ascending order of:

```txt
distanceKm
```

## Postman Collection

The Postman collection is available here:

<https://abhiramanbose-2294608.postman.co/workspace/abhiramanbose's-Workspace~503fe8bd-28ef-452b-8300-a346ae44cfa1/collection/54487546-6ec2b1b2-6f08-4df0-b78f-f47fa5981eef?action=share&source=copy-link&creator=54487546>

The collection includes:

- Health Check API
- Add School API
- Add School validation error test
- List Schools API
- List Schools validation error test
- Sample request bodies
- Expected responses
- Basic test scripts

## Railway Deployment Notes

For Railway deployment, use the following start command:

```bash
npm start
```

Do not manually set `PORT` on Railway. Railway provides it automatically.

Add these variables in the Railway backend service:

```env
DB_HOST=${MySQL.MYSQLHOST}
DB_PORT=${MySQL.MYSQLPORT}
DB_USER=${MySQL.MYSQLUSER}
DB_PASSWORD=${MySQL.MYSQLPASSWORD}
DB_NAME=${MySQL.MYSQLDATABASE}
```

If your MySQL service name is different, replace `MySQL` with the exact Railway service name.

For Railway MySQL, create only the table because Railway already provides the database:

```sql
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Common Errors

### Access denied for user

This usually means `.env` is missing, misplaced, or Railway DB variables are incorrect.

Check:

```env
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=schools
```

For Railway, check that your variables are mapped from the MySQL service.

### Unknown database

This means the database does not exist locally.

Run:

```sql
CREATE DATABASE IF NOT EXISTS schools;
```

### Table does not exist

This means the database exists but the `schools` table has not been created.

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

## Author

Abhiraman Bose
