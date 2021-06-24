import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { MONGO_URI } from './utils/config';
import { sessionCookieCheck } from './utils/middleware';

export const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		cookie: { httpOnly: true, maxAge: 3600000 * 12 },
		store: MongoStore.create({ mongoUrl: MONGO_URI }),
	})
);

app.use(sessionCookieCheck);

// Routes
import { IndexRouter } from './routes/index';
import { UsersRouter } from './routes/users';
import { ProjectsRouter } from './routes/projects';
import { AuthRouter } from './routes/auth';
app.use('/users', UsersRouter);
app.use('/auth', AuthRouter);
app.use('/projects', ProjectsRouter);
app.use('/', IndexRouter);
