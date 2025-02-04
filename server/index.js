// dotenv
require("dotenv").config();

// import
const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// openai
const { analyzeUserInput } = require("./lib/openai");

// rate limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
});

// express
const app = express();

// middleware
app.use(morgan("dev"));
app.use(limiter);
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// dependency injection
const createAIResult = (analyze) => {
  return async (req, res) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }

      const result = await analyze(text);

      res.status(200).json({ message: result });
    } catch (err) {
      if (res.statusCode === 429) {
        res.status(429).json({ message: "Too many requests" });
      } else {
        res.status(500).json({ message: "Sorry, something went wrong" });
      }
    }
  };
};

// routes
app.post("/v1/ai", createAIResult(analyzeUserInput));

// listen
app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
