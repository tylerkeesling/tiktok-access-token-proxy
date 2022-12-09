import express from 'express'
import fetch from 'node-fetch'

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const tikTokEndpoint = 'https://open-api.tiktok.com/oauth/access_token';

app.post('/tiktok/token', async (req, res) => {
  const params = new URLSearchParams({
    client_key: req.body.client_id,
    client_secret: req.body.client_secret,
    code: req.body.code,
    grant_type: 'authorization_code',
  }).toString();

  const url = `${tikTokEndpoint}?${params}`;
  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();

  res.json(data.data);
});

app.listen(3333);