import type { IBoardingReviewAction, IProfileFull } from '../app/types';
import api from './base';

const API_URL = '/boarding';
const API_URL_ADMIN = '/boardings';

export const submitApplication = async (data: IProfileFull) => {
    try {
        const response = await api.post(`${API_URL}/me`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error submit boarding application:', error);
        throw error;
    }

}

export const reSubmitApplication = async (data: IProfileFull) => {
    try {
        const response = await api.put(`${API_URL}/me`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error re-submit boarding application:', error);
        throw error;
    }

}

export const getApplicationStatus = async () => {
    try {
        const response = await api.get(`${API_URL}/me`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching boarding status:', error);
        throw error;
    }

}

export type BoardingUnion = "PENDING" | "REJECTED" | "APPROVED"

export const getAllBoardingStatus = async () => {
    const response = await api.get(`${API_URL_ADMIN}`);
    return response.data;
}

export const getStateBoardingStatus = async (state: BoardingUnion) => {
    const response = await api.get(`${API_URL_ADMIN}?state=${state}`);
    return response.data;
}

export const getBoardingStatusById = async (id: string) => {
    const response = await api.get(`${API_URL_ADMIN}/${id}`);
    return response.data;
}

export const updateOneBoardingStatus = async (id: string, data: IBoardingReviewAction) => {
    const response = await api.patch(`${API_URL_ADMIN}/${id}`, data);
    return response.data;
}