import express from 'express'
import fetch from 'node-fetch'

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const TIKTOK_ACCESS_TOKEN_ENDPOINT = 'https://open-api.tiktok.com/oauth/access_token';
const PORT = 3333;

app.post('/proxy/token', async (req, res) => {
  const params = new URLSearchParams({
    client_key: req.body.client_id,
    client_secret: req.body.client_secret,
    code: req.body.code,
    grant_type: 'authorization_code',
  }).toString();

  const url = `${TIKTOK_ACCESS_TOKEN_ENDPOINT}?${params}`;
  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();

  res.json(data.data);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));