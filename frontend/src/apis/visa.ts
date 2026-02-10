import type { ActionType, DocumentType } from '../app/types';
import api from './base';

const API_URL = '/visa'; // Adjust this to your backend URL

export const getVisaStatus = async () => {
    const response = await api.get(`${API_URL}/me`);
    return response.data;
};

export const submitFile = async ({ payload }: { payload: { documentType: DocumentType; url: string } }) => {
    const actionType: ActionType = 'SUBMIT';
    const response = await api.patch(`${API_URL}/me`, { actionType, payload });
    return response.data;
};