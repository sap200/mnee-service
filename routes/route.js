import express from 'express';
import { getMneeConfig, createTransferAndPoll, getMneeBalance, getMneeRecentTxnHistory } from '../controller/configController.js';

const router = express.Router();

// Map route to controller
router.get('/config', getMneeConfig);
router.post('/mnee-transfer', createTransferAndPoll);
router.get('/balance/:address', getMneeBalance)
router.get('/txn-history/:address', getMneeRecentTxnHistory)


export default router;
