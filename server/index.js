const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3001;
const session = require('express-session');
const routes = require('./routes');
const db = require('./models/index');

// app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: 'secret',
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      // set value true in a production
      secure: false,
    },
  })
);
app.use(routes);

(async function bootstrap() {
  await db.sequelize
    .sync()
    .then(() => console.log('Database connected🔥🔥🔥🔥'));
  app.listen(PORT, () => {
    console.log('🔥🔥🔥🔥server is running on port ' + PORT);
  });
})();
