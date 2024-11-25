const { Link, Click } = require('../../db/models/index.js');

const router = require('express').Router();

const { restoreUser } = require("../../utils/auth.js");

// Redirect to the original link
router.get('/:shortLink', async (req, res) => {
    try {
        const shortLink = req.params.shortLink;
        const link = await Link.findOne({
            where: {
                shortLink: shortLink
            }
        });

        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        await Click.create({
            linkId: link.id
        });

        return res.json(link.link);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;