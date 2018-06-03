const https = require('https');
const http = require('http');
const _ = require('lodash');

exports.getdata = async function (data)
{
    return new Promise(resolve => {
        let res = splitCitiesAndCountries(data);
        resolve(res);
    });
}


function splitCitiesAndCountries(data){
    //console.log(data);
    let fulldata = data.forEach(entry => {
        let splitcity = entry.Location.split(',');
        let city = splitcity[0].replace(/\s/g, ''); // regex to remove spaces
        let country = splitcity [1].replace(/\s/g, '');
        let fullentry = getCountryStats(country)
        .then((countrystats) => {
            return getCountryFinances(countrystats);
        }).catch (err => console.err(err))        
    });
    return fulldata;
}

function getCountryFinances(countrystats) {

    let url = 'http://api.worldbank.org/v2/countries/'+countrystats.code+'/indicators/NY.GDP.MKTP.CD?date=2015&format=JSON';
    return new Promise(resolve => {
        http.get(url, (response) => {
            var body = '';
            response.setEncoding('utf8')
            response.on('data', (d) => {
                body += d;
            });
            response.on('end', () => {
                let worldBankData = getWorldBankData(body);
                let fullresult = _.assign(countrystats, worldBankData);
                resolve(fullresult);
            })
            response.on('error', console.error)
        });
    });
}

function getWorldBankData(json) {
    let itemArray = JSON.parse(json)[1];
    for (let i in itemArray) {
        item = itemArray[i];
        return { 'GDP': item.value };
    }
}

function getCountryStats(country) {
    let url = 'https://restcountries.eu/rest/v2/name/';

    return new Promise(resolve => {
        https.get(url + country, (response) => {
            var body = '';
            response.setEncoding('utf8')
            response.on('data', (d) => {
                body += d;
            });
            response.on('end', () => {
                let result = JSON.parse(body);
                if (result.status === 404) {
                    return;
                }
                else {
                    resolve({
                        'code': result[0].alpha2Code,
                        'population': result[0].population
                    });
                }
            })
            response.on('error', console.error)
        });
    });
}