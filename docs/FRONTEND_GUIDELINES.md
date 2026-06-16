# Frontend Guidelines — Projeto Clínica Faculdade

> Documento de referência oficial para desenvolvimento das próximas páginas do sistema.
> Baseado exclusivamente nos padrões definidos e aprovados durante a construção do dashboard do paciente.

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

As linhas de cards utilizam classes de crescimento proporcional:

```css
.secao-adaptativa { flex-grow: 1; min-height: 18vh; }
.secao-inferior    { flex-grow: 2; min-height: 35vh; }
```

### Grid de colunas (Bootstrap)

| Linha | Colunas |
|---|---|
| Plano + Agenda | `col-xxl-6 col-xl-6 col-lg-6` (50% cada) |
| Indicadores | `col-xxl-4 col-xl-4 col-md-4` (33% cada) |
| Tratamento + Atividades | `col-xxl-8 col-xl-8 col-lg-8` + `col-xxl-4 col-xl-4 col-lg-4` |

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
- **Agenda**: número de dias visíveis se adapta automaticamente (24 → 12 → 8 → 6)
- **Próximas Atividades**: layout horizontal → vertical no mobile
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
    border: 1px solid var(--fundo-secundario);
    border-radius: 1.5vmax;
}
```

### Cabeçalho (título + ícone)

```css
.card-title-section {
    font-family: var(--fonte-texto);
    font-weight: 400;              /* peso moderado, evitar bold */
    font-size: clamp(1.4rem, 0.95vw, 1.85rem);
    color: var(--verde-texto);
    margin-bottom: 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;                 /* espaçamento entre ícone e texto */
    letter-spacing: -0.01em;
    margin-left: 0.75rem;
    margin-top: 0.75rem;
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
| Título da página (Olá, Ana Paula!) | `--fonte-titulo` | `clamp(2.4rem, 2vw, 3.2rem)` | 600 |
| Título do plano | `--fonte-titulo` | `clamp(2rem, 1.5vw, 3rem)` | 600 |
| Número de evolução (72%) | `--fonte-titulo` | `clamp(2.8rem, 2vw, 4rem)` | 600 |
| Títulos de cards | `--fonte-texto` | `clamp(1.4rem, 0.95vw, 1.85rem)` | 400 |
| Títulos de atividades | `--fonte-texto` | `clamp(1rem, 1vw, 1.3rem)` | 500 |
| Números dos indicadores | `--fonte-titulo` | `clamp(2.5rem, 3vw, 4rem)` | 600 |
| Texto corpo / labels | `--fonte-texto` | 1rem — 1.2rem | 400 |
| Número da agenda | `--fonte-texto` | 1.5rem | 500 |
| Dia da semana (agenda) | `--fonte-texto` | 0.85rem | 500 |
| Mês (agenda) | `--fonte-texto` | 0.8rem | 500 |

### Regras

- **Não** usar `font-weight: 700` (bold) — no máximo 600
- Labels e textos auxiliares com `opacity: 0.75` quando apropriado
- Usar `clamp()` para escalabilidade em vez de media queries de fonte
- `line-height: 1.3` para textos corridos, `1` para números e ícones

---

## 6. Espaçamentos

### Padding de cards

| Card | Padding base | Redução 1200px | Redução 768px |
|---|---|---|---|
| Plano Atual | `1.5vmax 2vmax` | automático via vmax | automático |
| Agenda | `1.5vmax` | automático | automático |
| Indicadores | `1.5vmax` | automático | automático |
| Tratamento (tabela) | `1rem 0.75rem` por célula | mantido | mantido |
| Atividades (itens) | `1.5rem` desktop → `1rem 1.25rem` tablet → `1rem 1.25rem` mobile | — | — |

### Espaçamentos entre elementos

- Gap entre seções: `1.5vh`
- Gap entre cards na mesma row: Bootstrap `g-4` (1.5rem)
- Gap entre itens de atividades: `1rem`
- Distância ícone → título: `0.85rem`
- Distância título → conteúdo: `1.4rem`
- Margem lateral dos títulos de seção: `0.75rem`

### Regras

- Preferir unidades relativas (`vmax`, `vh`, `vw`, `rem`)
- Não usar valores em `px` para espaçamentos
- Manter consistência entre cards do mesmo grupo

---

## 7. Agenda

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
.agenda-item-circulo    { width: 3.6rem; height: 3.6rem; border-radius: 50%; border: 1.5px solid; }
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

## 8. Próximas Atividades

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
    top: 10%;           /* centralizado verticalmente */
    width: 4px;         /* 3px no mobile */
    height: 80%;        /* 70% no mobile */
    border-radius: 4px;
}
```

Cores:
- `.consulta1::before` → `--marrom-selecao-item`
- `.consulta2::before` → `--marrom-textos`
- `.consulta3::before` → `--verde-cta`

---

## 9. Meu Tratamento

### Estrutura

Tabela com labels (esquerda) e valores (direita):

```html
<table class="table tabela-tratamento">
    <tbody>
        <tr>
            <td>Médico responsável</td>
            <td>Dra. Maria Adriana</td>
        </tr>
        <!-- ... -->
    </tbody>
</table>
```

### Estilo

```css
.tabela-tratamento td {
    font-size: 1rem;
    padding: 1rem 0.75rem;     /* padding horizontal uniforme */
    color: var(--marrom-textos);
    font-weight: 400;
    vertical-align: middle;
}
.tabela-tratamento td:last-child {
    font-weight: 500;
    color: var(--verde-texto);
    text-align: left;           /* alinhado à esquerda */
    padding-right: 0.75rem;
}
```

### Card do medicamento

```css
.card-medicamento {
    background-color: var(--fundo-secundario);
    margin-top: 1.5rem;
    border-radius: 1.5rem;
}
.card-medicamento .card-body { padding: 1.5rem; }
.card-medicamento h5    { font-size: 1.3rem; font-weight: 500; margin-bottom: 0.5rem; }
.card-medicamento small { font-size: 0.95rem; opacity: 0.75; }
```

---

## 10. Sidebar e Navegação

### Desktop (≥992px)

```css
.sidebar {
    width: 260px; min-width: 260px; max-width: 260px;
    background-color: var(--fundo-primario);
    border-right: 1px solid var(--fundo-secundario);
    min-height: 100vh;
    flex-shrink: 0;
}
```

### Mobile (<992px)

A **mesma** `.sidebar` transforma-se em drawer lateral:

```css
@media (max-width: 991.98px) {
    .sidebar {
        position: fixed;
        top: 0; left: 0;
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

---

## 11. Boas Práticas de Código

### HTML

- Evitar duplicação de componentes (ex: não criar sidebar mobile separada — reutilizar a desktop)
- Usar classes semânticas e consistentes
- Preferir estrutura plana e legível

### CSS

- Usar `clamp()` para fontes escaláveis
- Usar `vmax`, `vh`, `rem` para espaçamentos
- Evitar valores fixos em `px`
- Breakpoints em `em`/`px` via media queries
- Manter seletores organizados por seção

### JavaScript

- JavaScript puro (vanilla), sem dependências externas
- `matchMedia` com listener para breakpoints
- Funções pequenas e reutilizáveis
- Nomes descritivos em português (`renderizarDias`, `abrirMenuMobile`)

---

## 12. Restrições do Projeto

- ❌ Não adicionar novos padrões visuais sem aprovação
- ❌ Não modificar a paleta de cores estabelecida
- ❌ Não criar novos componentes sem necessidade comprovada
- ❌ Não utilizar `font-weight: 700` (bold)
- ❌ Não utilizar valores fixos em `px` para fontes ou espaçamentos
- ❌ Sempre reutilizar os padrões documentados neste arquivo
- ✅ Qualquer nova tela deve seguir integralmente estas diretrizes

---

*Última atualização: Junho 2026 — baseado no dashboard do paciente aprovado.*