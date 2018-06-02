var http = require('http');

exports.getdata = function (data)
{
    getCountryStats(splitCitiesAndCountries(data));
    
    return data;
}


function splitCitiesAndCountries(data){
    //console.log(data);
    let splitdata = data.map(cityCountry => {
        let splitcity = cityCountry.Location.split(',');
        // create the new array
        return {city:  splitcity[0],
                country: splitcity[1],
                'AVERAGE of Cost Per Day CAD': cityCountry['AVERAGE of Cost Per Day CAD'],
                'COUNTA of City': cityCountry['COUNTA of City']
        }; 

    });

    //data.push({name: 'John', age: '23'})
    return splitdata;
}

function getCountryStats(data) {

    //data.forEach(place => {
        //console.log(place.country);
        http.get('http://api.worldbank.org/v2/countries/br', (body) => {
            console.log(body);
    });
    //});
}