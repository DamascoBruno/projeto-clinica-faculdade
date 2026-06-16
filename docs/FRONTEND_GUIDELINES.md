# Frontend Guidelines — Projeto Clínica Faculdade

> Documento de referência oficial para desenvolvimento das próximas páginas do sistema.
> Baseado exclusivamente nos padrões definidos e aprovados durante a construção do dashboard do paciente e página de agendamentos.

---

## 1. Filosofia Visual do Projeto

- Interface médica moderna, limpa e sofisticada
- Design minimalista com hierarquia visual clara
- Aparência premium sem excesso de elementos decorativos
- Prioridade absoluta à legibilidade e usabilidade
- Paleta de cores terrosa e verde (identidade clínica)

**Paleta de cores definida:**

| Variável CSS | Cor | Uso |
|---|---|---|
| `--fundo-primario: #fcfaf5` | Bege claro | Fundo dos cards |
| `--fundo-secundario: #e9e5da` | Bege médio | Fundo da página, cards internos |
| `--verde-cta: #5F6F52` | Verde musgo | Botões, cards de destaque, seleção |
| `--verde-texto: #3E4A3F` | Verde escuro | Textos principais |
| `--marrom-textos: #6E5A4F` | Marrom | Textos secundários, labels |
| `--marrom-selecao-item: #9f8675` | Marrom claro | Navegação, indicadores |
| `--branco: #ffffff` | Branco | Texto sobre fundo verde |
| `--texto-login: #afc496` | Verde suave | Eyebrow texts |

---

## 2. Layout Geral

### Estrutura principal

```html
<div class="dashboard-layout">
    <aside class="sidebar">...</aside>
    <main class="dashboard-content">...</main>
</div>
```

- `.dashboard-layout`: `display: flex; min-height: 100vh`
- `.sidebar`: **260px fixos** (width, min-width, max-width = 260px), `flex-shrink: 0`
- `.dashboard-content`: `flex: 1`

### Organização vertical (seções adaptativas)

```css
.dashboard-content {
    display: flex;
    flex-direction: column;
    gap: 1.5vh;
    padding: 1.5vmax 2vmax;
}
```

As linhas de cards podem utilizar classes de crescimento proporcional quando necessário:

```css
.secao-adaptativa { flex-grow: 1; min-height: 18vh; }
```

### Grid de colunas (Bootstrap)

| Página | Linha | Colunas |
|---|---|---|
| Dashboard paciente | Plano + Agenda | `col-xxl-6 col-xl-6 col-lg-6` (50% cada) |
| Dashboard paciente | Indicadores | `col-xxl-4 col-xl-4 col-md-4` (33% cada) |
| Dashboard paciente | Tratamento + Atividades | `col-xxl-8 col-xl-8 col-lg-8` + `col-xxl-4 col-xl-4 col-lg-4` |
| Agendamentos | Consultas + Calendário | `col-xxl-9 col-xl-9 col-lg-9` + `col-xxl-3 col-xl-3 col-lg-3` |
| Agendamentos | Histórico | `col-12` |

### Princípios

- Evitar áreas vazias desnecessárias
- Cards crescem proporcionalmente ao tamanho da viewport
- Não utilizar `h-100` desnecessário que force esticamento artificial
- Não abusar de `flex-grow-1` em rows — apenas nas seções que realmente precisam crescer

---

## 3. Responsividade

### Breakpoints definidos

| Breakpoint | Comportamento principal |
|---|---|
| **≥ 1600px** | Agenda 24 dias em 2 linhas, padding: 48px |
| **≥ 1400px** | Agenda 12 dias, desktop completo |
| **≥ 1200px** | Agenda 8 dias, colunas laterais |
| **≥ 992px** | Sidebar fixa, agenda 6 dias |
| **≥ 768px** | Tablet |
| **< 768px** | Mobile |

### Comportamentos aprovados

- **Sidebar**: fixa em desktop (≥992px) → drawer lateral com hambúrguer em mobile
- **Agenda (dashboard)**: número de dias visíveis se adapta automaticamente (24 → 12 → 8 → 6)
- **Próximas Atividades**: layout horizontal → vertical no mobile
- **Agendamentos**: layout compacto com wrap no mobile
- **Fontes**: `clamp()` para escalabilidade progressiva
- **Espaçamentos**: redução gradual nos breakpoints menores

### Detecção de breakpoint (JavaScript)

```javascript
const mq1600 = window.matchMedia("(min-width: 1600px)");
const mq1400 = window.matchMedia("(min-width: 1400px)");
const mq992  = window.matchMedia("(min-width: 992px)");
```

Usar `matchMedia` com listener para reagir a redimensionamentos sem polling.

---

## 4. Cards

### Estrutura

```css
.card {
    background-color: var(--fundo-primario);
    border: 1px solid rgba(0,0,0,0.08);   /* borda escura sutil */
    border-radius: 1.5vmax;
}
```

### Cabeçalho (título + ícone)

```css
.card-title-section {
    font-family: var(--fonte-titulo);
    font-weight: 400;              /* peso moderado, evitar bold */
    font-size: clamp(1.4rem, 0.95vw, 1.85rem);
    color: var(--verde-texto);
    margin-bottom: 1.2rem — 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;                 /* espaçamento entre ícone e texto */
    letter-spacing: -0.01em;
    margin-left: 0.5rem — 0.75rem;
    margin-top: 0.5rem — 0.75rem;
}

.card-title-section .icon {
    width: 1.6rem;
    height: 1.6rem;
    flex-shrink: 0;
    line-height: 1;
}
```

### Diretrizes

- Bordas arredondadas (`1.5vmax` para adaptação)
- Padding interno consistente entre cards do mesmo grupo
- Ícone de 1.6rem × 1.6rem com `object-fit: contain`
- Distância de 0.85rem entre ícone e texto do título
- Títulos com peso 400 (leve), não bold
- Borda escura sutil: `rgba(0,0,0,0.08)` em cards principais, `rgba(0,0,0,0.06)` em cards internos

---

## 5. Tipografia

### Fontes do projeto

| Variável | Font | Uso |
|---|---|---|
| `--fonte-titulo` | Playfair Display (serif) | Títulos principais, números grandes, nome do plano |
| `--fonte-texto` | DM Sans (sans-serif) | Corpo, labels, datas, botões |

### Hierarquia tipográfica

| Elemento | Font | Tamanho | Peso |
|---|---|---|---|
| Título da página | `--fonte-titulo` | `clamp(2.4rem, 2vw, 3.2rem)` | 600 |
| Título do plano | `--fonte-titulo` | `clamp(2rem, 1.5vw, 3rem)` | 600 |
| Número de evolução | `--fonte-titulo` | `clamp(2.8rem, 2vw, 4rem)` | 600 |
| Títulos de cards | `--fonte-texto` | `clamp(1.4rem, 0.95vw, 1.85rem)` | 400 |
| Títulos de atividades | `--fonte-texto` | `clamp(1rem, 1vw, 1.3rem)` | 500 |
| Números dos indicadores | `--fonte-titulo` | `clamp(2.5rem, 3vw, 4rem)` | 600 |
| Texto corpo / labels | `--fonte-texto` | 1rem — 1.2rem | 400 |
| Número da agenda | `--fonte-texto` | 1.5rem | 500 |
| Dia da semana (agenda) | `--fonte-texto` | 0.85rem | 500 |
| Mês (agenda) | `--fonte-texto` | 0.8rem | 500 |
| **Agendamentos — título consulta** | `--fonte-texto` | 1.3rem | 600 |
| **Agendamentos — subtítulo consulta** | `--fonte-texto` | 1.1rem | 400 |
| **Agendamentos — data** | `--fonte-texto` | 1.2rem | 600 |
| **Agendamentos — horário** | `--fonte-texto` | 1.1rem | 400 |

### Regras

- **Não** usar `font-weight: 700` (bold) — no máximo 600
- Labels e textos auxiliares com `opacity: 0.75` quando apropriado
- Usar `clamp()` para escalabilidade em vez de media queries de fonte
- `line-height: 1.3` para textos corridos, `1` para números e ícones
- Subtítulos e metadados usar `opacity: 0.75` ou `0.8` para menor destaque

---

## 6. Espaçamentos

### Padding de cards

| Card | Padding base | Mobile |
|---|---|---|
| Plano Atual | `1.5vmax 2vmax` | `1.5vmax 2vmax` |
| Agenda | `1.5vmax` | `1.5vmax` |
| Indicadores | `1.5vmax` | `1.5vmax` |
| Tratamento (tabela) | `1rem 0.75rem` por célula | mantido |
| Atividades (itens) | `1.5rem` | `1rem 1.25rem` |
| **Agendamentos (itens)** | `1.2rem 1.4rem` | `0.9rem 1rem` |
| **Calendário mini** | padding interno `0.2rem 0.1rem` células | mantido |
| **Histórico (itens)** | `1rem 0` | mantido |

### Espaçamentos entre elementos

- Gap entre seções: `1.5vh`
- Gap entre cards na mesma row: Bootstrap `g-4` (1.5rem)
- Gap entre itens de atividades: `1rem`
- Gap entre itens de agendamentos: `0.6rem`
- Distância ícone → título: `0.85rem`
- Distância título → conteúdo: `1.2rem — 1.4rem`
- Margem lateral dos títulos de seção: `0.5rem — 0.75rem`

### Regras

- Preferir unidades relativas (`vmax`, `vh`, `vw`, `rem`)
- Não usar valores em `px` para espaçamentos
- Manter consistência entre cards do mesmo grupo

---

## 7. Agenda (dashboard paciente)

### Estrutura

```html
<div class="agenda-header">
    <img class="agenda-header-icon">   <!-- 1.8rem × 1.8rem -->
    <span class="agenda-header-mes">  <!-- "Junho 2026" -->
    <div class="agenda-nav">
        <button class="agenda-btn">‹</button>
        <button class="agenda-btn">›</button>
    </div>
</div>
<div class="agenda-track" id="agendaTrack">
    <!-- 12 ou 24 .agenda-item gerados via JS -->
</div>
```

### Comportamento responsivo

| Largura | Dias | Layout |
|---|---|---|
| ≥1600px | 24 | CSS Grid 2 linhas × 12 colunas |
| ≥1400px | 12 | Flexbox 1 linha |
| ≥992px | 8 | Flexbox 1 linha |
| <992px | 6 | Flexbox 1 linha |

### Estilo dos dias

```css
.agenda-item-dia-semana { font-size: 0.85rem; letter-spacing: 0.05em; }
.agenda-item-circulo    { width: 3.6rem; height: 3.6rem; border-radius: 50%; border: 1.5px solid rgba(0,0,0,0.08); }
.agenda-item-numero     { font-size: 1.5rem; font-weight: 500; }
.agenda-item-mes        { font-size: 0.8rem; opacity: 0.75; }
```

### Eventos

- Dias com evento recebem classe `.agenda-item-evento`
- Indicador visual: bolinha de 0.6rem abaixo do círculo (`--marrom-selecao-item`)
- Dia atual: `.agenda-item-hoje` (borda verde 2px, sem fundo)
- Dia selecionado: `.agenda-item-selecionado` (fundo verde, texto branco)

### Navegação infinita

- Botões ‹ › avançam/retrocedem datas
- `matchMedia` detecta breakpoint e ajusta `DIAS_VISIVEIS`
- Mês/ano exibido no cabeçalho é calculado dinamicamente (mês predominante)
- Em telas ≥1600px, o mês é exibido apenas no primeiro dia de cada novo mês

---

## 8. Próximas Atividades (dashboard paciente)

### Estrutura

```html
<div class="atividades-list">
    <div class="list-group-item consulta1">
        <div class="atividade-data">12/05</div>
        <div class="atividade-info">
            <strong>Consulta de retorno</strong>
            <small>Dra. Maria Adriana · 14h00</small>
        </div>
    </div>
    <!-- ... -->
</div>
```

### Comportamento responsivo

| Tela | Layout |
|---|---|
| Desktop | `flex-direction: row; align-items: center` — data à esquerda, texto à direita |
| Tablet (<1200px) | Mesmo layout, padding reduzido (`1rem 1.25rem`) |
| Mobile (<768px) | `flex-direction: column; align-items: flex-start` — data acima do texto |

### Indicador lateral colorido

```css
.atividades-list .list-group-item::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10%;
    width: 4px;         /* 3px no mobile */
    height: 80%;        /* 70% no mobile */
    border-radius: 4px;
}
```

- `.consulta1::before` → `--marrom-selecao-item`
- `.consulta2::before` → `--marrom-textos`
- `.consulta3::before` → `--verde-cta`

---

## 9. Meu Tratamento (dashboard paciente)

### Estrutura

Tabela com labels (esquerda) e valores (direita):

```html
<table class="table tabela-tratamento">
    <tbody>
        <tr>
            <td>Médico responsável</td>
            <td>Dra. Maria Adriana</td>
        </tr>
    </tbody>
</table>
```

### Estilo

```css
.tabela-tratamento td {
    font-size: 1rem;
    padding: 1rem 0.75rem;
    color: var(--marrom-textos);
    font-weight: 400;
    vertical-align: middle;
}
.tabela-tratamento td:last-child {
    font-weight: 500;
    color: var(--verde-texto);
    text-align: left;
    padding-right: 0.75rem;
}
```

### Card do medicamento

```css
.card-medicamento {
    background-color: var(--fundo-secundario);
    border: 1px solid rgba(0,0,0,0.08);
    margin-top: 1.5rem;
    border-radius: 1.5rem;
}
.card-medicamento .card-body { padding: 1.5rem; }
.card-medicamento h5    { font-size: 1.3rem; font-weight: 500; margin-bottom: 0.5rem; }
.card-medicamento small { font-size: 0.95rem; opacity: 0.75; }
```

---

## 10. Página de Agendamentos

### Estrutura da página

```html
<!-- Mesma estrutura dashboard-layout + sidebar + dashboard-content -->
<main class="dashboard-content">
    <!-- TOPO com título "Agendamentos" + subtítulo + botão -->
    <!-- LINHA 1: Próximas Consultas (col-xxl-9) + Calendário Mini (col-xxl-3) -->
    <!-- LINHA 2: Histórico Recente (col-12) -->
</main>
```

### Cards de consulta (agendamento-item)

Estrutura horizontal: `[Ícone circular] [Título + Info] [Data + Horário] [Botão Remarcar]`

```html
<div class="agendamento-item">
    <div class="agendamento-icone">
        <img src="/src/img/icon-agendamentos.svg" class="agendamento-icone-img">
    </div>
    <div class="agendamento-info">
        <strong>Consulta de Retorno</strong>
        <span>Profissional <span class="dot">•</span> Especialidade</span>
    </div>
    <div class="agendamento-data-horario">
        <span class="agendamento-data-texto">12 de Maio, 2026</span>
        <span class="agendamento-hora-texto">14:00 – 15:00</span>
    </div>
    <button class="btn-remarcar">Remarcar</button>
</div>
```

### Estilo

```css
.agendamento-item {
    display: flex; align-items: center; gap: 1.2rem;
    padding: 1.2rem 1.4rem; border-radius: 1.2rem;
    background: var(--fundo-secundario);
    margin-bottom: 0.6rem; border: 1px solid rgba(0,0,0,0.06);
}
```

### Ícone circular

```css
.agendamento-icone {
    width: 4rem; height: 4rem; min-width: 4rem;
    border-radius: 50%;
    background-color: var(--fundo-secundario);
    display: flex; align-items: center; justify-content: center;
}
.agendamento-icone-img { width: 4rem; height: 4rem; object-fit: contain; }
.agendamento-icone--integrativa { background-color: #e8ede4; }
```

### Data e horário

```css
.agendamento-data-horario {
    display: flex; flex-direction: column; align-items: flex-end;
    white-space: nowrap; flex-shrink: 0;
}
.agendamento-data-texto { font-size: 1.2rem; font-weight: 600; color: var(--verde-texto); }
.agendamento-hora-texto { font-size: 1.1rem; color: var(--marrom-textos); }
```

### Botão Remarcar

```css
.btn-remarcar {
    background-color: var(--branco);
    border: 1px solid rgba(0,0,0,0.08);
    color: var(--verde-cta);
    font-size: 1.1rem; font-weight: 500;
    padding: 0.4rem 1rem; border-radius: 0.6rem;
    white-space: nowrap; cursor: pointer; flex-shrink: 0;
}
.btn-remarcar:hover {
    background-color: var(--verde-cta); color: var(--branco);
    border-color: var(--verde-cta);
}
```

### Calendário Mini

Calendário mensal tradicional com navegação e indicadores de eventos:

```css
.cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; }
.cal-mes-titulo { font-family: var(--fonte-titulo); font-weight: 600; font-size: 1.2rem; color: var(--verde-texto); }

.cal-btn {
    width: 2.2rem; height: 2.2rem;
    border: 1px solid rgba(0,0,0,0.08);
    background-color: var(--branco);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
}
```

Dias com indicadores:
- `.dia-mini--hoje` — dia atual (borda verde 2px, sem fundo)
- `.dia-mini--medica` — consulta médica (fundo verde)
- `.dia-mini--integrativa` — prática integrativa (fundo secundário)

### Legenda do calendário

```css
.legenda-cal { display: flex; flex-direction: column; gap: 0.5rem; }
.legenda-item { display: flex; align-items: center; gap: 0.6rem; font-size: 1rem; opacity: 0.8; }
.legenda-dot { width: 0.9rem; height: 0.9rem; border-radius: 50%; flex-shrink: 0; }
.legenda-dot--medica { background-color: var(--verde-cta); }
.legenda-dot--integrativa { background-color: var(--fundo-secundario); border: 1.5px solid var(--marrom-selecao-item); }
```

### Histórico Recente

```css
.historico-item {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 1rem; padding: 1rem 0;
    border-bottom: 1px solid var(--fundo-secundario);
    margin-left: 0.5rem;
}
.historico-item--ultimo { border-bottom: none; padding-bottom: 0; }
.historico-item strong { font-size: 1.25rem; font-weight: 500; display: block; }
.historico-item span { font-size: 0.95rem; opacity: 0.7; }
.historico-data { font-size: 1rem; opacity: 0.75; white-space: nowrap; }
```

---

## 11. Sidebar e Navegação

### Desktop (≥992px)

```css
.sidebar {
    width: 260px; min-width: 260px; max-width: 260px;
    background-color: var(--fundo-primario);
    border-right: 1px solid rgba(0,0,0,0.08);
    min-height: 100vh;
    flex-shrink: 0;
}
```

### Mobile (<992px)

A **mesma** `.sidebar` transforma-se em drawer lateral:

```css
@media (max-width: 991.98px) {
    .sidebar {
        position: fixed; top: 0; left: 0;
        width: 260px; height: 100vh;
        z-index: 1050;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    .sidebar.open { transform: translateX(0); }
}
```

### Botão hambúrguer

```html
<button class="mobile-menu-toggle">
    <span class="hamburger-lines"></span>  <!-- 3 barras via CSS -->
</button>
```

- 44×44px, visível apenas <992px
- Três barras de 24×2px geradas via `::before`/`::after`
- Futuramente substituível por `<img src="...">` sem alterar lógica

### Overlay

```html
<div class="mobile-sidebar-overlay"></div>
```

- Fixo, cobre toda a tela (`inset: 0`)
- `background: rgba(0,0,0,0.4)`, `opacity: 0 → 1` com transição
- Clique fecha o menu

### Comportamento de abertura

```javascript
sidebarEl.classList.add("open");
overlay.classList.add("open");
dashboardLayout.classList.add("menu-open");
```

- Conteúdo principal desloca 260px para direita
- Fecha ao clicar no overlay, em qualquer link, ou pressionar ESC

### Navegação entre páginas

- Usar links relativos: `../Agendamentospaciente/index.html`
- Item ativo: classe `.active` no `list-group-item` correspondente

---

## 12. Boas Práticas de Código

### HTML

- Evitar duplicação de componentes (ex: não criar sidebar mobile separada — reutilizar a desktop)
- Usar classes semânticas e consistentes
- Preferir estrutura plana e legível
- Toda página nova deve reutilizar: `dashboard-layout` > `sidebar` + `dashboard-content`
- Incluir overlay e JavaScript do menu mobile

### CSS

- Usar `clamp()` para fontes escaláveis
- Usar `vmax`, `vh`, `rem` para espaçamentos
- Evitar valores fixos em `px`
- Breakpoints via media queries
- Manter seletores organizados por seção
- **Bordas**: `rgba(0,0,0,0.08)` para cards principais, `rgba(0,0,0,0.06)` para cards internos
- Reutilizar as mesmas variáveis CSS do dashboard (`--fundo-primario`, `--verde-cta`, etc.)

### JavaScript

- JavaScript puro (vanilla), sem dependências externas
- `matchMedia` com listener para breakpoints
- Funções pequenas e reutilizáveis
- Nomes descritivos em português (`renderizarDias`, `abrirMenuMobile`)
- Incluir sempre o script do menu mobile

---

## 13. Restrições do Projeto

- ❌ Não adicionar novos padrões visuais sem aprovação
- ❌ Não modificar a paleta de cores estabelecida
- ❌ Não criar novos componentes sem necessidade comprovada
- ❌ Não utilizar `font-weight: 700` (bold)
- ❌ Não utilizar valores fixos em `px` para fontes ou espaçamentos
- ❌ Sempre reutilizar os padrões documentados neste arquivo
- ✅ Qualquer nova tela deve seguir integralmente estas diretrizes

---

*Última atualização: Junho 2026 — baseado no dashboard do paciente e página de agendamentos aprovados.*