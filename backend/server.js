const express = require("express");
const dotenv = require("dotenv");
const logger = require("pino")();
const mongoose = require("mongoose");
const cors = require("cors");
const expressSession = require("express-session");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Import routes to here
const userRoutes = require("./routes/userManageRoutes");
const storeRoutes = require("./routes/storeRoutes");
const seasonalRoutes = require("./routes/seasonalRoutes");


const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


//s3 creds connected through IAM accesskeys
const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAUO3N424F5DAOFC7T",
    secretAccessKey: "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",
  },
});

app.use(express.json());
app.set("trust proxy", 1);
const sessSettings = expressSession({
  path: "/",
  secret: "oursecret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: false,
    secure: false,
    maxAge: 360000,
  },
});

app.use(sessSettings);
const PORT = process.env.PORT || 8000;


//connected mongodb database to store and retrieve data
mongoose.connect("mongodb+srv://admin:admin@cluster0.kwxp2rq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  logger.info(" Mongodb connected successfully");
});

app.get("/", (req, res) => {
  res.status(200).json({ messsage: "Server is running!" });
});


//Connected with s3 through API from Frontend to backend
app.get("/presigned-url", async (req, res) => {
  try {
    const { filename, contentType } = req.query;

    if (!filename || !contentType) {
      return res.status(400).json({ error: "filename and contentType required" });
    }

    const key = `uploads/${Date.now()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: "agriconnect-uploads",
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

    res.json({
      uploadUrl,
      fileUrl: `https://agriconnect-uploads.s3.us-east-1.amazonaws.com/${key}`,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
});

// Implement the routes from here
app.use("/api/users", userRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/seasonal", seasonalRoutes);


app.listen(PORT, () => {
  logger.info(`Server is running on PORT: ${PORT}`);
});
