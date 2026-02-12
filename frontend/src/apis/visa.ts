import type { ActionType, DocType } from '../app/types';
import api from './base';

const API_URL = '/visa'; // Adjust this to your backend URL
const API_URL_ADMIN = '/visas';

export const getVisaStatus = async () => {
    const response = await api.get(`${API_URL}/me`);
    return response.data;
};

export const submitVisaFile = async ({ payload }: { payload: { documentType: DocType; url: string } }) => {
    const actionType: ActionType = 'SUBMIT';
    const response = await api.patch(`${API_URL}/me`, { actionType, payload });
    return response.data;
};

export const getEmpVisaStatusIP = async () => {
    const response = await api.get(`${API_URL_ADMIN}/progress`);
    return response.data;
};

export const getEmpVisaStatusAll = async () => {
    const response = await api.get(`${API_URL_ADMIN}/all`);
    return response.data;
};

export const updateEmpVisaStatus = async ({ id, actionType, payload }: {
    id: string, actionType: ActionType, payload: {
        documentType: DocType;
        url?: string;
        feedback?: string;
    }
}) => {
    const response = await api.patch(`${API_URL_ADMIN}/${id}`, { actionType, payload });
    return response.data;
};