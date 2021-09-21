import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import { CLIENT_URL, SERVER_URL, SESSION_CONFIG } from './utils/config';

export const app = express();

/*** Create static site from client build ***/
import path from 'path';
app.use(express.static(path.resolve(__dirname, '../client/build')));

/*** Middleware ***/
app.use(cors({ origin: [SERVER_URL, CLIENT_URL], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(session(SESSION_CONFIG));

/*** Authentication Check ***/
/* comment next 2 lines for testing to turn off auth */
import { sessionCookieCheck } from './utils/middleware';
app.use(sessionCookieCheck);

/*** Routes ***/
import { UsersRouter } from './routes/users';
import { ProjectsRouter } from './routes/projects';
import { AuthRouter } from './routes/auth';
import { TagsRouter } from './routes/tags';
import { NukeRouter } from './routes/nuke';
app.use('/api/users', UsersRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/projects', ProjectsRouter);
app.use('/api/tags', TagsRouter);
app.get('/api/productionCheck', (_, res) => {
    res.send('ok!');
});

if (process.env['NODE_ENV'] === 'test') {
    app.use('/api/nuke', NukeRouter);
}
