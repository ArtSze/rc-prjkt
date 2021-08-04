"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = require("./utils/config");
const mongoose_1 = __importDefault(require("mongoose"));
const config_2 = require("./utils/config");
async function runServer() {
    await mongoose_1.default.connect(`${config_2.MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => logger_1.default.info('MongoDB database connection established successfully'))
        .catch((error) => logger_1.default.error(`MongoDB connection error: ${error}`));
    app_1.app.listen(config_1.PORT, () => { logger_1.default.info(`Server running on port ${config_1.PORT}`); });
}
runServer();
