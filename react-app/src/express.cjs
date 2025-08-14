// express.cjs
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/mnb', (req, res)=>{
    res.send('<fruit>apple</fruit>');
});

app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});
