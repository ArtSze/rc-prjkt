"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const config_1 = require("./utils/config");
exports.app = express_1.default();
/*** Create static site from client build ***/
const path_1 = __importDefault(require("path"));
exports.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../client/build')));
/*** Middleware ***/
exports.app.use(cors_1.default({ origin: [config_1.SERVER_URL, config_1.CLIENT_URL], credentials: true }));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(helmet_1.default());
exports.app.use(express_session_1.default(config_1.SESSION_CONFIG));
/*** Authentication Check ***/
/* comment next 2 lines for testing to turn off auth */
const middleware_1 = require("./utils/middleware");
exports.app.use(middleware_1.sessionCookieCheck);
/*** Routes ***/
const users_1 = require("./routes/users");
const projects_1 = require("./routes/projects");
const auth_1 = require("./routes/auth");
const tags_1 = require("./routes/tags");
const nuke_1 = require("./routes/nuke");
exports.app.use('/api/users', users_1.UsersRouter);
exports.app.use('/api/auth', auth_1.AuthRouter);
exports.app.use('/api/projects', projects_1.ProjectsRouter);
exports.app.use('/api/tags', tags_1.TagsRouter);
exports.app.get('/api/productionCheck', (_, res) => {
    res.send('ok!');
});
if (process.env['NODE_ENV'] === 'test') {
    exports.app.use('/api/nuke', nuke_1.NukeRouter);
}
