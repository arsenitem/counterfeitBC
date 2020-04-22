export interface ITemplate{
    templateId: string | null;
    productType: string;
    productName: string;
    description: string;
    imageUrl: string;
    links: ILink[];
    specifications: IProductSpecification[];
    isArchived: boolean;
    isPublished: boolean;
    isVisible: boolean;
}

interface ILink{
    linkName: string;
    url: string;
}
interface IProductSpecification{
    parameterName: string;
    value: string | number;
    unit?: string;
}