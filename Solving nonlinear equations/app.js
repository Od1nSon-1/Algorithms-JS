const blocks = document.querySelectorAll(".block")
const controlls = document.querySelectorAll(".controlls")
let ctx = document.getElementById('myChart').getContext('2d')
let ctx2 = document.getElementById('myChart2').getContext('2d')
let inputStep = document.getElementById("step-value")
let xValue = document.getElementById("x-value")
let yValue = document.getElementById("y-value")
let btnInterpolate = document.getElementById("btn-play")
let indexBlock = 0

let ctx3 = document.getElementById('myChart3').getContext('2d')
let resultX1 = document.getElementById("result-1")
let resultX2 = document.getElementById("result-2")
let resultX3 = document.getElementById("result-3")
let resultX4 = document.getElementById("result-4")
let resultX5 = document.getElementById("result-5")

function show(index) {
	blocks[indexBlock].classList.remove("active")
	blocks[index].classList.add("active")
	indexBlock = index
}

controlls.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		if (event.target.classList.contains("prev")) {
			let index = indexBlock - 1
			if (index < 0) {
				index = blocks.length - 1
			}
			show(index)
		} else if (event.target.classList.contains("next")) {
			let index = indexBlock + 1
			if (index >= blocks.length) {
				index = 0
			}
			show(index)
		}
	})
})

show(indexBlock)

btnInterpolate.onclick = function () {
	MakeCharts()
}

function MakeCharts() {
	let xAxis = xValue.value.split("")
	let yAxis = yValue.value.split(" ")
	let step = Number(inputStep.value)
	getNumbers(yAxis)
	getNumbers(xAxis)


	let lowB = xAxis[0]
	let highB = xAxis[xAxis.length - 1]
	let valuesCount = ((highB - lowB) / step)
	let xInterValues = createZeroFilledArray2(valuesCount)
	xInterValues = getInterpolatedValues(step, lowB, highB, valuesCount)
	let yInterValues = createZeroFilledArray2(valuesCount)
	for (let i = 0; i < valuesCount; ++i) {
		yInterValues[i] = getLangragePolinomial(xInterValues[i], xAxis, yAxis, xAxis.length)
	}
	createChart(xAxis, yAxis, ctx)
	createChart(xInterValues, yInterValues, ctx2)

}

function createChart(xArray, yArray, canvasid) {
	// Получаем контекст для рисования на холсте
	let connectPoints = xArray.length < 10
	// Создаем график с использованием данных из массивов x и y
	var myChart = new Chart(canvasid, {
		type: connectPoints ? 'line' : 'scatter',  // Тип графика (line для линейного графика)
		data: {
			labels: xArray,// Метки по оси X
			datasets: [{
				label: 'Линия',
				data: yArray,  // Значения для построения линии
				fill: false,  // Заполнение под линией (false для отображения линии без заливки)
				backgroundColor: 'rgba(75, 192, 192, 0.7)',  // Цвет линии
				borderColor: 'rgba(75, 192, 192, 1)',  // Цвет линии
				borderWidth: 2, // Ширина линии
				pointRadius: 5,  // Радиус точек (0, если используется линия)к
			}]
		},
		options: {
			scales: {
				x: [{
					type: 'linear',
					position: 'bottom'
				}],
				y: [{
					type: 'linear',
					position: 'left',
				}]
			}
		}
	})
}

function createZeroFilledArray2(length = 0) {
	var arr = []

	for (var i = 0; i < length; i++) {
		arr[i] = 0
	}

	return arr
}
function createZeroFilledArray(rows=0, cols=0) {
	let arr = []

	for (let i = 0; i < rows; i++) {
		arr[i] = []
		for (let j = 0; j < cols; j++) {
			arr[i][j] = 0
		}
	}

	return arr
}

function getInterpolatedValues(step, lowB, highB, valuesCount) {
	let xAxis = createZeroFilledArray2(valuesCount)
	xAxis[0] = lowB
	xAxis[xAxis.length - 1] = highB
	for (let i = 1; i < valuesCount - 1; ++i) {
		xAxis[i] += xAxis[i - 1] + step
	}
	return xAxis
}

function getLangragePolinomial(x, xValues, yValues, size) {
	let lagrangePol = 0
	for (let i = 0; i < size; i++) {
		let basicsPol = 1
		for (let j = 0; j < size; j++) {
			if (j != i) {
				basicsPol *= (x - xValues[j]) / (xValues[i] - xValues[j])
			}
		}
		lagrangePol += basicsPol * yValues[i]
	}
	return lagrangePol
}

function getNumbers(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (isNaN(parseFloat(arr[i]))) {
			arr.splice(i, 1)
			i--
			continue
		}
		arr[i] = Number(arr[i])
	}
	return arr
}

let n = 0 
let coeff = createZeroFilledArray(0)
let xValues = createZeroFilledArray2(0)
let yValues = createZeroFilledArray2(0)
showChart()





// Next lab function

function showChart() { 
	let a = 1;
    let b = 1.2;
    let h = 0.04
	let xPlotPoints = createZeroFilledArray2(parseInt((b - a) / h) + 1);
    let k = 0
	for (let i = a; i < b; i += h)
	{
		xPlotPoints[k] = i
		k++
	}
	n = 6
	xValues = createZeroFilledArray2(n)
	yValues = createZeroFilledArray2(n)
	let cnt = 0
	for (let i = a; Math.round(i, 3) <= b; i += h)
	{
		xValues[cnt] = i
		yValues[cnt] = Math.sin(i)
		cnt++
	}

	let yPlotPoints = createZeroFilledArray2(xPlotPoints.length)

	BuildSpline(xValues, yValues, n)
	for (let i = 0; i < xPlotPoints.length; i++)
	{
		yPlotPoints[i] = Interpolate(xPlotPoints[i],xValues)
	}

	let defaultTable = [1.05, 1.09, 1.13, 1.15, 1.17 ];
	let points = []
	for (let i = 0; i < defaultTable.length; i++)
	{
		points.push("x" + i + "= " + defaultTable[i] + "  " +
			"y" + i + "= " + Interpolate(defaultTable[i],xValues) + "\n")
	}
	resultX1.textContent = points[0]
	resultX2.textContent = points[1]
	resultX3.textContent = points[2]
	resultX4.textContent = points[3]
	resultX5.textContent = points[4]

	createChart(xPlotPoints,yPlotPoints,ctx3)
}



function SolveTriDiag(TDM, F, n) {
	let alpha = createZeroFilledArray2(n - 1)
	let beta = createZeroFilledArray2(n - 1)
	let bArray = createZeroFilledArray2(n)
	let i

	alpha[0] = -TDM[2][0] / TDM[1][0]
	beta[0] = F[0] / TDM[1][0]

	for (i = 1; i < n - 1; i++) {
		alpha[i] = -TDM[2][i] / (TDM[1][i] + TDM[0][i] * alpha[i - 1])
		beta[i] = (F[i] - TDM[0][i] * beta[i - 1]) / (TDM[1][i] + TDM[0][i] * alpha[i - 1])
	}
	bArray[n - 1] = (F[n - 1] - TDM[0][n - 1] * beta[n - 2]) / (TDM[1][n - 1] + TDM[0][n - 1] * alpha[n - 2])

	for (i = n - 2; i > -1; i--) {
		bArray[i] = bArray[i + 1] * alpha[i] + beta[i]
	}
}

function BuildSpline(xValues, yValues, n) {
	let a = createZeroFilledArray2([n - 1])
	let c = createZeroFilledArray2([n - 1])
	let d = createZeroFilledArray2([n - 1])
	let delta = createZeroFilledArray2([n - 1])
	let h = createZeroFilledArray2([n - 1])
	let matrix = createZeroFilledArray(3, n)

	let bArray = createZeroFilledArray2(n)

	let f = createZeroFilledArray2(n)
	let x3, xn
	if (n < 3)
		return

	x3 = xValues[2] - xValues[0]
	xn = xValues[n - 1] - xValues[n - 3]

	for (let i = 0; i < n - 1; i++) {
		a[i] = yValues[i]
		h[i] = xValues[i + 1] - xValues[i]
		delta[i] = (yValues[i + 1] - yValues[i]) / h[i]
		matrix[0][i] = i > 0 ? h[i] : x3
		f[i] = i > 0 ? 3 * (h[i] * delta[i - 1] + h[i - 1] * delta[i]) : 0
	}
	matrix[1][0] = h[0]
	matrix[2][0] = h[0]
	for (let i = 1; i < n - 1; i++) {
		matrix[1][i] = 2 * (h[i] + h[i - 1])
		matrix[2][i] = h[i]
	}
	matrix[1][n - 1] = h[n - 2]
	matrix[2][n - 1] = xn
	matrix[0][n - 1] = h[n - 2]

	f[0] = ((h[0] + 2 * x3) * h[1] * delta[0] + Math.pow(h[0], 2) * delta[1]) / x3
	f[n - 1] = (Math.pow(h[n - 2], 2) * delta[n - 3] + (2 * xn + h[n - 2]) * h[n - 3] * delta[n - 2]) / xn

	SolveTriDiag(matrix, f, n)

	coeff = createZeroFilledArray(n - 1, n - 1)
	let j
	for (j = 0; j < n - 1; j++) {
		d[j] = (bArray[j + 1] + bArray[j] - 2 * delta[j]) / (h[j] * h[j])
		c[j] = 2 * (delta[j] - bArray[j]) / h[j] - (bArray[j + 1] - delta[j]) / h[j]

		coeff[j][0] = a[j]
		coeff[j][1] = bArray[j]
		coeff[j][2] = c[j]
		coeff[j][3] = d[j]
	}
}

 function Interpolate(x,xArrayValues)
{
    let i = 0

	 while (xArrayValues[i] < x)
		i++
	if (i > 0)
		i--
	return coeff[i][0] + coeff[i][1] *
		(x - xArrayValues[i]) + coeff[i][2] * Math.pow(x - xArrayValues[i], 2) +
		coeff[i][3] * Math.pow(x - xArrayValues[i], 3)

}