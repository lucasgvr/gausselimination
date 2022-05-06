let lines = 0
let columns = 0

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

            numInput.type = "number";
            numInput.name = "line" + i + "column" + j;
            numInput.id = "line" + i + "column" + j;

            dataElement.appendChild(numInput)

            rowElement.appendChild(dataElement)
        }

        matrixInputContainer.appendChild(rowElement )
    }
}