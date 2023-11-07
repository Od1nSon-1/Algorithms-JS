const a = document.getElementById('input1')
const b = document.getElementById('input2')
const btn = document.querySelector('button')
const outputSimpson = document.getElementById('output1')
const outputKronrod = document.getElementById('output2')


const arrayСoefKronrod = [0.99145, 0.94910,
	0.86486, 0.74153,
	0.58608, 0.40584,
	0.20778, 0,
	-0.20778, -0.40584,
	-0.58608, -0.74153,
	-0.86486, -0.94910,
	-0.99145]

const arrayWeightKronrod = [
	0.02293, 0.06309,
	0.10479, 0.14065,
	0.16900, 0.19035,
	0.20443, 0.20948,
	0.20443, 0.19035,
	0.16900, 0.14065,
	0.10479, 0.06309,
	0.02293
]

function getKronrod(func, a, b) {
	let resultKronrod = 0
	for (let i = 0; i < arrayWeightKronrod.length; i++) {
		resultKronrod += arrayWeightKronrod[i] * func(((b + a) / 2) + ((b - a) / 2) * arrayСoefKronrod[i])
	}
	resultKronrod *= (b - a) / 2
	return resultKronrod
}

function getIntegral(x) {
	return Math.sqrt(9 - Math.pow(x, 2)) / Math.pow(x, 2)
}

function getSimpson(func, a, b, n) {
	let h = (b - a) / n
	let res = 0
	for ( let x = a, i = 0; i <= n; x += h, i++) {
		if (i === 0 || i === n)
			res += func(x)
		else if (i % 2 != 0)
			res += 4 * func(x)
		else
			res += 2 * func(x)
	}
	res *= (b - a) / (3 * n)
	return res
}

btn.onclick = function () {
	let num1 = +a.value
	let num2 = +b.value
	const eps = 0.0001
	let n = 16
	while (Math.abs((getSimpson(getIntegral, num1, num2, n * 2) - getSimpson(getIntegral, num1, num2, n))) > eps) {
		n *= 2
	}
	
	outputSimpson.textContent ="Метод Симпсона  " + getSimpson(getIntegral, num1, num2, n)
	outputKronrod.textContent ="Метод Гаусса-Кронрода  " + getKronrod(getIntegral,num1,num2)
}


