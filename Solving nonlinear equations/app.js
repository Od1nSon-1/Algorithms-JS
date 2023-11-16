var ctx = document.getElementById('myChart').getContext('2d')
var ctx2 = document.getElementById('myChart2').getContext('2d')

let inputStep = document.getElementById("step-value")
let xValue = document.getElementById("x-value")
let yValue = document.getElementById("y-value")
let btnInterpolate = document.getElementById("btn-play")




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



function createZeroFilledArray2(length) {
	var arr = []

	for (var i = 0; i < length; i++) {
		arr[i] = 0
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
// Пример использования с двумя массивами



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