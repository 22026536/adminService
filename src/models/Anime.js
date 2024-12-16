import mongoose from 'mongoose';

const animeSchema = new mongoose.Schema({
  Anime_id	:{ type: Number, required: true, unique: true , index: true},
  Name: { type: String, required: true },
  English_Name: { type: String, required: true },
  Score: { type: Number, required: true },
  Genres : [{ type: String, required: true }],
  Synopsis: { type: String, required: true },
  Type : { type: String, required: true },
  Episodes: [{ type: String, required: true }],
  Aired: { type: String, required: true },
  Status: { type: String, required: true },
  Producers: { type: String, required: true },
  Licensors: { type: String, required: true },
  Studios: { type: String, required: true },
  Source: { type: String, required: true },
  Duration: { type: String, required: true },
  Old: { type: String, required: true },
  Favorites: { type: Number, required: true  },
  Scored_By: { type: Number, required: true  },
  Member: { type: Number, required: true  },
  Image_URL:{ type: String, required: true  },
  JanpaneseLevel: {type: String, required: true},
  LastestEpisodeAired: {type: Date, required: true}
}, {
  collection: 'Anime' // Định rõ tên collection
});

import AutoIncrementFactory from 'mongoose-sequence';

// Khởi tạo AutoIncrement plugin
const AutoIncrement = AutoIncrementFactory(mongoose);
animeSchema.plugin(AutoIncrement, { inc_field: 'Anime_id' });

export default mongoose.model('Anime', animeSchema);