export function calculateFallDistance() {
	const t = prompt('Введите время падения объекта в секундах:')
	const g = 9.8 //скорость свободного падения в м/с²
	let result = Math.round((1 / 2) * g * Math.pow(parseFloat(t), 2))
	alert('Расстояние, которое объект пролетел в метрах: ' + result)
}
