
# Workflow

### Authentication

- hit the home page
- validate token in local storage
  - if (!valid)
    - redirect to rc/auth
  - redirect to root
  - save token local storage

### Check if user exists

- get user

- if (!user)
  - create new user
  - save RC ID to database

- check cache for RC API data
  - if (!RC API data)
    - fetch user data from RC API
    
  - populate RC user data
    
- redirect to projects root

### Fetch project data

- get projects
- save projects to cache