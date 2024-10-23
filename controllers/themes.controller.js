const express = require('express');
const themesService = require('../services/themes.service');
const router = express.Router();
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); 

router.get('/', async (req, res) => {
    const themes = await themesService.getThemes(req.query.name);
    res.status(200).json(themes);
}
);

router.post('/', upload.fields([{name: 'banner', maxCount: 1}, {name: 'background', maxCount: 1}, {name: 'logo', maxCount: 1}]), async (req, res) => {
    const { name, primaryColor, secondaryColor, tertiaryColor } = req.body;
    console.log(req.body);
    
    // Validate required fields
    if (!name || !primaryColor || !secondaryColor || !tertiaryColor) {
        return res.status(400).json({ error: 'Request must contain "name", "primaryColor", "secondaryColor", "tertiaryColor", "banner" and "background"' });
    }
    const banner = req.files.banner ? req.files.banner[0] : null;
    const background = req.files.background ? req.files.background[0] : null;
    const logo = req.files.logo ? req.files.logo[0] : null;

    try {
        const theme = await themesService.createTheme(name, primaryColor, secondaryColor, tertiaryColor, banner, background, logo);
        res.status(201).json(theme);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }

}
);

router.get('/:id', upload.fields([{name: 'banner', maxCount: 1}, {name: 'background', maxCount: 1}, {name: 'logo', maxCount: 1}]), async (req, res) => {
    const theme = await themesService.getThemeById(req.params.id);
    if (!theme) {
        return res.status(404).json({ error: 'Theme not found' });
    }
    res.status(200).json(theme);
}
);

router.put('/:id', upload.fields([{name: 'banner', maxCount: 1}, {name: 'background', maxCount: 1}, {name: 'logo', maxCount: 1}]), async (req, res) => {
    const { name, primaryColor, secondaryColor, tertiaryColor } = req.body;
    const banner = req.files.banner ? req.files.banner[0] : null;
    const background = req.files.background ? req.files.background[0] : null;
    const logo = req.files.logo ? req.files.logo[0] : null;
    const theme = await themesService.updateTheme(req.params.id, name, primaryColor, secondaryColor, tertiaryColor, banner, background, logo);
    res.status(200).json(theme);
}
);

router.delete('/:id', async (req, res) => {
    const theme = await themesService.deleteTheme(req.params.id);
    res.status(200).json(theme);
}
);

module.exports = router;