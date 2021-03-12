import comparePdf from 'compare-pdf';
import fileUpload from 'express-fileUpload';

const routes = (app) => {
    app.use(fileUpload)
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
            console.log(req) 
            new Promise((resolve,reject)=>{
                // let result = compareFromApi(req.files.baselinePdfFile,req.files.actualPdfFile)
                let result = compare()
                if(result){
                    resolve(result)
                }
                else{
                    reject('Error')
                }
            }, req , res)
            .then(value => {
                res.send(value)
            })
            .catch(err => {
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
async function compareFromApi(baseline, test){
    let comparisonResults =  new comparePdf();
    console.log(baseline)

    await comparisonResults.actualPdfFile(baseline)
    .baselinePdfFile(test)
    .compare();
    console.log(comparisonResults)
    return comparisonResults;
};
export default routes;


