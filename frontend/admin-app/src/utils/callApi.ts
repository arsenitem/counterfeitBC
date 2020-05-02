import { baseUrl } from '../apiConfig'

type HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH'
interface IRequestOptions {
    method: HttpMethod;
    headers: {
        Authorization: string;
        'Content-Type'?: string;
    };
    body?: any
}
export async function callApi(pathAndQuery: string, token: string, method: HttpMethod = "GET", bodyObject: any = null): Promise<any> {
    let url = baseUrl + pathAndQuery;

    let options: IRequestOptions = {
        method: method,
        headers: {
            Authorization: 'Bearer ' + token
        },
        body: bodyObject !== null ? JSON.stringify(bodyObject) : null
    };

    if (bodyObject !== null) {
        options.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    return fetch(url, options as any)
}