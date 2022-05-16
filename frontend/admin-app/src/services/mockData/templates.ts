import { ITemplate } from "../../models";

export const mockTemplates: ITemplate[] = [
    {
        templateId: '1',
        productType: 'Тушёнка',
        productName: 'ХХL для пёсиков',
        description: createMockDescription(),
        imageUrl: 'https://source.unsplash.com/random',
        links: [],
        specifications: [],
        isArchived: false,
        isPublished: true,
        isVisible: true
    },
    {
        templateId: '2',
        productType: 'Тушёнка',
        productName: 'ХХL из пёсиков',
        description: createMockDescription(),
        imageUrl: 'https://source.unsplash.com/random',
        links: [{
            linkName: 'Приз за качество мясца',
            url: 'https://www.youtube.com/watch?v=zzqamfaHK-Y'
        },{
            linkName: 'Сертификат качества',
            url: 'https://source.unsplash.com/'
        }],
        specifications: [
            {
                parameterName: 'Вес',
                value: 0.5,
                unit: 'кг'
            },
            {
                parameterName: 'Тип упаковки',
                value: 'Металлическая банка'
            },
            {
                parameterName: 'Температура хранения',
                value: '10 - 34',
                unit: '℃'
            },
            {
                parameterName: 'Ещё один',
                value: 'Ха ха. Здесь нет ничего осмысленного'
            }
        ],
        isArchived: false,
        isPublished: true,
        isVisible: true
    },
    {
        templateId: '3',
        productType: 'Тушёнка',
        productName: 'Весёлый грибочек',
        description: createMockDescription(),
        imageUrl: 'https://source.unsplash.com/random',
        links: [{
            linkName: 'Сайт производителя',
            url: 'https://www.youtube.com/watch?v=zzqamfaHK-Y'
        }],
        specifications: [
            {
                parameterName: 'Вес',
                value: 0.5,
                unit: 'кг'
            },
            {
                parameterName: 'Тип упаковки',
                value: 'Металлическая банка'
            },
            {
                parameterName: 'Температура хранения',
                value: '10 - 34',
                unit: '℃'
            },
            {
                parameterName: 'Срок годности',
                value: '100 лет'
            }
        ],
        isArchived: true,
        isPublished: true,
        isVisible: false
    },
    {
        templateId: '4',
        productType: 'Тушёнка',
        productName: 'Как у бабушки',
        description: createMockDescription(),
        imageUrl: 'https://source.unsplash.com/random',
        links: [{
            linkName: 'Приз за качество мясца',
            url: 'https://source.unsplash.com/'
        },{
            linkName: 'Здесь тоже забыл название',
            url: 'https://source.unsplash.com/'
        }],
        specifications: [],
        isArchived: false,
        isPublished: false,
        isVisible: false
    },
    {
        templateId: '5',
        productType: 'Тушёнка',
        productName: 'Шато де ля франс',
        description: createMockDescription(),
        imageUrl: 'https://source.unsplash.com/random',
        links: [{
            linkName: 'Приз за качество мясца',
            url: 'https://source.unsplash.com/'
        },{
            linkName: 'Я забыл вставить название',
            url: 'https://source.unsplash.com/'
        }],
        specifications: [
            {
                parameterName: 'Вес',
                value: 0.5,
                unit: 'кг'
            },
            {
                parameterName: 'Тип упаковки',
                value: 'Металлическая банка'
            },
            {
                parameterName: 'Температура хранения',
                value: '10 - 34',
                unit: '℃'
            }
        ],
        isArchived: false,
        isPublished: true,
        isVisible: true
    },
    {
        templateId: '6',
        productType: 'Тушёнка',
        productName: 'Элитная тушёнка по рецепту эскимоса',
        description: createMockDescription(),
        imageUrl: 'https://source.unsplash.com/random',
        links: [{
            linkName: 'Приз за качество мясца',
            url: 'https://source.unsplash.com/'
        },{
            linkName: 'Ссылка в никуда',
            url: 'https://source.unsplash.com/'
        }],
        specifications: [],
        isArchived: false,
        isPublished: true,
        isVisible: true
    },
    {
        templateId: '7',
        productType: 'Тушёнка',
        productName: 'Гурманитарий',
        description: createMockDescription(),
        imageUrl: 'https://source.unsplash.com/random',
        links: [{
            linkName: 'Приз за качество мясца',
            url: 'https://source.unsplash.com/'
        }],
        specifications: [],
        isArchived: false,
        isPublished: true,
        isVisible: false
    },
    {
        templateId: '8',
        productType: 'Тушёнка',
        productName: 'Тушёнка обыкновенная',
        description: createMockDescription(),
        imageUrl: 'https://source.unsplash.com/random',
        links: [],
        specifications: [],
        isArchived: false,
        isPublished: true,
        isVisible: true
    }
] 

function createMockDescription(): string {
    const text = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`


    const words = text.split(' ')
    const length = getRandomInt(Math.floor(words.length * 0.5), words.length -1)

    return words.slice(0, length).join(' ')
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}