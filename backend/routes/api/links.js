const express = require('express');
const { Link, Click } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const crypto = require('crypto');

const router = express.Router();

//Function for generating a random short link
const generateShortLink = () => {
    return `${crypto.randomBytes(3).toString('hex')}`;
};

// Get All Links created by the authenticated User
router.get('/', requireAuth, async (req, res) => {
    try {
        const userId = parseInt(req.user.id);

        const links = await Link.findAll({
            where: {
                userId: userId
            }
        });

        return res.json(links);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get the details of a specific link
router.get('/:id', requireAuth, async (req, res) => {
    try {
        const userId = parseInt(req.user.id);
        const link = await Link.findOne({
            where: {
                id: req.params.id,
                userId: userId
            }
        });
        
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        const clicks = await Click.findAll({
            where: {
                linkId: link.id
            }
        });

        console.log(link, "THIS IS LINK")

        return res.json({
            id: link.id,
            name: link.name,
            link: link.link,
            shortLink: link.shortLink,
            clicks: clicks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new link
router.post('/', requireAuth, async (req, res) => {
    try {
        const { name, link } = req.body;
        const userId = parseInt(req.user.id);

        const newLink = await Link.create({
            name: name,
            link: link,
            shortLink: generateShortLink(),
            userId: userId
        });

        return res.json(newLink);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a link
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const link = await Link.findByPk(req.params.id);
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        const { title, url } = req.body;
        link.title = title;
        link.url = url;

        await link.save();

        return res.json(link);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a link
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const link = await Link.findByPk(req.params.id);
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        await link.destroy();

        return res.json({ message: 'Link deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;