import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";



dotenv.config();
const app = express();
app.use(cors());

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

app.use(express.json());
const PORT=process.env.PORT || 5000;

app.use("/api/auth",authRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/feedback",feedbackRoutes);




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


