// ===== MENU MOBILE =====

const mobileToggle = document.getElementById("mobileMenuToggle");
const sidebarEl = document.querySelector(".sidebar");
const mobileOverlay = document.getElementById("mobileOverlay");
const dashboardLayout = document.querySelector(".dashboard-layout");

function abrirMenuMobile() {
    sidebarEl.classList.add("open");
    mobileOverlay.classList.add("open");
    dashboardLayout.classList.add("menu-open");
    document.body.style.overflow = "hidden";
}

function fecharMenuMobile() {
    sidebarEl.classList.remove("open");
    mobileOverlay.classList.remove("open");
    dashboardLayout.classList.remove("menu-open");
    document.body.style.overflow = "";
}

mobileToggle.addEventListener("click", () => {
    sidebarEl.classList.contains("open") ? fecharMenuMobile() : abrirMenuMobile();
});

mobileOverlay.addEventListener("click", fecharMenuMobile);
sidebarEl.querySelectorAll("a").forEach(link => link.addEventListener("click", fecharMenuMobile));

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebarEl.classList.contains("open")) fecharMenuMobile();
});

// ===== CALENDÁRIO MINI =====
const hoje = new Date();
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const consultasMedicas = [12];
const praticasIntegrativas = [16];

let mesAtual = hoje.getMonth();
let anoAtual = hoje.getFullYear();

function renderCalendario(mes, ano) {
    const calendario = document.getElementById("calendario");
    const mesAno = document.getElementById("mesAno");

    calendario.innerHTML = "";
    mesAno.textContent = `${meses[mes]} ${ano}`;

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    let linha = document.createElement("tr");

    for (let i = 0; i < primeiroDia; i++) linha.appendChild(document.createElement("td"));

    for (let dia = 1; dia <= ultimoDia; dia++) {
        if (linha.children.length === 7) {
            calendario.appendChild(linha);
            linha = document.createElement("tr");
        }

        const td = document.createElement("td");
        const span = document.createElement("span");
        span.textContent = dia;
        span.classList.add("dia-mini");

        if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
            span.classList.add("dia-mini--hoje");
        }
        if (consultasMedicas.includes(dia) && mes === hoje.getMonth()) {
            span.classList.add("dia-mini--medica");
        }
        if (praticasIntegrativas.includes(dia) && mes === hoje.getMonth()) {
            span.classList.add("dia-mini--integrativa");
        }

        td.appendChild(span);
        linha.appendChild(td);
    }

    while (linha.children.length < 7) linha.appendChild(document.createElement("td"));
    calendario.appendChild(linha);
}

renderCalendario(mesAtual, anoAtual);

document.getElementById("mesAnterior").addEventListener("click", () => {
    mesAtual--;
    if (mesAtual < 0) { mesAtual = 11; anoAtual--; }
    renderCalendario(mesAtual, anoAtual);
});

document.getElementById("mesProximo").addEventListener("click", () => {
    mesAtual++;
    if (mesAtual > 11) { mesAtual = 0; anoAtual++; }
    renderCalendario(mesAtual, anoAtual);
});
