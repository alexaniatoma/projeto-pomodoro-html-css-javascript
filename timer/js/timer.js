/*configuração padrão*/
const DEFAULT_CONFIG = {
    foco: 25,
    curta: 5,
    longa: 30
};

/*local storage*/
function salvarConfig(config) {
    localStorage.setItem('pomodoroConfig', JSON.stringify(config));
}

function carregarConfig() {
    const configSalva = localStorage.getItem('pomodoroConfig');
    return configSalva ? JSON.parse(configSalva) : DEFAULT_CONFIG;
}

function carregarTarefas() {
    const dados = localStorage.getItem('pomodoroTasks');
    return dados ? JSON.parse(dados) : [];
}

function salvarTarefas(tarefas) {
    localStorage.setItem('pomodoroTasks', JSON.stringify(tarefas));
}

let config = carregarConfig();

/*tempo em segundos*/
let FOCO_HORA = config.foco* 60;
let CURTA_PAUSA = config.curta * 60;
let LONGA_PAUSA =  config.longa * 60;
const TOTAL_CICLOS = 4;

/*elementos*/
const DISPLAY = document.getElementById('display');
const INICIAR_BTN = document.getElementById('iniciar');
const PAUSAR_BTN = document.getElementById('pausar');
const ZERAR_BTN = document.getElementById('zerar');
const CICLO_Display = document.getElementById('ciclo');

const CONFIG_FORM = document.getElementById('configForm');
const FOCO_INPUT = document.getElementById('focoInput');
const CURTA_INPUT = document.getElementById('curtaInput');
const LONGA_INPUT = document.getElementById('longaInput');

/*estado*/
let time = FOCO_HORA;
let timer = null;
let ciclo = 1;
let isRunning = false;

/*funções*/
function atualizarDisplay(seconds){
    const MIN = String(Math.floor(seconds / 60)).padStart(2, '0');
    const SEC = String(seconds % 60).padStart(2, '0');
    DISPLAY.textContent = `${MIN} : ${SEC}`;
}
function atualizarCiclo() {
    CICLO_Display.textContent = `Ciclo atual: ${ciclo} de ${TOTAL_CICLOS}`;
}

function iniciarTimer() {
    if(isRunning) return;

    isRunning = true;
    timer = setInterval(() => { 
        time--;
        atualizarDisplay(time);

        if(time <= 0) {
            clearInterval(timer);
            isRunning = false;
            registrarCicloDaTarefa();
            gerenciarCiclo();
        } 
    }, 1000);
}

function pausarTimer() {
    clearInterval(timer);
    isRunning = false;    
}

function zerarTimer() {
    clearInterval(timer);
    isRunning = false;
    time = FOCO_HORA;
    ciclo = 1;
    atualizarDisplay(time);
    atualizarCiclo();
}

function gerenciarCiclo() {
    if(ciclo < TOTAL_CICLOS) {
        ciclo++;
        time = CURTA_PAUSA;
        alert("Hora da pausa curta!");        
    }
    else {
        ciclo = 1;   
        time = LONGA_PAUSA;
        alert("Pausa longa!")
    }

    atualizarCiclo();
    atualizarDisplay(time);
}

function registrarCicloDaTarefa() {
    const tarefaAtiva = JSON.parse(localStorage.getItem('tarefaAtiva'));

    if(!tarefaAtiva) return;
    tarefaAtiva.ciclosFeitos++;

    const tarefas = carregarTarefas();
    const index = tarefas.findIndex(t => t.id === tarefaAtiva.id);

    if(index !== -1) {
        tarefas[index] = tarefaAtiva;
        salvarTarefas(tarefas);
        localStorage.setItem('tarefaAtiva', JSON.stringify(tarefaAtiva));
    }
}

/*form configurações*/
CONFIG_FORM.addEventListener('submit', (event)=> {
    event.preventDefault();

    config = {
        foco: Number(FOCO_INPUT.value),
        curta: Number(CURTA_INPUT.value),
        longa: Number(LONGA_INPUT.value)       
    };

    salvarConfig(config);

    FOCO_HORA = config.foco * 60;
    CURTA_PAUSA = config.curta * 60;
    LONGA_PAUSA = config.longa * 60;

    zerarTimer();

    alert('Configurações salvas com sucesso!')
})

/*eventos*/
INICIAR_BTN.addEventListener('click', iniciarTimer);
PAUSAR_BTN.addEventListener('click', pausarTimer);
ZERAR_BTN.addEventListener('click', zerarTimer);

/*inicialização*/
FOCO_INPUT.value = config.foco;
CURTA_INPUT.value = config.curta;
LONGA_INPUT.value = config.longa;

atualizarDisplay(time);
atualizarCiclo();
