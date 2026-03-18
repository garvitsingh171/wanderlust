const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const apiOrigin = apiBase.endsWith('/api/v1')
    ? apiBase.slice(0, -7)
    : apiBase;

export function getImageUrl(imagePath) {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    return `${apiOrigin}${imagePath}`;
}
