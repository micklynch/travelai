const importdatafromcsv = require('./importdatafromcsv');
const cityApiService = require('./cityApiService');


// import data from csv
let getTrainingData = function() {
    return new Promise (resolve => {
        importdatafromcsv.getdata()
        .then((datafromcsv) => {
            let res = cityApiService.getdata(datafromcsv);
            resolve(res);
        })
        .catch(err => { console.log(err); }
        );
});
}
// add population from API service


// convert to brainjs format

getTrainingData().then((data) =>
{
    console.log(data)
});