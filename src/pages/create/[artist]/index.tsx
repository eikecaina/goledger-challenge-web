import { useEffect, useState } from "react";
import { createArtist, deleteArtist, fetchAllArtist, updateArtist } from "../../api/endpoints";
const { Button, message } = require('antd');

function artistList() {
    const [artists, setArtists] = useState<{ key: string; name: string; country: string }[]>([]);
    const [artistKey, setArtistKey] = useState<string>('')
    const [selectedArtist, setSelectedArtist] = useState<{ name: string; country: string }>({
        name: '',
        country: ''
    });
    const [isNameInputDisabled, setIsNameInputDisabled] = useState(2);

    const getAllArtists = async () => {
        const response = await fetchAllArtist();

        const artistsData = response.map((artist: { [key: string]: any; name: string; country: string }) => ({
            key: artist['@key'],
            name: artist.name,
            country: artist.country,
        }));

        setArtists(artistsData);
    };

    const handleArtistClick = (artist: { key: string; name: string; country: string }) => {
        setSelectedArtist({ name: artist.name, country: artist.country });
        setArtistKey(artist.key);
        setIsNameInputDisabled(1);
    };


    const Create = async (name: string, country: string) => {
        if (!name || !country) {
            message.warning({ content: 'Por favor, preencha todos os campos.' });
            return;
        }
        message.loading({ content: 'Aguarde...' });
        const existingArtist = artists.find((artist) => artist.name === name);
        if (existingArtist) {
            message.warning({ content: 'Já existe um artista com esse nome.' });

            setSelectedArtist({ name: '', country: '' });
            setArtistKey('');
            setIsNameInputDisabled(2);
            return;
        }

        try {
            await createArtist(name, country);

            setArtists((prevArtists) => [
                ...prevArtists,
                { key: `${name}-${country}`, name, country }
            ]);
            setSelectedArtist({
                name: '',
                country: ''
            });
            message.success({ content: 'Artista criado com sucesso!', key: 'create' });
        } catch (error) {
            message.error({ content: 'Erro ao criar o artista.', key: 'create' });
            console.error("Erro ao criar o artista:", error);
        }
    };

    const Update = async (name: string, country: string) => {
        if (!country) {
            message.warning({ content: 'Por favor, preencha o país.' });
            return;
        }
        message.loading({ content: 'Aguarde...' });
        try {
            await updateArtist(name, country);

            setArtists((prevArtists) => [
                ...prevArtists,
                { key: `${name}-${country}`, name, country }
            ]);
            setSelectedArtist({
                name: '',
                country: ''
            });
            message.success({ content: 'Artista atualizado com sucesso!', key: 'create' });
            setIsNameInputDisabled(2)
        } catch (error) {
            message.error({ content: 'Erro ao atualizar o artista.', key: 'create' });
            console.error("Erro ao atualizar o artista:", error);
        }
    };

    const Delete = async (key: string | undefined) => {
        if (!key) {
            message.warning({ content: 'Por favor, selecione um artista para excluir.', key });
            return;
        }

        message.loading({ content: 'Aguarde...', key });

        try {
            await deleteArtist(key);

            setArtists((prevArtists) => prevArtists.filter((artist) => artist.key !== key));
            setSelectedArtist({
                name: '',
                country: ''
            });

            message.success({ content: 'Artista excluído com sucesso!', key });
        } catch (error) {
            message.error({ content: 'Erro ao excluir o artista.', key });
            console.error("Erro ao excluir o artista", error);
        }
    };

    useEffect(() => {
        getAllArtists();
    }, [Create, Delete]);

    return (
        <div className="flex flex-col w-full mt-4 py-4 max-h-screen overflow-hidden">
            <h2 className="text-2xl text-white font-bold">Criar Artista</h2>
            <div className="flex gap-4 w-full mt-4 py-4">
                <div className="w-full max-w-sm min-w-[400px]">
                    <input
                        value={selectedArtist.name}
                        onChange={(e) => setSelectedArtist({ ...selectedArtist, name: e.target.value })}
                        className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
                        placeholder="Nome do Artista"
                        disabled={isNameInputDisabled == 1}
                    />
                </div>
                <div className="w-full max-w-sm min-w-[400px]">
                    <input
                        value={selectedArtist.country}
                        onChange={(e) => setSelectedArtist({ ...selectedArtist, country: e.target.value })}
                        className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow"
                        placeholder="País do Artista"
                    />
                </div>
            </div>

            <div className="bg-black text-white rounded-md shadow-md mt-4">
                <div role="table" className="min-w-full">
                    <div className="flex border-b border-gray-600 py-3 px-6 sticky top-0 bg-black z-10">
                        <span className="w-10 text-center">#</span>
                        <span className="flex-1">Artistas</span>
                        <span className="flex-1 text-center">País</span>
                    </div>
                    <div className="overflow-y-auto max-h-[calc(95vh-380px)]">
                        {artists.map((artist, index) => (
                            <div key={artist.key} className="border-b border-gray-600">
                                <div className="flex items-center py-4 px-6 hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out"
                                    onClick={() => handleArtistClick(artist)}
                                >
                                    <span className="w-10 text-center">{index + 1}</span>
                                    <span className="flex-1">{artist.name}</span>
                                    <span className="flex-1 text-center">{artist.country}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-4 m-1">
                <button
                    onClick={() => {
                        const name = selectedArtist.name;
                        const country = selectedArtist.country;

                        Create(name, country);
                    }}
                    className="bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-green-700 hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    Adicionar
                </button>
                <button
                    onClick={() => {
                        const name = selectedArtist.name;
                        const country = selectedArtist.country;

                        Update(name, country);
                    }}
                    className="bg-[#FF8C00] text-white text-sm font-semibold py-2 px-6 w-32 rounded-md transition duration-300 ease-in-out hover:bg-[#FF7F00] hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                    Editar
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        Delete(artistKey);
                    }}
                    className="bg-[#E0245E] text-white text-sm font-semibold py-2 px-6 w-32 rounded-md transition duration-300 ease-in-out hover:bg-[#D5104D] hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default artistList;