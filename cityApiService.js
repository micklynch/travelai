const https = require('https');
const http = require('http');
const _ = require('lodash');

exports.getdata =  (data) => {
    
     const pArray = data.map(async(entry) => {
        let splitcity = entry.Location.split(',');
        let city = splitcity[0].replace(/\s/g, ''); // regex to remove spaces
        let country = splitcity[1].replace(/\s/g, '');

        const countrystats = await getCountryStats(country); 
        const worldBankData = await getCountryFinances(countrystats.code);
        const res = _.assign(countrystats, worldBankData); 
        
        return res;
    })
    Promise.all(pArray).then(completed => {
        console.log(completed);
        return completed;
    });
}

function getCountryFinances(countrycode) {

    // e.g. http://api.worldbank.org/v2/countries/TH/indicators/NY.GDP.MKTP.CD?date=2015&format=JSON

    let url = 'http://api.worldbank.org/v2/countries/'+countrycode+'/indicators/NY.GDP.MKTP.CD?date=2015&format=JSON';
    return new Promise(resolve => {
        http.get(url, (response) => {
            var body = '';
            response.setEncoding('utf8')
            response.on('data', (d) => {
                body += d;
            });
            response.on('end', () => {
                let worldBankData = getWorldBankData(body);
                resolve(worldBankData);
            })
            response.on('error', console.error)
        });
    });
}

function getWorldBankData(json) {
    let itemArray = JSON.parse(json)[1];
    item = itemArray[0];
    return { 'GDP': item.value };
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