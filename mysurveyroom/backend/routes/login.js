const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    res.send(200);
});

module.exports = router;
