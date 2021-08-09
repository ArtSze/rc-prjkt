import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import { CLIENT_URL, SESSION_CONFIG } from './utils/config';

export const app = express();

/*** Create static site from client build ***/
// import path from 'path';
// app.use(express.static(path.resolve(__dirname, '../../client/build')));

/*** Middleware ***/
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(session(SESSION_CONFIG));

<<<<<<< HEAD
/*** Authentication Check ***/
/* comment next 2 lines for testing to turn off auth */
=======
app.use(
    session({
        // FIXME: add secret
        secret: session_secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            // secure: true,
            maxAge: 3600000 * 12,
            // domain: 'netlify.app',
            // path: '/',
            // sameSite: 'none',
        },
        store: MongoStore.create({ mongoUrl: MONGO_URI }),
    }),
);

/** comment next 2 lines for testing to turn off auth */
>>>>>>> 49f0b8b288ba21469931716672d0d56a3e31f28e
import { sessionCookieCheck } from './utils/middleware';
app.use(sessionCookieCheck);

/*** Routes ***/
import { UsersRouter } from './routes/users';
import { ProjectsRouter } from './routes/projects';
import { AuthRouter } from './routes/auth';
import { TagsRouter } from './routes/tags';
app.use('/api/users', UsersRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/projects', ProjectsRouter);
app.use('/api/tags', TagsRouter);
