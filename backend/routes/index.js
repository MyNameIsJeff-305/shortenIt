const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

const { Link } = require('../db/models');

// Redirect route for shortened links
router.get('/:shortLink', async (req, res) => {
  const { shortLink } = req.params;

  console.log(shortLink, "THIS IS THE LINK");

  try {
    // Find the original URL associated with the short link
    const link = await Link.findOne({ where: { shortLink } });

    if (link) {
      // Redirect to the original URL
      res.redirect(link.link);
    } else {
      // If the short link is not found, return a 404 error
      res.status(404).send('Link not found');
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
}

module.exports = router;