import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("customer related routes called");
});

export default router;
