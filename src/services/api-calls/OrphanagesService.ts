import { Api } from "../Api";

export interface IOrphanage {
    id: number;
    name: string;
    about: string;
    latitude: number;
    longitude: number;
    instructions: string;
    opening_hours: number;
    open_on_weekends: boolean;
    images: { id: number, path: string }[];
}

const getAllOrphanages = async (): Promise<IOrphanage[] | undefined> => {
    try {
        const { data } = await Api.get<IOrphanage[]>('/orphanages');
        if (data) {
            return data;
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined;
    }
};

const getOrphanagesById = async (id: number): Promise<IOrphanage | undefined> => {
    try {
        const { data } = await Api.get<IOrphanage>(`/orphanages/${id}`);
        if (data) {
            return data;
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined;
    }
};

const createOrphanage = async (data: FormData): Promise<boolean> => {
    try {
        await Api.post<IOrphanage>(`/orphanages`, data);
        return true;
    } catch (e) {
        return false;
    }
};

export const OrphanagesService = {
    getAllOrphanages,
    getOrphanagesById,
    createOrphanage,
}
