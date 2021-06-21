import jwt from "next-auth/jwt";
import { getSession } from "next-auth/client";
import multer from "multer";
import nextConnect from "next-connect";
import { v4 as uuid } from "uuid";

// https://ichi.pro/es/subir-archivos-a-next-js-con-rutas-api-144709963121712

const secret = process.env.JWT_KEY;

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
      const extension = file.originalname.match(/\.[0-9a-z]+$/i);

      return cb(null, `${uuid()}${extension && extension.length > 0 && extension[0]}`);
    },
  }),
});

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.single("image");

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post((req, res) => {
  console.log("file", req.file);

  res.status(200).json(req.file);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
