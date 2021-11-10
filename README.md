# RC Projects

RC Projects is an application used to showcase the projects you're working on at the [Recurse Center](https://www.recurse.com/)!

Projects have tags which allow Recursers to filter projects by their interests and find opportunities to pair, receive a code review, and more!

[Live Link](https://projects.recurse.com/) :exclamation: **This application requires a Recurse Center account in order to authorize.**

If you are not a member of the Recurse Center or do not with to authorize access to your RC data, you can view a live [demo](https://projects-demo.recurse.com/) version!

## Project Details

RC Projects is a collaboration by [Artur](https://github.com/ArtSze) and [Amanda](https://github.com/apettenati) to learn more about building MERN stack applcations.

The back-end is built with Node, Express, and MongoDB. 

The front-end is built with React, TypeScript, Material-UI, and React Query. 

Authentication is handled with OAuth2 and the Recurse Center API. You must authenticate through the RC API in order to receive access to this application. User information and identification gathered from RC's API.

## Installation

In order to run this application locally, you **MUST** be a member of the Recurse Center as this application uses the [Recurse Center API](https://github.com/recursecenter/wiki/wiki/Recurse-Center-API).

1. Clone the repository to your local machine.
```shell
git clone git@github.com:ArtSze/rc-prjkt.git
cd rc-prjkt
```

2. Create a `.env` file and populate all of the required variables.
```shell
cp conf.env .env
```

- In order to run this application locally, you will need these variables: 
  - Recurse Center OAuth ID and Secret. Follow the [RC documentation](https://github.com/recursecenter/wiki/wiki/Recurse-Center-API) to generate these variables.
  ```shell
  DEVELOPMENT_RC_AUTH_ID
  DEVELOPMENT_RC_AUTH_SECRET
  ```
  - A randomly generated secret for express sessions.
  ```shell
  SESSION_SECRET
  ```

  - A MongoDB Atlas account and URI. Documentation to generate a URI can be found [here](https://docs.atlas.mongodb.com/getting-started/).
  ```shell
  TEST_MONGO_URI=
  DEVELOPMENT_MONGO_URI=
  ```

  - Development environment URLs (i.e. `http://localhost:4000`)
  ```shell
  TEST_CLIENT_URL=
  DEVELOPMENT_CLIENT_URL=
  DEVELOPMENT_SERVER_URL=
  ```

3. Run `yarn` to install the dependencies.

4. Start the client and development servers.

- The back-end supports serving the client assets. To run on the same port:
  ```shell
  yarn build:client
  yarn dev
  ```

- Otherwise, start both the client and development server: 

  - Update the `baseUrl` in `/client/src/utils/axiosInstance.ts` to match your `DEVELOPMENT_SERVER_URL` and add `/api`
  Example: 
  ```shell
  export const baseURL = 'http://localhost:4000/api';
  ```
  - Start the client server: 
  ```shell
  cd client && yarn start
  ```
  - Start the development server: 
  ```shell
  yarn dev
  ```


<a href='http://www.recurse.com' title='Made with love at the Recurse Center'><img src='https://cloud.githubusercontent.com/assets/2883345/11325206/336ea5f4-9150-11e5-9e90-d86ad31993d8.png' height='20px'/></a>
