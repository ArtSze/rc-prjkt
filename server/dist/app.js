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
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const config_1 = require("./utils/config");
const path_1 = __importDefault(require("path"));
exports.app = express_1.default();
// Middleware
exports.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../rc-prjkt-client/build')));
exports.app.use(cors_1.default({ origin: config_1.CLIENT_URL, credentials: true }));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(helmet_1.default());
exports.app.use(express_session_1.default({
    // FIXME: add secret
    secret: config_1.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 3600000 * 12 },
    store: connect_mongo_1.default.create({ mongoUrl: config_1.MONGO_URI }),
}));
/** comment next 2 lines for testing to turn off auth */
const middleware_1 = require("./utils/middleware");
exports.app.use(middleware_1.sessionCookieCheck);
// Routes
const users_1 = require("./routes/users");
const projects_1 = require("./routes/projects");
const auth_1 = require("./routes/auth");
const tags_1 = require("./routes/tags");
exports.app.use('/users', users_1.UsersRouter);
exports.app.use('/auth', auth_1.AuthRouter);
exports.app.use('/projects', projects_1.ProjectsRouter);
exports.app.use('/tags', tags_1.TagsRouter);
