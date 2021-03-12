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
        

        .post((req,res) => {
            let comparisonResults = await new comparePdf()
            .actualPdfFile("Actual.pdf")
            .baselinePdfFile("Baseline.pdf")
            .compare();
        expect(comparisonResults.status).to.equal("passed");
        res.send('POST request successful!')
        }
        );

    
}

export default routes;
