const express = require('express');
const cors = require('cors');
const RoomModel = require('../modles/room');

const app = express();
const router = express.Router();

const corsOptions = {
    origin: 'http://localhost:3000'
}

router.post('/createGame', cors(corsOptions), async (req, res, next) => {
    
})