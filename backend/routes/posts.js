const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


//投稿を作成する
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
    } catch(err){
        return res.status(500).json(err);
    }
});

//特定の投稿を更新する
router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userid == req.body.userid){
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿の編集に成功しました");

        } else{
            return res.status(403).json("他人の投稿は編集できません");
        }
    } catch (err){
        return res.status(403).json(err);
    }
});

//特定の投稿を削除する
router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userid == req.body.userid){
            await post.deleteOne();
            return res.status(200).json("投稿の削除に成功しました");

        } else{
            return res.status(403).json("他人の投稿は削除できません");
        }
    } catch (err){
        return res.status(403).json(err);
    }
});

//特定の投稿を取得する
router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err){
        return res.status(403).json(err);
    }
});

//特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //まだ投稿にいいね押してなかったらしていなかったらいいねを押すことが可能
        if(!post.likes.includes(req.body.userid)){
            await post.updateOne({
                $push: {
                    likes: req.body.userid,
                },
            });
            return res.status(200).json("投稿にいいねを押しました");
            // 投稿にすでにいいねを押していた
        }else {
            //いいねしているユーザーID集合から自分を削除
            await post.updateOne({
                $pull: {
                    likes: req.body.userid,
                },
            });
            return res.status(403).json("投稿へのいいねを取り消しました");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

//タイムラインの投稿を取得
router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userid);
        const userPosts =await Post.find({userid: currentUser._id});
        //自分がフォローしている人の全投稿内容を取得
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendid) => {
                return Post.find({userid: friendid});
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err){
        return res.status(500).json(err);
    }
});

module.exports = router;