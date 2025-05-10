# JavaScript Express Server

This is a JavaScript version of the Express.js TypeScript project.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=database_name
```

3. Run the development server:
```
npm run dev
```

4. To run seeders:
```
npm run db:seeder
```

## Project Structure

- `/src`: Main source code
  - `/models`: Database models
    - `/entities`: Entity definitions
  - `/routes`: API routes
  - `/controller`: Route controllers
  - `/middleware`: Express middleware
  - `/services`: Business logic
  - `/logger`: Logging utilities
  - `/seeders`: Database seeders 