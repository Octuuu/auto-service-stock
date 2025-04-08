const express = require('express');
const router = express.Router();
const {
  getAllMovements,
  createMovement
} = require('../controllers/stockController');

const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', getAllMovements);
router.post('/', createMovement);

module.exports = router;
