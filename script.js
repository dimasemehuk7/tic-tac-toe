const grid = document.querySelector('#grid');
const gridBody = document.createElement('tbody');
grid.appendChild(gridBody);

const gridSize = 10;
const xType = 'X';
const oType = 'O';

for (let r = 0; r < gridSize; r++) {
    const tr = createRow(r);
    for (let c = 0; c < gridSize; c++) {
        tr.appendChild(createCell(r, c, onCellClick));
    }
    gridBody.appendChild(tr);
}

let isX = true;

function onCellClick(event) {
    const cell = event.currentTarget;
    if (cell.innerHTML) {
        return;
    }
console.log(cell);
    const elem = isX ? createX() : createO();
    cell.appendChild(elem);
    const winnerLine = getWinnerLine(cell, isX); // null | array with 5 or more elements
    if (winnerLine) {
        highlightWinnerLine(winnerLine);
        showAlert((isX ? 'X' : 'O') + ' win!!!');
    }
    isX = !isX;
}


function getWinnerLine(currentCell, isX) {
    const verticalLine = getVerticalLine(currentCell);
    if (verticalLine.length >= 5) {
        return verticalLine;
    }

    const horizontalLine = getHorizontalLine(currentCell); // getHorizontalLine всегда возвращает массив. Либо с одним элементом либо больше
    if (horizontalLine.length >= 5) {
        return horizontalLine;
    }

   // TODO найти левую и парвую диагональ
    return null;

    function getHorizontalLine() {
        const result = [currentCell.firstChild];
        // TODO нйдет все элементы по горизонтали
        return result;
    }

    function getVerticalLine(currentCell) {
        const currentSymbol = currentCell.firstChild;
        const type = currentSymbol.getAttribute('type');
        const result = [currentSymbol];
        let row = currentCell.getAttribute('r');
        let col = currentCell.getAttribute('c');
        while (--row >= 0) {
            const elem = findElemByCoords(row, col);
            if (elem && type === elem.getAttribute('type')) {
                result.push(elem);
                continue;
            };
            break;
        }
        row = currentCell.getAttribute('r');
        while (++row < gridSize) {
            const elem = findElemByCoords(row, col);
            if (elem && type === elem.getAttribute('type')) {
                result.push(elem);
                continue;
            };
            break;
        }
        return result;
    }
}

function highlightWinnerLine() {

}

function showAlert(message) {
    alert(message);
}

function findElemByCoords(row, col) {
    const selector = `td[r='${row}'][c='${col}']`;
    const cell = document.querySelector(selector);
    return cell.firstChild;
}

function createCell(rowIndex, colIndex, clickListener) {
    const td = document.createElement("td");
    td.setAttribute('r', rowIndex);
    td.setAttribute('c', colIndex);
    td.addEventListener('click', clickListener);
    return td;
}

function createRow(rowIndex) {
    const tr = document.createElement('tr');
    tr.classList.add('grid-row');
    tr.setAttribute('row', rowIndex);
    return tr;
}

function createX() {
    const xElement = document.createElement("div");
    xElement.setAttribute('type', xType);
    xElement.classList.add("elementX");
    const lineY = document.createElement("div");
    lineY.classList.add("line-y");
    const lineX = document.createElement("div");
    lineX.classList.add("line-x");
    xElement.appendChild(lineY);
    xElement.appendChild(lineX);
    return xElement;
}

function createO() {
    const oElement = document.createElement("div");
    oElement.setAttribute('type', oType);
    oElement.classList.add("elementO");
    return oElement;
}