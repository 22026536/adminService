// Import các thư viện cần thiết
import express from 'express';
import Anime from './models/Anime.js';
import AnimeEpisode from './models/AnimeEpisode.js';
import User from './models/User.js';

const router = express.Router();

// 1. Thêm Anime
router.post('/anime', async (req, res) => {
    const anime = new Anime(req.body);
    const savedAnime = await anime.save();
    res.json(savedAnime);
});

// 2. Sửa Anime
router.put('/anime/:anime_id',async (req, res) => {
    const updatedAnime = await Anime.findOneAndUpdate({ Anime_id: req.params.anime_id }, req.body, { new: true });
    if (!updatedAnime) return res.status(404).json({ message: 'Anime không tồn tại' });
    res.json(updatedAnime);
});

// 3. Xóa Anime
router.delete('/anime/:anime_id', async (req, res) => {
    const deletedAnime = await Anime.findOneAndDelete({ Anime_id: req.params.anime_id });
    if (!deletedAnime) return res.status(404).json({ message: 'Anime không tồn tại' });
    res.json({ message: 'Xóa thành công' });
});

// 4. Thêm tập mới cho Anime và cập nhật thời gian ra tập mới nhất
router.post('/anime/:anime_id/episode', async (req, res) => {
    const animeId = req.params.anime_id;

    // Tạo tập mới
    const newEpisode = new AnimeEpisode({ ...req.body, Anime_id: animeId });
    const savedEpisode = await newEpisode.save();

    // Cập nhật thời gian ra tập mới nhất của Anime
    await Anime.findOneAndUpdate({Anime_id : animeId}, { LastestEpisodeAired: savedEpisode.Aired });

    res.json(savedEpisode);
});

// 5. Thêm User
router.post('/user', async (req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
});

// 6. Sửa User
router.put('/user/:user_id', async (req, res) => {
    const updatedUser = await User.findOneAndUpdate({ user_id: req.params.user_id }, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User không tồn tại' });
    res.json(updatedUser);
});

// 7. Xóa User
router.delete('/user/:user_id', async (req, res) => {
    const deletedUser = await User.findOneAndDelete({ user_id: req.params.user_id });
    if (!deletedUser) return res.status(404).json({ message: 'User không tồn tại' });
    res.json({ message: 'Xóa thành công' });
});

export default router;
