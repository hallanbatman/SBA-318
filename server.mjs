// Imports
import express from "express";
import userRoutes from "./routes/userRoutes.mjs";
import titleRoutes from "./routes/titleRoutes.mjs";
import contentRoutes from './routes/contentRoutes.mjs';
import { error } from "./utilities/error.mjs";

// Setups
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/titles", titleRoutes);
app.use("/api/contents", contentRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  res.status(500).json({ msg: "❌ Error - " + (err.message || "Server error") });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
