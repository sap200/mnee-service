import mnee from '../config/mnee.js';

// This function will be called by the route
export const getMneeConfig = async (req, res) => {
  try {
    const mneeConfig = await mnee.config();
    res.json(mneeConfig);
  } catch (err) {
    console.error('Error fetching MNEE config:', err);
    res.status(500).json({ error: err.message });
  }
};

export const createTransferAndPoll = async (req, res) => {
  try {
    const { wif, recipientAddress, amount } = req.body;

    if (!wif || !recipientAddress || !amount) {
      return res.status(400).json({
        error: 'Missing wif, recipientAddress, or amount'
      });
    }

    console.log("Passed stage 1", wif, recipientAddress, amount);

    const recipients = [{ address: recipientAddress, amount }];
    console.log("Recipients-stage", recipients);

    // STEP 1️⃣ Initiate transfer
    const response = await mnee.transfer(recipients, wif);
    const ticketId = response.ticketId;

    console.log('Transfer initiated, Ticket ID:', ticketId);

    // STEP 2️⃣ Polling configuration
    const initialDelay = 10_000; // ⏳ first poll after 10 seconds
    const pollInterval = 5_000;  // 🔁 every 5 seconds
    const maxAttempts = 60;      // ⏱ max ~5 minutes
    let attempts = 0;

    const pollStatus = async () => {
      attempts++;

      try {
        const statusResponse = await mnee.getTxStatus(ticketId);
        const status = statusResponse.status;

        console.log(`Polling attempt ${attempts}, status:`, status);

        // ✅ Final states
        if (status === 'SUCCESS' || status === 'FAILED' || status === 'MINED') {
          return res.json({
            ticketId,
            finalStatus: status,
            details: statusResponse
          });
        }

      } catch (err) {
        console.error('Error polling transfer status:', err);
      }

      // 🔁 Continue polling if not finished
      if (attempts < maxAttempts) {
        setTimeout(pollStatus, pollInterval);
      } else {
        return res.status(408).json({
          error: 'Polling timeout',
          ticketId
        });
      }
    };

    // ⏳ START polling after 10 seconds
    setTimeout(pollStatus, initialDelay);

  } catch (err) {
    console.error('Error creating transfer:', err);
    res.status(500).json({ error: err.message });
  }
};


  export const getMneeBalance = async (req, res) => {
    try {
      const { address } = req.params; // address comes from the path variable
  
      if (!address) {
        return res.status(400).json({ error: 'Address is required' });
      }
  
      const balance = await mnee.balance(address);
      res.json(balance); // include the address for clarity
    } catch (err) {
      console.error('Error fetching MNEE balance:', err);
      res.status(500).json({ error: err.message });
    }
  };
  
  
  export const getMneeRecentTxnHistory = async (req, res) => {
    try {
      const { address } = req.params; // address comes from the path variable
  
      if (!address) {
        return res.status(400).json({ error: 'Address is required' });
      }
  
      const txnHistory = await mnee.recentTxHistory(address);
      txnHistory.history.forEach(item => {
        item.humanAmount = mnee.fromAtomicAmount(item.amount);
      })
      res.json(txnHistory); // include the address for clarity
    } catch (err) {
      console.error('Error fetching MNEE balance:', err);
      res.status(500).json({ error: err.message });
    }
  };