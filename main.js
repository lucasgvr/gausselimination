let lines = 0
let columns = 0

let matrixA = []
let matrixB = []

function addMatrix(){
    lines = 0
    columns = 0

    lines = document.getElementById("getLines").value;
    columns = document.getElementById("getColumns").value;

    let matrixInputContainer = document.getElementById("matrixInputContainer");

    while (matrixInputContainer.hasChildNodes()) {
        matrixInputContainer.removeChild(matrixInputContainer.lastChild);
    }

    for (let i = 0; i <= lines; i++) {
        const rowElement = document.createElement("tr")

        for(let j = 0; j <= columns; j++) {
            const dataElement = document.createElement("td")

            let numInput = document.createElement("input");

            numInput.style = "height: 60px; width: 60px; text-align: center;"
            numInput.name = "line" + i + "column" + j;
            numInput.id = "line" + i + "column" + j;

            if(numInput.id === "line0column0") {
                dataElement.innerHTML = ""
            } else if(numInput.id === `line0column${columns}`) {
                dataElement.innerHTML = "Resultado"
            } else if(numInput.id === "line0column" + j) {
                dataElement.innerHTML = "Coluna " + j
            } else if(numInput.id === "line" + i + "column0") {
                dataElement.innerHTML = "Linha " + i
            } else {
                dataElement.appendChild(numInput)
            }

            rowElement.appendChild(dataElement)
        }

        matrixInputContainer.appendChild(rowElement)
        matrixInputContainer.style = "border: 1px solid black; text-align: center; margin-left: auto; margin-right: auto;"
    }
}

function getMatrixValues() {
    matrixA = []
    matrixB = []

    let aux = []

    for (let i = 1; i <= lines; i++) {
        aux = []

        for(let j = 1; j <= columns; j++) {
            if(j == columns) {
                matrixB.push(parseFloat(document.getElementById(`line${i}column${j}`).value))
            } else {
                aux.push(parseFloat(document.getElementById(`line${i}column${j}`).value))
            }
        }

        matrixA.push(aux)
    }
}

function calculateMatrix(A, b) {
    let auxOne, auxTwo, auxThree, auxFour, auxFive

    for(auxThree = 0; auxThree < A.length - 1; auxThree++) {
        let max = Math.abs(A[auxThree][auxThree])
        let maxIndex = auxThree

        for(auxOne = auxThree + 1; auxOne < A.length; auxOne++) {
            if(max < Math.abs(A[auxOne][auxThree])) {
                max = Math.abs(A[auxOne][auxThree])
                maxIndex = auxOne
            }
        }

        if(maxIndex != auxThree) {
            for(auxTwo = 0; auxTwo < A.length; auxTwo++) {
                let temp = A[auxThree][auxTwo]
                A[auxThree][auxTwo] = A[maxIndex][auxTwo]
                A[maxIndex][auxTwo] = temp
            }

            let temp = b[auxThree]
            b[auxThree] = b[maxIndex]
            b[maxIndex] = temp
        }

        if(A[auxThree][auxThree] == 0) {
            return
        } else {
            for(auxFive = auxThree + 1; auxFive < A.length; auxFive++) {
                let F = -A[auxFive][auxThree] / A[auxThree][auxThree]
                A[auxFive][auxThree] = 0
                b[auxFive] = b[auxFive] + F * b[auxThree]

                for(auxFour = auxThree + 1; auxFour < A.length; auxFour++) {
                    A[auxFive][auxFour] = A[auxFive][auxFour] + F * A[auxThree][auxFour]
                }
            }
        }
    }

    let finalMatrix = []

    for(auxOne = A.length - 1; auxOne >= 0; auxOne--) {
        finalMatrix[auxOne] = b[auxOne]

        for(auxTwo = auxOne + 1; auxTwo < A.length; auxTwo++) {
            finalMatrix[auxOne] = finalMatrix[auxOne] - finalMatrix[auxTwo] * A[auxOne][auxTwo]
        }

        finalMatrix[auxOne] = finalMatrix[auxOne] / A[auxOne][auxOne]
    }

    let finalMatrixContainer = document.getElementById("finalMatrixContainer")

    while (finalMatrixContainer.hasChildNodes()) {
        finalMatrixContainer.removeChild(finalMatrixContainer.lastChild);
    }

    finalMatrixContainer.style = "border: 1px solid black; text-align: center; margin-left: auto; margin-right: auto; margin-top: 2rem; padding: 0.5rem;"
    finalMatrixContainer.innerHTML = finalMatrix
}

function calculateAll() {
    getMatrixValues()
    calculateMatrix(matrixA, matrixB)
}