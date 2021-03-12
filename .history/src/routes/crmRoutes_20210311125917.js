import comparePdf from 'compare-pdf';
import fileUpload from 'express-fileUpload';
// app.use(fileUpload)
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
                let result = compareFromApi('baselinePdfFile','actualPdfFile')
                // let result = compare()
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
    movetoServer('baselinePdfs',baseline);
    movetoServer('actualPdfs',test)

    let comparisonResults =  new comparePdf();
    console.log(baseline)

    await comparisonResults.actualPdfFile()
    .baselinePdfFile()
    .compare();
    console.log(comparisonResults)
    return comparisonResults;
};

function movetoServer(location, file){
    req.files[file].mv('/data/'+location+'/'+file+'.pdf', function(err){
        if (err) {
            console.log(err);
        }
    })

};


export default routes;


