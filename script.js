let pontos = parseInt(localStorage.getItem("pontos")) || 0;
let modulosConcluidos = parseInt(localStorage.getItem("modulosConcluidos")) || 0;

const totalModulos = 5;

const perguntas = [
{
pergunta:"O que é hardware?",
opcoes:["Programas","Partes físicas","Internet","Windows"],
correta:1
},
{
pergunta:"Qual componente realiza cálculos?",
opcoes:["Monitor","Mouse","CPU","Teclado"],
correta:2
},
{
pergunta:"O que é software?",
opcoes:["Programa","Teclado","Mouse","Monitor"],
correta:0
},
{
pergunta:"Qual tecla copia texto?",
opcoes:["Ctrl+V","Ctrl+C","Ctrl+X","Ctrl+Z"],
correta:1
},
{
pergunta:"O Windows é um:",
opcoes:["Jogo","Sistema Operacional","Antivírus","Site"],
correta:1
},
{
pergunta:"Qual extensão do Word?",
opcoes:[".xlsx",".docx",".jpg",".exe"],
correta:1
},
{
pergunta:"Qual símbolo inicia fórmula no Excel?",
opcoes:["#","=","$","&"],
correta:1
},
{
pergunta:"O que é SSD?",
opcoes:["Memória","Armazenamento rápido","Monitor","Processador"],
correta:1
},
{
pergunta:"O que é phishing?",
opcoes:["Golpe online","Programa","Mouse","Planilha"],
correta:0
},
{
pergunta:"Uma senha forte deve:",
opcoes:[
"Ter apenas números",
"Ser curta",
"Ter letras, números e símbolos",
"Ter apenas letras"
],
correta:2
}
];

let perguntaAtual = 0;

function mostrarTela(id){

document
.querySelectorAll(".screen")
.forEach(tela => tela.classList.remove("active"));

document
.getElementById(id)
.classList.add("active");

}
function carregarPergunta() {

    const pergunta = perguntas[perguntaAtual];

    let html = `
        <p>${pergunta.pergunta}</p>
    `;

    pergunta.opcoes.forEach((opcao, index) => {

        html += `
        <label class="option">
            <input type="radio"
                   name="quiz"
                   value="${index}">
            ${opcao}
        </label>
        `;

    });

    document.getElementById("quizContainer")
        .innerHTML = html;
}

function fazerLogin(){

const nome =
document.getElementById("nome").value;

const email =
document.getElementById("email").value;

if(nome.trim() === ""){

alert("Digite seu nome");
return;

}

if(email.trim() === ""){

alert("Digite seu e-mail");
return;

}

localStorage.setItem("usuarioNome", nome);
localStorage.setItem("usuarioEmail", email);

document.getElementById("userName").textContent =
nome;

document.getElementById("welcomeText").textContent =
`Olá, ${nome} 👋`;

mostrarTela("dashboardScreen");

}

function logout(){

if(confirm("Deseja sair?")){

localStorage.clear();
location.reload();

}

}

function abrirTrilha(nome){

console.log("Trilha:", nome);

mostrarTela("trailScreen");

}

function voltarDashboard(){

mostrarTela("dashboardScreen");

}

function abrirModulo(){

mostrarTela("moduleScreen");

}

function voltarTrilha(){

mostrarTela("trailScreen");

}

function abrirQuiz(){

carregarPergunta();

mostrarTela("quizScreen");

}

function iniciarAula(){

const barra =
document.getElementById("videoBar");

const texto =
document.getElementById("videoPercent");

const botaoQuiz =
document.getElementById("quizBtn");

const botaoVideo =
document.getElementById("startVideoBtn");

botaoVideo.disabled = true;

let progresso = 0;

const timer = setInterval(() => {

progresso += 1;

barra.style.width =
progresso + "%";

texto.textContent =
progresso + "% assistido";

if(progresso >= 100){

clearInterval(timer);

texto.textContent =
"✅ Aula concluída";

botaoQuiz.classList.remove("hidden");

}

},150);

}
function corrigirQuiz(){

const resposta =
document.querySelector(
'input[name="quiz"]:checked'
);

if(!resposta){

alert("Selecione uma alternativa.");
return;

}

const pergunta =
perguntas[perguntaAtual];

if(
parseInt(resposta.value) === pergunta.correta
){

perguntaAtual++;

if(perguntaAtual < perguntas.length){

carregarPergunta();

}else{

const concluido =
localStorage.getItem("modulo1");

if(!concluido){

pontos += 50;
modulosConcluidos++;

localStorage.setItem(
"modulo1",
"concluido"
);

localStorage.setItem(
"pontos",
pontos
);

localStorage.setItem(
"modulosConcluidos",
modulosConcluidos
);

}

atualizarDashboard();

alert(
"🎉 Você concluiu todas as perguntas!"
);

perguntaAtual = 0;

mostrarTela("dashboardScreen");

}

}else{

alert(
"❌ Resposta incorreta. Tente novamente."
);

}

}

function atualizarDashboard(){

document.getElementById("points")
.textContent = pontos;

document.getElementById("completedModules")
.textContent = modulosConcluidos;

let ieh =
Math.round(
(modulosConcluidos / totalModulos) * 100
);

if(ieh > 100){

ieh = 100;

}

document.getElementById("iehValue")
.textContent = ieh + "%";

}

window.onload = () => {

const nome =
localStorage.getItem("usuarioNome");

if(nome){

document.getElementById("userName")
.textContent = nome;

document.getElementById("welcomeText")
.textContent =
`Olá, ${nome} 👋`;

mostrarTela("dashboardScreen");

}

atualizarDashboard();

};
