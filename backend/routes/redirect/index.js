const { Link, Click } = require('../../db/models');

const router = require('express').Router();

const { restoreUser } = require("../../utils/auth.js");

router.get('/redirect/:shortLink', async (req, res) => {
    const { shortLink } = req.params;
    try {
        // Find the link based on the short link
        const link = await Link.findOne({ where: { shortLink } });

        if (link) {
            // Increment click count
            await Click.create({ linkId: link.id });
            // Redirect to the original URL
            res.redirect(link.link);
        } else {
            res.status(404).send('Link not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;