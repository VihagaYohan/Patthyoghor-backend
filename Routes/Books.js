const express = require("express");
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  uploadBookImage,
} = require("../Controllers/Books");
const Auth = require("../Middleware/Auth");
const multer = require("multer");
const path = require("path");
const router = express.Router();

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage }); */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.route("/").get(Auth, getAllBooks).post(Auth, addBook);
router.route("/:id").get(Auth, getBookById).put(Auth, updateBook);
router.route("/upload").post(Auth, upload.single("image"), uploadBookImage);

module.exports = router;
