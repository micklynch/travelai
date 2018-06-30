const https = require('https');
const http = require('http');
const _ = require('lodash');

exports.getdata = async (data) => {    
    const pArray = data.map(async(entry) => { // look at each row in the file
        //split the city and country
        let splitcity = entry.Location.split(',');
        let city = splitcity[0].replace(/\s/g, ''); // regex to remove spaces
        let country = splitcity[1].replace(/\s/g, '');
        //get the country code and population from RESTCountriesAPI
        const countrystats = await getCountryStats(country); 
        // use the country code to get the GDP from World Bank
        const worldBankData = await getCountryFinances(countrystats.code);
        // combine the country code and GDP
        const res = _.assign(countrystats, worldBankData);        
        // return promise to new array
        return res;
    })
    // await for the promise to be fulfilled 
    return await Promise.all(pArray).then(completed => {
        return completed;
    });
}

let getCountryFinances = countrycode => {

    // e.g. http://api.worldbank.org/v2/countries/TH/indicators/NY.GDP.MKTP.CD?date=2015&format=JSON

    let url = 'http://api.worldbank.org/v2/countries/'+countrycode+'/indicators/NY.GDP.MKTP.CD?date=2015&format=JSON';
    return new Promise(resolve => {
        http.get(url, (response) => {
            let body = '';
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

let getWorldBankData = json => {
    let itemArray = JSON.parse(json)[1];
    item = itemArray[0];
    return { 'GDP': item.value };
}

let getCountryStats = country => {

    let url = 'https://restcountries.eu/rest/v2/name/';

    return new Promise(resolve => {
        https.get(url + country, (response) => {
            let body = '';
            response.setEncoding('utf8')
            response.on('data', (d) => {
                body += d;
            });
            response.on('end', () => {
                let result = JSON.parse(body);
                if (result.status === 404) {
                    console.log('Cannot get a response from the server for '+country)
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

exports.getCountryStats = getCountryStats;
