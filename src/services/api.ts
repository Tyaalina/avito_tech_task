import axios from 'axios';
import { formatDate } from '../utils/dateUtils';

const instance = axios.create({
    baseURL: 'http://localhost:3002/api',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const fetchGames = async (platform?: string, category?: string, sortBy?: string) => {
    let url = '/games';

    if (platform || category || sortBy) {
        const params: string[] = [];
        if (platform) params.push(`platform=${platform}`);
        if (category) params.push(`category=${category}`);
        if (sortBy) params.push(`sort-by=${sortBy}`);
        url += `?${params.join('&')}`;
    }

    try {
        const response = await instance.get(url);
        const gamesData = response.data.map((game: any) => ({
            ...game,
            releaseDate: formatDate(game.release_date), // Format the release_date
        }));
        return gamesData;
    } catch (error) {
        throw new Error('Failed to fetch games');
    }
};

export const fetchGameDetails = async (id: string) => {
    const url = `/game?id=${id}`;

    try {
        const response = await instance.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch game details');
    }
};
