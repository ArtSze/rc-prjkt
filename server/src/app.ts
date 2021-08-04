import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { MONGO_URI, session_secret } from './utils/config';
// import path from 'path';

export const app = express();

// Middleware
// app.use(express.static(path.resolve(__dirname, '../../rc-prjkt-client/build')));

// app.use(cors({ credentials: true }));
app.use(function (_, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(
    session({
        // FIXME: add secret
        secret: session_secret,
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true, maxAge: 3600000 * 12 },
        store: MongoStore.create({ mongoUrl: MONGO_URI }),
    }),
);

/** comment next 2 lines for testing to turn off auth */
import { sessionCookieCheck } from './utils/middleware';
app.use(sessionCookieCheck);

// Routes
import { UsersRouter } from './routes/users';
import { ProjectsRouter } from './routes/projects';
import { AuthRouter } from './routes/auth';
import { TagsRouter } from './routes/tags';
app.use('/api/users', UsersRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/projects', ProjectsRouter);
app.use('/api/tags', TagsRouter);
