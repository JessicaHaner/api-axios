
const api = axios.create({
    baseURL: "https://api-axios-8ndn.onrender.com"
});

let section = "users";
let records = [];

const $ = (selector) => document.querySelector(selector);

// Verifica se a seção atual é a de usuários
function isUsersPage() {
    return section === "users";
}

// Prepara os títulos da página e da tabela
function render() {
    $("#page-title").textContent = isUsersPage()
        ? "Usuários"
        : "Produtos";

    $("#table-head").innerHTML = isUsersPage()
        ? "<tr><th>Id</th><th>Nome</th><th>Email</th></tr>"
        : "<tr><th>Id</th><th>Produto</th><th>Preço</th><th>Ações</th></tr>";

    $("#table-title").textContent = isUsersPage()
        ? "Todos os usuários"
        : "Todos os produtos";

    $("#table-description").textContent = isUsersPage()
        ? "Gerencie os usuários cadastrados no sistema."
        : "Gerencie os produtos cadastrados no sistema.";
}
// Mostra os registros na tabela
function renderRowns() {
    $("#table-body").innerHTML = records.map((record) => `
        <tr>
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.email}</td>
        </tr>
    `).join("");
        
}

    // Busca os registros na API
async function listar(endpoint = `/${section}`) {
    try {
        const { data } = await api.get(endpoint);

        console.log("Dados recebidos da API:", data);

        return data;
    } catch (error) {
        console.error("Erro na consulta:", error.message);
        return [];
    }
}

// Carrega os registros da seção atual
async function carregar() {
    records = await listar();

    console.log("Registros armazenados:", records);
    renderRowns();
}

// Inicializa a página
async function iniciar() {
    render();
    await carregar();
}

iniciar();
