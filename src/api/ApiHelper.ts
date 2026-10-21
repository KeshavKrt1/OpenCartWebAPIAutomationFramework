
import { APIRequestContext } from "@playwright/test";

export class ApiHelper {

    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    //helper methods:

    //GET
    async get(endpoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURL}${endpoint}`, {
            headers: headers,
        });

        console.log(await response.json(), response.status());
        return {
            status: response.status(),
            body: await response.json()
        }
    }


    //POST
    async post(endpoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endpoint}`, {
            headers: headers,
            data: data
        });

        console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json()
        }
    }



    //PUT
    async put(endpoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURL}${endpoint}`, {
            headers: headers,
            data: data
        });

        console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //PATCH
    async patch(endpoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURL}${endpoint}`, {
            headers: headers,
            data: data
        });

        console.log(await response.json(), response.status());

        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //DELETE
    async delete(endpoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURL}${endpoint}`, {
            headers: headers
        });

        console.log(response.status());

        return {
            status: response.status()
        }
    }










}