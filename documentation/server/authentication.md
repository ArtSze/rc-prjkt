# Authentication Workflow

- Hit the application's home page
- Validate token in local storage with middleware
	- If the token is valid, the user is authorized
	- If the token is not valid or expired:
		- Redirect to the RC authentication URI
		- Check that the RC API responded with a token
				- Throw a 401 if invalid
		- Fetch the user's RC ID with the provided token
		- Check if a user with this RC ID exists in the database
				- If the user does not exist, create a new user
				- Set a session object with a property `user` containing the user data
		- Redirect the user back to the application
