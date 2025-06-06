const express = require('express');
const cors = require('cors');
const MultimediaRouter = require('./controllers/multimedias.controller');
const TagsRouter = require('./controllers/tags.controller');
const EventsRouter = require('./controllers/events.controller');
const ThemesRouter = require('./controllers/themes.controller');
const MultimediaTypesRouter = require('./controllers/multimediaTypes.controller');
require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();
const path = require('path');

// Handle cors a lo maldita sea
app.use(cors());

// change all routes to routes without ApiKiosco prefix when working locally
app.use(express.json());
app.use("/ApiKiosco", express.static(path.join(__dirname, "public")));
app.use("/ApiKiosco/multimedias", MultimediaRouter);
app.use("/ApiKiosco/tags", TagsRouter);
app.use("/ApiKiosco/events", EventsRouter);
app.use("/ApiKiosco/themes", ThemesRouter);
app.use("/ApiKiosco/multimedia-types", MultimediaTypesRouter);


app.listen(port, () => {
    console.log('Server is running on port:' + port);
});

