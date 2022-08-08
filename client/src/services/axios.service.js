import axios from 'axios';
import {AXIOS_CONSTANTS} from '../constants';

const instance = axios.create({baseURL: AXIOS_CONSTANTS.server_baseUrl});
export const axiosService = {
    getImg: async (sessionId) => await instance.get('/image', {
        params: {
            id: sessionId
        }
    }),
    postImg: async (sessionId, data) => await instance.post('/image', data, {
        params: {
            id: sessionId
        }
    })
};