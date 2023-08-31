'use strict'
const descricao = document.getElementById('descricao');
const qtdTarefas = document.getElementById('qtdTarefas');
const qtdConcluidas = document.getElementById('qtdConcluidas');
const tarefas = document.getElementById('tarefas');
const qtd = document.getElementById('concluidas')
const dbLista = JSON.parse(localStorage.getItem('Tarefas')) || [];
const btnAdd = document.getElementById('btnAdd');
let id = 0;

btnAdd.addEventListener('click', function (e) {
    e.preventDefault();

    listarTarefas();
    quantidadeTarefas();
})

// RECUPERANDO DADOS DO LOCAL STORAGE
const listarTarefas = () => {

    tarefas.innerHTML = "";

    if (descricao.value.length < 3)
        return console.log('campo em branco')

    dbLista.push(descricao.value);

    salvandoLocalStorage();
    renderLocalStorage();
    limparInput();
}

const limparInput = () => descricao.value = '';
limparInput();

const salvandoLocalStorage = () => {

    localStorage.setItem('Tarefas', JSON.stringify(dbLista));
}

// RECUPERANDO DADOS DO LOCAL STORAGE
const renderLocalStorage = () => {

    tarefas.innerHTML = "";

    if (dbLista.length) {
        dbLista.forEach(element => {
            const li = document.createElement('li');
            li.setAttribute('class', 'tarefa');
            li.innerHTML = `<span class='registro'>${element}</span>
                        <div>
                            <button class='btn-action' onclick="concluir(this)" title='concluir a tarefa'> &#10004; </button>
                            <button class='btn-action' onclick="editar(this)" title='editar a tarefa'> &#128221; </button>
                            <button class='btn-action' onclick="excluir(this)" title='excluir a tarefa'> &#10060; </button>
                        </diV>`;
            tarefas.appendChild(li);
        });
    }
}
renderLocalStorage();

const quantidadeTarefas = () => {

    qtdTarefas.innerText = dbLista.length;
}
quantidadeTarefas();

const quantidadeTarefasConcluidas = () => {

    const concluidas = document.querySelectorAll('.concluida').length;
    qtdConcluidas.innerText = concluidas;
}

const concluir = (li) => {

    const registro = li.parentElement.parentElement.querySelector('.registro');
    registro.classList.toggle('concluida');

    quantidadeTarefasConcluidas();
}

function excluir(li) {

    const registro = li.parentElement.parentElement.querySelector('.registro');

    if (confirm(`Excluir a tarefa: ${registro.textContent} ?`)) {

        dbLista.splice(dbLista.indexOf(registro.textContent), 1);
        li.parentElement.parentElement.remove();

        quantidadeTarefas();
        quantidadeTarefasConcluidas();
        renderLocalStorage();
        salvandoLocalStorage();
    }
}

const editar = li => {

    const registro = li.parentElement.parentElement.querySelector('.registro');
    const index = dbLista.indexOf(registro.textContent);
    console.log(index)

    const novoRegistro = prompt('Editar a tarefa: ', registro.textContent);

    if (novoRegistro.length >= 3) {

        if (confirm(`Confirma a alteração\nDe: ${registro.textContent}\nPara: ${novoRegistro} ?`)) {

            registro.textContent = novoRegistro;

            dbLista.splice(index, 1, novoRegistro)
            salvandoLocalStorage();
            renderLocalStorage();
        }
    } else {
        alert('Alteração inválida');
        console.error('Alteração inválida')
    }
}