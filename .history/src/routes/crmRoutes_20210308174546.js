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
            
            new Promise((resolve,reject)=>{
                let result = await compare()
                if(result){
                    resolve(result)
                }
                else{
                    reject('Error')
                }
            })
            .then(value => {
                console.log(value)
            })
            .catch(err => {
                console.log(err)
            });
            res.send('Completed')
            console.log('Print after promise resolved')
            
        }
        
        );

    
}

async function compare(){
    let comparisonResults =  new comparePdf();

    await comparisonResults.actualPdfFile("Actual.pdf")
    .baselinePdfFile("Baseline.pdf")
    .compare();
    // console.log(comparisonResults)
    return comparisonResults;
};

export default routes;
