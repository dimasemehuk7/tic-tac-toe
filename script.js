const GRID_SIZE = 15;
const X_TYPE = 'X';
const O_TYPE = 'O';
const MINIMUM_LENGTH_FOR_WIN = 5;
let winnerExists = false;
let isX = true;

const grid = document.querySelector('#grid');
const gridBody = document.createElement('tbody');
grid.appendChild(gridBody);

const playAgainBtn = document.querySelector('#playAgainBtn');

playAgainBtn.addEventListener('click', function (event) {
    const tdElements = document.querySelectorAll('td');
    for (let i = 0; i < tdElements.length; i++) {
       tdElements[i].innerHTML = '';
    }
    winnerExists = false;
    isX = true;
});

for (let r = 0; r < GRID_SIZE; r++) {
    const tr = createRow(r);
    for (let c = 0; c < GRID_SIZE; c++) {
        tr.appendChild(createCell(r, c, onCellClick));
    }
    gridBody.appendChild(tr);
}

function onCellClick(event) {
    if (winnerExists) {
        return;
    }
    const cell = event.currentTarget;
    if (cell.innerHTML) {
        return;
    }
    const elem = isX ? createX() : createO();
    cell.appendChild(elem);
    const winnerLine = getWinnerLine(cell);
    if (winnerLine) {
        winnerExists = true;
        const currentSymbolType = isX ? X_TYPE : O_TYPE;
        setTimeout( function () {
            highlightWinnerLine(winnerLine);
            showAlert(currentSymbolType + ' win!!!');
        }, 0)
    }
    isX = !isX;
}

function getWinnerLine(currentCell) {

    const verticalLine = getVerticalLine(currentCell);
    if (verticalLine.length >= MINIMUM_LENGTH_FOR_WIN) {
        return verticalLine;
    }

    const horizontalLine = getHorizontalLine(currentCell);
    if (horizontalLine.length >= MINIMUM_LENGTH_FOR_WIN) {
        return horizontalLine;
    }

    const leftDiagonalLine = getLeftDiagonalLine(currentCell);
    if (leftDiagonalLine.length >= MINIMUM_LENGTH_FOR_WIN) {
        return leftDiagonalLine;
    }

    const rightDiagonalLine = getRightDiagonalLine(currentCell);
    if (rightDiagonalLine.length >= MINIMUM_LENGTH_FOR_WIN) {
        return rightDiagonalLine;
    }

    function getRightDiagonalLine(currentCell) {
        const currentElem = currentCell.firstChild;
        const type = currentElem.getAttribute('type');
        const result = [currentElem];
        let row = currentCell.getAttribute('r');
        let col = currentCell.getAttribute('c');
        while (++col < GRID_SIZE && --row >= 0) {
            const elem = findElemByCoords(row, col);
            if (elem && type === elem.getAttribute('type')) {
                result.push(elem);
                continue;
            }
            break;
        }
        row = currentCell.getAttribute('r');
        col = currentCell.getAttribute('c');
        while (--col >= 0 && ++row < GRID_SIZE) {
            const elem = findElemByCoords(row, col);
            if (elem && type === elem.getAttribute('type')) {
                result.push(elem);
                continue;
            }
            break;
        }
        return result;
    }

    function getLeftDiagonalLine(currentCell) {
        const currentElem = currentCell.firstChild;
        const type = currentElem.getAttribute('type');
        const result = [currentElem];
        let row = currentCell.getAttribute('r');
        let col = currentCell.getAttribute('c');
        while (--col >= 0 && --row >= 0) {
            const elem = findElemByCoords(row, col);
            if (elem && type === elem.getAttribute('type')) {
                result.push(elem);
                continue;
            }
            break;
        }
        row = currentCell.getAttribute('r');
        col = currentCell.getAttribute('c');
        while (++col < GRID_SIZE && ++row < GRID_SIZE) {
            const elem = findElemByCoords(row, col);
            if (elem && type === elem.getAttribute('type')) {
                result.push(elem);
                continue;
            }
            break;
        }
        return result;
    }

    function getHorizontalLine(currentCell) {
        const currentElem = currentCell.firstChild;
        const type = currentElem.getAttribute('type');
        const result = [currentElem];
        let row = currentCell.getAttribute('r');
        let col = currentCell.getAttribute('c');
        while (--col >= 0) {
            const elem = findElemByCoords(row, col);
            if (elem && type === elem.getAttribute('type')) {
                result.push(elem);
                continue;
            }
            break;
        }
        col = currentCell.getAttribute('c');
        while (++col < GRID_SIZE) {
            const elem = findElemByCoords(row, col);
            if (elem && type === elem.getAttribute('type')) {
                result.push(elem);
                continue;
            }
            break;
        }
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
            }
            break;
        }
        row = currentCell.getAttribute('r');
        while (++row < GRID_SIZE) {
            const elem = findElemByCoords(row, col);
            if (elem && type === elem.getAttribute('type')) {
                result.push(elem);
                continue;
            }
            break;
        }
        return result;
    }
}

function highlightWinnerLine(winnerLine) {
    for (let i = 0; i < winnerLine.length; i++) {
        const elem = winnerLine[i];
        elem.classList.add('winner');
    }
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
    xElement.setAttribute('type', X_TYPE);
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
    oElement.setAttribute('type', O_TYPE);
    oElement.classList.add("elementO");
    return oElement;
}