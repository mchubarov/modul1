const http = require('http');
const { add, subtract } = require('./math'); // Импортируем функции из math.js

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });

	const sum = add(5, 3); // Пример использования функции add
	const difference = subtract(5, 3); // Пример использования функции subtract

	res.write(`Sum: ${sum}\n`); // Выводим результат сложения
	res.write(`Difference: ${difference}\n`); // Выводим результат вычитания

	res.end();
});

server.listen(3000, () => {
	console.log('Server running at http://localhost:3000/');
});
