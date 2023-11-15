var ctx = document.getElementById('myChart').getContext('2d')
var ctx2 = document.getElementById('myChart2').getContext('2d')


function createChart(xArray, yArray, canvasid) {
	// Получаем контекст для рисования на холсте

	// Создаем график с использованием данных из массивов x и y
	var myChart = new Chart(canvasid, {
		type: 'line',  // Тип графика (line, bar, radar и др.)
		data: {
			labels: xArray,  // Метки по оси X
			datasets: [{
				label: 'Значения',
				data: yArray,  // Значения для построения графика
				backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Цвет фона графика
				borderColor: 'rgba(75, 192, 192, 1)',  // Цвет линии графика
				borderWidth: 2  // Ширина линии графика
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
					position: 'left'
				}]
			}
		}
	})
}

// Пример использования с двумя массивами
var xArray = [1, 2, 3, 4, 5]
var yArray = [5, 10, 15, 20, 25]
createChart(xArray, yArray,ctx)
createChart(xArray, yArray,ctx2)