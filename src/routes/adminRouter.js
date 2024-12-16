// Import các thư viện cần thiết
import express from 'express';
import { addAnime, addEpisode, addUser, deletedAnime, deletedEpisode, deletedUser, getAnime, getUser, getUserByName, updatedAnime, updatedEpisode, updatedUser } from '../controllers';

const router = express.Router();

// 1. Thêm Anime
router.post('/anime', addAnime);

// 2. Sửa Anime
router.put('/anime/:anime_id',updatedAnime);

// 3. Xóa Anime
router.delete('/anime/:anime_id', deletedAnime);

// 4. Thêm tập mới cho Anime và cập nhật thời gian ra tập mới nhất
router.post('/anime/:anime_id/episode', addEpisode);
// 4.1. Sửa tập Anime
router.put('/anime/:anime_id/episode/:episode_id', updatedEpisode);

// 4.2. Xóa tập Anime
router.delete('/anime/:anime_id/episode/:episode_id', deletedEpisode);

// 5. Thêm User
router.post('/user', addUser);

// 6. Sửa User
router.put('/user/:user_id', updatedUser);

// 7. Xóa User
router.delete('/user/:user_id', deletedUser);

// 12. Lấy toàn bộ User
router.get('/user', getUser);

// 14. Tìm User bằng tên
router.get('/user/search/:name', getUserByName);

// 11. Lấy toàn bộ Anime
router.get('/anime', getAnime);

export default router;
