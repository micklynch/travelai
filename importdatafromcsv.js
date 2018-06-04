const csv = require('csvtojson')
const csvFilePath = './countrycostdata.csv'

exports.getdata = async() => {
// Async / await usage
  const jsonArray = await csv().fromFile(csvFilePath);
  
  // need to change array elements from strings to numbers
  let fixedArray = jsonArray.map(obj => {
    let updatedObj = obj;
    updatedObj['COUNTA of City'] = parseInt(obj['COUNTA of City'].replace( /[^0-9]/, '' ));
    updatedObj['AVERAGE of Cost Per Day CAD'] = parseInt(obj['AVERAGE of Cost Per Day CAD'].replace( /[^0-9]/, '' ));
    return updatedObj;
  })
  return fixedArray;
};
