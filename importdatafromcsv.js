/** csv file
a,b,c
1,2,3
4,5,6
*/
const csv = require('csvtojson')

const csvFilePath = './countrycostdata.csv'

exports.getdata = async() => {
// Async / await usage
  const jsonArray = await csv().fromFile(csvFilePath);
  return jsonArray;
};
