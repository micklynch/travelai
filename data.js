const importdatafromcsv = require('./importdatafromcsv');
const apiService = require('./apiService');
const _ = require('lodash');

// import data from csv
exports.getTrainingData = async () => {

    // read original data
    let csvdata = await importdatafromcsv.getdata();

    // augment with data from APIs
    let apidata = await apiService.getdata(csvdata);

    //combine data
    let result = _.merge(csvdata, apidata);

    return await new Promise(resolve => {
        resolve(result);
    });
}