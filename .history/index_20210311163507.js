import express from 'express';
import routes from './src/routes/crmRoutes.js';
import * as fileUpload from 'express-fileUpload';


const app = express();
const PORT = 4000;

app.use(fileUpload);
routes(app);

app.get('/', (req, res) =>
    res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);