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
                 movetoServer('baselinePdfs',req.files.baselinePdfFile);
                 movetoServer('actualPdfs',req.files.actualPdfFile)
                
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
    await comparisonResults.actualPdfFile()
    .baselinePdfFile()
    .compare();
    return comparisonResults;
};


async function movetoServer(location, file){
    file.mv(process.cwd()+'/data/'+location+'/'+file.name+'.pdf', function(err){
        if (err) {
            console.log(err);
        }
    })

};


export default routes;


