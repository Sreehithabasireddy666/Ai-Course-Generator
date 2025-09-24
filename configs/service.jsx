import axios from 'axios';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

const getVideos = async (query) => {
    try {
        // Check if API key exists
        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        
        if (!apiKey) {
            console.error('YouTube API key not found. Please set NEXT_PUBLIC_YOUTUBE_API_KEY in your .env file');
            // Return mock data for development
            return getMockVideos(query);
        }

        const params = {
            part: 'snippet',
            q: query,
            maxResults: 1,
            key: apiKey,
            type: 'video', // Only return videos
            safeSearch: 'strict'
        };

        const resp = await axios.get(`${YOUTUBE_BASE_URL}/search`, { params });
        return resp.data.items;
        
    } catch (error) {
        console.error('YouTube API Error:', error.response?.data || error.message);
        
        // Return mock data as fallback
        return getMockVideos(query);
    }
};

// Mock data for development/fallback
const getMockVideos = (query) => {
    return [
        {
            id: { videoId: 'mock_video_1' },
            snippet: {
                title: `${query} - Tutorial Part 1`,
                description: `Learn about ${query} in this comprehensive tutorial.`,
                thumbnails: {
                    default: { url: 'https://via.placeholder.com/120x90?text=Video+1' },
                    medium: { url: 'https://via.placeholder.com/320x180?text=Video+1' }
                },
                channelTitle: 'Educational Channel'
            }
        },
        {
            id: { videoId: 'mock_video_2' },
            snippet: {
                title: `${query} - Advanced Concepts`,
                description: `Advanced concepts and practical examples for ${query}.`,
                thumbnails: {
                    default: { url: 'https://via.placeholder.com/120x90?text=Video+2' },
                    medium: { url: 'https://via.placeholder.com/320x180?text=Video+2' }
                },
                channelTitle: 'Learning Hub'
            }
        }
    ];
};

export default {
    getVideos
};