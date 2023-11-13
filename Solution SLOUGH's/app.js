
let tableA = document.getElementById("table-a")
let tableB = document.getElementById("table-b")

let resultGauss = document.getElementById("resultGauss")
let resultZeidel = document.getElementById("resultZeidel")

let btn = document.getElementById("btn")


let matrixAValues = [
	[2, -1, 0],
	[2, 5, 1],
	[2, 1, -4]
]

let matrixBValues = [-5, 2, -7]


function createArrayAndDisplayMatrix(inputArray, table) {
	var arr = []

	// Создаем таблицу

	for (var i = 0; i < inputArray.length; i++) {
		var row = table.insertRow()

		arr[i] = []

		for (var j = 0; j < inputArray[i].length; j++) {
			// Создаем input для ввода значения
			var input = document.createElement("input")
			input.type = "text"
			input.id = "input_" + i + "_" + j
			input.value = inputArray[i][j] // Устанавливаем значение из предварительно известного массива

			// Добавляем обработчик события для отслеживания изменений в input
			input.addEventListener("input", function (event) {
				// Получаем индексы ячейки из id элемента input
				var indices = event.target.id.split("_")
				var rowIndex = parseInt(indices[1])
				var colIndex = parseInt(indices[2])

				// Записываем значение в массив
				arr[rowIndex][colIndex] = parseFloat(event.target.value)
			})

			// Добавляем input в ячейку
			var cell = row.insertCell()
			cell.appendChild(input)

			// Заполняем ячейку массива
			arr[i][j] = inputArray[i][j]
		}
	}

	// Вставляем таблицу в body
	document.querySelector(`.block__matrix-a`).appendChild(table)

	return arr
}
function createArrayAndDisplayArray(inputArray, table) {
	var arr = []

	var row = table.insertRow()

	for (var i = 0; i < inputArray.length; i++) {
		// Создаем input для ввода значения
		var input = document.createElement("input")
		input.type = "text"
		input.id = "input_" + i
		input.value = inputArray[i] // Устанавливаем значение из предварительно известного массива

		// Добавляем обработчик события для отслеживания изменений в input
		input.addEventListener("input", function (event) {
			// Получаем индекс ячейки из id элемента input
			var index = parseInt(event.target.id.split("_")[1])

			// Записываем значение в массив
			arr[index] = parseFloat(event.target.value)
		})

		// Добавляем input в ячейку
		var cell = row.insertCell()
		cell.appendChild(input)

		// Заполняем массив
		arr[i] = inputArray[i]
	}

	// Вставляем таблицу в body
	document.querySelector(`.block__matrix-b`).appendChild(table)

	return arr
}

function logArray(array) {
	console.log("Измененный массив:", array)
}

btn.addEventListener("click", function () {
	let x = createZeroFilledArray2(myArrayB.length)
	let E = 0.01

	resultZeidel.innerHTML = `<p>${getZeidel(myArrayA, myArrayB, x, E)}</p>`
	resultGauss.innerHTML = `<p>${getGauss(myArrayA, myArrayB)}</p>`

	logArray(myArrayA)
})

function createZeroFilledArray(rows, cols) {
	let arr = []

	for (let i = 0; i < rows; i++) {
		arr[i] = []
		for (let j = 0; j < cols; j++) {
			arr[i][j] = 0
		}
	}

	return arr
}

function createZeroFilledArray2(length) {
	var arr = []

	for (var i = 0; i < length; i++) {
		arr[i] = 0
	}

	return arr
}


function getConvergense(cur, pre, size, E) {
	let difference = 0
	for (let row = 0; row < size; row++) {
		difference += (cur[row] - pre[row]) * (cur[row] - pre[row])
	}

	return Math.sqrt(difference) < E
}


function getZeidel(a, b, x, E) {
	let it = 0
	let n = a[0].length
	let m = a[1].length
	let tempx = createZeroFilledArray2(n)
	for (let i = 0; i < n; i++) {
		tempx[i] = x[i]
	}
	if (m >= n) {
		while (it < 100000) {
			for (let i = 0; i < n; i++) {
				let s1 = 0
				for (let j = 0; j < n; j++) {
					if (i != j) {
						s1 += x[j] * a[i][j]
					}
				}
				x[i] = (b[i] - s1) / a[i][i]
				it += 1
			}
			if (getConvergense(tempx, x, n, E)) {
				break
			}
			for (let i = 0; i < n; i++) {
				tempx[i] = x[i]
			}
		}
	}
	let answer = ''
	for (let i = 0; i < x.length; ++i) {
		answer += "x" + i + " = " + x[i] + "\n"
	}
	return answer
}

function getGauss(matrixA, matrixB) {
	let rows = matrixA[0].length
	let columns = matrixA[1].length + 1
	let extMatrix = createZeroFilledArray(rows, columns)
	for (let j = 0; j < columns - 1; ++j) {
		for (let i = 0; i < rows; ++i) {
			extMatrix[i][j] = matrixA[i][j]
		}
	}

	for (let i = 0; i < rows; ++i) {
		extMatrix[i][columns - 1] = matrixB[i]
	}
	let v
	for (let q = 0; q < rows; q++) {
		v = extMatrix[q][q]
		for (let k = 0; k < columns; k++)
			extMatrix[q][k] /= v
		//обнуляем числа под единицами главной диагoнали
		for (let i = q + 1; i < rows; i++) {
			v = extMatrix[i][q]
			for (let k = q; k < columns; k++)
				extMatrix[i][k] = extMatrix[i][k] - extMatrix[q][k] * v
		}
	}
	for (let q = 0; q < rows; q++)
		for (let i = 0; i < (rows - 1) - q; i++) {
			v = extMatrix[i][(columns - 1) - q - 1]
			for (let k = columns - 1 - q - 1; k < columns; k++)
				extMatrix[i][k] = extMatrix[i][k] - extMatrix[(rows - 1) - q][k] * v
		}

	let answer = ''
	for (let i = 0; i < rows; i++) {
		answer += "x" + i + " = " + extMatrix[i][columns - 1] + "\n"
	}
	return answer

}

let myArrayA = createArrayAndDisplayMatrix(matrixAValues, tableA)
let myArrayB = createArrayAndDisplayArray(matrixBValues, tableB)