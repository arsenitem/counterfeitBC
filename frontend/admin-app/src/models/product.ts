import {ILink, IProductSpecification} from './template'

export interface IProduct{
    productId: string | null;
    productType: string;
    productName: string;
    description: string;
    imageUrl: string;
    links: ILink[];
    specifications: IProductSpecification[];
    createdate: Date;
    longitude: string;
    latitude: string;
    producerName: string;
}