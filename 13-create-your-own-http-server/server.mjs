import 'dotenv/config';

import app from './app.js';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localost:${port}`)
});