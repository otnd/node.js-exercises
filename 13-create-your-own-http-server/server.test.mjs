import supertest from 'supertest';

import app from './app.js';

const request = supertest(app);

test('GET /planets', async () => {
    const response = await request
        .get('/planets')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(response.body).toEqual([
        { name: "Earth" },
        { name: "Mercury" },
        { name: "Mars" }
    ]);
});