import jwt from "next-auth/jwt";
import { getSession } from "next-auth/client";
import multer from "multer";
import nextConnect from "next-connect";

const secret = process.env.JWT_KEY;

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  // Handle any other HTTP method
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
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
