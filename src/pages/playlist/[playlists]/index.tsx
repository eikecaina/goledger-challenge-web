import { useEffect, useState } from "react";
import { fetchAllPlaylist } from "../../api/endpoints";

function playlistList() {
    const [playlist, setPlaylist] = useState<{ key: string; name: string; }[]>([]);

    const getAllPlaylists = async () => {
        const response = await fetchAllPlaylist();

        const playlistsData = response.map((playlist: { [key: string]: any; name: string; }) => ({
            key: playlist['@key'],
            name: playlist.name
        }));
        setPlaylist(playlistsData);
    };

    useEffect(() => {
        getAllPlaylists();
    }, []);

    return (
        <div className="flex flex-col w-full mt-4 py-4 max-h-screen overflow-hidden">
            <h2 className="text-2xl text-white font-bold">Playlists</h2>
            <div className="bg-black text-white rounded-md shadow-md mt-4">
                <div role="table" className="min-w-full">
                    <div className="flex border-b border-gray-600 py-3 px-6 sticky top-0 bg-black z-10">
                        <span className="w-10 text-center">#</span>
                        <span className="flex-1">Nome</span>
                    </div>
                    <div className="overflow-y-auto max-h-[calc(110vh-380px)]">
                        {playlist.map((playlist, index) => (
                            <div key={playlist.key} className="border-b border-gray-600">
                                <div className="flex items-center py-4 px-6 hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out">
                                    <span className="w-10 text-center">{index + 1}</span>
                                    <span className="flex-1">{playlist.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default playlistList;