import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const req = supertest(app);

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
          {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-12-07T14:11:53.175Z",
            updatedAt: "2022-12-07T14:11:10.978Z",
          },
          {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 5678,
            moons: 2,
            createdAt: "2022-12-07T14:11:53.175Z",
            updatedAt: "2022-12-07T14:11:27.819Z",
          },
        ];

        // @ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);

        const res = await req
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(res.body).toEqual(planets);
    });
});

describe("GET /planets/:id", () => {
    test("Valid request", async () => {
        const planet = {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 12,
                createdAt: "2022-12-07T14:11:53.175Z",
                updatedAt: "2022-12-07T14:11:10.978Z",
        };

        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet);

        const res = await req
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual(planet);
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null);

        const res = await req
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot GET /planets/23");
    });

    test("Invalid planet ID", async () => {
        const res = await req
            .get("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot GET /planets/asdf");
    });
});

describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
          id: 3,
          name: "Mercury",
          description: null,
          diameter: 1234,
          moons: 12,
          createdAt: "2022-12-07T14:26:10.745Z",
          updatedAt: "2022-12-07T14:25:48.106Z",
        };

        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const res = await req
            .post("/planets")
            .send({
                name: "Mercury",
                diameter: 1234,
                moons: 12,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(res.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 1234,
            moons: 12,
        };

        const res = await req
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});

describe("PUT /planets/:id", () => {
    test("Valid request", async () => {
        const planet = {
          id: 3,
          name: "Mercury",
          description: "Lovely planet",
          diameter: 1234,
          moons: 12,
          createdAt: "2022-12-07T14:26:10.745Z",
          updatedAt: "2022-12-07T14:25:48.106Z",
        };

        // @ts-ignore
        prismaMock.planet.update.mockResolvedValue(planet);

        const res = await req
            .put("/planets/3")
            .send({
                name: "Mercury",
                description: "Lovely planet",
                diameter: 1234,
                moons: 12,
            })
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(res.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 1234,
            moons: 12,
        };

        const res = await req
            .put("/planets/23")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(res.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));

        const res = await req
            .put("/planets/23")
            .send({
                name: "Mercury",
                description: "Lovely planet",
                diameter: 1234,
                moons: 12,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot PUT /planets/23");
    });

    test("Invalid planet ID", async () => {
        const res = await req
            .put("/planets/asdf")
            .send({
                name: "Mercury",
                description: "Lovely planet",
                diameter: 1234,
                moons: 12,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot PUT /planets/asdf");
    });
});

describe("DELETE /planets/:id", () => {
    test("Valid request", async () => {
        const res = await req
            .delete("/planets/1")
            .expect(204)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(res.text).toEqual("");
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

        const res = await req
            .delete("/planets/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot DELETE /planets/23");
    });

    test("Invalid planet ID", async () => {
        const res = await req
            .delete("/planets/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot DELETE /planets/asdf");
    });
});

describe("POST /planets/:id/photo", () => {
    test("Valid request with PNG file upload", async () => {
        await req
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.png")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    });

    test("Valid request with JPG file upload", async () => {
        await req
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.jpg")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    });

    test("Invalid request with text file upload", async () => {
        const res = await req
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.txt")
            .expect(500)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain(
            "Error: the uploaded file must be a JPG or a PNG image."
        );
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("Error"));

        const res = await req
            .post("/planets/23/photo")
            .attach("photo", "test-fixtures/photos/file.png")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot POST /planets/23/photo");
    });

    test("Invalid planet ID", async () => {
        const res = await req
            .post("/planets/asdf/photo")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("Cannot POST /planets/asdf/photo");
    });

    test("Invalid request with no file upload", async () => {
        const res = await req
            .post("/planets/23/photo")
            .expect(400)
            .expect("Content-Type", /text\/html/);

        expect(res.text).toContain("No photo file uploaded");
    });
});
