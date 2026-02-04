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
        ciclosFeitos: 0
    };

    tarefas.push(novaTarefa);
    salvarTarefas(tarefas);
    renderizarTarefas();

    TAREFA_FORM.reset();

});

/*renderizar tarefas*/
function renderizarTarefas() {
    TAREFA_LISTA.innerHTML = '';

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');

        li.innerHTML = `
        <input type= "checkbox" ${tarefa.concluida} ? 'checked' : ''}>
        <span>${tarefa.titulo}</span>
        <small>Ciclos: ${tarefa.ciclosFeitos}</small> `;

        li.querySelector('input').addEventListener('change', () => {
            tarefa.concluida = !tarefa.concluida;
            salvarTarefas(tarefas);
        });

        /*definir tarefa ativa */
        li.querySelector('span').addEventListener('click', ()=> {    
            localStorage.setItem('tarefaAtiva', JSON.stringify(tarefa));
});

        TAREFA_LISTA.appendChild(li);
        
    });       
}

renderizarTarefas(); 




const tarefaAtiva = JSON.parse(localStorage.getItem('tarefaAtiva'));

if(tarefaAtiva && tarefaAtiva.id === tarefaAtiva.id){
    li.classList.add('ativa')
}


