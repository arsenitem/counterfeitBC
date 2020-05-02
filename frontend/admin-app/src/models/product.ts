import {ILink, IProductSpecification} from './template'

export interface IProduct{
    productId: string;
    productType: string;
    productName: string;
    description: string;
    imageUrl: string;
    links: ILink[];
    specifications: IProductSpecification[];
    createDate: Date;
    longitude: string;
    latitude: string;
    producerName: string;
}