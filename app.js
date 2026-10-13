const api = axios.create({
    baseURL: "https://api-axios-8ndn.onrender.com"
});

let section = "users";
let records = [];

const $ = (selector) => document.querySelector(selector);

async function listar(endpoint = `/${section}`) {
    try {
        const { data } = await api.get(endpoint);
        console.log("Objeto recebido em listar:", data);
        return data;
    } catch (error) {
        console.log("Erro na consulta", error.message);
    }

}
function render() {
    $(`#page-title`).textContent = isUsersPage() ? "Usuários" : "Produtos";
    $(`#table-heard`).innerHTML = isUsers
    ? "<tr><th>Id</th><th>Nome</th><th>Email</th></tr>"
    : "<tr><th>Id</th><th>Produtos</th><th>Preços</th><th>Ações</th></tr>";
}

async function carregar() {
    records = await listar();
    console.log(records);
}

