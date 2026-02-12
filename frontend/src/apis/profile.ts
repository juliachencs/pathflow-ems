import type { IProfileFull } from '../app/types';
import api from './base';

const API_URL = '/profile';
const API_URL_ADMIN = '/profiles';

export const getOwnProfile = async () => {
    try {
        const response = await api.get(`${API_URL}/me`);
        return response.data.data;
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


export const fetchAllProfiles = async () => {
    try {
        const response = await api.get(`${API_URL_ADMIN}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}


export const getProfileById = async (id: string) => {
    try {
        const response = await api.get(`${API_URL_ADMIN}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee profile:', error);
        throw error;
    }
}