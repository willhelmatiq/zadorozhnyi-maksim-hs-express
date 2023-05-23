const request = require('supertest');
const app = require('../../app');
const { connectDB, dropDB, dropCollections } = require("../../mongoDb/setupDb");
const Post = require("../../model/post");

beforeAll(async () => {
    await connectDB();
});

afterEach(async () => {
   await dropCollections();
});

afterAll(async () => {
    await dropDB();
});
describe('Test Posts', () => {
    it('GET /posts => array of posts', () => {
        const newPost = new Post({
            content: "test content",
            author: "test author",
            date: Date.now(),
        }).save();
        return request(app)
            .get('/posts')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            _id: expect.any(String),
                            content: expect.any(String),
                            author: expect.any(String),
                            date: expect.any(String)
                        }),
                    ])
                );
            });
    });

    it('GET /posts/:id => post by ID', async () => {
        const newPost = await new Post({
            content: "test content",
            author: "test author",
            date: Date.now(),
        }).save();
        return request(app)
            .get('/posts/' + newPost._id.toString())
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    {
                        _id: newPost._id.toString(),
                        content: newPost.content,
                        author: newPost.author,
                        date: newPost.date.toISOString(),
                        __v: 0
                    }
                );
            });
    });

    it('GET /posts/:id => 404 when ID is wrong', async () => {
        const newPost = await new Post({
            content: "test content",
            author: "test author",
            date: Date.now(),
        }).save();
        const wrongId = 123;
        return request(app)
            .get('/posts/' + wrongId)
            .expect('Content-Type', /json/)
            .expect(404)
    });

    it('POST /posts => create NEW post', () => {
        return (
            request(app)
                .post('/posts')
                .send({
                    content: "new Test content",
                    author: "testAuthor"
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .then((response) => {
                    expect(response.body).toEqual({
                        result: "Post successfully created"
                    });
                })
        );
    });

    it('PUT /posts/:id => update post content by ID', async () => {
        const newPost = await new Post({
            content: "test content",
            author: "test author",
            date: Date.now(),
        }).save();
        return request(app).put('/posts/' + newPost._id.toString())
            .send({
                content: "Test content was updated"
            }).expect(200).then((response) => {
                expect(response.body).toEqual({
                    result: "Post content was updated"
                });
            });
    });

    it('PUT /posts/:id => 404 when ID is wrong', async () => {
        const newPost = await new Post({
            content: "test content",
            author: "test author",
            date: Date.now(),
        }).save();
        const wrongId = 123;
        return request(app).put('/posts/' + wrongId)
            .send({
                content: "Test content was updated"
            }).expect(404);
    });

    it('DELETE /posts/:id => delete post by ID', async () => {
        const newPost = await new Post({
            content: "test content",
            author: "test author",
            date: Date.now(),
        }).save();
        return request(app).delete('/posts/' + newPost._id.toString())
            .expect(200).then((response) => {
                expect(response.body).toEqual({
                    status: "Deleted"
                });
            });

    });

    it('DELETE /posts/:id => 404 when ID is wrong', async () => {
        const newPost = await new Post({
            content: "test content",
            author: "test author",
            date: Date.now(),
        }).save();
        const wrongId = 123;
        return request(app).delete('/posts/' + wrongId)
            .expect(404);
    });
});