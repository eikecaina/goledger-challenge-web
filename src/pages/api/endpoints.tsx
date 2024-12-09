import axios from "axios";

const username = process.env.NEXT_PUBLIC_API_USERNAME;
const password = process.env.NEXT_PUBLIC_API_PASSWORD;

if (!username || !password) {
    console.error("Error: API credentials are not set.");
    throw new Error("Missing API credentials");
}

const apiClient = axios.create({
    baseURL: "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/",
    auth: {
        username,
        password,
    },
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchAlbum = async (): Promise<{ names: string[], artistKeys: string[], albumKeys: string[] }> => {
    try {
        const requestBody = {
            query: {
                selector: {
                    "@assetType": "album",
                },
            },
        };

        const response = await apiClient.post("query/search", requestBody);

        const resultArray = response.data?.result;

        if (Array.isArray(resultArray)) {
            const names = resultArray.map((item: { name: string }) => item.name);
            const artistKeys = resultArray.map((item: { artist: { "@key": string } }) => item.artist?.["@key"]);
            const albumKeys = resultArray.map((item: { "@key": string }) => item["@key"]);
            return { names, artistKeys, albumKeys };
        } else {
            console.error("Unexpected response format:", response.data);
            return { names: [], artistKeys: [], albumKeys: [] };
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        return { names: [], artistKeys: [], albumKeys: [] };
    }
};

export const fetchArtist = async (artistKeys: string[]): Promise<any[]> => {
    try {
        const results = await Promise.all(
            artistKeys.map(async (key) => {
                const requestBody = {
                    query: {
                        selector: {
                            "@assetType": "artist",
                            "@key": key,
                        },
                    },
                };

                const response = await apiClient.post("query/search", requestBody);
                return response.data?.result;
            })
        );

        return results.flat();
    } catch (error) {
        console.error("Error fetching artists:", error);
        return [];
    }
};

export const fetchAllArtist = async (): Promise<any[]> => {
    try {
        const requestBody = {
            query: {
                selector: {
                    "@assetType": "artist",
                },
            },
        };
        const response = await apiClient.post("query/search", requestBody);
        return response.data?.result || [];
    } catch (error) {
        console.error("Error fetching artists:", error);
        return [];
    }
};

export const fetchAllPlaylist = async (): Promise<any[]> => {
    try {
        const requestBody = {
            query: {
                selector: {
                    "@assetType": "playlist",
                },
            },
        };
        const response = await apiClient.post("query/search", requestBody);

        return response.data?.result || [];
    } catch (error) {
        console.error("Error fetching playlist:", error);
        return [];
    }
};

export const fetchSongs = async (artistKeys: string[]): Promise<any[]> => {
    try {
        const results = await Promise.all(
            artistKeys.map(async (key) => {
                const requestBody = {
                    query: {
                        selector: {
                            "@assetType": "song",
                            "album": { "@key": key },
                        },
                    },
                };

                const response = await apiClient.post("query/search", requestBody);
                return response.data?.result;
            })
        );

        return results.flat();
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
};

export const deleteArtist = async (key: string): Promise<any[]> => {
    try {
        const requestBody = {
            key: {
                "@assetType": "artist",
                "@key": key,
            },
        };

        console.log("Request Body:", requestBody);

        const response = await apiClient.post("/invoke/deleteAsset", requestBody);
        return response.data?.result || [];
    } catch (error) {
        console.error("Error deleting artist:", error);
        return [];
    }
};

export const createArtist = async (name: string, country: string): Promise<any[]> => {
    try {
        const requestBody = {
            asset: [
                {
                    "@assetType": "artist",
                    "name": name,
                    "country": country
                }
            ]
        };

        console.log("Request Body:", requestBody);

        const response = await apiClient.post("/invoke/createAsset", requestBody);
        return response.data?.result || [];
    } catch (error) {
        console.error("Error creating artist:", error);
        return [];
    }
};

export const updateArtist = async (name: string, country: string): Promise<any[]> => {
    try {
        const requestBody = {
            update:
            {
                "@assetType": "artist",
                "name": name,
                "country": country
            }

        };

        console.log("Request Body:", requestBody);

        const response = await apiClient.post("/invoke/updateAsset", requestBody);
        return response.data?.result || [];
    } catch (error) {
        console.error("Error update artist:", error);
        return [];
    }
};
