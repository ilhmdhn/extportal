require("dotenv").config();
const express = require('express');
const sequelize = require('./src/lib/db');
const auth = require('./src/lib/auth');
const path = require('path');

const loginRouter = require('./src/routes/login_router');
const userRouter = require('./src/routes/user_router');
const attendanceRouter = require('./src/routes/attendance_router');
const toolsRouter = require('./src/routes/tools_router');

const app = express();
const PORT = process.env.PORT || 3000;

const storageDir = path.join(__dirname, 'uploads');
app.use('/storage', express.static(storageDir, {
  index: false,           // jangan tampilkan listing directory
  dotfiles: 'ignore',     // abaikan file dot (.+)
  maxAge: '1d'            // cache client 1 hari
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(loginRouter);
app.use('/tools',toolsRouter);

app.use('/user',auth, userRouter);
app.use('/attendance',auth, attendanceRouter);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});