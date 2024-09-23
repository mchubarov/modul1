const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('books');
const totalBooks = document.getElementById('total-books');
const clearBooksButton = document.getElementById('clear-books');
const refreshPageButton = document.getElementById('refresh-page');
const filterGenreInput = document.getElementById('filter-genre');
const filterStatusSelect = document.getElementById('filter-status');

let books = JSON.parse(localStorage.getItem('books')) || [];

// Переменные для редактирования
let editIndex = null;
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const closeButton = document.querySelector('.close-button');

// Функция для отображения книг
function renderBooks() {
	bookList.innerHTML = '';
	const filteredBooks = books.filter(book => {
		const genreMatch =
			!filterGenreInput.value ||
			book.genre.toLowerCase().includes(filterGenreInput.value.toLowerCase());
		const statusMatch =
			!filterStatusSelect.value || book.status === filterStatusSelect.value;
		return genreMatch && statusMatch;
	});

	filteredBooks.forEach((book, index) => {
		const li = document.createElement('li');
		li.innerHTML = `
            <span>${book.title} от ${book.author} (${book.year}) - ${book.genre}, ${book.status}</span>
            <div>
                <button class="edit" onclick="editBook(${index})">Редактировать</button>
                <button class="delete" onclick="deleteBook(${index})">Удалить</button>
            </div>
        `;
		bookList.appendChild(li);
	});

	totalBooks.textContent = filteredBooks.length;
}

// Добавление новой книги
bookForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const year = document.getElementById('year').value;
	const genre = document.getElementById('genre').value;
	const status = document.getElementById('status').value;

	const newBook = { title, author, year, genre, status };
	books.push(newBook);
	localStorage.setItem('books', JSON.stringify(books));
	renderBooks();
	bookForm.reset();
});

// Удаление книги
function deleteBook(index) {
	books.splice(index, 1);
	localStorage.setItem('books', JSON.stringify(books));
	renderBooks();
}

// Редактирование книги
function editBook(index) {
	editIndex = index;
	const book = books[index];
	document.getElementById('edit-title').value = book.title;
	document.getElementById('edit-author').value = book.author;
	document.getElementById('edit-year').value = book.year;
	document.getElementById('edit-genre').value = book.genre;
	document.getElementById('edit-status').value = book.status;
	// Показываем модальное окно
	editModal.style.display = 'block';
}

// Закрытие модального окна при клике на крестик
closeButton.addEventListener('click', function () {
	editModal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function (event) {
	if (event.target == editModal) {
		editModal.style.display = 'none';
	}
});

// Сохранение отредактированной книги
editForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const title = document.getElementById('edit-title').value;
	const author = document.getElementById('edit-author').value;
	const year = document.getElementById('edit-year').value;
	const genre = document.getElementById('edit-genre').value;
	const status = document.getElementById('edit-status').value;

	const updatedBook = { title, author, year, genre, status };
	books[editIndex] = updatedBook;
	localStorage.setItem('books', JSON.stringify(books));
	renderBooks();
	editForm.reset();
	editModal.style.display = 'none';
});

// Удаление всех книг
clearBooksButton.addEventListener('click', function () {
	books = [];
	localStorage.removeItem('books');
	renderBooks();
});

// Обновление страницы
refreshPageButton.addEventListener('click', function () {
	location.reload();
});

// Фильтрация книг
filterGenreInput.addEventListener('input', renderBooks);
filterStatusSelect.addEventListener('change', renderBooks);

// Инициализация отображения книг
renderBooks();
