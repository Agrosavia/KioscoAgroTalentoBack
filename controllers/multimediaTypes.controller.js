const express = require('express');
const multimediaTypeService = require('../services/multimediaType.service');

const router = express.Router();

// GET all multimedia types
router.get('/', async (req, res) => {
    const multimediaTypes = await multimediaTypeService.getMultimediaTypes();
    if (multimediaTypes.length === 0) {
        return res.status(204).send();
    }

    res.status(200).json(multimediaTypes);
});

router.get('/:id', async (req, res) => {
    const multimediaType = await multimediaTypeService.getMultimediaTypeById(req.params.id);
    if (!multimediaType) {
        return res.status(404).json({ error: 'Multimedia type not found' });
    }
    res.status(200).json(multimediaType);
});


module.exports = router;
