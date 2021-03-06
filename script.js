let learningRate = 0.01;
let range = 5;
let recipe = [3, 4, 4, 7];
let activations = activationsMatrix(recipe);
let errors = copyArray(activations).slice(1);
let weights = weightsMatrix(recipe);
let deltaWeights = resetArray(copyArray(weights));
let bias = biasMatrix(recipe);
let data = [
  [-4, -9, 10],
  [99, 100, 100],
  [95, 94, 95],
  [140, -4, 0],
  [4, 42, 106],
  [220, 120, 20],
  [-10, 35, 12],
  [27, 32, 35],
];
let answers = [0, 1, 1, 2, 3, 4, 5, 6, 6];



function run(data, answer){
  //Plug in the input values------------------------------
  for (let i = 0; i < activations[0].length; i++){
    activations[0][i] = data[i];
  }

  //Calculate activations for the entire network----------
  for (let i = 1; i < activations.length; i++){
    activations[i] = multiplyMatrixByVector(weights[i - 1], activations[i - 1]);
    for (let j = 0; j < activations[i].length; j++){
      activations[i][j] = sigmoid(getArraySum(activations[i][j]) - bias[i - 1][j]);
    }
  }

  //Calculate errors for the entire network---------------
  //activations has an item more at the beginning---------
  for (let i = 0; i < errors[errors.length - 1].length; i++){
    errors[errors.length - 1][i] = ((answer == i ? 1 : 0)
    - activations[errors.length][i]);
  }


for (let i = 0; i < deltaWeights[deltaWeights.length -1].length; i++){
  for (let j = 0; j < deltaWeights[deltaWeights.length - 1][i].length; j++){
    deltaWeights[deltaWeights.length - 1][i][j] = errors[errors.length - 1][i]
    * activations[errors.length - 1][j] * learningRate;
    console.log(deltaWeights[deltaWeights.length - 1][i][j].toFixed(40));
  }
}


}

function getArraySum(a){
  let sum = 0;
  for (let i = 0; i < a.length; i++){
    sum += a[i];
  }
  return sum;
}

function resetArray(a){
  let result = [];
  for (let i = 0; i < a.length; i++){
    result.push(a[i].constructor === Array ? resetArray(a[i]) : 0);
  }
  return result;
}

function copyArray(a){
  let copy = [];
  for (let i = 0; i < a.length; i++){
    copy.push((a[i].constructor === Array) ? copyArray(a[i]) : a[i]);
  }
  return copy;
}

function multiplyMatrixByVector(matrix, vector){
  let result = [];
  for (let i = 0; i < matrix.length; i++){
    result.push(multiplyVectors(matrix[i], vector));
  }
  return result;
}

function multiplyVectors(a, b){
  let result = [];
  for (let i = 0; i < a.length; i++){
    result.push(a[i] * b[i]);
  }
  return result;
}


function biasMatrix(recipe) {
  let bias = [];
  for (let i = 1; i < recipe.length; i++){
    let column = [];
    for (let j = 0; j < recipe[i]; j++){
      column.push(random(0, 50));
    }
    bias.push(column)
  }
  return bias;
}



function activationsMatrix(recipe){
  let activations = [];
  for (let i = 0; i < recipe.length; i++){
    let column = [];
    for (let j = 0; j < recipe[i]; j++){
      column.push(0);
    }
    activations.push(column);
  }
  return activations;
}

function weightsMatrix(recipe) {
  let weights = [];
  for (let i = 1; i < recipe.length; i++){
    let columnWeights = [];
    for (let j = 0; j < recipe[i]; j++){
      let neuronWeights = [];
      for (let k = 0; k < recipe[i - 1]; k++){
        neuronWeights.push(random(-range, range));
      }
      columnWeights.push(neuronWeights);
    }
    weights.push(columnWeights);
  }
  return weights;
}

function random(l, r){
  let range = r - l + 1;
  let n = Math.floor(Math.random() * range);
  return n + l;
}

function sigmoid(n) {
  return ( 1/(1 + Math.E ** (-n)) );
}
