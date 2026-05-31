let pontos = 0;
let modulosConcluidos = 0;

function mostrarTela(id){


document
    .querySelectorAll(".screen")
    .forEach(tela => tela.classList.remove("active"));

document
    .getElementById(id)
    .classList.add("active");


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

function abrirTrilha(){


mostrarTela("trailScreen");


}

function voltarDashboard(){

mostrarTela("dashboardScreen");


}

function abrirModulo(){


mostrarTela("moduleScreen");


}

function voltarTrilha(){

mostrarTela("trailScreen")

}

function abrirQuiz(){


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

    progresso += 2;

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

},100);


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

const correta = 1;

if(parseInt(resposta.value) === correta){

    pontos += 50;
    modulosConcluidos++;

    atualizarDashboard();

    alert(
        "🎉 Parabéns! Você concluiu o módulo e ganhou 50 pontos."
    );

    mostrarTela("dashboardScreen");

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

let ieh = modulosConcluidos * 100;

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


}
