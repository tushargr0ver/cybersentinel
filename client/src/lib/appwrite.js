import { Client, Account } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67f7bfda0018ff75ef84');

const account = new Account(client);

export { client, account };


