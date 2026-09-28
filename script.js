// B.1 - Base de dados (JSON)
const data = {
	produtos: [
		{
			id: 1,
			nome: "Smartphone Aurora X1",
			preco: 2499.9,
			categoria: "Celulares",
			imagem: "https://placehold.co/300x200?text=Aurora+X1",
			descricao: "Tela AMOLED de 6,5 polegadas, 128 GB e câmera tripla.",
			emEstoque: true
		},
		{
			id: 2,
			nome: "Smartphone Brisa Lite",
			preco: 1199.0,
			categoria: "Celulares",
			imagem: "https://placehold.co/300x200?text=Brisa+Lite",
			descricao: "Modelo de entrada com bateria de 5000 mAh e 64 GB.",
			emEstoque: true
		},
		{
			id: 3,
			nome: "Notebook Vento 14",
			preco: 4299.5,
			categoria: "Notebooks",
			imagem: "https://placehold.co/300x200?text=Vento+14",
			descricao: "Notebook de 14 polegadas, 16 GB de RAM e SSD de 512 GB.",
			emEstoque: true
		},
		{
			id: 4,
			nome: "Notebook Trilha Pro",
			preco: 7899.0,
			categoria: "Notebooks",
			imagem: "https://placehold.co/300x200?text=Trilha+Pro",
			descricao: "Para trabalho pesado: 32 GB de RAM, SSD de 1 TB e tela 4K.",
			emEstoque: false
		},
		{
			id: 5,
			nome: "Fone Bluetooth Eco",
			preco: 249.9,
			categoria: "Acessórios",
			imagem: "https://placehold.co/300x200?text=Fone+Eco",
			descricao: "Fone sem fio com cancelamento de ruído e 30 h de bateria.",
			emEstoque: true
		},
		{
			id: 6,
			nome: "Carregador Turbo 65W",
			preco: 129.0,
			categoria: "Acessórios",
			imagem: "https://placehold.co/300x200?text=Turbo+65W",
			descricao: "Carregador USB-C rápido, compatível com celulares e notebooks.",
			emEstoque: true
		},
		{
			id: 7,
			nome: "Mouse Gamer Pulsar",
			preco: 189.9,
			categoria: "Games",
			imagem: "https://placehold.co/300x200?text=Pulsar", 
			descricao: "Mouse com sensor de 16000 DPI e 6 botões programáveis.",
			emEstoque: true
		},
		{
			id: 8,
			nome: "Console Nexo 5",
			preco: 3999.0,
			categoria: "Games",
			imagem: "https://placehold.co/300x200?text=Nexo+5",
			descricao: "Console de nova geração com 1 TB e suporte a 4K.",
			emEstoque: false
		},
		{
			id: 9,
			nome: "Teclado Mecânico Forja",
			preco: 349.9,
			categoria: "Games",
			imagem: "https://placehold.co/300x200?text=Forja", 
			descricao: "Teclado mecânico com switches vermelhos e iluminação RGB.",
			emEstoque: true
		},
		{
			id: 10,
			nome: "Capa Antichoque Rocha",
			preco: 59.9,
			categoria: "Acessórios",
			imagem: "https://placehold.co/300x200?text=Capa+Rocha",
			descricao: "Capa reforçada com bordas elevadas para proteger a tela.",
			emEstoque: true
		}
	]
};

// B.2 - Seleção de elementos (DOM)
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

// B.3 - Funções obrigatórias

// Retorna o preço como string, ex.: "R$ 1999.90"
function formatPrice(preco) {
	return "R$ " + preco.toFixed(2);
}

// Cria e retorna o card de um produto
function createProductCard(produto) {
	const card = document.createElement("div");
	card.setAttribute("data-id", produto.id);
	card.classList.add("card");
	card.style.borderTop = "4px solid #2f5bff";

	const img = document.createElement("img");
	img.setAttribute("src", produto.imagem);
	img.setAttribute("alt", produto.nome);

	const titulo = document.createElement("h3");
	titulo.classList.add("card-title");
	titulo.textContent = produto.nome;

	const preco = document.createElement("p");
	preco.classList.add("card-price");
	preco.textContent = formatPrice(produto.preco);

	const categoria = document.createElement("p");
	categoria.classList.add("card-category");
	categoria.textContent = produto.categoria;

	const acoes = document.createElement("div");
	acoes.classList.add("card-actions");

	const btnDetalhes = document.createElement("button");
	btnDetalhes.textContent = "Ver detalhes";
	btnDetalhes.addEventListener("click", function () {
		showProductDetails(produto);
	});

	const btnDestacar = document.createElement("button");
	btnDestacar.textContent = "Destacar";
	btnDestacar.classList.add("btn-secondary");
	btnDestacar.addEventListener("click", function () {
		card.classList.toggle("highlight");
	});

	acoes.appendChild(btnDetalhes);
	acoes.appendChild(btnDestacar);

	card.appendChild(img);
	card.appendChild(titulo);
	card.appendChild(preco);
	card.appendChild(categoria);
	card.appendChild(acoes);

	return card;
}

// Limpa a lista e adiciona os cards
function renderProducts(produtos) {
	productList.innerHTML = "";

	if (produtos.length === 0) {
		productList.innerHTML = '<p class="vazio">Nenhum produto encontrado. Tente outra busca ou categoria.</p>';
		return;
	}

	produtos.forEach(function (produto) {
		productList.appendChild(createProductCard(produto));
	});

	// B.5 - querySelectorAll nos cards já renderizados
	const cards = document.querySelectorAll(".card");
	cards.forEach(function (card) {
		console.log("Card renderizado, data-id:", card.getAttribute("data-id"));
	});
}

// Preenche o select com "Todas" + categorias únicas
function renderCategories() {
	const categorias = [];
	data.produtos.forEach(function (produto) {
		if (!categorias.includes(produto.categoria)) {
			categorias.push(produto.categoria);
		}
	});

	categorySelect.innerHTML = '<option value="Todas">Todas</option>';
	categorias.forEach(function (categoria) {
		const option = document.createElement("option");
		option.setAttribute("value", categoria);
		option.textContent = categoria;
		categorySelect.appendChild(option);
	});
}

// Mostra os detalhes do produto na área #product-details
function showProductDetails(produto) {
	const estoque = produto.emEstoque ? "Em estoque" : "Indisponível";
	productDetails.innerHTML =
		"<h2>" + produto.nome + "</h2>" +
		"<p><strong>Preço:</strong> " + formatPrice(produto.preco) + "</p>" +
		"<p><strong>Categoria:</strong> " + produto.categoria + "</p>" +
		"<p><strong>Estoque:</strong> " + estoque + "</p>" +
		"<p>" + produto.descricao + "</p>";
}

// Lê busca e categoria e devolve o array filtrado
function filterProducts() {
	const texto = searchInput.value.trim().toLowerCase();
	const categoria = categorySelect.value;

	return data.produtos.filter(function (produto) {
		const nomeBate = produto.nome.toLowerCase().includes(texto);
		const categoriaBate = categoria === "Todas" || produto.categoria === categoria;
		return nomeBate && categoriaBate;
	});
}

// B.4 - Eventos
searchInput.addEventListener("input", function () {
	renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {
	renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
	renderProducts(filterProducts());
});

// Inicialização
renderCategories();
renderProducts(filterProducts());