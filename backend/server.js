const express = require("express");
const dotenv = require("dotenv");
const logger = require("pino")();
const mongoose = require("mongoose");
const cors = require("cors");
// const eventModel = require('./models/eventsModel')
// const loanModel=require('./models/LoansModel')
// const RegistereventModel=require('./models/RegistereventModel')
const expressSession = require("express-session");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Import routes to here
const userRoutes = require("./routes/userManageRoutes");
const storeRoutes = require("./routes/storeRoutes");
// const labRoutes = require("./routes/labRoutes");
// const wholesaleRoutes = require("./routes/wholesaleRoutes");
// const CompanyRequest = require("./routes/Pr_companyRoutes");
// const eventRoutes = require("./routes/eventRoutes");
// const loanRoutes = require("./routes/loanRoutes");
// const RegistereventRoutes =require("./routes/RegistereventRoutes");
// const courseRoutes = require("./routes/courseRoutes");
// const AdsRoutes = require("./routes/AdsRoutes");
// const HealthCareAppointmentRoutes = require("./routes/HealthCareAppointmentRoutes");
// const CandidateRoutes = require("./routes/CandidateRoutes");
// const ApplyforVacancyRoutes = require("./routes/ApplyforVacancyRoutes");
// const ApplyforGuidanceRoutes = require("./routes/ApplyforGuidanceRoutes");
// const AddVacanciesRoutes = require("./routes/AddVacanciesRoutes");
// const AddGuidanceProgramsRoutes = require("./routes/AddGuidanceProgramsRoutes");
// const  CourseFeedbackRoutes=require("./routes/CourseFeedbackRoutes")
//const labRoutes = require("./routes/labRoutes.js");

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
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

    res.json({
      uploadUrl,
      fileUrl: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
});

// Implement the routes from here
app.use("/api/users", userRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/Addevent",require("./routes/eventRoutes"));
app.use("/api/Addloan",require("./routes/loanRoutes"));
app.use("/api/RegisterEvent",require("./routes/RegistereventRoutes"));


// app.use("/api/lab", labRoutes);
// app.use("/api/wholesale", wholesaleRoutes);
// app.use("/api/companyRequest", CompanyRequest);
// app.use("/api/lab", labRoutes);
// app.use("/api/app", HealthCareAppointmentRoutes);

// Health Care Appointments
// app.use("/api/app", require("./routes/HealthCareAppointmentRoutes"));
// app.use("/api/Addevent", require("./routes/eventRoutes"));
// app.use("/api/course", require("./routes/courseRoutes"));
// app.use("/api/cfeedback", require("./routes/CourseFeedbackRoutes"));


app.use("/api/Ads", require("./routes/AdsRoutes"));
app.use("/api/Applyvacancies", require("./routes/ApplyforVacancyRoutes"));
app.use("/api/Applyguidances", require("./routes/ApplyforGuidanceRoutes"));
app.use("/api/AddVacancies", require("./routes/AddVacanciesRoutes"));
app.use("/api/AddGuidances", require("./routes/AddGuidanceProgramsRoutes"));
app.use("/api/Candidate", require("./routes/CandidateRoutes"));

app.listen(PORT, () => {
  logger.info(`Server is running on PORT: ${PORT}`);
});
