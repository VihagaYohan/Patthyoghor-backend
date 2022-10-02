const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
//const fileUpload = require('express-fileupload')
const path = require('path')
const ErrorHandler = require("./Middleware/Error");

// load env files
dotenv.config({ path: "./config/config.env" });

const corsOptions = {
  origin: "http://localhost:5000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// import DB connection
const connectDB = require("./Config/db");
connectDB();

// routes
const auth = require('./Routes/Auth')
const categories = require("./Routes/Categories");
const authors = require('./Routes/Author')
const books = require('./Routes/Books')
const orders = require('./Routes/Orders')

const app = express();
app.use(cors());
// body pharser
app.use(express.json());

// file uploading
//app.use(fileUpload())

// set static folder
app.use(express.static(path.join(__dirname,'public')))

// initialize routes
app.use("/api/categories", categories);
app.use('/api/authors',authors)
app.use('/api/auth',auth)
app.use('/api/books',books)
app.use('/api/orders',orders)


app.use(ErrorHandler);
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`Error : ${error.message}`.red.bold);

  // close server and exit process
  server.close(() => process.exit(1));
});
