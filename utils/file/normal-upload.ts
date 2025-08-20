import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "./public/temporary-files"); // Specify the destination folder
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Specify the filename
  },
});

const nonbufferupload = multer({ storage: storage });

export { nonbufferupload };
