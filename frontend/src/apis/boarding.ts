import type { IProfileFull } from '../app/types';
import api from './base';

const API_URL = '/boarding';

export const submitApplication = async (data: IProfileFull) => {
    try {
        const response = await api.post(`${API_URL}/me`, data);
        return response.data;
    } catch (error) {
        console.error('Error submit boarding application:', error);
        throw error;
    }

}

export const reSubmitApplication = async (data: IProfileFull) => {
    try {
        const response = await api.put(`${API_URL}/me`, data);
        return response.data;
    } catch (error) {
        console.error('Error re-submit boarding application:', error);
        throw error;
    }

}

export const getApplicationStatus = async () => {
    try {
        const response = await api.get(`${API_URL}/me`);
        return response.data;
    } catch (error) {
        console.error('Error fetching boarding status:', error);
        throw error;
    }

}