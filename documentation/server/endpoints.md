# API Endpoints

All API endpoints start with `/api`
All API endpoints require a session object containing a valid `user` parameter

## Authentication

`/auth` - endpoint to request RC authorization
`/auth/callback` - redirect URI after RC authentication

## Projects
| Route | Method | Description | 
| - | - | - | 
| `/projects` | GET | Fetches all projects for provided parameters | 
| `/projects` | POST | Creates a new project in the database | 
| `/projects/:id` | GET | Fetches project for provided project id | 
| `/projects:id` | PUT | Updates an existing project in the database | 
| `/projects:id` | DELETE | Deletes an existing project in the database. Validates that the RC ID of the current user matches the project owner. Runs the tag cleanup function to delete tags from the database that are not used by any existing projects. | 

## Tags

| Route | Method | Description | 
| - | - | - | 
| `/tags` | GET | Fetches all tags. Used to generate tag filter dropdown. | 

## Users

| Route | Method | Description | 
| - | - | - | 
| `/users` | GET | Fetches all users. Used to generate user filter dropdown. | 
| `/users/:id` | GET | Fetches single user. | 
| `/users` | POST | Creates a new user.  | 
