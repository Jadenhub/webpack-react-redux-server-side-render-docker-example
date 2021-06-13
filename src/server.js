import express from 'express';
import { SERVER_PORT } from './constants/serverEev';
import render from './helpers/renderHtml';
import routes from './pages/api';

const app = express();

app.use(express.static('public'));

app.use('/api', routes);

app.get('*', async (req, res) => {
  const html = await render(req);
  res.send(html);
});

app.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});