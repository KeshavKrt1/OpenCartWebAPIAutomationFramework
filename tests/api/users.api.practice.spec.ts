
import { test, expect, request, APIResponse } from '@playwright/test';

let AUTH_TOKEN = {
    Authorization: 'Bearer 9785c34a9d6f2ab7cc76160aa6f6c76131c912fc55925bc1fe5792defc8a0d6a'
}

test('get all users GET api test', async ({ request }) => {
    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });

    //console.log(response);
    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

});

test('create a user POST api test', async ({ request }) => {

    //User JS object:
    let userData = {
        name: 'Keshav',
        email:`pwautomation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    }

    //JS Object ---> JSON (Serialization)
    //JSON.stringify();  ------------------------ NOT required , as JSon will be automatically gets serialized

    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); // 201
    console.log(response.statusText()); //Created
    expect(response.status()).toBe(201);
  
});

test('update a user PUT api test', async ({ request }) => {

    //User JS object:
    let userData = {
        name: 'Keshav Kulkarni',
        email: 'keshavAutomation3@labs.com',
        gender: 'male',
        status: 'inactive'
    }

    //JS Object ---> JSON (Serialization)
    //JSON.stringify();  ------------------------ NOT required , as JSon will be automatically gets serialized

    let response = await request.put('https://gorest.co.in/public/v2/users/8657229', {
        headers: AUTH_TOKEN,
        data: userData
    });

    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); // 200
    console.log(response.statusText()); //OK
    expect(response.status()).toBe(200);
  
});


test('delete a user DELETE api test', async ({ request }) => {


    let response = await request.delete('https://gorest.co.in/public/v2/users/8657236', {
        headers: AUTH_TOKEN,
    });

    console.log(response.status()); // 204
    console.log(response.statusText()); //No Content
    expect(response.status()).toBe(204);
  
});