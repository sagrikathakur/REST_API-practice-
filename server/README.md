# REST API Practice Server

A clean, minimalist Express server for practicing RESTful API conventions.

## Getting Started

1. `cd server`
2. `npm install`
3. `npm run dev`

## API Endpoints

### Jobs Resource

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all job applications |
| GET | `/api/jobs/:id` | Get a specific job by ID |
| POST | `/api/jobs` | Create a new job application |
| PUT | `/api/jobs/:id` | Update an existing job |
| DELETE | `/api/jobs/:id` | Delete a job |

## Example JSON Body (for POST/PUT)

```json
{
  "company": "Amazon",
  "role": "Cloud Architect",
  "status": "Interviewing"
}
```
