const importdatafromcsv = require('./importdatafromcsv');
const cityApiService = require('./cityApiService');


// import data from csv
let getTrainingData = function() {
    return importdatafromcsv.getdata()
        .then((datafromcsv) => {
            return cityApiService.getdata(datafromcsv);
        })
        .then((dataFromApi) => {
            //console.log(dataFromApi);
        })
        .catch(err => { console.log(err); }
        );

        return dataFromApi;
}
// add population from API service


// convert to brainjs format

getTrainingData().then((data) =>
{
//console.log(data)
});