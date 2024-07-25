const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/roll-dice', (req, res) => {
    const { bet, amount } = req.body;
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const sum = dice1 + dice2;
    let payout = 0;

    if ((bet === 'less_than_7' && sum < 7) || (bet === 'greater_than_7' && sum > 7)) {
        payout = amount * 2;
    } else if (bet === 'equal_to_7' && sum === 7) {
        payout = amount * 3;
    }

    res.json({ sum, payout });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
