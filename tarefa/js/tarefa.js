/*buscar e salvar tarefas*/
function salvarTarefas(tarefas) {
    localStorage.setItem('pomodoroTasks', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const dados = localStorage.getItem('pomodoroTasks');
    return dados ? JSON.parse(dados) : [];
}

let tarefas = carregarTarefas();


/*criar tarefa*/
const TAREFA_FORM = document.getElementById('tarefasForm');
const TAREFA_INPUT = document.getElementById('tarefaInput');
const TAREFA_LISTA = document.getElementById('tarefaLista');

TAREFA_FORM.addEventListener('submit', (e) => {
    e.preventDefault();

    const novaTarefa = {
        id: Date.now(),
        titulo : TAREFA_INPUT.value,
        concluida: false,
        ciclosFeitos: 0,
        ciclosNecessarios: 4
    };

    tarefas.push(novaTarefa);
    salvarTarefas(tarefas);
    renderizarTarefas();

    TAREFA_FORM.reset();

});

/*renderizar tarefas*/
function renderizarTarefas() {
    TAREFA_LISTA.innerHTML = '';

    const tarefaAtiva = JSON.parse(localStorage.getItem('tarefaAtiva'));

   tarefas.forEach(tarefa => {
        const li = document.createElement('li');

        if(tarefa.concluida) {
            li.classList.add('concluida');
        }

        if(tarefaAtiva && tarefaAtiva.id === tarefa.id) {
            li.classList.add('ativa');
        }

        li.innerHTML = `
        <input type= "checkbox" ${tarefa.concluida ? 'checked' : ''}>
        <span>${tarefa.titulo}</span>
        <small>Ciclos: ${tarefa.ciclosFeitos} / ${tarefa.ciclosNecessarios}</small> `;

        const checkbox = li.querySelector('input');
        
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            tarefa.concluida = e.target.checked;
            salvarTarefas(tarefas);
        });

        /*definir tarefa ativa */
        li.addEventListener('click', ()=> {             
            localStorage.setItem('tarefaAtiva', JSON.stringify(tarefa));
            renderizarTarefas();
});

        TAREFA_LISTA.appendChild(li);
        
    });       
}

renderizarTarefas();







