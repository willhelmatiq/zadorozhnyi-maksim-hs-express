var express = require('express');
var router = express.Router();
const Post = require('../model/post');
const {ObjectId} = require("mongodb");

/* GET home page. */
router.get('/', async function (req, res, next) {
    const posts = await Post.find({});
    res.json(posts);
});

router.get('/:id', async function (req, res, next) {
    try {
        const id = new ObjectId(req.params.id);
        const post = await Post.findOne({"_id": id});
        res.json(post);
    } catch (err) {
        res.status(404).json("post not found");
    }


});

router.post('/', async function (req, res, next) {
    const {body} = req;
    new Post({
        content: body.content,
        author: body.author,
        date: Date.now(),
    }).save();
    res.status(201).json({
        result: "Post successfully created"
    });
});

router.put('/:id', async function (req, res, next) {
    const {body} = req;
    try {
        const id = new ObjectId(req.params.id);
        await Post.updateOne({"_id": id},
            {
                $set: {
                    content: body.content,
                    date: Date.now()
                }
            }
        );
        res.status(200).json({
            result: "Post content was updated"
        });
    } catch (err) {
        res.status(404).json("post not found");
    }

});

router.delete('/:id', async function (req, res, next) {
    try {
        const id = new ObjectId(req.params.id);
        await Post.deleteOne({"_id": id});
        res.status(200).json({status: 'Deleted'});
    } catch (err) {
        res.status(404).json("post not found");
    }
});

module.exports = router;