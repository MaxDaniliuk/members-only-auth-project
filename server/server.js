require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

const sessionConfig = require("./config/session");
const initializePassport = require("./config/passport");

const PORT = process.env.PORT;
const app = express();

const allowedOrigins = process.env.ORIGIN.split(",");
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api", postRoutes);

app.use((err, req, res, next) => {
  console.log("Global epxress error-handler", err);
  res.status(500).json({
    errors: null,
    message: err.message || "Something went wrong and procedure failed.",
    user: null,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
