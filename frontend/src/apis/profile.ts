import type { IProfile } from '../app/types';
import api from './base';

const API_URL = '/profile';
const API_URL_ADMIN = '/profiles';

export const getOwnProfile = async () => {
    const response = await api.get(`${API_URL}/me`);
    return response.data.data;
}

export const updateOwnProfile = async (payload: IProfile) => {
    const response = await api.put(`${API_URL}/me`, payload);
    return response.data.data;
}


export const fetchAllProfiles = async () => {
    const response = await api.get(`${API_URL_ADMIN}`);
    return response.data.data;
}


export const getProfileById = async (id: string) => {
    const response = await api.get(`${API_URL_ADMIN}/${id}`);
    return response.data.data;
}