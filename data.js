const importdatafromcsv = require('./importdatafromcsv');
const cityApiService = require('./cityApiService');


// import data from csv
let getTrainingData = async function() {
    let csvdata = await importdatafromcsv.getdata();
    //console.log(csvdata);
    let res = await cityApiService.getdata(csvdata);
    return res; 
}

getTrainingData();