// router.ts
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Rota principal');
});

export default router;
