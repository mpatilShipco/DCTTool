const { Tree } = require('js-decisiontree');
const trainingDataSet = [];
const config = {};
const DecisionTree = new Tree(config);
DecisionTree.train(trainingDataSet, config);
DecisionTree.predict(sample);

const DecisionTree = new Tree();
const trainingDataSet = [
    {"color":"blue", "shape":"square", "liked":false},
  	{"color":"red", "shape":"square", "liked":false},
  	{"color":"blue", "shape":"circle", "liked":true},
  	{"color":"red", "shape":"circle", "liked":true},
  	{"color":"blue", "shape":"hexagon", "liked":false},
  	{"color":"red", "shape":"hexagon", "liked":false},
  	{"color":"yellow", "shape":"hexagon", "liked":true},
  	{"color":"yellow", "shape":"circle", "liked":true}
];
const config = {
    className: 'liked',
    features: [ 'color', 'shape' ],
};
const sample = {"color":"blue", "shape":"hexagon", "liked":false }; 
DecisionTree.train(trainingDataSet, config);
const prediction = DecisionTree.predict(sample);
console.log("prediction:", prediction); // false