let lines = 0
let columns = 0

let matrix = []

let step = 0

let multipliers = []

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

            numInput.style = "height: 50px; width: 50px; text-align: center;"
            numInput.name = "line" + i + "column" + j;
            numInput.id = "line" + i + "column" + j;

            if(numInput.id === "line0column0") {
                dataElement.innerHTML = ""
            } else if(numInput.id === "line0column" + j) {
                dataElement.innerHTML = "Coluna " + j
            } else if (numInput.id === "line" + i + "column0") {
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
    matrix = []
    let aux = []

    for (let i = 1; i <= lines; i++) {
        aux = []

        for(let j = 1; j <= columns; j++) {
            aux.push(parseFloat(document.getElementById(`line${i}column${j}`).value))
        }

        matrix.push(aux)
    }
}

function calcMatrix() {
    getMatrixValues()

    multipliers = []

    /* Não pode ser zero */
    let firstTerm = matrix[0][0]
    
    /* Aux = matrixLine */
    for(let i = 1; i < lines; i++) {
        let aux = matrix[i]

        let multiplier = aux[0]/firstTerm

        multipliers.push(multiplier)

        let newLine = []

        console.log(aux)
        console.log(multipliers)
        console.log(firstTerm)
        
        for(let j = 0; j < columns; j++) {
            newLine.push(aux[j] - multipliers[i - 1]*firstTerm)

            console.log(newLine)
        }
    }
}