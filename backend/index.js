import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup - allow frontend URL from env or fallback to localhost for dev
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Get absolute path to frontend build directory using process.cwd()
const frontendBuildPath = path.join(process.cwd(), "frontend", "dist");

// Serve React build static files
app.use(express.static(frontendBuildPath));

// Catch-all to serve index.html for React Router support
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Listen and connect DB
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
