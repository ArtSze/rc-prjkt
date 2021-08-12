import { AccessToken } from 'simple-oauth2';
import axios from 'axios';
import { IProfilefromRCAPI, IUserFromRCAPI } from '../utils/types';
import logger from '../utils/logger';

export async function getRCData(token: AccessToken): Promise<IUserFromRCAPI> {
    try {
        const rcMe = 'http://www.recurse.com/api/v1/profiles/me';
        const profile = (
            await axios.get(rcMe, {
                headers: { Authorization: `Bearer ${token}` },
            })
        ).data as IProfilefromRCAPI;

        const batchEndDate = new Date(profile.stints[0]?.end_date || '2000-01-01');
        const batch = profile.stints[0]?.batch.short_name || '';

        return {
            rcId: profile['id'],
            first_name: profile['first_name'],
            last_name: profile['last_name'],
            zulip_id: profile['zulip_id'],
            image_path: profile['image_path'],
            batchEndDate,
            batch: batch,
        };
    } catch (error) {
        return logger.error(error);
    }
}
