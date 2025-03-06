export interface Place {
    uuid: string;
    name: string;
    coordinates: [number, number];
    description: string;
    image: string;
    city: {
        front_name: string;
        name: string;
    };
    images: string[];
    text: string;
    contacts: {
        email: string;
        site: string;
        telephone: string;
    }[];
}