import express from 'express';
import cors from 'cors';
import router from './routes.js';

const api = express();
api.use(cors());
api.use(express.json());
api.use(router);

api.listen('3001', () => console.log("API on!"));
