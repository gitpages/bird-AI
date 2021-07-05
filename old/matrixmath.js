class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        //MATRIX DE ZEROS;
        this.mInfo = [];
        for(let i = 0; i < this.rows; i++){
            this.mInfo[i] = [];
            for(let j = 0; j < this.cols; j++){
                this.mInfo[i][j] = 0;
            }
        }
        //
    }

    copy() {
        let m = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                m.mInfo[i][j] = this.mInfo[i][j]
            }
        }
        return m;
    }

    static transfArrayM(array) {
        let m = new Matrix(array.length, 1);
        for (let i = 0; i < array.length; i++) {
            m.mInfo[i][0] = array[i];
        }
        return m;
    }

    transfMatrixA() {
        let array = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                array.push(this.mInfo[i][j]);
            }
        }
        return array;
    }

    randomMatrix() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.mInfo[i][j] = floor(random() * 2 - 1);
            }
        }
    }

    static transp(a) {
        let c = new Matrix(a.cols, a.rows);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                c.mInfo[j][i] = a.mInfo[i][j];
            }
        }
        return c;
    }

    add(s) {
        if (s instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.mInfo[i][j] += s.mInfo[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.mInfo[i][j] += s;
                }
            }
        }
    }

    static sub(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            console.log('Rows and Columns must be equal');
            return undefined;
        }
        //sub c = A - B
        let c = new Matrix(a.rows, a.cols);
        for (let i = 0; i < c.rows; i++) {
            for (let j = 0; j < c.cols; j++) {
                c.mInfo[i][j] = a.mInfo[i][j] - b.mInfo[i][j];
            }
        }
        return c;
    }


    mult(s) {
        if (s instanceof Matrix) {
            //hadamard product
            for(let i = 0 ; i < this.rows; i++){
                for(let j = 0 ; j < this.cols; j++){
                    this.mInfo[i][j] *= s.mInfo[i][j]
                }
            }
        } else {
            //produto por escalar
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.mInfo[i][j] *= s;
                }
            }
        }
    }

    static mult(a, b) {
        if (a.cols !== b.rows) {
            console.log('Number of Columns of A must be equal to the number Rows of B');
            return undefined;
        }
        //multiplicando c = A x B
        let c = new Matrix(a.rows, b.cols);
        for (let i = 0; i < c.rows; i++) {
            for (let j = 0; j < c.cols; j++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.mInfo[i][k] * b.mInfo[k][j];
                }
                c.mInfo[i][j] = sum;
            }
        }
        return c;
    }

    addFunc(f) {
        //aplicar funcao para cada elemento
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let n = this.mInfo[i][j];
                this.mInfo[i][j] = f(n);
            }
        }
    }

    static addFunc(a, f) {
        //aplicar funcao para cada elemento
        let c = new Matrix(a.rows, a.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                let n = a.mInfo[i][j];
                c.mInfo[i][j] = f(n);
            }
        }
        return c;
    }


    show() {
        console.table(this.mInfo);
        return this;
    }



}
