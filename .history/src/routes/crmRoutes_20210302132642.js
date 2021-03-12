import comparePdf from 'compare-pdf';

const routes = (app) => {
    app.route('/pixelCompare')
        .get((req,res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, (req,res, next) => {
            res.send('GET request successful!');
        })
        

        .post((req,res) =>  {
             compare();
           
        res.send('POST request successful!')
        }
        );

    
}

async function compare(){
    let comparisonResults =  new comparePdf()
    .actualPdfFile("src/data/Actual.pdf")
    .baselinePdfFile("src/data/Baseline.pdf")
    .compare();
console.log(comparisonResults);
};

export default routes;
