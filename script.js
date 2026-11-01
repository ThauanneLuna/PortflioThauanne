/*
 * Portfólio Thauanne Luna — versão estática (JavaScript puro)
 *
 * Substitui o que antes era feito por React + TanStack Router:
 *   1. Roteamento por hash (#/sobre, #/projetos...) — funciona no GitHub Pages sem backend
 *   2. Tema claro/escuro (salvo em localStorage, chave "thau-luna-theme")
 *   3. Splash de abertura (uma vez por sessão)
 *   4. Menu mobile
 *   5. Filtro de projetos por categoria + janela de detalhes
 *   6. Copiar e-mail e formulário de orçamento (abre o WhatsApp)
 *
 * Para editar os projetos, altere apenas o array PROJECTS abaixo.
 */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5585987511775";
  var EMAIL = "luna.thauannedesign@gmail.com";

  /* ------------------------------------------------------------------
     Utilidades
     ------------------------------------------------------------------ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(name) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }
  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ------------------------------------------------------------------
     Dados dos projetos (mesmo conteúdo do projeto original)
     ------------------------------------------------------------------ */
  var CATEGORIES = ["Todos", "Design gráfico", "Desenvolvimento web", "Produtos personalizados", "Autorais & editoriais"];

  var EMPTY_TEXT = {
    "Design gráfico": "Peças como identidades visuais, logotipos, cartões, panfletos, convites e artes gráficas aparecerão aqui quando as imagens e informações forem enviadas.",
    "Produtos personalizados": "Acessórios, pulseiras, chaveiros e outros produtos aparecerão aqui quando as fotos e descrições forem enviadas."
  };

  var PROJECTS = [
    {
      title: "Thau Luna Studio", kind: "Marca autoral", category: "Marca própria · Identidade visual e presença digital",
      categories: ["Design gráfico", "Desenvolvimento web", "Produtos personalizados", "Autorais & editoriais"],
      tags: ["Marca própria", "Identidade visual", "Presença digital"], image: "assets/img/project-thau-luna.png",
      href: "https://thauanneluna.github.io/siteinstitucionalthauacessorios/",
      summary: "Minha marca autoral, em constante evolução. Nasceu da Thau Luna Acessórios e hoje reúne design gráfico, identidade visual, produtos personalizados, acessórios, desenvolvimento web e soluções digitais.",
      tools: "HTML e CSS no site publicado. Demais ferramentas de criação variam conforme cada peça da marca.",
      objective: "Dar forma a uma marca que acompanhasse meu crescimento: deixar de ser apenas uma loja de acessórios para se tornar um estúdio criativo, capaz de comunicar com clareza tudo o que faço.",
      context: "A Thau Luna Acessórios foi o ponto de partida. Com o tempo, meus estudos em design e tecnologia ampliaram o que eu oferecia, e a marca precisou crescer junto, dando origem à Thau Luna Studio.",
      planning: "Definir o que a marca representa, quais serviços e produtos ela reúne e como apresentá-los de forma coerente — tanto nas peças visuais quanto no ambiente digital.",
      process: "A identidade foi construída e revisada aos poucos, buscando uma linguagem delicada e feminina, com tons de rosa, carmim, creme e dourado e uma assinatura caligráfica que traduz a personalidade da marca.",
      development: "Aplicação da identidade em peças gráficas e produtos, e criação de um site para apresentar a marca e seus acessórios, levando a Thau Luna também para o ambiente digital.",
      result: "Uma marca com identidade própria, presença digital e um site publicado. É um projeto vivo, que continua sendo ajustado à medida que a marca evolui.",
      learnings: "Construir a própria marca me ensinou a unir criatividade, design e empreendedorismo — e a enxergar a identidade visual como algo que amadurece junto com o negócio.",
      highlights: ["Construção e evolução da identidade visual", "Posicionamento e comunicação da marca", "Integração entre criatividade, design e empreendedorismo", "Presença digital e desenvolvimento da marca"]
    },
    {
      title: "Luna's Library", kind: "Projeto autoral", category: "Projeto autoral · Plataforma digital e publicação editorial",
      categories: ["Desenvolvimento web", "Autorais & editoriais"],
      tags: ["Plataforma digital", "Literatura", "Supabase"], image: "assets/img/project-lunas-library.webp",
      status: "Em breve",
      summary: "Plataforma digital independente dedicada à literatura, à leitura e à publicação de livros digitais. Nasce como extensão da Thau Luna Studio, mas com identidade própria.",
      tools: "HTML, CSS, JavaScript e Supabase.",
      objective: "Criar um espaço onde leitores possam descobrir, ler e organizar livros digitais, e onde histórias possam ser publicadas e compartilhadas em um ambiente acolhedor.",
      context: "A Luna's Library surgiu do meu interesse por literatura e da vontade de levar a Thau Luna Studio para o universo editorial, com uma marca e uma linguagem visual próprias. A plataforma ainda não foi lançada oficialmente.",
      planning: "Organização das principais áreas da plataforma — catálogo, leitura, estante pessoal e comunidade — e do caminho do leitor entre elas.",
      process: "Desenvolvimento de uma identidade própria, representada pela lua e pelo livro aberto, e de uma interface pensada para tornar a leitura confortável e convidativa.",
      development: "Construção da interface com HTML, CSS e JavaScript e uso do Supabase para autenticação e organização dos dados dos usuários.",
      result: "Plataforma em fase de preparação para lançamento, com catálogo, leitura por capítulos, estante pessoal, comunidade e experiências interativas.",
      learnings: "O projeto ampliou minha experiência com aplicações web mais completas, envolvendo contas de usuário, dados e uma experiência de uso contínua.",
      highlights: ["Catálogo e busca de livros", "Leitura digital por capítulos", "Minha Estante", "Comunidade", "Quizzes e experiências interativas", "Autenticação e organização dos usuários", "Experiência e interface do leitor"]
    },
    {
      title: "Vasconcelos Group", kind: "Projeto conceitual", category: "Projeto web · Empresa fictícia",
      categories: ["Desenvolvimento web"],
      tags: ["Site institucional", "Empresa fictícia", "Interface web"], image: "assets/img/project-vasconcelos.png",
      href: "https://thauanneluna.github.io/Vasconcelos_Group/",
      summary: "Site institucional desenvolvido para uma empresa fictícia. Um projeto conceitual — não se trata de um cliente nem de uma empresa real.",
      tools: "HTML e CSS.",
      objective: "Desenvolver uma página institucional que apresentasse a organização, sua proposta e sua identidade no ambiente digital.",
      context: "O Vasconcelos Group foi criado como cenário para praticar a construção de um site corporativo, simulando as necessidades de uma empresa que deseja se apresentar on-line.",
      planning: "Definição das seções de um site institucional e da ordem em que as informações deveriam aparecer para o visitante.",
      process: "Busca por uma composição visual sóbria e organizada, coerente com a imagem de uma empresa.",
      development: "Estruturação e estilização das páginas, com atenção à hierarquia das informações e à leitura da interface.",
      result: "Site institucional publicado, apresentando a marca fictícia de forma organizada.",
      learnings: "Pensar a presença digital de uma marca do início ao fim, mesmo em um cenário conceitual.",
      highlights: ["Estruturação de um site institucional", "Organização e hierarquia das informações", "Composição visual e interface", "Presença digital de uma marca fictícia"]
    },
    {
      title: "World Perfect Personalizados", kind: "Negócio real", category: "Projeto web · Loja existente",
      categories: ["Desenvolvimento web", "Produtos personalizados"],
      tags: ["Página comercial", "Personalizados", "Interface web"], image: "assets/img/project-world-perfect.png",
      href: "https://thauanneluna.github.io/WorldPerfect/",
      summary: "Página web desenvolvida para a World Perfect Personalizados, uma loja existente de produtos personalizados.",
      tools: "HTML e CSS.",
      objective: "Trabalhar a apresentação digital do negócio, valorizando seus produtos e sua proposta comercial.",
      context: "A World Perfect Personalizados é uma loja real. O projeto foi uma oportunidade de aplicar o desenvolvimento web a um contexto comercial concreto.",
      planning: "Organização das informações comerciais e da forma de apresentar os produtos na página.",
      process: "Composição visual voltada a destacar os produtos personalizados de maneira clara e atrativa.",
      development: "Construção da página com foco na interface e na experiência de navegação do visitante.",
      result: "Página publicada com a apresentação dos produtos e da proposta da loja.",
      learnings: "Desenvolver para um negócio real trouxe um olhar mais prático sobre como organizar informações pensando em quem compra.",
      highlights: ["Página para um negócio real", "Apresentação de produtos personalizados", "Organização das informações comerciais", "Interface e experiência de navegação", "Desenvolvimento web em contexto comercial"]
    },
    {
      title: "Teen Wolf", kind: "Projeto de fã", category: "Projeto de fã · Estudo de layout e desenvolvimento web",
      categories: ["Desenvolvimento web"],
      tags: ["HTML", "CSS", "Layout temático"], image: "assets/img/project-teen-wolf.jpg",
      href: "https://thauanneluna.github.io/TeenWolf/",
      summary: "Site de fã inspirado no universo da série Teen Wolf. Projeto pessoal, sem caráter comercial e sem vínculo oficial com a produção da série.",
      tools: "HTML e CSS.",
      objective: "Praticar HTML e CSS a partir de um tema de interesse pessoal, desenvolvendo um layout temático.",
      context: "Projeto criativo e de prática, feito por admiração à série.",
      process: "Composição visual inspirada na atmosfera da série, com cores e elementos que remetem ao seu universo.",
      development: "Organização do conteúdo relacionado à série e estilização das páginas com HTML e CSS.",
      result: "Site temático publicado como estudo de layout.",
      learnings: "Exercitar estrutura e estilização de páginas a partir de uma identidade visual já existente.",
      highlights: ["Layout temático", "Organização de conteúdo sobre a série", "Composição visual inspirada na produção", "Prática de HTML e CSS"]
    },
    {
      title: "Enrolados", kind: "Projeto de fã", category: "Projeto de fã · Estudo de layout e desenvolvimento web",
      categories: ["Desenvolvimento web"],
      tags: ["HTML", "CSS", "Interface temática"], image: "assets/img/project-enrolados.jpg",
      href: "https://thauanneluna.github.io/Enrolados/",
      summary: "Site de fã inspirado na animação Enrolados. Projeto pessoal, sem caráter comercial e sem vínculo oficial com a Disney.",
      tools: "HTML e CSS.",
      objective: "Usar o universo da animação como exercício de criatividade e de desenvolvimento de interfaces temáticas.",
      context: "Projeto pessoal de prática, feito por afinidade com a animação.",
      process: "Composição visual temática, buscando traduzir o clima encantado da história na página.",
      development: "Organização do conteúdo e estruturação e estilização das páginas com HTML e CSS.",
      result: "Site temático publicado como estudo de layout.",
      learnings: "Praticar a construção de páginas web e a tradução de um tema em escolhas visuais.",
      highlights: ["Composição visual temática", "Organização de conteúdo", "Aplicação de HTML e CSS", "Estruturação e estilização de páginas"]
    }
  ];

  /* ------------------------------------------------------------------
     1. Tema claro / escuro
     ------------------------------------------------------------------ */
  var THEME_KEY = "thau-luna-theme";
  var themeBtn = $("#theme-toggle");

  function currentTheme() {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }
  function applyTheme(theme) {
    var root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignora */ }
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", theme === "light" ? "Ativar modo escuro" : "Ativar modo claro");
    }
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      applyTheme(currentTheme() === "light" ? "dark" : "light");
    });
    applyTheme(currentTheme());
  }

  /* ------------------------------------------------------------------
     2. Splash de abertura
     ------------------------------------------------------------------ */
  (function initSplash() {
    var splash = $("#splash");
    if (!splash) return;
    var root = document.documentElement;
    if (root.classList.contains("splash-done")) { splash.hidden = true; return; }

    document.body.style.overflow = "hidden";
    var reduced = reducedMotion();
    var fadeTimer = setTimeout(function () { splash.classList.add("is-fading"); }, reduced ? 0 : 900);
    var hideTimer = setTimeout(function () {
      root.classList.add("splash-done");
      document.body.style.overflow = "";
      try { sessionStorage.setItem("tl-splash-shown", "1"); } catch (e) { /* ignora */ }
    }, reduced ? 0 : 1400);

    // Segurança: se a página for fechada/recarregada, libera a rolagem
    window.addEventListener("pagehide", function () {
      clearTimeout(fadeTimer); clearTimeout(hideTimer);
      document.body.style.overflow = "";
    });
  })();

  /* ------------------------------------------------------------------
     3. Menu mobile
     ------------------------------------------------------------------ */
  var menuBtn = $("#menu-toggle");
  var mobilePanel = $("#mobile-panel");

  function setMenu(open) {
    if (!menuBtn || !mobilePanel) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    mobilePanel.hidden = !open;
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuBtn.focus();
      }
    });
    window.matchMedia("(min-width: 48rem)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------
     4. Roteador por hash
     ------------------------------------------------------------------ */
  var pages = $all(".page");
  var navLinks = $all("[data-route]");
  var descMeta = $("meta[name='description']");
  var scrollPositions = {};
  var lastRoute = null;
  var pushNavigation = false;

  function normalizeRoute(hash) {
    var path = (hash || "").replace(/^#/, "");
    if (path === "" || path === "/") return "/";
    if (path.charAt(0) !== "/") return null;
    path = path.replace(/\/+$/, "");
    return path || "/";
  }

  // Rolagem imediata (ignora o scroll-behavior: smooth do CSS)
  function jumpTo(y) {
    var root = document.documentElement;
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
    root.style.scrollBehavior = prev;
  }

  function render() {
    var route = normalizeRoute(location.hash);
    var page = route && pages.filter(function (p) { return p.getAttribute("data-page") === route; })[0];
    var key = route && page ? route : "404";
    if (!page) page = pages.filter(function (p) { return p.getAttribute("data-page") === "404"; })[0];

    if (lastRoute !== null) scrollPositions[lastRoute] = window.scrollY;

    pages.forEach(function (p) { p.hidden = (p !== page); });
    navLinks.forEach(function (a) {
      if (a.getAttribute("data-route") === key) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    document.title = page.getAttribute("data-title") || document.title;
    var desc = page.getAttribute("data-desc");
    if (descMeta && desc) descMeta.setAttribute("content", desc);

    setMenu(false);

    // Navegação por link → topo; botão voltar/avançar → restaura a posição
    var y = 0;
    if (!pushNavigation && lastRoute !== null && scrollPositions[key] != null) y = scrollPositions[key];
    jumpTo(y);
    pushNavigation = false;
    lastRoute = key;
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[data-link]");
    if (link) {
      pushNavigation = true;
      // Clicar no link da página atual: apenas rola ao topo
      if (link.getAttribute("href") === (location.hash || "#/")) {
        e.preventDefault();
        jumpTo(0);
        setMenu(false);
        pushNavigation = false;
      }
    }
  });
  window.addEventListener("hashchange", render);

  // Link "Pular para o conteúdo" (não pode alterar o hash, que é usado pelo roteador)
  var skip = $("#skip-link");
  if (skip) {
    skip.addEventListener("click", function (e) {
      e.preventDefault();
      var main = $("#conteudo");
      if (main) { main.focus(); main.scrollIntoView(); }
    });
  }

  /* ------------------------------------------------------------------
     5. Projetos: abas, cartões e janela de detalhes
     ------------------------------------------------------------------ */
  var tablist = $("#project-tablist");
  var results = $("#project-results");
  var currentCategory = "Todos";

  function filterProjects(category) {
    return category === "Todos" ? PROJECTS : PROJECTS.filter(function (p) { return p.categories.indexOf(category) !== -1; });
  }

  function renderTabs() {
    if (!tablist) return;
    tablist.innerHTML = CATEGORIES.map(function (c, i) {
      var selected = c === currentCategory;
      return '<button type="button" class="tab" role="tab" id="tab-' + i + '" data-category="' + esc(c) + '"' +
        ' aria-selected="' + selected + '" tabindex="' + (selected ? "0" : "-1") + '">' + esc(c) + "</button>";
    }).join("");
  }

  function cardHTML(p, index) {
    var status = p.status ? '<div class="pc-status-wrap"><span class="pc-status">' + esc(p.status) + "</span></div>" : "";
    var kind = p.kind ? '<span class="pc-kind">' + esc(p.kind) + "</span>" : "";
    var summary = p.summary ? '<p class="pc-summary">' + esc(p.summary) + "</p>" : "";
    var tags = p.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    return '<button type="button" class="project-card" data-index="' + index + '" aria-label="Ver detalhes de ' + esc(p.title) + '">' +
      '<div class="project-card-media">' +
        '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' +
        status + kind +
        '<div class="pc-plus">' + icon("plus") + "</div>" +
      "</div>" +
      '<div class="pc-body">' +
        '<p class="pc-category">' + esc(p.category) + "</p>" +
        '<h3 class="pc-title">' + esc(p.title) + "</h3>" +
        summary +
        '<div class="pc-tags">' + tags + "</div>" +
        '<span class="pc-more">Ver detalhes →</span>' +
      "</div>" +
    "</button>";
  }

  function renderProjects() {
    if (!results) return;
    var list = filterProjects(currentCategory);
    if (!list.length) {
      results.innerHTML = '<div class="empty-state">' + esc(EMPTY_TEXT[currentCategory] || "") + "</div>";
      return;
    }
    results.innerHTML = '<div class="project-grid">' + list.map(function (p) {
      return cardHTML(p, PROJECTS.indexOf(p));
    }).join("") + "</div>";
  }

  function selectCategory(category, focusTab) {
    currentCategory = category;
    renderTabs();
    renderProjects();
    if (results && tablist) {
      var active = $('.tab[aria-selected="true"]', tablist);
      if (results && active) results.setAttribute("aria-labelledby", active.id);
      if (focusTab && active) active.focus();
    }
  }

  if (tablist) {
    tablist.addEventListener("click", function (e) {
      var tab = e.target.closest(".tab");
      if (tab) selectCategory(tab.getAttribute("data-category"), false);
    });
    tablist.addEventListener("keydown", function (e) {
      var tabs = $all(".tab", tablist);
      var idx = tabs.indexOf(document.activeElement);
      if (idx === -1) return;
      var next = null;
      if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
      else if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      if (next !== null) {
        e.preventDefault();
        selectCategory(tabs[next].getAttribute("data-category"), true);
      }
    });
    selectCategory("Todos", false);
  }

  /* --- Janela de detalhes (<dialog>) --- */
  var dialog = $("#project-dialog");
  var dialogBody = $("#dialog-body");
  var dialogClose = $("#dialog-close");
  var closing = false;

  function detailHTML(p) {
    var details = [
      ["Objetivo e necessidade", p.objective || p.challenge],
      ["Contexto", p.context],
      ["Planejamento", p.planning],
      ["Processo criativo", p.process],
      ["Desenvolvimento", p.development],
      ["Resultado final", p.result],
      ["Aprendizados", p.learnings]
    ];
    var detailItems = details.filter(function (d) { return d[1]; }).map(function (d) {
      return '<div class="dd-detail"><h4>' + esc(d[0]) + "</h4><p>" + esc(d[1]) + "</p></div>";
    }).join("");

    var meta = "";
    if (p.role) meta += '<div><p class="dd-meta-label">Papel</p><p class="dd-meta-value">' + esc(p.role) + "</p></div>";
    if (p.tools) meta += '<div><p class="dd-meta-label">Ferramentas</p><p class="dd-meta-value">' + esc(p.tools) + "</p></div>";

    var highlights = "";
    if (p.highlights && p.highlights.length) {
      highlights = '<div class="dd-highlights"><h4>Destaques</h4><ul>' + p.highlights.map(function (h) {
        return "<li><span>✦</span>" + esc(h) + "</li>";
      }).join("") + "</ul></div>";
    }

    var tags = p.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");

    var action = p.href
      ? '<a class="dd-visit" href="' + esc(p.href) + '" target="_blank" rel="noopener noreferrer">Visitar projeto ' + icon("arrow-up-right") + "</a>"
      : '<p class="dd-nolink">' + esc(p.status ? p.status + " — ainda sem link público." : "Ainda sem link público.") + "</p>";

    return '<img class="dialog-cover" src="' + esc(p.image) + '" alt="' + esc(p.title) + '">' +
      '<div class="dialog-content">' +
        "<div>" +
          '<p class="dd-category">' + esc(p.category) + (p.year ? " · " + esc(p.year) : "") + "</p>" +
          (p.kind ? '<span class="dd-kind">' + esc(p.kind) + "</span>" : "") +
          '<h2 class="dd-title" id="dialog-title">' + esc(p.title) + "</h2>" +
          '<p class="dd-desc" id="dialog-desc">' + esc(p.summary || "") + "</p>" +
        "</div>" +
        '<div class="dd-meta">' + meta + "</div>" +
        '<div class="dd-details">' + detailItems + "</div>" +
        highlights +
        '<div class="dd-tags">' + tags + "</div>" +
        action +
      "</div>";
  }

  function lockScroll() {
    var sbw = window.innerWidth - document.documentElement.clientWidth;
    if (sbw > 0) document.body.style.paddingRight = sbw + "px";
    document.body.classList.add("dialog-open");
  }
  function unlockScroll() {
    document.body.classList.remove("dialog-open");
    document.body.style.paddingRight = "";
  }

  function openDialog(project) {
    if (!dialog || !dialogBody || typeof dialog.showModal !== "function") {
      // Navegadores muito antigos sem <dialog>: abre o projeto diretamente, se houver link
      if (project.href) window.open(project.href, "_blank", "noopener,noreferrer");
      return;
    }
    dialogBody.innerHTML = detailHTML(project);
    dialog.scrollTop = 0;
    closing = false;
    dialog.classList.remove("is-closing");
    lockScroll();
    dialog.showModal();
  }

  function closeDialog() {
    if (!dialog || !dialog.open || closing) return;
    closing = true;
    dialog.classList.add("is-closing");
    setTimeout(function () {
      dialog.close();
      dialog.classList.remove("is-closing");
      closing = false;
    }, reducedMotion() ? 0 : 180);
  }

  if (dialog) {
    dialog.addEventListener("close", unlockScroll);
    dialog.addEventListener("cancel", function (e) { e.preventDefault(); closeDialog(); }); // tecla Esc
    dialog.addEventListener("click", function (e) {
      // Clique no fundo escurecido (fora da caixa) fecha a janela
      if (e.target === dialog) closeDialog();
    });
  }
  if (dialogClose) dialogClose.addEventListener("click", closeDialog);

  if (results) {
    results.addEventListener("click", function (e) {
      var card = e.target.closest(".project-card");
      if (!card) return;
      var project = PROJECTS[Number(card.getAttribute("data-index"))];
      if (project) openDialog(project);
    });
  }

  /* ------------------------------------------------------------------
     6. Contato: copiar e-mail + formulário de orçamento (WhatsApp)
     ------------------------------------------------------------------ */
  var copyBtn = $("#copy-email");
  var copyStatus = $("#copy-status");
  var copyTimer = null;

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function showCopied() {
    copyBtn.classList.add("is-copied");
    if (copyStatus) copyStatus.textContent = "E-mail copiado.";
    clearTimeout(copyTimer);
    copyTimer = setTimeout(function () {
      copyBtn.classList.remove("is-copied");
      if (copyStatus) copyStatus.textContent = "";
    }, 2000);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(showCopied, function () {
          if (fallbackCopy(EMAIL)) showCopied();
        });
      } else if (fallbackCopy(EMAIL)) {
        showCopied();
      }
    });
  }

  var form = $("#quote-form");
  if (form) {
    var fields = {
      name: { el: $("#q-name"), err: $("#err-name"), msg: "Informe seu nome" },
      service: { el: $("#q-service"), err: $("#err-service"), msg: "Escolha um serviço" },
      message: { el: $("#q-msg"), err: $("#err-message"), msg: "Descreva seu projeto" }
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {
        name: fields.name.el.value.trim().slice(0, 100),
        service: fields.service.el.value,
        message: fields.message.el.value.trim().slice(0, 1000)
      };

      var firstInvalid = null;
      Object.keys(fields).forEach(function (key) {
        var f = fields[key];
        var invalid = !data[key];
        f.err.hidden = !invalid;
        f.err.textContent = invalid ? f.msg : "";
        if (invalid) {
          f.el.setAttribute("aria-invalid", "true");
          if (!firstInvalid) firstInvalid = f.el;
        } else {
          f.el.removeAttribute("aria-invalid");
        }
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var text = "Olá, Thauanne! Meu nome é " + data.name + ".\nServiço: " + data.service + "\n\n" + data.message;
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  /* ------------------------------------------------------------------
     7. Rodapé: ano atual
     ------------------------------------------------------------------ */
  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Início
     ------------------------------------------------------------------ */
  render();
})();
