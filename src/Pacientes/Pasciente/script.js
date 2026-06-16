
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
            if (sidebarEl.classList.contains("open")) {
                fecharMenuMobile();
            } else {
                abrirMenuMobile();
            }
        });

        mobileOverlay.addEventListener("click", fecharMenuMobile);

        sidebarEl.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", fecharMenuMobile);
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && sidebarEl.classList.contains("open")) {
                fecharMenuMobile();
            }
        });

        const hoje = new Date();

        const dataFormatada = hoje.toLocaleDateString("pt-BR", {
            weekday: "long", day: "numeric", month: "long", year: "numeric"
        });

        document.getElementById("dataAtual").textContent =
            dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

        // ===== AGENDA HORIZONTAL — INFINITA =====

        const agendaTrack = document.getElementById("agendaTrack");
        const btnVoltar = document.getElementById("agendaVoltar");
        const btnAvancar = document.getElementById("agendaAvancar");

        const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        const mesesAbr = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        const DIAS_OFFSET = 6;

        // === AGENDA ADAPTATIVA (24/12/8/6 dias) ===
        const mq1600 = window.matchMedia("(min-width: 1600px)");
        const mq1400 = window.matchMedia("(min-width: 1400px)");
        const mq992 = window.matchMedia("(min-width: 992px)");

        let larguraAtiva = mq1600.matches ? 1600 : mq1400.matches ? 1400 : mq992.matches ? 992 : 0;

        [mq1600, mq1400, mq992].forEach(mq => {
            mq.addEventListener("change", () => {
                const nova = mq1600.matches ? 1600 : mq1400.matches ? 1400 : mq992.matches ? 992 : 0;
                if (nova !== larguraAtiva) {
                    larguraAtiva = nova;
                    renderizarDias();
                }
            });
        });

        function getDiasVisiveis() {
            if (larguraAtiva >= 1600) return 24;
            if (larguraAtiva >= 1400) return 12;
            if (larguraAtiva >= 992) return 8;
            return 6;
        }

        function getColunasAgenda() {
            if (larguraAtiva >= 1600) return 12; // 2 linhas de 12
            return getDiasVisiveis(); // 12, 8 ou 6 colunas
        }

        let dataCentral = new Date(hoje);
        dataCentral.setHours(0, 0, 0, 0);

        let diaSelecionado = null;
        let dadosDias = [];

        const eventos = new Set();
        function adicionarEvento(dia, mes, ano) {
            const d = new Date(ano, mes - 1, dia);
            eventos.add(d.getTime());
        }
        adicionarEvento(12, 5, 2026);
        adicionarEvento(14, 5, 2026);
        adicionarEvento(18, 5, 2026);

        function gerarDias(centro, quantidade) {
            const metade = Math.floor(quantidade / 2);
            const resultado = [];
            const inicio = new Date(centro);
            inicio.setDate(centro.getDate() - metade);

            for (let i = 0; i < quantidade; i++) {
                const data = new Date(inicio);
                data.setDate(inicio.getDate() + i);
                resultado.push({
                    timestamp: data.getTime(),
                    dia: data.getDate(),
                    mes: data.getMonth(),
                    ano: data.getFullYear(),
                    diaSemana: data.getDay()
                });
            }
            return resultado;
        }

        function renderizarDias() {
            const diasVisiveis = getDiasVisiveis();
            dadosDias = gerarDias(dataCentral, diasVisiveis);
            agendaTrack.innerHTML = "";

            dadosDias.forEach((d, idx) => {
                const bloco = document.createElement("div");
                bloco.className = "agenda-item";
                bloco.dataset.timestamp = d.timestamp;
                bloco.dataset.index = idx;

                const ehHoje = d.timestamp === hoje.getTime();
                const temEvento = eventos.has(d.timestamp);
                const estaSelecionado = diaSelecionado === d.timestamp;

                if (ehHoje) bloco.classList.add("agenda-item-hoje");
                if (temEvento) bloco.classList.add("agenda-item-evento");
                if (estaSelecionado) bloco.classList.add("agenda-item-selecionado");

                const elDiaSemana = document.createElement("span");
                elDiaSemana.className = "agenda-item-dia-semana";
                elDiaSemana.textContent = diasSemana[d.diaSemana];

                const elCirculo = document.createElement("div");
                elCirculo.className = "agenda-item-circulo";

                const elNumero = document.createElement("span");
                elNumero.className = "agenda-item-numero";
                elNumero.textContent = d.dia;

                const elMes = document.createElement("span");
                elMes.className = "agenda-item-mes";

                // Em telas ≥1600px, mostrar mês apenas no primeiro dia de cada mês
                if (larguraAtiva >= 1600) {
                    const mesAnterior = idx > 0 ? dadosDias[idx - 1].mes : -1;
                    if (d.mes !== mesAnterior) {
                        elMes.textContent = mesesAbr[d.mes];
                    }
                } else {
                    elMes.textContent = mesesAbr[d.mes];
                }

                elCirculo.appendChild(elNumero);
                bloco.appendChild(elDiaSemana);
                bloco.appendChild(elCirculo);
                bloco.appendChild(elMes);

                bloco.addEventListener("click", function () {
                    const prevSelecionado = agendaTrack.querySelector(".agenda-item-selecionado");
                    if (prevSelecionado) {
                        prevSelecionado.classList.remove("agenda-item-selecionado");
                    }
                    this.classList.add("agenda-item-selecionado");
                    diaSelecionado = parseInt(this.dataset.timestamp);
                });

                agendaTrack.appendChild(bloco);
            });

            atualizarMesAno();
        }

        const agendaMesAno = document.getElementById("agendaMesAno");

        const mesesCompleto = [
            "Janeiro", "Fevereiro", "Março", "Abril",
            "Maio", "Junho", "Julho", "Agosto",
            "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        function atualizarMesAno() {
            if (!dadosDias.length) return;

            const contagemMeses = {};
            dadosDias.forEach(d => {
                const chave = `${d.mes}-${d.ano}`;
                contagemMeses[chave] = (contagemMeses[chave] || 0) + 1;
            });

            let mesPredominante = dadosDias[0].mes;
            let anoPredominante = dadosDias[0].ano;
            let maxContagem = 0;

            for (const chave in contagemMeses) {
                if (contagemMeses[chave] > maxContagem) {
                    maxContagem = contagemMeses[chave];
                    const [mes, ano] = chave.split("-");
                    mesPredominante = parseInt(mes);
                    anoPredominante = parseInt(ano);
                }
            }

            agendaMesAno.textContent = `${mesesCompleto[mesPredominante]} ${anoPredominante}`;
        }

        function avancarDias() {
            const passo = getDiasVisiveis() >= 24 ? 10 : DIAS_OFFSET;
            dataCentral.setDate(dataCentral.getDate() + passo);
            renderizarDias();
        }

        function voltarDias() {
            const passo = getDiasVisiveis() >= 24 ? 10 : DIAS_OFFSET;
            dataCentral.setDate(dataCentral.getDate() - passo);
            renderizarDias();
        }

        btnAvancar.addEventListener("click", avancarDias);
        btnVoltar.addEventListener("click", voltarDias);

        renderizarDias();
