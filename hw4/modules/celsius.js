export function celsiusToFahrenheit() {
	const number = prompt('Введите градусы Цельсия:')
	let result = (number * 9) / 5 + 32
	alert('Градусов Фаренгейта: ' + result)
}
