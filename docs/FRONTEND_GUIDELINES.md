# Frontend Guidelines — Projeto Clínica Faculdade

> Documento de referência oficial para desenvolvimento das próximas páginas do sistema.
> Baseado exclusivamente nos padrões definidos e aprovados durante a construção do dashboard do paciente, página de agendamentos e página "Meu Tratamento".

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
| `--marrom-selecao-item: #9f8675` | Marrom claro | Navegação, indicadores, hover |
| `--branco: #ffffff` | Branco | Texto sobre fundo verde |
| `--texto-login: #afc496` | Verde suave | Eyebrow texts, links secundários |

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
.secao-adaptativa { flex-grow: 1; }
```

### Grid de colunas (Bootstrap)

| Página | Linha | Colunas |
|---|---|---|
| Dashboard paciente | Plano + Agenda | `col-xxl-6 col-xl-6 col-lg-6` (50% cada) |
| Dashboard paciente | Indicadores | `col-xxl-4 col-xl-4 col-md-4` (33% cada) |
| Dashboard paciente | Tratamento + Atividades | `col-xxl-8 col-xl-8 col-lg-8` + `col-xxl-4 col-xl-4 col-lg-4` |
| Agendamentos | Consultas + Calendário | `col-xxl-9 col-xl-9 col-lg-9` + `col-xxl-3 col-xl-3 col-lg-3` |
| Agendamentos | Histórico | `col-12` |
| Meu Tratamento | Plano Atual | `col-12` (largura total) |
| Meu Tratamento | Detalhes + Metas | `col-xxl-6 col-xl-6 col-lg-6` (50% cada, lado a lado) |
| Prescrições | Cards de resumo (3) | `col-lg-4 col-md-6` |
| Prescrições | Receitas | `col-lg-6` (50% cada, lado a lado) |

### Princípios

- **Evitar áreas vazias excessivas** — nem esticar componentes desnecessariamente nem deixar espaços mortos
- **Proporção visual agradável** — cards não devem crescer infinitamente apenas porque existe espaço disponível
- **Alinhamento de extremidades** — conjuntos de cards relacionados devem manter alinhamento entre si
- **Distribuição inteligente** — conteúdo ocupa a largura de forma equilibrada, sem extremos
- **Consistência entre páginas** — todas as telas devem parecer parte do mesmo produto

---

## 3. Responsividade

### Breakpoints definidos

| Breakpoint | Comportamento principal |
|---|---|
| **≥ 1600px** | Agenda 24 dias em 2 linhas |
| **≥ 1400px** | Desktop grande, estrutura completa |
| **≥ 1200px** | Grid completo |
| **≥ 992px** | Sidebar fixa, grid adapta |
| **≥ 768px** | Tablet |
| **< 768px** | Mobile |

### Comportamentos aprovados

- **Sidebar**: fixa em desktop (≥992px) → drawer lateral com hambúrguer em mobile
- **Agenda (dashboard)**: número de dias visíveis se adapta automaticamente (24 → 12 → 8 → 6)
- **Próximas Atividades**: layout horizontal → vertical no mobile
- **Agendamentos**: layout compacto com wrap no mobile
- **Detalhes/Metas (Meu Tratamento)**: lado a lado em desktop, empilhados em <1200px
- **Fontes**: `clamp()` para escalabilidade progressiva
- **Espaçamentos**: redução gradual nos breakpoints menores
- **Conteúdo não deve parecer comprimido** em tablets
- **Margens laterais consistentes** em mobile

### Detecção de breakpoint (JavaScript)

```javascript
const mq1600 = window.matchMedia("(min-width: 1600px)");
const mq1400 = window.matchMedia("(min-width: 1400px)");
const mq992  = window.matchMedia("(min-width: 992px)");
```

Usar `matchMedia` com listener para reagir a redimensionamentos sem polling.

### Regras para telas grandes
- Componentes **não devem crescer infinitamente** apenas porque há espaço
- Conjuntos de cards relacionados devem manter **alinhamento entre si**
- Extremidades dos componentes devem seguir **eixos visuais consistentes**

---

## 4. Cards

### Estrutura

```css
.card {
    background-color: var(--fundo-primario);
    border: 1px solid rgba(0,0,0,0.10);
    border-radius: 1.2vmax;
}
```

### Cabeçalho

```css
.card-title-section {
    font-family: var(--fonte-titulo);
    font-weight: 400;
    font-size: clamp(1.4rem, 0.95vw, 1.85rem);
    color: var(--verde-texto);
    margin-bottom: 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    letter-spacing: -0.01em;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
}

.card-title-section .icon {
    width: 1.6rem;
    height: 1.6rem;
    flex-shrink: 0;
    line-height: 1;
}
```

### Diretrizes

- **Bordas**: `rgba(0,0,0,0.10)` — fina, sutil, cria sensação de profundidade
- **Cards internos** (como itens de agendamento): `rgba(0,0,0,0.06)`
- **Border-radius**: `1.2vmax` para adaptação; evitar cantos excessivamente arredondados
- **Padding interno consistente** entre cards do mesmo grupo
- **Ícone/título**: gap de 0.85rem
- **Títulos com peso 400** — evitar bold
- **Topo e base do card devem ter equilíbrio visual**: margem inferior não deve parecer menor que a superior
- **Respiração inferior**: sempre garantir espaço adequado abaixo do último elemento

### Distribuição interna

- Conteúdos relacionados devem ser agrupados visualmente
- Grupos diferentes devem possuir separação perceptível (maior espaçamento entre eles do que dentro deles)
- Hierarquia visual clara entre informações principais, secundárias e auxiliares

---

## 5. Tipografia

### Fontes do projeto

| Variável | Font | Uso |
|---|---|---|
| `--fonte-titulo` | Playfair Display (serif) | Títulos principais, números grandes, nome do plano |
| `--fonte-texto` | DM Sans (sans-serif) | Corpo, labels, datas, botões |

### Hierarquia tipográfica

| Nível | Elemento | Font | Tamanho | Peso |
|---|---|---|---|---|
| **1** | Título da página | `--fonte-titulo` | `clamp(2.4rem, 2vw, 3.2rem)` | 600 |
| **2** | Título do plano | `--fonte-titulo` | `clamp(2rem, 1.5vw, 3rem)` | 600 |
| **3** | Número de evolução | `--fonte-titulo` | `clamp(2.8rem, 2vw, 4rem)` | 600 |
| **4** | Títulos de cards | `--fonte-texto` | `clamp(1.4rem, 0.95vw, 1.85rem)` | 400 |
| **5** | Títulos de atividades / consultas | `--fonte-texto` | `clamp(1rem, 1vw, 1.3rem)` | 500 — 600 |
| **6** | Números dos indicadores | `--fonte-titulo` | `clamp(2.5rem, 3vw, 4rem)` | 600 |
| **7** | Texto corpo / labels | `--fonte-texto` | 1rem — 1.2rem | 400 |
| **8** | Informações secundárias | `--fonte-texto` | 0.95rem — 1.1rem | 400, `opacity: 0.75` |
| **9** | Informações auxiliares | `--fonte-texto` | 0.85rem — 0.95rem | 400, `opacity: 0.7` |
| **10** | Número da agenda | `--fonte-texto` | 1.5rem | 500 |
| **11** | Dia da semana (agenda) | `--fonte-texto` | 0.85rem | 500 |

### Regras

- **Não usar `font-weight: 700` (bold)** — no máximo 600
- Labels e textos auxiliares com `opacity: 0.75` ou `0.7` quando apropriado
- Usar `clamp()` para escalabilidade
- `line-height: 1.3` para textos corridos, `1` para números e ícones
- Informações principais devem receber **maior destaque**
- Informações secundárias **nunca devem competir visualmente** com informações principais
- Subtítulos e metadados usar `opacity: 0.75`/`0.8` para menor destaque

---

## 6. Espaçamentos

### Padding de cards por página

| Card | Padding base | Mobile |
|---|---|---|
| Plano Atual (dashboard) | `1.5vmax 2vmax` | mantido |
| Agenda | `1.5vmax` | mantido |
| Indicadores | `1.5vmax` | mantido |
| Tratamento (tabela) | `1rem 0.75rem` por célula | mantido |
| Atividades (itens) | `1.5rem` | `1rem 1.25rem` |
| Agendamentos (itens) | `1.2rem 1.4rem` | `0.9rem 1rem` |
| Calendário mini | células `0.2rem 0.1rem` | mantido |
| Histórico (itens) | `1rem 0` | mantido |
| **Plano (Meu Tratamento)** | `2rem 2.5rem` | `1.5rem` |
| **Detalhes/Metas (Meu Tratamento)** | 50/50 lado a lado | empilhados |

### Espaçamentos entre elementos

| Contexto | Gap |
|---|---|
| Entre seções no `dashboard-content` | `1.5vh` |
| Entre cards na mesma row | Bootstrap `g-4` (1.5rem) |
| Entre itens de atividades | `1rem` |
| Entre itens de agendamentos | `0.6rem` |
| Distância ícone → título | `0.85rem` |
| Distância título → conteúdo | `1.2rem — 1.4rem` |
| Margem lateral dos títulos de seção | `0.5rem — 0.75rem` |
| **Entre metas (Meu Tratamento)** | `2.6rem` + `1.4rem` padding-bottom + `border-bottom` |
| Entre porcentagem e badge auxiliar | `0.8rem` no card plano tratamento |
| Entre label e número no plano tratamento | `0.15rem` e `0.6rem` |

### Regras

- Preferir unidades relativas (`vmax`, `vh`, `vw`, `rem`)
- Manter consistência entre cards do mesmo grupo
- **Elementos relacionados**: espaçamentos menores
- **Grupos diferentes**: espaçamentos perceptivelmente maiores

---

## 7. Regras de Alinhamento

### Princípios

- **Alinhamentos devem ser consistentes** dentro de cada componente
- **Conteúdos relacionados devem compartilhar o mesmo eixo visual**
- Evitar centralizações desnecessárias, deslocamentos inconsistentes, múltiplos eixos visuais

### Alinhamentos aprovados

| Seção | Alinhamento |
|---|---|
| Plano Atual (dashboard) | Centralizado (`justify-content-center`) |
| Indicadores | Alinhado à esquerda (`align-items: flex-start`) |
| Tratamento (tabela) | Labels à esquerda, valores **alinhados à direita** |
| Atividades | À esquerda nos itens, `space-between` vertical |
| Agendamentos (itens) | Data à esquerda, info central, hora/direita |
| **Evolução (Meu Tratamento)** | **Alinhado à direita** — label, número e badge |
| **Detalhes/Metas** | Título à esquerda com `margin-left: 0.5rem`, metas com `margin-left: 0.5rem` |
| **Tabela Meu Tratamento** | Labels à esquerda, valores **alinhados à direita** |

---

## 8. Agenda (dashboard paciente)

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

### Navegação infinita
- Botões ‹ › avançam/retrocedem datas
- `matchMedia` detecta breakpoint e ajusta `DIAS_VISIVEIS`
- Mês/ano é calculado dinamicamente (mês predominante)
- Em telas ≥1600px, mês exibido apenas no primeiro dia de cada novo mês

---

## 9. Próximas Atividades (dashboard paciente)

```css
.atividades-list .list-group-item {
    position: relative;
    border: 1px solid rgba(0,0,0,0.10);
    border-radius: 1.4rem;
    background: #f7f5f0;
}
```

Indicador lateral: `::before` com 4px de largura, altura 80%, top 10%, border-radius 4px.

### Comportamento responsivo

| Tela | Layout |
|---|---|
| Desktop | `flex-direction: row` |
| Tablet (<1200px) | Padding reduzido |
| Mobile (<768px) | `flex-direction: column` |

---

## 10. Meu Tratamento (página)

### Estrutura

**Linha 1**: Plano Atual (`col-12` — largura total) — card verde com evolução à direita
**Linha 2**: Detalhes Clínicos + Metas do Tratamento (`col-xxl-6 col-xl-6 col-lg-6` cada, lado a lado)

### Card Plano Atual

```css
.card-plano-trat { background-color: var(--verde-cta); border: none; }
.card-plano-trat .card-body { padding: 2rem 2.5rem; }
```

**Área de evolução**: alinhada à direita:
```css
.trat-evolucao-wrapper { text-align: right; display: inline-block; }
.trat-evolucao-label   { font-size: 0.9rem; font-weight: 500; opacity: 0.8; margin-bottom: 0.15rem; }
.evolucao-trat         { font-size: clamp(2.8rem, 2vw, 3.8rem); margin-bottom: 0.6rem; }
.badge-up-trat         { font-size: 0.95rem; font-weight: 400; opacity: 0.7; margin-top: 0.8rem; background: none; }
```

### Detalhes Clínicos

Tabela com padding: `1.4rem 0.75rem 1.4rem 0.5rem`. Última linha `padding-bottom: 1.5rem`. Valores alinhados à direita.

### Metas do Tratamento

```css
.meta-item { margin-bottom: 2.6rem; margin-left: 0.5rem; padding-bottom: 1.4rem; border-bottom: 1px solid var(--fundo-secundario); }
.meta-label { font-size: 1.1rem; color: var(--verde-texto); font-weight: 500; margin-bottom: 0.3rem; }
.meta-valor { font-size: 1.25rem; color: var(--verde-cta); font-weight: 600; }
.meta-barra { height: 0.5rem; border-radius: 1rem; overflow: hidden; margin: 0.5rem 0 0.3rem; }
```

### Âncora de navegação contextual
```css
.trat-ancora { display: inline-block; font-size: 0.95rem; color: var(--texto-login); margin-top: 0.4rem; }
```

---

## 11. Página de Agendamentos

### Estrutura
- Linha 1: Próximas Consultas (`col-xxl-9 col-xl-9 col-lg-9`) + Calendário Mini (`col-xxl-3 col-xl-3 col-lg-3`)
- Linha 2: Histórico Recente (`col-12`)

### Cards de consulta

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
    <button class="btn btn-remarcar">Remarcar</button>
</div>
```

---

## 12. Sidebar e Navegação

### Desktop (≥992px)

```css
.sidebar {
    width: 260px; min-width: 260px; max-width: 260px;
    background-color: var(--fundo-primario);
    border-right: 1px solid rgba(0,0,0,0.08);
    min-height: 100vh; flex-shrink: 0;
}
```

### Mobile (<992px)

A **mesma** `.sidebar` transforma-se em drawer lateral com `position: fixed; transform: translateX(-100%) → translateX(0)`

### Menu hambúrguer

```html
<button class="mobile-menu-toggle">
    <span class="hamburger-lines"></span>
</button>
```

44×44px, visível apenas <992px. Três barras via CSS `::before`/`::after`. Futuramente substituível por `<img>`.

### Overlay

```css
.mobile-sidebar-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.4);
    opacity: 0 → 1; visibility: hidden → visible;
    z-index: 1040;
}
```

### Comportamento de abertura

```javascript
sidebarEl.classList.add("open");
overlay.classList.add("open");
dashboardLayout.classList.add("menu-open");
```

- Conteúdo principal desloca 260px para direita
- Fecha ao clicar no overlay, em links, ou pressionar ESC

---

## 13. Boas Práticas de Código

### HTML

- Evitar duplicação de componentes — reutilizar sidebar, overlay
- Usar classes semânticas e consistentes
- Incluir sempre overlay + JavaScript do menu mobile
- Links entre páginas: caminhos relativos (`../Agendamentospaciente/index.html`)

### CSS

- Usar `clamp()` para fontes escaláveis
- Usar `vmax`, `vh`, `rem` para espaçamentos
- Evitar `px` fixos
- **Bordas**: `rgba(0,0,0,0.10)` (cards principais), `rgba(0,0,0,0.06)` (cards internos)
- Reutilizar variáveis CSS

### JavaScript
- Vanilla JS, sem dependências
- `matchMedia` com listener para breakpoints
- Nomes descritivos em português

---

## 14. Processo obrigatório para novas telas

Antes de iniciar qualquer nova página:
1. **Consultar integralmente** o FRONTEND_GUIDELINES
2. **Reutilizar padrões existentes** (sidebar, cards, tipografia, bordas)
3. **Garantir consistência visual** com telas aprovadas
4. **Aplicar regras de responsividade** documentadas
5. **Validar alinhamentos e espaçamentos**
6. **Revisar hierarquia tipográfica**
7. **Confirmar que a tela pertence ao mesmo produto**

---

## 15. Restrições do Projeto

- ❌ Não adicionar novos padrões visuais sem aprovação
- ❌ Não modificar a paleta de cores estabelecida
- ❌ Não criar novos componentes sem necessidade comprovada
- ❌ Não utilizar `font-weight: 700` (bold)
- ❌ Não utilizar valores fixos em `px` para fontes ou espaçamentos
- ❌ Não utilizar Bootstrap Icons ou dependências externas não aprovadas
- ✅ Sempre reutilizar os padrões documentados neste arquivo

---

*Última atualização: Junho 2026 — baseado no dashboard do paciente, agendamentos e "Meu Tratamento" aprovados.*