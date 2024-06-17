import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(req.file);

    cb(null, Date.now() + "-" + file.originalname + ".png");
  },
});
export const upload = multer({ storage: storage });