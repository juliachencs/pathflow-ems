import type { BoardingData, IBoardingReviewAction } from '../app/types';
import api from './base';

const API_URL = '/boarding';
const API_URL_ADMIN = '/boardings';

export const submitApplication = async (data: BoardingData) => {
    const response = await api.post(`${API_URL}/me`, data);
    return response.data.data;
}

export const reSubmitApplication = async (data: BoardingData) => {
    const response = await api.put(`${API_URL}/me`, data);
    return response.data.data;
}

export const getApplicationStatus = async () => {
    const response = await api.get(`${API_URL}/me`);
    return response.data.data;
}

export type BoardingUnion = "PENDING" | "REJECTED" | "APPROVED"

export const getAllBoardingStatus = async () => {
    const response = await api.get(`${API_URL_ADMIN}`);
    return response.data.data;
}

export const getStateBoardingStatus = async (state: BoardingUnion) => {
    const response = await api.get(`${API_URL_ADMIN}?state=${state}`);
    return response.data.data;
}

export const getBoardingStatusById = async (id: string) => {
    const response = await api.get(`${API_URL_ADMIN}/${id}`);
    return response.data.data;
}

export const updateOneBoardingStatus = async (id: string, data: IBoardingReviewAction) => {
    const response = await api.patch(`${API_URL_ADMIN}/${id}`, data);
    return response.data.data;
}