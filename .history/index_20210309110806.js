import express from 'express';
import routes from './src/routes/crmRoutes.js';


const app = express();
const PORT = 4000;



routes(app);
app.use(multerObj)



app.get('/', (req, res) =>
    res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);