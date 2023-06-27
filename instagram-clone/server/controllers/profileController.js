const User = require("../models/User");
const Follow = require("../models/Follow");
const Article = require("../models/Article");

// 프로필 리스트 가져오기
exports.find = async (req, res, next) => {
    try {
        const where = {};
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        //특저 유저가 팔로우하는 프로필 리스트
        if ("following" in req.query) {
            const user = await User.findOne({ username: req.query.following });
            const follows = await Follow
                .find({ follower: user._id })

            //검색 조건에 추가
            where._id = follows.map(follow => follow.following);
        }

        //특정 유저를 팔로우하는 프로필 리스트
        if ("followers" in req.query) {
            const user = await User.findOne({ username: req.query.followers });
            const follows = await Follow
                .find({ following: user._id })

            where._id = follows.map(follow => follow.follower);
        }

        //특정 게시물을 좋아요한 프로필 리스트
        if ("favorite" in req.query) {
            const favorite = await Favorite.find({ article: req.query.favorite })
            where._id = favorites.map(favorite => favorite.user);
        }

        //특정 단어가 유저이름에 포함된 프로필 리스트
        if ("username" in req.query) {
            //정규식 (regular expression)
            where.username = new RegExp(req.query.username, "i");
        }

        //검색
        const profileCount = await User.count(where);

        const profiles = await User
            .find(where, "username fullName avatar bio") // find (검색조건, 필드)
            .populate({
                path: "isFollowing", //팔로우 여부 확인
                match: { follower: req.user._id }
            })
            .limit(limit)
            .skip(skip)

        res.json({ profiles, profileCount })

    } catch (error) {
        next(error)
    }
};
// 프로필 상세보기
exports.findOne = async (req, res, next) => {
    try {
        const _profile = await User
            .findOne({ username: req.params.username }, "username fullName avatar bio")
            .populate({
                path: "isFollowing", //팔로우 여부 확인
                match: { follower: req.user._id }
            })

        //프로필이 존재하지 않을 경우
        if (!_profile) {
            const err = new Error("Profile not found");
            err.status = 404;
            throw err;
        }

        //프로필 데이터를 가공한다
        const {
            username,
            fullName,
            avatar,
            bio,
            isFollowing
        } = _profile

        //프로필 유저의 팔로잉 수
        const followingCount = await Follow.count({ follower: _profile._id })
        //프로필 유저의 팔로워 수
        const followerCount = await Follow.count({ following: _profile._id })
        //프로필 유저의 게시물 수
        const articleCount = await Article.count({ author: _profile._id })

        const profile = {
            username,
            fullName,
            avatar,
            bio,
            isFollowing,
            //데이터 추가
            followingCount,
            followerCount,
            articleCount
        }

        res.json({ profile })

    } catch (error) {
        next(error)
    }
};
// 팔로우 처리
exports.follow = async (req, res, next) => {
    try {
        //본인을 팔로우 할 경우
        if (req.user.username === req.params.username) {
            const err = new Error("Cannot Follow yourself")
            err.status = 400;
            throw err;
        }
        //팔로우 할 프로필 검색
        const profile = await User
            .findOne({ username: req.params.username }, "username fullName avatar bio")

        //프로필이 존재하지 않을 경우
        if (!profile) {
            const err = new Error("profile not found")
            err.status = 404;
            throw err;
        }

        //현재 팔로우 상태인지 확인
        const _follow = await Follow
            .findOne({ follower: req.user._id, following: profile._id })
        //follower 로그인 유저 following 프로필 유저?

        // 처음 팔로우 하는 경우
        if (!_follow) {
            const follow = new Follow({
                follower: req.user._id,
                following: profile._id
            })

            await follow.save();
        }

        //팔로우 완료한 프로필 전송
        res.json({ profile })

    } catch (error) {
        next(error)
    }
};
// 언팔로우 처리
exports.unfollow = async (req, res, next) => {
    try {
        const username = req.params.username;
        //언팔로우할 프로필을 검색한다
        const profile = await User
            .findOne({ username }, "username fullName avatar bio")

        if (!profile) {
            const err = new Error("profile not found")
            err.status = 404;
            throw err;
        }

        //팔로우 중일 경우
        const follow = await Follow
            .findOne({ follower: req.user._id, following: profile._id })

        if (follow) {
            await follow.deleteOne();
        }
        res.json({ profile })
    } catch (error) {
        next(error)
    }
};
