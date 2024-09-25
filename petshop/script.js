// Função para salvar produto no local storage
function saveProduct(product, storageType) {
    // Obtém os produtos já salvos ou inicializa um array vazio
    let products = JSON.parse(localStorage.getItem(storageType)) || [];
    
    // Adiciona o novo produto ao array
    products.push(product);
    
    // Salva o array atualizado no local storage
    localStorage.setItem(storageType, JSON.stringify(products));
}

// Função para lidar com a submissão do formulário
document.getElementById('productForm').addEventListener('submit', (e) => {
    // Impede o comportamento padrão do formulário (recarregar a página)
    e.preventDefault();
    
    // Obtenha os dados do formulário
    const productName = e.target.productName.value; // Ajuste conforme o nome do campo
    const productPrice = e.target.productPrice.value; // Ajuste conforme o nome do campo
    const productDescription = e.target.productDescription.value; // Ajuste conforme o nome do campo
    const productDate = e.target.productDate.value; // Ajuste conforme o nome do campo
    const storageType = 'products'; // Defina o tipo de armazenamento conforme necessário

    const product = {
        name: productName,
        price: productPrice,
        description: productDescription,
        date: productDate
    };
    
    // Salve o produto no local storage
    saveProduct(product, storageType);
    
    // Exibe um alerta de sucesso
    alert(`Produto ${product.name} adicionado em ${storageType} com sucesso!`);

    // Limpa o formulário após a submissão
    e.target.reset();
});

// Simulando requisição a uma API externa
function fetchAnimals() {
    return new Promise((resolve, reject) => {
        // Faz uma requisição a uma API externa
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                // Verifica se a resposta está ok
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados'); // Lança um erro se a resposta não for ok
                }
                return response.json(); // Converte a resposta em JSON
            })
            .then(data => resolve(data)) // Resolve a promessa com os dados obtidos
            .catch(error => reject(error)); // Rejeita a promessa em caso de erro
    });
}

// Evento para buscar e exibir animais
document.getElementById('fetchAnimals').addEventListener('click', () => {
    fetchAnimals()
        .then(animals => {
            // Adiciona os animais à lista
            animals.forEach(animal => {
                const li = document.createElement('li');
                li.textContent = `${animal.name} - ${animal.email}`; // Corrigido para interpolação de strings
                document.getElementById('animalList').appendChild(li);
            });
        })
        .catch(error => {
            // Exibe um alerta de erro
            alert('Erro ao buscar os dados dos animais: ' + error.message);
        });
});
