const express = require('express');
const eventsService = require('../services/events.service');
const router = express.Router();
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); 

router.get('/', async (req, res) => {
    const events = await eventsService.getEvents(req.query.name, req.query.active);
    res.status(200).json(events);
});

router.post('/', upload.single('image'), async (req, res) => {

    let { name, description, active, date, theme } = req.body;

    // Validate required fields
    if (!name || !description || !date) {
        return res.status(400).json({ error: 'Request must contain "name", "description" and "date"' });
    }
    let eventDate;
    try {
        const splitDate = date.split('-');
        eventDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
    } catch (e) {
        console.error(e);
        return res.status(400).json({ error: 'Invalid date format. Must be DD-MM-YYYY' });
    }
    // parse values
    active = active === 'true';
    theme = parseInt(theme);

    // get the image file from the request
    const image = req.file;

    try {
        const event = await eventsService.createEvent(name, description, active, eventDate, theme, image);
        res.status(201).json(event);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }

});

router.get('/:id', async (req, res) => {

    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Request must contain "id"' });
    }

    const event = await eventsService.getEventById(id);
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
});

router.put('/:id', upload.single('image'), async (req, res) => {

    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Request must contain "id"' });
    }

    let { name, description, active, date, themeId } = req.body;

    let eventDate;
    try {
        const splitDate = date.split('-');
        eventDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);

        
    } catch (e) {
        return res.status(400).json({ error: 'Invalid date format. Must be DD-MM-YYYY' });
    }
    // parse values
    active = active === 'true';
    themeId = parseInt(themeId);

    
    const image = req.file;
    const event = await eventsService.updateEvent(id, name, description, active, eventDate, themeId, image);
    res.status(200).json(event);
});

router.delete('/:id', async (req, res) => {
    const event = await eventsService.deleteEvent(req.params.id);
    res.status(200).json(event);
});

router.get('/:id/multimedia', async (req, res) => {
    
        const eventId = req.params.id;
        if (!eventId || isNaN(eventId)) {
            return res.status(400).json({ error: 'Request must contain valid "id"' });
        }
    
        const multimedia = await eventsService.getMultimediaForEvent(eventId);
        res.status(200).json(multimedia);
});

router.post('/:id/multimedia', async (req, res) => {

    const eventId = req.params.id;
    if (!eventId || isNaN(eventId)) {
        return res.status(400).json({ error: 'Request must contain valid "id"' });
    }

    const {multimediaId, iconClass, isCarrousel, sortingOrder} = req.body;

    if (!multimediaId || isCarrousel === undefined) {
        return res.status(400).json({ error: 'Request must contain "multimediaId", and "isCarrousel"' });
    }

    const multimedia = await eventsService.addMultimediaForEvent(eventId, multimediaId, iconClass, isCarrousel, sortingOrder);

    res.status(201).json(multimedia);


});

router.delete('/:id/multimedia', async (req, res) => {

    const eventId = req.params.id;
    if (!eventId || isNaN(eventId)) {
        return res.status(400).json({ error: 'Request must contain valid "id"' });
    }

    const multimediaId = req.body.multimediaId;
    if (!multimediaId || isNaN(multimediaId)) {
        return res.status(400).json({ error: 'Request must contain valid "multimediaId"' });
    }

    const multimedia = await eventsService.deleteMultimediaFromEvent(eventId, multimediaId);

    res.status(200).json(multimedia);

});

module.exports = router;