import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { MONGO_URI } from './utils/config';

export const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(
    session({
        // FIXME: add secret
        secret: 'keyboard cat',
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
