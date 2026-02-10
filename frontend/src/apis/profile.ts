import type { IProfileFull } from '../app/types';
import api from './base';

const API_URL = '/profile';

export const getOwnProfile = async () => {
    try {
        const response = await api.get(`${API_URL}/me`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile of currentUser:', error);
        throw error;
    }

}

export const updateOwnProfile = async (profile: IProfileFull) => {
    try {
        const response = await api.put(`${API_URL}/me`, profile);
        return response.data;
    } catch (error) {
        console.error('Error updating profile of currentUser:', error);
        throw error;
    }

}