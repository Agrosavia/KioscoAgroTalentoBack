const express = require('express');
const tagsService = require('../services/tags.service');

const router = express.Router();

router.get('/', async (req, res) => {
    const tags = await tagsService.getTags(req.query.name);
    res.status(200).json(tags);
});

router.post('/', async (req, res) => {
    
    const { name, verboseName } = req.body;

    // Validate required fields
    if (!name || !verboseName) {
        return res.status(400).json({ error: 'Request must contain "name" and "verboseName"' });
    }

    try {
        const tag = await tagsService.createTag(name, verboseName);
        res.status(201).json(tag);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    
    const tag = await tagsService.deleteTag(req.params.id);
    res.status(200).json(tag);
});

router.get('/:id', async (req, res) => {
    const tag = await tagsService.getTagById(req.params.id);
    if (!tag) {
        return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json(tag);
});

router.put('/:id', async (req, res) => {
    const { name, verboseName } = req.body;
    const tag = await tagsService.updateTag(req.params.id, name, verboseName);
    res.status(200).json(tag);
});




module.exports = router;