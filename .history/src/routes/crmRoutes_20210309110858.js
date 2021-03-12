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
            //Get the Files from the Request
            console.dir(req.files);
            // let baselineFile = req.files.baselinePdfFile
            // let tetFile = req.files.actualPdfFile

            //Modify the Compare method to take the files from the request

            //Request must have the option to mask and Skip

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

    await comparisonResults.actualPdfFile(baseline)
    .baselinePdfFile(test)
    .compare();
    // console.log(comparisonResults)
    return comparisonResults;
};
export default routes;


