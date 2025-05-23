const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { describe, test, beforeEach } = require("node:test");
const helper = require("./test_helper");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
describe("when there is initially one user in db", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({ username: "root", passwordHash });

        await user.save();
    });

    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "salainen",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

        const usernames = usersAtEnd.map((u) => u.username);
        assert(usernames.includes(newUser.username));
    });

    test("create user withour username or password is not added", async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            name: "Lam",
        };
        await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    });

    test("create user with username and password contain less than 3 characters", async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: "l",
            name: "Lam",
            password: '1'
        };
        await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        const usersAtEnd = await helper.usersInDb();
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
});
