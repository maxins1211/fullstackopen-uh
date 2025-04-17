const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("total likes", () => {
    const emptyList = [];

    test("of empty list is zero", () => {
        assert.strictEqual(listHelper.totalLikes(emptyList), 0);
    });

    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
            likes: 5,
            __v: 0,
        },
    ];

    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        assert.strictEqual(result, 5);
    });

    const biggerList = [{
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
    }, {
        _id: "5a422aa71b54a676234d17f9",
        title: "Go To Statement",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 12,
        __v: 0
    }, {
        _id: "5a422aa71b54a676234d17f3",
        title: "Go To",
        author: "Edsger W.",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 22,
        __v: 0
    }]

    test("of a bigger list is calculated right", () => {
        assert.strictEqual(listHelper.totalLikes(biggerList), 39)
    })
});
