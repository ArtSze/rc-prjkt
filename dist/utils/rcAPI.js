"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRCData = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../utils/logger"));
async function getRCData(token) {
    var _a, _b;
    try {
        const rcMe = 'http://www.recurse.com/api/v1/profiles/me';
        const profile = (await axios_1.default.get(rcMe, {
            headers: { Authorization: `Bearer ${token}` },
        })).data;
        const batchEndDate = new Date(((_a = profile.stints[0]) === null || _a === void 0 ? void 0 : _a.end_date) || '2000-01-01');
        const batch = ((_b = profile.stints[0]) === null || _b === void 0 ? void 0 : _b.batch.short_name) || '';
        return {
            rcId: profile['id'],
            first_name: profile['first_name'],
            last_name: profile['last_name'],
            zulip_id: profile['zulip_id'],
            image_path: profile['image_path'],
            batchEndDate,
            batch: batch,
        };
    }
    catch (error) {
        return logger_1.default.error(error);
    }
}
exports.getRCData = getRCData;
