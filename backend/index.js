// sudo systemctl status mongod
// sudo systemctl start mongod

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const registerRouter = require('./Router/Register');
const loginRouter = require('./Router/Login');
// const ProtectedRouter = require('./Router/ProtectedRoute');
const authenticateToken = require('./middleware/auth');
const productRouter = require('./Router/Products');
const SingleProductRouter = require('./Router/SingleProduct');

const PORT = 3001;
const app = express()
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    credentials:true
}))
app.use(cookieParser())


mongoose.connect("mongodb://localhost:27017/air_asia")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Use the register router
app.use('/register', registerRouter);
app.use('/login',loginRouter)
// app.use('/home', authenticateToken,homeRouter);
// app.use('/booking', authenticateToken,ProtectedRouter);
app.use('/products', productRouter);
app.use('/singleproduct',SingleProductRouter);

app.get('/authenticate', authenticateToken, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});


app.post('/logout', authenticateToken, async (req, res) => {
    try {
      res.clearCookie("token", { path: '/' });
      console.log("Logout successful");
      return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      console.error("Error during logout:", err);
      res.status(500).json({ message: 'Error during logout'});
    }
  });

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error." });
});

app.listen(PORT,()=>{
    console.log("running...",{PORT});
})