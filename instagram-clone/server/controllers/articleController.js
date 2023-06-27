const User = require("../models/User");
const Follow = require("../models/Follow");
const Article = require("../models/Article");
const Favorite = require("../models/Favorite");
const FileHandler = require("../utils/fileHandler");
const fileHandler = require("../utils/fileHandler");

// 피드 가져오기
exports.feed = async (req, res, next) => {
    try {
        //팔로워가 로그인 유저인 도큐먼트 검색
        const follows = await Follow.find({ follower: req.user._id });
        //로그인 유저가 팔로우 하는 유저 리스트
        const followings = follows.map(follow => follow.following);

        //검색조건 : 게시물 작성자가 팔로잉유저와 본인인 경우
        const where = { author: [...followings, req.user._id] };
        const limit = req.query.limit || 5;
        const skip = req.query.skip || 0;

        //검색
        const articleCount = await Article.count(where);
        const articles = await Article
            .find(where)
            .populate({ //조인
                path: "author", //유저컬렉션과 조인
                select: "username avatar" //검색 필드
            })
            .populate({
                path: "isFavorite" //좋아요 여부 확인
            })
            .populate({
                path: "commentCount" //댓글 개수 파악
            })
            .sort({ created: "desc" }) //정렬: 생성일 기준 내림차순(desc)
            .skip(skip)
            .limit(limit)

            //전송
        res.json({ articles, articleCount });

    } catch (error) {
        next(error)
    }
};

// 게시물 리스트 가져오기
exports.find = async (req, res, next) => {
    try {
        const where = {}
        //검색 조건
        const limit = req.query.limit || 9
        //한번에 전송한 도큐먼트의 갯수
        const skip = req.query.skip || 0
        // 건너뛸 도큐먼트의 갯수

        //클라이언트 요청 :req.query
        if ("username" in req.query) { //타임라인
            // 클라이언트가 요청한 username으로 유저를 검색한다
            const user = await User.findOne({ username: req.query.username })
            where.author = user._id;// 조건추가
        }

        //게시물 검색
        const articleCount = await Article.count(where)
        // 해당하는 도큐먼트의 갯수를 구한다

        //articles : 도큐먼트 
        const articles = await Article
            .find(where, "photos favoriteCount created")
            .populate({ path: "commentCount" })
            .sort({ created: "desc" })
            .limit(limit)
            .skip(skip)
        //find: 검색조건, 검색필드 메서드 | populate: 컬렉션 조인
        //path: "commentCount" : 게시물의 댓글 갯수 파악
        //sort({ created: "desc" }): 생성일 기준 내림차순 정렬(sort)

        res.json({ articles, articleCount });

    } catch (error) {
        next(error)
    }
};

// 게시물 상세 보기
exports.findOne = async (req, res, next) => {
    try {
        const article = await Article
            .findById(req.params.id) //클라이언트가 요청한 id로 게시물을 검색한다
            .populate({ //컬렉션 조인
                path: "author", //유저(게시물 작성자)정보
                select: "username avatar" //검색 필드
            })
            .populate({ path: "isFavorite" }) //좋아요 여부를 확인
            .populate({ path: "commentCount" }) //댓글 갯수 확인

        // 게시물이 없을경우 
        if (!article) {
            const err = new Error("Article nor found");
            err.status = 404; //(404)NotFound
            throw err;
        }

        // 검색한 게시물을 전송한다
        res.json({ article });

    } catch (error) {
        next(error)
    }
};

// 게시물 생성
// exports.create = async () => {
//     //파일 처리(사진)
//     fileHandler("articles").array("photos"),
//         async (req, res, next) => {
//             try {
//                 const files = req.files;
//                 //req.files: 클라이언트가 전송한 파일
//                 //파일이 없을 경우 400에러
//                 if (files.length < 1) {
//                     const err = new Error("File is required");
//                     err.status = 400;
//                     throw err;
//                 }

//                 const photos = files.map(file => file.filename);

//                 //article 도큐먼트를 생성한다
//                 const article = new Article({
//                     photos,
//                     description: req.body.description,
//                     author: req.user._id
//                 });

//                 await article.save();

//                 // 전송
//                 res.json({ article });

//             } catch (error) {
//                 next(error)
//             }
//         }
// };

exports.create = [
    fileHandler('articles').array('photos'),
    async (req, res, next) => {
        try {

            const files = req.files;

            if (files.length < 1) {
                const err = new Error('File is required');
                err.status = 400;
                throw err;
            }

            const photos = files.map(file => file.filename);

            const article = new Article({
                photos,
                description: req.body.description,
                author: req.user._id
            });

            await article.save();

            res.json({ article });

        } catch (error) {
            next(error)
        }
    }
]

// 게시물 삭제
exports.delete = async (req, res, next) => {
    try {
        //클라이언트가 전송한 id로 게시물을 검색한다
        const article = await Article.findById(req.params.id);

        //게시물이 존재하지 않을경우
        if (!article) {
            const err = new Error("Article not found")
            err.status = 404;
            throw err;
        }

        //req.user: 로그인한 유저? | 본인게시물이 아닌경우 삭제 불가능
        if (req.user._id.toString() !== article.author.toString()) { //toString(): 문자열로 변환해서 비교함 | 객체를 비교할 수 없음
            const err = new Error("Author is not correct")
            err.status = 400;
            throw err;
        }

        await article.deleteOne(); // 게시물 삭제 처리 | delete도됨

        //삭제한 게시물을 전송한다.
        res.json({ article });

    } catch (error) {
        next(error)
    }
};

// 좋아요 처리
exports.favorite = async (req, res, next) => {
    try {
        //클라이언트가 전송한 id로 게시물을 검색한다
        const article = await Article.findById(req.params.id);

        //게시물이 없을때
        if (!article) {
            const err = new Error("Article not found")
            err.status = 404;
            throw err;
        }

        //이미 좋아요 한 게시물
        const _favorite = await Favorite.findOne({ user: req.user._id, article: article._id })

        //처음 좋아요 하는 게시물
        if (!_favorite) {
            //Favorite 도큐먼트를 생성한다
            const favorite = new Favorite({
                user: req.user._id,
                article: article._id
            })

            await favorite.save();

            //좋아요를 1증가시킴
            article.favoriteCount++;
            await article.save();
        }

        //좋아요 처리 게시물 전송
        res.json({ article })

    } catch (error) {
        next(error)
    }
};

// 좋아요 취소 처리
exports.unfavorite = async (req, res, next) => {
    try {
        //게시물 검색
        const article = await Article.findById(req.params.id);

        //게시물이 없는 경우
        if (!article) {
            const err = new Error("Article not found");
            err.status = 404;
            throw err;
        }

        //좋아요한 게시물인지 확인
        const favorite = await Favorite.findOne({ user: req.user._id, article: article._id });

        //좋아요 한 게시물이면 취소
        if (favorite) {
            //도큐먼트 삭제
            await favorite.deleteOne();

            //좋아요 수 감소
            article.favoriteCount--;
            await article.save();
        }

        //처리된 게시물 전송
        res.json({ article });


    } catch (error) {
        next(error);
    }
};
