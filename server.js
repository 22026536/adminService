import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv';
import express, { json } from 'express';
import mongoose from 'mongoose';
import routerAdmin from './src/routes/adminRouter.js';


dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const app = express();


app.use(cors({
  origin: 'https://animetangobackend.onrender.com', // Chỉ định frontend được phép
  methods: '*', // Cho phép các phương thức GET và POST
}));

app.use(express.urlencoded({ extended: true }));
app.use(json());
app.set('trust proxy', 1);
app.use(cookieParser());
app.use('/admin', routerAdmin);

// Kết nối MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 29999, // Tăng thời gian chờ lên 30 giây
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
