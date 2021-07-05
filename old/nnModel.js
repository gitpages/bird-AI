class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);

class NeuralNetworkModel {
    constructor(inpNum, hidNum, outNum) {
        if(inpNum instanceof NeuralNetworkModel){
            let a = inpNum;

            this.inpNum = a.inpNum;
            this.hidNum = a.inpNum;
            this.outNum = a.outNum;

            this.ihWeights = a.ihWeights.copy();
            this.hoWeights = a.hoWeights.copy();

            this.hBias = a.hBias.copy();
            this.oBias = a.oBias.copy();
        } else {
            this.inpNum = inpNum;
            this.hidNum = inpNum;
            this.outNum = outNum;

            //presta atenção nessa linha e coluna aqui
            this.ihWeights = new Matrix(this.hidNum, this.inpNum);
            this.hoWeights = new Matrix(this.outNum, this.hidNum);
            //
            this.ihWeights.randomMatrix();
            this.hoWeights.randomMatrix();

            this.hBias = new Matrix(this.hidNum, 1);
            this.oBias = new Matrix(this.outNum, 1);
            this.hBias.randomMatrix();
            this.oBias.randomMatrix();
        }

        this.setLearningRate();
        this.setActivationFunction();
    }

    feedForward(inputArray) {

        let input = Matrix.transfArrayM(inputArray);
        let hidden = Matrix.mult(this.ihWeights, input);
        hidden.add(this.hBias);
        hidden.addFunc(this.activation_function.func);

        let output = Matrix.mult(this.hoWeights, hidden);
        output.add(this.oBias);
        output.addFunc(this.activation_function.func);

        return output.transfMatrixA();

    }

    setLearningRate(learning_rate = 0.1) {
        this.lr = learning_rate;
    }

    setActivationFunction(func = sigmoid) {
        this.activation_function = func;
    }

    train(inputArray, expectedOutArray) {
    ///feed forward
        let input = Matrix.transfArrayM(inputArray);
        let hidden = Matrix.mult(this.ihWeights, input);
        hidden.add(this.hBias);
        hidden.addFunc(this.activation_function.func);

        let output = Matrix.mult(this.hoWeights, hidden);
        output.add(this.oBias);
        output.addFunc(this.activation_function.func);
        //

    ///train
        let expectedOut = Matrix.transfArrayM(expectedOutArray);

        ///output error;
        let outError = Matrix.sub(expectedOut, output);

        ////gradient
        let gradient = Matrix.addFunc(output, this.activation_function.dfunc);
        gradient.mult(outError);
        gradient.mult(this.lr);

        ////delta
        let hidT = Matrix.transp(hidden);
        let hoWeightsDeltas = Matrix.mult(gradient, hidT)

        //Ajustando pesos e bias
        this.hoWeights.add(hoWeightsDeltas);
        this.oBias.add(gradient);

        ///hidden error;
        ///usar um looping para adicionar mais layers;
        ///cuidado a matriz dos pesos para o backpropagation é a transposta da usada no feedForward
        let hoWeightsT = Matrix.transp(this.hoWeights);
        let hidError = Matrix.mult(hoWeightsT, outError);

        ////gradient
        let hGradient = Matrix.addFunc(hidden, this.activation_function.dfunc);
        hGradient.mult(hidError);
        hGradient.mult(this.lr);

        ////delta
        let inpT = Matrix.transp(input);
        let ihWeightsDeltas = Matrix.mult(hGradient, inpT);

        //ajustando pesos e bias
        this.ihWeights.add(ihWeightsDeltas);
        this.hBias.add(hGradient);
    }

    copy(){
        return new NeuralNetworkModel(this);
    }

    mutate(rate){
        function mutate(val) {
            if (Math.random() < rate) {
                return val + randomGaussian(0, 0.1);
            } else {
                return val;
            }
        }
        this.ihWeights.addFunc(mutate);
        this.hoWeights.addFunc(mutate);
        this.hBias.addFunc(mutate);
        this.oBias.addFunc(mutate);
    }



}
