const router = require("express").Router();
const User = require("../models/User");

//CRUD(Create,Read,Update,Delete)
//ユーザー情報の更新：Update
router.put("/:id", async (req, res) => {
    if(req.body?.userid == req.params.id || req.body?.isAdmin){
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("ユーザー情報が更新されました");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("あなたは自分のアカウントの時だけ情報を更新できます");
    }
});

//ユーザー情報の削除：Delete
router.delete("/:id", async (req, res) => {
    if(req.body?.userid == req.params.id || req.body?.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("ユーザー情報が削除されました");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("あなたは自分のアカウントの時だけ情報を削除できます"); 
    }
});

//ユーザー情報の取得：Read
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
    if(req.body?.userid !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userid);
            //フォローしてなかったらフォロー可能
            if(!user.followers.includes(req.body.userid)){
                await user.updateOne({
                    $push: {
                        followers: req.body.userid,
                    },
                });

                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id,
                    },
                });

                return res.status(200).json("フォローに成功しました！");
            }else {
                return res.status(403).json("あなたはすでにこのユーザーをフォローしています");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("自分自身をフォローできません"); 
    }
});

//ユーザーのフォローを外す
router.put("/:id/unfollow", async (req, res) => {
    if(req.body?.userid !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userid);
            //フォローしてたらフォローを外すことが可能
            if(user.followers.includes(req.body.userid)){
                await user.updateOne({
                    $pull: {
                        followers: req.body.userid,
                    },
                });

                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id,
                    },
                });

                return res.status(200).json("フォローを解除しました！");
            }else {
                return res.status(403).json("このユーザーをフォローしていないので解除できません");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("自分自身をフォロー解除できません"); 
    }
});



// router.get("/", (req, res) => {
//     res.send("user router");
// })

module.exports = router;