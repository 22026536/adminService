import Anime from '../models/Anime.js';
import AnimeEpisode from '../models/AnimeEpisode.js';
import User from '../models/User.js';

export const addAnime = async (req, res) => {
    const anime = new Anime(req.body);
    const savedAnime = await anime.save();
    res.json(savedAnime);
}

export const updatedAnime = async (req, res) => {
    const updatedAnime = await Anime.findOneAndUpdate({ Anime_id: req.params.anime_id }, req.body, { new: true });
    if (!updatedAnime) return res.status(404).json({ message: 'Anime không tồn tại' });
    res.json(updatedAnime);
}

export const deletedAnime = async (req, res) => {
    const deletedAnime = await Anime.findOneAndDelete({ Anime_id: req.params.anime_id });
    if (!deletedAnime) return res.status(404).json({ message: 'Anime không tồn tại' });
    res.json({ message: 'Xóa thành công' });
}

export const addEpisode = async (req, res) => {
    const animeId = req.params.anime_id;

    // Tạo tập mới
    const newEpisode = new AnimeEpisode({ ...req.body, Anime_id: animeId });
    const savedEpisode = await newEpisode.save();

    // Cập nhật thời gian ra tập mới nhất của Anime
    await Anime.findOneAndUpdate({Anime_id : animeId}, { LastestEpisodeAired: savedEpisode.Aired });

    res.json(savedEpisode);
}

export const updatedEpisode = async (req, res) => {
    const animeId = req.params.anime_id;
    const episodeId = req.params.episode_id;

    const updatedEpisode = await AnimeEpisode.findOneAndUpdate(
        { Anime_id: animeId, Episode_id: episodeId },
        req.body,
        { new: true }
    );

    if (!updatedEpisode) return res.status(404).json({ message: 'Tập không tồn tại' });
    res.json(updatedEpisode);
}

export const deletedEpisode = async (req, res) => {
    const animeId = req.params.anime_id;
    const episodeId = req.params.episode_id;

    const deletedEpisode = await AnimeEpisode.findOneAndDelete({ Anime_id: animeId, Episode_id: episodeId });

    if (!deletedEpisode) return res.status(404).json({ message: 'Tập không tồn tại' });
    res.json({ message: 'Xóa tập thành công' });
}

export const addUser = async (req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
}

export const updatedUser = async (req, res) => {
    const updatedUser = await User.findOneAndUpdate({ user_id: req.params.user_id }, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User không tồn tại' });
    res.json(updatedUser);
}

export const deletedUser = async (req, res) => {
    const deletedUser = await User.findOneAndDelete({ user_id: req.params.user_id });
    if (!deletedUser) return res.status(404).json({ message: 'User không tồn tại' });
    res.json({ message: 'Xóa thành công' });
}
