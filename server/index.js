const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3001;
const routes = require('./routes');
const db = require('./models/index');

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(routes);

(async function bootstrap() {
  await db.sequelize
    .sync()
    .then(() => console.log('Database connected🔥🔥🔥🔥'));
  app.listen(PORT, () => {
    console.log('🔥🔥🔥🔥server is running on port ' + PORT);
  });
})();
