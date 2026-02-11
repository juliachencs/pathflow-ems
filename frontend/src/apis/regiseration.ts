import api from './base';

const API_URL = '/registrations';

export const getRegistraionHistory = async () => {
    const response = await api.get(`${API_URL}/history`);
    return response.data;
}

export const sendRegistrationInvite = async ({ name, email }: { name: string, email: string }) => {
    const response = await api.post(`${API_URL}/invite`, { name, email });
    return response.data;
}