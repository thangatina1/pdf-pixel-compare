import express from 'express';
import routes from './src/routes/crmRoutes.js';
import multer from 'multer';

const app = express();
const PORT = 4000;
// var multer = require('multer');

routes(app);
app.use(multer({dest:'./uploads/'}));

app.get('/', (req, res) =>
    res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);