
const net = require("brainjs");
const data = require("./data");
const _ = require('lodash');

var mymodel = new net.NeuralNetwork();

// var colordata = [{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
//          {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
//          {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}];

// mymodel.train(colordata);
// var output = mymodel.run(colordata[1].input);

// mymodel.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
//     {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
//     {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);

// var output = mymodel.run({ r: 1, g: 0.4, b: 0 });
data.getTrainingData()
    .then((data => {
        // **TODO** need to split between input and output
        mymodel.train({input: {data}, output: {data}}); 
    }))
    .catch((err) => console.log(err)
    );

var output = mymodel.run("peter"); // 

console.log(output);

// From https://thecodebarbarian.com/building-a-wine-tasting-neural-network-with-node-js.html
// const net = new NeuralNetwork();
// const numTrainingData = 1000;

// const trainingData = data.
//   slice(0, numTrainingData).
//   map(obj => ({
//     input: _.omit(obj, ['quality']),
//     output: _.pick(obj, ['quality'])
//   }));

// console.log(trainingData[0]);

// console.log('done training', net.train(trainingData));