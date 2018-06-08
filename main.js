
const { NeuralNetwork } = require('brainjs');
const data = require("./data");
const _ = require('lodash');

var net = new NeuralNetwork;

data.getTrainingData().then((data) =>{
    //console.log(trainingData);
    
    // From https://thecodebarbarian.com/building-a-wine-tasting-neural-network-with-node-js.html
    const numTrainingData = 1000; // reduces the amount of data points
    
    const trainingData = data.
    slice(0, numTrainingData). // this cuts the data to use only numTrainingData in the training array
        map(obj => ({ // map to format for brainjs {input: {x} output: {y}}
            input: _.omit(obj, ['Location'], ['AVERAGE of Cost Per Day CAD'], ['code']),
            output: _.pick(obj, ['AVERAGE of Cost Per Day CAD'])
        }));


    console.log(trainingData[0]);
    // let's TRAIN!!
    console.log('done training', net.train(trainingData));
    // Test with Malaysia
    var output = net.run({ 'COUNTA of City': 10, population: 31000000, GDP: 296000000000});
    console.log(output);
}).catch(err => {console.log(err)});

