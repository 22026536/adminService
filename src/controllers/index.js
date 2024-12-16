import Anime from '../models/Anime.js';
import AnimeEpisode from '../models/AnimeEpisode.js';
import User from '../models/User.js';

export const addAnime = async (req, res) => {
    try {
        const { Name, English_Name, Score, Genres, Synopsis, Type, Episodes, Aired, Status, Producers, Licensors, Studios, Source, Duration, Old, Favorites, Scored_By, Members, Image_URL, JapaneseLevel, LastestEpisodeAired } = req.body;

        // Tạo đối tượng anime mà không cần Anime_id trong body
        const anime = new Anime({
            Name,
            English_Name,
            Score,
            Genres,
            Synopsis,
            Type,
            Episodes,
            Aired,
            Status,
            Producers,
            Licensors,
            Studios,
            Source,
            Duration,
            Old,
            Favorites,
            Scored_By,
            Members,
            Image_URL,
            JapaneseLevel,
            LastestEpisodeAired
        });

        // Lưu anime vào cơ sở dữ liệu
        const savedAnime = await anime.save();

        res.json({ anime: savedAnime, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};


export const updatedAnime = async (req, res) => {
    try {
        const updatedAnime = await Anime.findOneAndUpdate({ Anime_id: req.params.anime_id }, req.body, { new: true });
        if (!updatedAnime) return res.status(404).json({ message: 'Anime không tồn tại', success: false });
        res.json({ anime: updatedAnime, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

export const deletedAnime = async (req, res) => {
    try {
        const deletedAnime = await Anime.findOneAndDelete({ Anime_id: req.params.anime_id });
        if (!deletedAnime) return res.status(404).json({ message: 'Anime không tồn tại', success: false });
        res.json({ message: 'Xóa thành công', success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

export const addEpisode = async (req, res) => {
    try {
        const animeId = req.params.anime_id;  // Lấy Anime_id từ URL
        const newEpisode = new AnimeEpisode({
            ...req.body,  // Lấy tất cả thông tin từ body mà không cần có Episode_id
            Anime_id: animeId,  // Gán Anime_id vào Episode
            Aired: Date.now()  // Gán ngày phát sóng hiện tại
        });
        const savedEpisode = await newEpisode.save();  // Lưu episode vào DB

        // Cập nhật LastestEpisodeAired trong bảng Anime
        await Anime.findOneAndUpdate(
            { Anime_id: animeId },
            { LastestEpisodeAired: savedEpisode.Aired }
        );

        res.json({ episode: savedEpisode, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};


export const updatedEpisode = async (req, res) => {
    try {
        const animeId = req.params.anime_id;
        const episodeId = req.params.episode_id;
        const updatedEpisode = await AnimeEpisode.findOneAndUpdate(
            { Anime_id: animeId, Episode_id: episodeId },
            req.body,
            { new: true }
        );
        if (!updatedEpisode) return res.status(404).json({ message: 'Tập không tồn tại', success: false });
        res.json({ episode: updatedEpisode, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

export const deletedEpisode = async (req, res) => {
    try {
        const animeId = req.params.anime_id;
        const episodeId = req.params.episode_id;
        const deletedEpisode = await AnimeEpisode.findOneAndDelete({ Anime_id: animeId, Episode_id: episodeId });
        if (!deletedEpisode) return res.status(404).json({ message: 'Tập không tồn tại', success: false });
        res.json({ message: 'Xóa tập thành công', success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

export const addUser = async (req, res) => {
    try {
        const user = new User(req.body);  // Tạo mới người dùng từ dữ liệu trong body
        const savedUser = await user.save();  // Lưu người dùng vào DB

        res.json({ user: savedUser, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};


export const updatedUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ user_id: req.params.user_id }, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User không tồn tại', success: false });
        res.json({ user: updatedUser, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

export const deletedUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ user_id: req.params.user_id });
        if (!deletedUser) return res.status(404).json({ message: 'User không tồn tại', success: false });
        res.json({ message: 'Xóa thành công', success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

export const getUser = async (req, res) => {
    try {
        const users = await User.find().select('user_id full_name user_img email phone_number sex date_of_birth role japanese_level');
        res.json({ users, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

export const getUserByName = async (req, res) => {
    try {
        const name = req.params.name;
        const users = await User.find({ full_name: { $regex: name, $options: 'i' } });
        res.json({ users, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};

export const getAnime = async (req, res) => {
    try {
        const animes = await Anime.find();
        res.json({ animes, success: true });
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
};
