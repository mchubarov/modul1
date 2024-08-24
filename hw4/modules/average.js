export function calculateAverage() {
	const a = prompt('Введите 1 число:')
	const b = prompt('Введите 2 число:')
	const c = prompt('Введите 3 число:')
	let result = (parseFloat(a) + parseFloat(b) + parseFloat(c)) / 3
	alert('Среднее значение 3 чисел: ' + result)
}
