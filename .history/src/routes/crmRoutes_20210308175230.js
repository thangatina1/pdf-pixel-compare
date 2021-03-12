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
                let result = compare()
                if(result){
                    resolve(result)
                }
                else{
                    reject('Error')
                }
            }, req , res)
            .then(value => {
                console.log(value)
                res.send(value)
                console.log('Print after promise resolved')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            });
           
           
            
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
