/** DOM-элементы */
const productList = document.getElementById('productList');
const categoryFilter = document.getElementById('categoryFilter');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const addProductForm = document.getElementById('addProductForm');
const productCategory = document.getElementById('productCategory');
const productModal = document.getElementById('productModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close');

/** Переменные */
let products = [];
let categories = [];
let displayedProducts = 0;
const productsPerPage = 6;

// Открыть модальное окно
openModalBtn.addEventListener('click', () => {
	productModal.style.display = 'block';
});

// Закрыть модальное окно
closeModalBtn.addEventListener('click', () => {
	productModal.style.display = 'none';
});

// Закрывать модальное окно при нажатии вне его
window.addEventListener('click', event => {
	if (event.target === productModal) {
		productModal.style.display = 'none';
	}
});

/** Функции */

/** Отображение товаров на странице. */
const displayProducts = productArray => {
	productArray.forEach(product => {
		const productCard = document.createElement('div');
		productCard.classList.add('product-card');
		productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <p>${product.description}</p>
            <button class="delete-btn" data-id="${product.id}">Удалить товар</button>
        `;
		productList.appendChild(productCard);
	});
};

/** Загрузка товаров из API. */
const loadProducts = async () => {
	try {
		const response = await fetch('https://fakestoreapi.com/products');
		const data = await response.json();
		products = data;
		displayProducts(products.slice(0, productsPerPage));
		displayedProducts = productsPerPage;
	} catch (error) {
		console.error('Ошибка при загрузке товаров:', error);
	}
};

/** Загрузка категорий из API и добавление их в фильтр. */
const loadCategories = async () => {
	try {
		const response = await fetch(
			'https://fakestoreapi.com/products/categories'
		);
		const data = await response.json();
		categories = data;
		categories.forEach(category => {
			const option = document.createElement('option');
			option.value = category;
			option.textContent = category;
			categoryFilter.appendChild(option);

			const formOption = option.cloneNode(true);
			productCategory.appendChild(formOption);
		});
	} catch (error) {
		console.error('Ошибка при загрузке категорий:', error);
	}
};

/** * Фильтрация товаров по выбранной категории. */
categoryFilter.addEventListener('change', e => {
	const selectedCategory = e.target.value;
	productList.innerHTML = '';
	const filteredProducts = selectedCategory
		? products.filter(product => product.category === selectedCategory)
		: products;
	displayProducts(filteredProducts.slice(0, displayedProducts));
});

/** Загрузка дополнительных товаров при нажатии кнопки "Загрузить ещё". */
loadMoreBtn.addEventListener('click', () => {
	const selectedCategory = categoryFilter.value;
	const filteredProducts = selectedCategory
		? products.filter(product => product.category === selectedCategory)
		: products;
	const nextProducts = filteredProducts.slice(
		displayedProducts,
		displayedProducts + productsPerPage
	);
	displayProducts(nextProducts);
	displayedProducts += nextProducts.length;
});

/** * Добавление нового товара через форму. */
addProductForm.addEventListener('submit', async e => {
	e.preventDefault();

	const title = addProductForm.elements['productName'].value;
	const price = parseFloat(addProductForm.elements['productPrice'].value);
	const description = addProductForm.elements['productDescription'].value;
	const category = addProductForm.elements['productCategory'].value;

	const newProduct = {
		title,
		price,
		description,
		category,
		image: 'https://via.placeholder.com/150',
	};

	try {
		const response = await fetch('https://fakestoreapi.com/products', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newProduct),
		});

		if (!response.ok) {
			throw new Error('Ошибка при добавлении товара');
		}

		const createdProduct = await response.json();
		products.push(createdProduct);
		productList.innerHTML = '';
		displayProducts(products.slice(0, displayedProducts));
		addProductForm.reset();
		alert('Товар успешно добавлен!');
	} catch (error) {
		console.error(error);
		alert('Не удалось добавить товар.');
	}
});

/** Удаление выбранного товара. */
productList.addEventListener('click', async e => {
	if (!e.target.classList.contains('delete-btn')) return;

	const productId = e.target.dataset.id;

	try {
		const response = await fetch(
			`https://fakestoreapi.com/products/${productId}`,
			{
				method: 'DELETE',
			}
		);

		if (!response.ok) {
			throw new Error('Ошибка при удалении товара');
		}

		products = products.filter(product => product.id !== parseInt(productId));
		productList.innerHTML = '';
		displayProducts(products.slice(0, displayedProducts));
		alert('Товар успешно удалён!');
	} catch (error) {
		console.error(error);
		alert('Не удалось удалить товар.');
	}
});

// Начальная загрузка
loadProducts();
loadCategories();
