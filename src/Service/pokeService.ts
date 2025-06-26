import axios from "axios";

const remote = axios.create();

export interface PokemonListResponseType {
    count: number;
    next: string;
    results: {
        name: string;
        url: string;
    }[];
}

interface PokemonDetailResponseType {
    id: number;
    weight: number;
    height: number;
    name: string;
    types: {
        type: {
            name: string;
        };
    }[];
    sprites: {
        front_default: string;
        other: {
            dream_world: {
                front_default: string;
            };
            "official-artwork": {
                front_default: string;
            };
        };
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

export interface PokemonDetailType {
    id: number;
    weight: number;
    height: number;
    name: string;
    koreanName: string;
    color: string;
    types: string[];
    images: {
        frontDefault: string;
        dreamWorldFront: string;
        officialArtworkFront: string;
    };
    baseStats: {
        name: string;
        value: number;
    }[];
}

interface PokemonSpeciesResponseType {
    color: {
        name: string;
    };
    names: {
        name: string;
        language: {
            name: string;
        };
    }[];
}

export const fetchPokemons = async (nextUrl?: string) => {
    const requestUrl = nextUrl || "https://pokeapi.co/api/v2/pokemon";
    const response = await remote.get<PokemonListResponseType>(requestUrl);
    return response.data;
};

export const fetchPokeDetail = async (name: string): Promise<PokemonDetailType> => {
    const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    const response = await remote.get<PokemonDetailResponseType>(pokemonDetailUrl);
    const speciesRespose = await remote.get<PokemonSpeciesResponseType>(pokemonSpeciesUrl);
    const detail = response.data;
    const species = speciesRespose.data;
    return {
        id: detail.id,
        name: detail.name,
        koreanName: species.names.find((item) => item.language.name === "ko")?.name ?? detail.name,
        color: species.color.name,
        height: detail.height / 10,
        weight: detail.weight / 10,
        types: detail.types.map((item) => item.type.name),
        images: {
            frontDefault: detail.sprites.front_default,
            dreamWorldFront: detail.sprites.other.dream_world.front_default,
            officialArtworkFront: detail.sprites.other["official-artwork"].front_default,
        },
        baseStats: detail.stats.map((item) => {
            return {
                name: item.stat.name,
                value: item.base_stat,
            };
        }),
    };
};
