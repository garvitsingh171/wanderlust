import apiClient from "./apiClient";

export async function getAllListings() {
    const { data } = await apiClient.get('/listings');
    return data;
}

export async function getListingById(id) {
    const { data } = await apiClient.get(`/listings/${id}`);
    return data;
}

export async function createListing(payload) {
    const { data } = await apiClient.post('/listings', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
}

export async function updateListing(id, payload) {
    const { data } = await apiClient.patch(`/listings/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
}

export async function deleteListing(id) {
    const { data } = await apiClient.delete(`/listings/${id}`);
    return data;
}