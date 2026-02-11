import type { ActionType, DocType } from '../app/types';
import api from './base';

const API_URL = '/visa'; // Adjust this to your backend URL

export const getVisaStatus = async () => {
    const response = await api.get(`${API_URL}/me`);
    return response.data;
};

export const submitVisaFile = async ({ payload }: { payload: { documentType: DocType; url: string } }) => {
    const actionType: ActionType = 'SUBMIT';
    const response = await api.patch(`${API_URL}/me`, { actionType, payload });
    return response.data;
};