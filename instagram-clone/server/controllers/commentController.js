const User = require("../models/User")
const Article = require("../models/Article")
const Comment = require("../models/Comment")

// 댓글 가져오기
exports.find = async (req, res, next) => {
    try {
        //댓글을 가져올 게시물 검색
        const article = await Article.findById(req.params.id);

        const where = { article: article._id }; //검색한 게시물
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const commentCount = await Comment.count(where);
        const comments = await Comment
            .find(where)
            .populate({
                path: "author",
                select: "username avatar"
            })
            .sort({ created: "desc" })
            .limit(limit)
            .skip(skip)

        res.json({ comments, commentCount })

    } catch (error) {
        next(error)
    }
}

// 댓글 생성
exports.create = async (req, res, next) => {
    try {
        //댓글 생성
        const _comment = new Comment({
            article: req.params.id, //댓글이 달린 게시물
            content: req.body.content, //댓글 내용
            author: req.user._id //작성자
        })

        await _comment.save();

        const comment = await _comment
            .populate({ //조인
                path: "author", //유저 컬렉션과 조인
                select: "username avatar" //필드
            })

        res.json({ comment })

    } catch (error) {
        next(error)
    }
}

// 댓글 삭제
exports.delete = async (req, res, next) => {

    try {
        //삭제할 댓글 검색
        const comment = await Comment
            .findById(req.params.id)

        if (!comment) { //댓글이 존재하지 않을 경우
            const err = new Error("Comment not found")
            err.status = 404;
            throw err;
        }

        //본인 댓글이 아닌 경우
        if (req.user._id.toString() !== comment.author.toString()) {
            const err = new Error("Incorrect user");
            err.status = 400;
            throw err;
        }

        await comment.deleteOne();

        res.json({ comment })


    } catch (error) {
        next(error)
    }
}