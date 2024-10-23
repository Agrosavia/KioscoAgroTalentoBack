const express = require('express');
const multer = require('multer');
const multimediaService = require('../services/multimedias.service');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); 

// GET all multimedia items
router.get('/', async (req, res) => {
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    const fetchRelated = req.query.fetchRelated === 'true';
    const multimedias = await multimediaService.getMultimedias(req.query.tipoMultimedia, req.query.url, req.query.iconClass, tags, fetchRelated);
    if (multimedias.length === 0) {
        return res.status(204).send();
    }

    res.status(200).json(multimedias);
});

// POST a new multimedia item with file upload
router.post('/', upload.single('file'), async (req, res) => {
    const { multimediaType, url, name } = req.body;
    const tags = req.body.tags ? req.body.tags.split(',') : [];

    // Validate required fields
    if (!multimediaType || !name) {
        return res.status(400).json({ error: 'Request must contain "multimediaType", "name" and "iconClass"' });
    }
    if (multimediaType === 'YOUTUBE_VIDEO' && !url) {
        return res.status(400).json({ error: 'Request must contain url for tipoMultimedia "YOUTUBE_VIDEO"' });
    }

    try {
        // Pass the file to the service for uploading and creating the multimedia item
        const multimedia = await multimediaService.createMultimedia(name, multimediaType, tags, url, req.file);

        // Return the created multimedia item
        res.status(201).json(multimedia);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GET a multimedia item by ID
router.get('/:id', async (req, res) => {

    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Request must contain "id"' });
    }
    
    const multimedia = await multimediaService.getMultimediaById(+req.params.id);
    if (!multimedia) {
        return res.status(404).json({ error: 'Multimedia not found' });
    }
    res.status(200).json(multimedia);
});

// PUT update a multimedia item by ID
router.put('/:id', upload.single('file'), async (req, res) => {

    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Request must contain "id"' });
    }
    const { name, tipoMultimedia, url, iconClass } = req.body;
    const tags = req.body.tags ? req.body.tags.split(',') : [];

    try {
        const multimedia = await multimediaService.updateMultimedia(+req.params.id, name, tipoMultimedia, url, iconClass, tags);
        if (!multimedia) {
            return res.status(404).json({ error: 'Multimedia not found' });
        }
        res.status(200).json(multimedia);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a multimedia item by ID
router.delete('/:id', async (req, res) => {

    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Request must contain "id"' });
    }

    const multimedia = await multimediaService.deleteMultimedia(+req.params.id);
    if (!multimedia) {
        return res.status(404).json({ error: 'Multimedia not found' });
    }
    res.status(204).send();
});

module.exports = router;
