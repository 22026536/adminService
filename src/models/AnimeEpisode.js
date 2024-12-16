import mongoose from 'mongoose';

const animeEpisodeScheme = new mongoose.Schema({
    Episode_id: { type: Number, require: true, unique: true , index: true},
    Anime_id: { type: Number, required: true, index: true },
    Name: { type: String, required: true },
    Episode: { type: Number, require: true },
    UrlLink: { type: String },
    Aired: {type: Date}
}, {
    collection: 'AnimeEpisode' // Định rõ tên collection
  });

import AutoIncrementFactory from 'mongoose-sequence';

// Khởi tạo AutoIncrement plugin
const AutoIncrement = AutoIncrementFactory(mongoose);
animeEpisodeScheme.plugin(AutoIncrement, { inc_field: 'Episode_id' });

export default mongoose.model('AnimeEpisode', animeEpisodeScheme);