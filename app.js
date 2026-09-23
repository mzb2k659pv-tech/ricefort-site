(function () {
  var source = window.RICEFORT_CONTENT;
  var supportedPages = ['home', 'about', 'board', 'services', 'cases', 'contact'];
  var state = {
    lang: localStorage.getItem('ricefort-language') || 'zh',
    page: location.hash.replace('#', '') || 'home'
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char];
    });
  }
  function text(value) {
    return escapeHtml(value).replace(/\n/g, '<br>');
  }
  function image(path, alt, className) {
    return '<img class="' + (className || '') + '" src="' + path + '" alt="' + escapeHtml(alt) + '">';
  }
  function langToggle() {
    return '<div class="language-toggle" aria-label="Language">' +
      '<button type="button" data-language="zh" class="' + (state.lang === 'zh' ? 'is-active' : '') + '">中文</button>' +
      '<button type="button" data-language="en" class="' + (state.lang === 'en' ? 'is-active' : '') + '">EN</button>' +
      '</div>';
  }
  function navLinks(data, location) {
    var links = data.nav.slice();
    links.splice(Math.max(0, links.length - 1), 0, ['furniture', state.lang === 'zh' ? '傢俬訂製' : 'Custom Furniture']);
    return links.map(function (item) {
      if (item[0] === 'furniture') return '<a href="furniture-custom.html">' + item[1] + '</a>';
      return '<a href="#' + item[0] + '" class="' + (item[0] === location ? 'is-current' : '') + '">' + item[1] + '</a>';
    }).join('');
  }
  function renderHeader(data) {
    document.querySelector('.site-header').innerHTML =
      '<div class="header-inner">' +
        '<a class="brand" href="#home" aria-label="RiceFort home">' + image(source.assets.logo, 'RiceFort logo') + '</a>' +
        '<nav class="main-nav" aria-label="Primary navigation">' + navLinks(data, state.page) + '</nav>' +
        langToggle() +
        '<button class="menu-button" type="button" aria-expanded="false" aria-label="Open menu"><span></span><span></span></button>' +
      '</div>';
  }
  function sectionStart(label, title, className) {
    return '<section class="section ' + (className || '') + ' reveal"><div class="section-label">' + label + '</div><h2>' + text(title) + '</h2>';
  }
  function home(data) {
    var copy = data.home;
    var features = data.features.map(function (item, index) {
      var visual = index < 3 ? source.assets.husk : index === 3 ? source.assets.standing : source.assets.stack;
      return '<article class="feature feature-' + ((index % 2) ? 'left' : 'right') + ' reveal">' +
        '<div class="feature-copy"><span>0' + (index + 1) + '</span><h3>' + escapeHtml(item[0]) + '</h3><p>' + escapeHtml(item[1]) + '</p></div>' +
        '<figure>' + image(visual, item[0]) + '</figure></article>';
    }).join('');
    return '<section class="hero hero-home">' +
      '<div class="hero-image">' + image(source.assets.hero, 'RiceFort ReHusk Board and rice') + '</div>' +
      '<div class="hero-copy"><p class="eyebrow">' + copy.eyebrow + '</p><h1>' + text(copy.title) + '</h1><p class="hero-intro">' + text(copy.intro) + '</p><a class="button button-dark" href="#board">' + copy.cta + '<span>→</span></a></div>' +
      '</section>' +
      '<section class="split-story reveal"><figure>' + image(source.assets.husk, 'Rice husk and ReHusk Board') + '</figure><div><p class="section-label">' + copy.companyNumber + '</p><h2>' + text(copy.companyTitle) + '</h2><p>' + text(copy.companyBody) + '</p><a class="text-link" href="#about">' + (state.lang === 'zh' ? '了解 RiceFort' : 'Discover RiceFort') + ' →</a></div></section>' +
      sectionStart(state.lang === 'zh' ? '02  /  產品重點' : '02  /  MATERIAL HIGHLIGHTS', copy.featureTitle, 'features-section') +
      '<p class="section-summary">Six material qualities, revealed as you scroll.</p></section>' +
      '<section class="feature-list">' + features + '</section>' +
      '<section class="health-section reveal"><figure>' + image(source.assets.stack, 'ReHusk Board material') + '<figcaption>HEALTH-ORIENTED MATERIALS</figcaption></figure><div><p class="section-label">03  /  HEALTHY SPACES</p><h2>' + text(copy.healthTitle) + '</h2><p>' + escapeHtml(copy.healthBody) + '</p><hr><p>' + escapeHtml(copy.healthNote) + '</p></div></section>';
  }
  function figmaFeature(number, title, body) {
    return '<div class="figma-feature-copy"><span>' + number + '</span><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(body) + '</p></div>';
  }
  function figmaFeatureStory(features, assets, isEnglish) {
    return '<section class="figma-feature-story' + (isEnglish ? ' figma-en-feature-story' : '') + '">' +
      '<article class="figma-feature-chapter figma-feature-origin home-scroll-reveal"><figure>' + image(assets.origin, features[0][0]) + '</figure><div class="figma-feature-chapter-copy"><div class="figma-feature-list">' + figmaFeature('01', features[0][0], features[0][1]) + figmaFeature('02', features[1][0], features[1][1]) + figmaFeature('03', features[2][0], features[2][1]) + '</div></div></article>' +
      '<article class="figma-feature-chapter figma-feature-material home-scroll-reveal"><div class="figma-feature-chapter-copy"><div class="figma-feature-list">' + figmaFeature('04', features[3][0], features[3][1]) + figmaFeature('05', features[4][0], features[4][1]) + '</div></div><figure>' + image(assets.material, features[3][0]) + '</figure></article>' +
      '<article class="figma-feature-chapter figma-feature-finish home-scroll-reveal"><figure>' + image(assets.finish, features[5][0]) + '</figure><div class="figma-feature-chapter-copy">' + figmaFeature('06', features[5][0], features[5][1]) + '</div></article>' +
    '</section>';
  }
  function riceJourney(asset) {
    var rectangle = 'M0 0 C33.33 0 66.67 0 100 0 C100 33.33 100 66.67 100 100 C66.67 100 33.33 100 0 100 C0 66.67 0 33.33 0 0 Z';
    return '<div class="rice-journey-stage" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none" role="presentation"><defs><clipPath id="rice-journey-clip" clipPathUnits="userSpaceOnUse"><path class="rice-journey-path" d="' + rectangle + '" /></clipPath></defs><image class="rice-journey-image" href="' + asset + '" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" clip-path="url(#rice-journey-clip)" /><path class="rice-journey-outline rice-journey-outline-outer" d="' + rectangle + '" transform="translate(-.42 -.18)" /><path class="rice-journey-outline rice-journey-outline-light" d="' + rectangle + '" /></svg></div>';
  }
  function homeChineseFigma(data) {
    var copy = data.home;
    var f = data.features;
    return '<div class="figma-home-cn figma-home-motion">' +
      '<section class="figma-hero"><figure>' + image(source.assets.figmaHero, 'RiceFort 稻築板與稻穗') + '</figure><div><p class="eyebrow">' + copy.eyebrow + '</p><h1>' + text(copy.title) + '</h1><p class="hero-intro">' + text(copy.intro) + '</p><a class="button button-dark" href="#board">' + copy.cta + '<span>→</span></a></div></section>' +
      '<section class="figma-company rice-journey-section home-scroll-reveal">' + riceJourney(source.assets.figmaCompany) + '<div class="figma-company-copy"><p class="section-label">' + copy.companyNumber + '</p><h2>' + text(copy.companyTitle) + '</h2><p>' + text(copy.companyBody) + '</p><a class="text-link" href="#about">了解 RiceFort →</a></div></section>' +
      '<section class="figma-feature-intro home-scroll-reveal"><div><p class="section-label">02  /  產品重點</p><h2>' + text(copy.featureTitle) + '</h2></div></section>' +
      figmaFeatureStory(f, { origin: source.assets.figmaProduct02, material: source.assets.figmaProduct04, finish: source.assets.figmaProduct06 }, false) +
      '<section class="figma-health home-scroll-reveal"><figure>' + image(source.assets.figmaEnHealth, '稻築板材料') + '<figcaption>HEALTH-ORIENTED MATERIALS</figcaption></figure><div><p class="section-label">03  /  HEALTHY SPACES</p><h2>' + text(copy.healthTitle) + '</h2><p>' + escapeHtml(copy.healthBody) + '</p><hr><p>' + escapeHtml(copy.healthNote) + '</p><span>DESIGN AND CONSTRUCTION MATTER, TOO.</span></div></section>' +
      '<section class="figma-board-close figma-home-close"><span>RICEFORT LIMITED&nbsp;&nbsp;·&nbsp;&nbsp;REHUSK BOARD&nbsp;&nbsp;·&nbsp;&nbsp;BIO-BASED MATERIALS</span></section>' +
    '</div>';
  }
  function homeEnglishFigma(data) {
    var copy = data.home;
    var f = data.features;
    return '<div class="figma-home-cn figma-home-en figma-home-motion">' +
      '<section class="figma-hero figma-en-hero"><figure>' + image(source.assets.figmaEnHero, 'RiceFort ReHusk Board and rice') + '</figure><div><p class="eyebrow">' + copy.eyebrow + '</p><h1>' + text(copy.title) + '</h1><p class="hero-intro">' + text(copy.intro) + '</p><a class="button button-dark" href="#board">' + copy.cta + '<span>→</span></a></div></section>' +
      '<section class="figma-company figma-en-company rice-journey-section home-scroll-reveal">' + riceJourney(source.assets.figmaEnCompany) + '<div class="figma-company-copy"><p class="section-label">' + copy.companyNumber + '</p><h2>' + text(copy.companyTitle) + '</h2><p>' + text(copy.companyBody) + '</p><a class="text-link" href="#about">Discover our approach →</a></div></section>' +
      '<section class="figma-feature-intro figma-en-feature-intro home-scroll-reveal"><div><p class="section-label">02  /  REHUSK BOARD</p><h2>' + text(copy.featureTitle) + '</h2></div></section>' +
      figmaFeatureStory(f, { origin: source.assets.figmaEnProduct02, material: source.assets.figmaProduct04, finish: source.assets.figmaProduct06 }, true) +
      '<section class="figma-health figma-en-health home-scroll-reveal"><figure>' + image(source.assets.figmaEnHealth, 'ReHusk Board material') + '<figcaption>HEALTH-ORIENTED MATERIALS</figcaption></figure><div><p class="section-label">03  /  HEALTHY SPACES</p><h2>' + text(copy.healthTitle) + '</h2><p>' + escapeHtml(copy.healthBody) + '</p><hr><p>' + escapeHtml(copy.healthNote) + '</p><span>DESIGN AND CONSTRUCTION MATTER, TOO.</span></div></section>' +
      '<section class="figma-board-close figma-home-close"><span>RICEFORT LIMITED&nbsp;&nbsp;·&nbsp;&nbsp;REHUSK BOARD&nbsp;&nbsp;·&nbsp;&nbsp;BIO-BASED MATERIALS</span></section>' +
    '</div>';
  }
  function about(data) {
    var copy = data.about;
    return '<section class="hero hero-about"><div><p class="eyebrow">' + copy.label + '</p><h1>' + text(copy.title) + '</h1></div><figure>' + image(source.assets.standing, 'ReHusk Board standing') + '</figure></section>' +
      '<section class="about-copy reveal"><div class="editorial-copy">' + copy.paragraphs.map(function (paragraph) { return '<p>' + escapeHtml(paragraph) + '</p>'; }).join('') + '</div></section>' +
      '<section class="mission reveal"><p class="section-label">' + copy.missionTitle + '</p><h2>' + escapeHtml(copy.mission) + '</h2></section>' +
      '<section class="values reveal"><p class="section-label">' + (state.lang === 'zh' ? '我們的價值' : 'OUR VALUES') + '</p><div>' + copy.values.map(function (value, index) { return '<span><b>0' + (index + 1) + '</b>' + escapeHtml(value) + '</span>'; }).join('') + '</div></section>';
  }
  function aboutFigma(data) {
    var copy = data.about;
    var isEnglish = state.lang === 'en';
    var subtitles = copy.valueSubtitles || [];
    var values = copy.values.map(function (value, index) {
      return '<article><i></i><span>0' + (index + 1) + '</span><h3>' + escapeHtml(value) + '</h3>' + (!isEnglish ? '<p>' + escapeHtml(subtitles[index] || '') + '</p>' : '') + '</article>';
    }).join('');
    return '<div class="figma-about ' + (isEnglish ? 'figma-about-en' : 'figma-about-cn') + '">' +
      '<section class="figma-about-hero-scroll"><figure class="figma-about-hero-media">' + image(isEnglish ? source.assets.figmaAboutEn : source.assets.figmaAboutCn, 'RiceFort materials') + '</figure><div class="figma-about-hero-panel"><p class="section-label">' + copy.index + '</p><h1>' + text(copy.title) + '</h1><p>' + text(copy.lead) + '</p></div></section>' +
      '<section class="figma-about-reading"><h2>' + text(copy.statement) + '</h2><p>' + escapeHtml(copy.paragraphs[0]) + '</p><hr><p>' + escapeHtml(copy.paragraphs[1]) + '</p><p>' + escapeHtml(copy.paragraphs[2]) + '</p></section>' +
      '<section class="figma-about-mission"><p class="section-label">' + copy.missionIndex + '</p><h2>' + text(copy.missionTitle) + '</h2><p>' + escapeHtml(copy.mission) + '</p></section>' +
      '<section class="figma-about-values"><p class="section-label">' + copy.valuesIndex + '</p><h2>' + text(copy.valuesTitle) + '</h2><div>' + values + '</div></section>' +
      '<section class="figma-about-close"><span>RICEFORT LIMITED&nbsp;&nbsp;·&nbsp;&nbsp;BIO-BASED MATERIALS FOR EVERYDAY SPACES</span></section>' +
    '</div>';
  }
  function board(data) {
    var copy = data.board;
    return '<section class="hero hero-board"><div><p class="eyebrow">' + copy.label + '</p><h1>' + text(copy.title) + '</h1></div><figure>' + image(source.assets.standing, 'ReHusk Board material samples') + '</figure></section>' +
      '<section class="board-intro reveal"><div>' + copy.paragraphs.map(function (paragraph) { return '<p>' + escapeHtml(paragraph) + '</p>'; }).join('') + '</div><figure>' + image(source.assets.husk, 'Rice husk board') + '</figure></section>' +
      '<section class="core-features reveal"><p class="section-label">' + copy.featureTitle + '</p><div>' + copy.features.map(function (feature, index) { return '<article><b>0' + (index + 1) + '</b><span>' + escapeHtml(feature) + '</span></article>'; }).join('') + '</div></section>' +
      '<section class="palette reveal"><div><p class="section-label">' + copy.paletteTitle + '</p><h2>' + (state.lang === 'zh' ? '為品牌與空間\n留出顏色的可能。' : 'A palette with room\nfor brand and space.') + '</h2></div><div class="swatches"><span></span><span></span><span></span><span></span><span></span></div></section>';
  }
  function boardFigma(data) {
    var copy = data.board;
    var isEnglish = state.lang === 'en';
    var cards = copy.paletteCodes.map(function (code, index) {
      return '<article><figure>' + image(source.assets.figmaBoardSwatches[index], 'ReHusk colour ' + code) + '</figure><p>REHUSK&nbsp;&nbsp;/&nbsp;&nbsp;' + code + '</p><span>SURFACE COLOUR</span></article>';
    }).join('');
    return '<div class="figma-board ' + (isEnglish ? 'figma-board-en' : 'figma-board-cn') + '">' +
      '<section class="figma-board-hero"><figure>' + image(source.assets.figmaBoardHeroCn, 'ReHusk Board') + '</figure><div><p class="section-label">' + copy.index + '</p><h1>' + text(copy.title) + '</h1><p>' + text(copy.lead) + '</p></div></section>' +
      '<section class="figma-board-story"><div><p class="section-label">' + copy.storyIndex + '</p><h2>' + text(copy.storyTitle) + '</h2></div><div><p>' + escapeHtml(copy.paragraphs[0]) + '</p><hr><p>' + escapeHtml(copy.paragraphs[1]) + '</p></div></section>' +
      '<section class="figma-board-material"><figure>' + image(source.assets.figmaBoardLandscapeCn, 'ReHusk Board material') + '<img class="figma-board-certification figma-board-certification-one" src="' + source.assets.figmaBoardCertificationOne + '" alt="TSCA Title VI compliant certification"><img class="figma-board-certification figma-board-certification-two" src="' + source.assets.figmaBoardCertificationTwo + '" alt="CARB ATCM 93120 certification"></figure><aside><span>NATURAL FIBRES<br>MEET FUNCTION</span></aside><p>' + escapeHtml(copy.paragraphs[2]) + '</p></section>' +
      '<section class="figma-board-features"><p class="section-label">' + copy.featureIndex + '</p><h2>' + text(copy.featureTitle) + '</h2><div>' + copy.features.map(function (feature, index) { return '<article><span>0' + (index + 1) + '</span><h3>' + escapeHtml(feature) + '</h3></article>'; }).join('') + '</div></section>' +
      '<section class="figma-board-colours"><div class="figma-board-colours-head"><div><p class="section-label">' + copy.paletteIndex + '</p><h2>' + text(copy.paletteTitle) + '</h2><p>' + escapeHtml(copy.paletteBody) + '</p></div><span>DRAG&nbsp;&nbsp;/&nbsp;&nbsp;SCROLL&nbsp;&nbsp;→</span></div><div class="figma-board-colours-rail" tabindex="0" aria-label="' + (isEnglish ? 'ReHusk Board colour cards. Drag or use left and right arrow keys to browse.' : '稻築板色卡。可拖曳或使用左右方向鍵瀏覽。') + '">' + cards + '</div><hr><p class="figma-board-colours-note">' + escapeHtml(copy.paletteNote) + '</p></section>' +
      '<section class="figma-board-close"><span>RICEFORT LIMITED&nbsp;&nbsp;·&nbsp;&nbsp;REHUSK BOARD&nbsp;&nbsp;·&nbsp;&nbsp;BIO-BASED MATERIALS</span></section>' +
    '</div>';
  }
  function services(data) {
    var copy = data.services;
    var cards = copy.items.map(function (item, index) {
      var visual = [source.assets.hero, source.assets.stack, source.assets.standing, source.assets.husk, source.assets.hero][index];
      return '<article class="service-card reveal"><figure>' + image(visual, item[0]) + '</figure><div><span>0' + (index + 1) + '</span><h3>' + escapeHtml(item[0]) + '</h3><p>' + escapeHtml(item[1]) + '</p></div></article>';
    }).join('');
    return '<section class="service-hero"><figure>' + image(source.assets.hero, 'RiceFort material composition') + '</figure><div><p class="eyebrow">' + copy.label + '</p><h1>' + text(copy.title) + '</h1><p>' + escapeHtml(copy.intro) + '</p></div></section>' +
      '<div class="image-marquee" aria-hidden="true"><div>' + [source.assets.husk, source.assets.standing, source.assets.stack, source.assets.hero, source.assets.husk, source.assets.standing].map(function (asset) { return image(asset, ''); }).join('') + '</div></div>' +
      '<section class="service-list">' + cards + '</section><p class="ai-note">' + (state.lang === 'zh' ? '部分示意圖片為 AI 生成或合成。' : 'Some illustrative images are AI-generated or composited.') + '</p>';
  }
  function servicesFigma(data) {
    var copy = data.services;
    var english = state.lang === 'en';
    var stageAssets = english ? source.assets.figmaServiceStagesEn : source.assets.figmaServiceStagesCn;
    var marqueeAssets = source.assets.figmaServiceMarquee;
    var marquee = marqueeAssets.concat(marqueeAssets).map(function (asset) {
      return image(asset, '');
    }).join('');
    var stageMedia = stageAssets.map(function (asset, index) {
      return '<figure class="figma-service-story-image" data-service-image="' + index + '">' + image(asset, '') + '</figure>';
    }).join('');
    var stages = copy.items.map(function (item, index) {
      var number = String(index + 1).padStart(2, '0');
      return '<article class="figma-service-stage" data-service-stage="' + index + '">' +
        '<div class="figma-service-stage-card"><p class="section-label">' + copy.stageLabel + '</p><span class="figma-service-stage-number">' + number + '</span><h2>' + text(item[0]) + '</h2><p class="figma-service-stage-subtitle">' + escapeHtml(item[0]) + '</p><p class="figma-service-stage-body">' + escapeHtml(item[1]) + '</p></div>' +
      '</article>';
    }).join('');
    return '<div class="figma-services ' + (english ? 'figma-services-en' : 'figma-services-cn') + '">' +
      '<section class="figma-service-hero"><figure>' + image(english ? source.assets.figmaServiceHeroEn : source.assets.figmaServiceHeroCn, 'RiceFort services') + '</figure><div><p class="section-label">' + copy.label + '</p><h1>' + text(copy.title) + '</h1></div></section>' +
      '<section class="figma-service-intro"><p class="section-label">' + copy.introductionLabel + '</p><p>' + escapeHtml(copy.intro) + '</p></section>' +
      '<p class="figma-service-ai-note">' + (english ? 'THIS PAGE CONTAINS AI-GENERATED IMAGES' : '此頁含有AI 生成圖片') + '</p>' +
      '<section class="figma-service-marquee" aria-label="' + (english ? 'RiceFort service imagery' : 'RiceFort 服務圖片') + '"><div aria-hidden="true">' + marquee + '</div></section>' +
      '<section class="figma-service-story"><div class="figma-service-story-media" aria-hidden="true">' + stageMedia + '</div><div class="figma-service-stage-list">' + stages + '</div></section>' +
      '<section class="figma-service-close"><h2>' + text(copy.closing) + '</h2><p>' + copy.closingNote + '</p></section>' +
    '</div>';
  }
  function cases(data) {
    var copy = data.cases;
    return '<section class="case-hero"><figure>' + image(source.assets.hero, 'RiceFort board and rice') + '</figure><div><p class="eyebrow">' + copy.label + '</p><p class="case-category">' + copy.category + '</p><h1>' + text(copy.title) + '</h1><dl><div><dt>' + copy.partnerLabel + '</dt><dd>' + copy.partner + '</dd></div><div><dt>' + copy.programmeLabel + '</dt><dd>' + copy.programme + '</dd></div></dl><aside><span>01  /  ' + copy.category + '</span><p>' + text(copy.statement) + '</p></aside></div></section>';
  }
  function casesFigma(data) {
    var copy = data.cases;
    var english = state.lang === 'en';
    var label = english ? '01  /  SOCIAL SERVICE' : '01  /  社會服務';
    return '<div class="figma-cases ' + (english ? 'figma-cases-en' : 'figma-cases-cn') + '">' +
      '<section class="figma-case-hero"><figure>' + image(english ? source.assets.figmaCaseSocialEn : source.assets.figmaCaseSocialCn, 'RiceFort social service case study') + '</figure><div>' +
        '<p class="section-label">' + copy.label + '</p><p class="figma-case-category">' + copy.category + '</p><h1>' + text(copy.title) + '</h1>' +
        '<dl><div><dt>' + copy.partnerLabel + '</dt><dd>' + escapeHtml(copy.partner) + '</dd></div><div><dt>' + copy.programmeLabel + '</dt><dd>' + text(copy.programme) + '</dd></div></dl><p class="figma-case-funding">' + escapeHtml(copy.funding) + '</p>' +
      '</div></section>' +
      '<section class="figma-case-statement"><p class="section-label">' + label + '</p><h2>' + text(copy.statement) + '</h2></section>' +
      '<section class="figma-case-close"><span>RICEFORT LIMITED&nbsp;&nbsp;·&nbsp;&nbsp;REHUSK BOARD&nbsp;&nbsp;·&nbsp;&nbsp;BIO-BASED MATERIALS</span></section>' +
    '</div>';
  }
  function contactFigma(data) {
    var copy = data.contact;
    var fields = copy.fields;
    return '<div class="figma-contact ' + (state.lang === 'en' ? 'figma-contact-en' : 'figma-contact-cn') + '">' +
      '<section class="figma-contact-immersive"><div class="figma-contact-copy"><p class="section-label">' + copy.label + '  /  CONTACT</p><h1>' + text(copy.title) + '</h1><p>' + escapeHtml(copy.intro) + '</p><div class="figma-contact-email"><span>EMAIL</span><a href="mailto:info@ricefort.com">info@ricefort.com</a></div></div>' +
        '<section class="figma-contact-panel"><header><p class="section-label">RICEFORT LIMITED</p><h2>' + copy.formTitle + '</h2><p class="figma-contact-hint">' + copy.formHint + '</p></header>' +
          '<form id="contact-form" action="https://formspree.io/f/myeyqldz" method="POST"><label><span>' + fields[0] + '</span><select required name="project"><option value="" selected disabled>' + copy.selectPlaceholder + '</option><option>' + (state.lang === 'zh' ? '材料供應' : 'Material supply') + '</option><option>' + (state.lang === 'zh' ? '項目合作' : 'Project collaboration') + '</option><option>' + (state.lang === 'zh' ? '其他' : 'Other') + '</option></select></label>' +
            '<label><span>' + fields[1] + '</span><input name="company" autocomplete="organization"></label>' +
            '<label><span>' + fields[2] + '</span><input required name="name" autocomplete="name"></label>' +
            '<label><span>' + fields[3] + '</span><input required type="email" name="email" autocomplete="email"></label>' +
            '<label><span>' + fields[4] + '</span><input name="phone" autocomplete="tel"></label>' +
            '<label><span>' + fields[5] + '</span><input name="budget"></label>' +
            '<label class="figma-contact-message"><span>' + fields[6] + '</span><textarea required name="message" rows="5" placeholder="' + escapeHtml(copy.messagePlaceholder) + '"></textarea></label>' +
            '<div class="figma-contact-submit"><label class="figma-contact-consent"><input required type="checkbox" name="consent"><span>' + copy.consent + '</span></label><button type="submit">' + copy.submit + ' <b>→</b></button></div><p id="form-status" role="status"></p></form>' +
        '</section></section>' +
      '<section class="figma-contact-close"><hr><span>RICEFORT LIMITED&nbsp;&nbsp;·&nbsp;&nbsp;REHUSK BOARD&nbsp;&nbsp;·&nbsp;&nbsp;BIO-BASED MATERIALS</span></section>' +
    '</div>';
  }
  function renderPage(data) {
    if (!supportedPages.includes(state.page)) state.page = 'home';
    if (state.page === 'home') return state.lang === 'zh' ? homeChineseFigma(data) : homeEnglishFigma(data);
    if (state.page === 'about') return aboutFigma(data);
    if (state.page === 'board') return boardFigma(data);
    if (state.page === 'services') return servicesFigma(data);
    if (state.page === 'cases') return casesFigma(data);
    return contactFigma(data);
  }
  function renderFooter(data) {
    document.querySelector('.site-footer').innerHTML = '<div class="footer-main"><div class="footer-brand-block"><p class="footer-brand">RICEFORT</p><p>' + data.footerTagline + '</p><p class="footer-contact">CONTACT</p><a href="mailto:info@ricefort.com">info@ricefort.com</a><a class="instagram" href="https://www.instagram.com/ricefort?stkn=MXZ3d2VzazRqMHhueA==" target="_blank" rel="noreferrer" aria-label="RiceFort Instagram">' + image(source.assets.instagram, 'Instagram') + '</a></div><div class="footer-nav-block"><p class="footer-label">' + (state.lang === 'zh' ? '探索 RiceFort' : 'EXPLORE RICEFORT') + '</p><nav>' + navLinks(data, state.page) + '</nav><p class="footer-label">LANGUAGE</p>' + langToggle() + '</div></div><div class="footer-bottom"><span>© RiceFort Limited. All rights reserved.</span><span>RiceFort Limited · ReHusk Board</span></div>';
  }
  function bindInteractions(data) {
    document.querySelectorAll('[data-language]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.lang = button.dataset.language;
        localStorage.setItem('ricefort-language', state.lang);
        render();
      });
    });
    document.querySelectorAll('.menu-button').forEach(function (button) {
      button.addEventListener('click', function () {
        var nav = document.querySelector('.main-nav');
        var open = nav.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(open));
      });
    });
    var form = document.querySelector('#contact-form');
    if (form) {
      form.addEventListener('submit', async function (event) {
        event.preventDefault();
        var formData = new FormData(form);
        var status = document.querySelector('#form-status');
        var submit = form.querySelector('button[type="submit"]');
        submit.disabled = true;
        status.textContent = state.lang === 'zh' ? '正在發送…' : 'Sending…';
        try {
          var response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
          });
          if (!response.ok) throw new Error('Form submission failed');
          form.reset();
          status.textContent = data.contact.sent;
        } catch (error) {
          status.textContent = data.contact.failed;
        } finally {
          submit.disabled = false;
        }
      });
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { entry.target.classList.toggle('is-visible', entry.isIntersecting); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .figma-about-values, .figma-contact-copy, .figma-contact-panel').forEach(function (node) { observer.observe(node); });
    // The contact introduction is the opening reading layer, so it should always
    // enter once on page load even when a direct #contact URL initially scrolls
    // past its observer threshold.
    var contactCopy = document.querySelector('.figma-contact-copy');
    if (contactCopy) {
      window.requestAnimationFrame(function () { contactCopy.classList.add('is-visible'); });
    }
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var servicePage = document.querySelector('.figma-services');
    if (servicePage) {
      window.requestAnimationFrame(function () { servicePage.classList.add('is-service-ready'); });
      servicePage.querySelectorAll('.figma-service-intro, .figma-service-marquee, .figma-service-stage, .figma-service-close').forEach(function (node) { observer.observe(node); });
      var serviceImages = Array.prototype.slice.call(servicePage.querySelectorAll('.figma-service-story-image'));
      if (!prefersReducedMotion) {
        var serviceMotionScheduled = false;
        var serviceStages = Array.prototype.slice.call(servicePage.querySelectorAll('.figma-service-stage'));
        function updateServiceMotion() {
          serviceMotionScheduled = false;
          if (!document.body.contains(servicePage)) {
            window.removeEventListener('scroll', requestServiceMotion);
            window.removeEventListener('resize', requestServiceMotion);
            return;
          }
          var activeStage = 0;
          var nearestDistance = Infinity;
          serviceStages.forEach(function (stage, index) {
            var rect = stage.getBoundingClientRect();
            var distance = Math.abs((rect.top + rect.height * .5) - window.innerHeight * .5);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              activeStage = index;
            }
          });
          serviceStages.forEach(function (stage, index) { stage.classList.toggle('is-active', index === activeStage); });
          serviceImages.forEach(function (imageNode, index) { imageNode.classList.toggle('is-active', index === activeStage); });
        }
        function requestServiceMotion() {
          if (!serviceMotionScheduled) {
            serviceMotionScheduled = true;
            window.requestAnimationFrame(updateServiceMotion);
          }
        }
        window.addEventListener('scroll', requestServiceMotion, { passive: true });
        window.addEventListener('resize', requestServiceMotion);
        updateServiceMotion();
      } else if (serviceImages[0]) {
        serviceImages[0].classList.add('is-active');
      }
    }
    var footer = document.querySelector('.site-footer');
    if (footer) {
      var footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { entry.target.classList.toggle('is-footer-visible', entry.isIntersecting); });
      }, { threshold: 0.16 });
      footerObserver.observe(footer);
    }
    var aboutStage = document.querySelector('.figma-about-hero-scroll');
    var compactAboutStage = window.matchMedia('(max-width: 720px)').matches;
    if (aboutStage && !prefersReducedMotion && !compactAboutStage) {
      var aboutStageScheduled = false;
      function updateAboutStage() {
        aboutStageScheduled = false;
        if (!document.body.contains(aboutStage)) {
          window.removeEventListener('scroll', requestAboutStage);
          window.removeEventListener('resize', requestAboutStage);
          return;
        }
        var media = aboutStage.querySelector('.figma-about-hero-media');
        var reading = document.querySelector('.figma-about-reading');
        var travel = Math.max(aboutStage.offsetHeight - media.offsetHeight, 1);
        var progress = Math.max(0, Math.min(1, (window.scrollY - aboutStage.offsetTop) / travel));
        var panelOpacity = 1 - Math.max(0, Math.min(1, progress / .54));
        var mediaProgress = Math.max(0, Math.min(1, (progress - .54) / .46));
        var mediaOpacity = 1 - mediaProgress;
        aboutStage.style.setProperty('--about-panel-opacity', panelOpacity.toFixed(3));
        aboutStage.style.setProperty('--about-media-opacity', mediaOpacity.toFixed(3));
        aboutStage.style.setProperty('--about-media-lift', (-mediaProgress * Math.min(media.offsetHeight * .16, 150)).toFixed(1) + 'px');
        if (reading) {
          var readingProgress = Math.max(0, Math.min(1, (progress - .5) / .26));
          reading.style.opacity = readingProgress.toFixed(3);
          reading.style.transform = 'translateY(' + ((1 - readingProgress) * 64).toFixed(1) + 'px)';
        }
      }
      function requestAboutStage() {
        if (!aboutStageScheduled) {
          aboutStageScheduled = true;
          window.requestAnimationFrame(updateAboutStage);
        }
      }
      window.addEventListener('scroll', requestAboutStage, { passive: true });
      window.addEventListener('resize', requestAboutStage);
      updateAboutStage();
    }
    var homeMotion = document.querySelector('.figma-home-motion');
    if (homeMotion) {
      window.requestAnimationFrame(function () { homeMotion.classList.add('is-motion-ready'); });
      homeMotion.querySelectorAll('.home-scroll-reveal').forEach(function (node) { observer.observe(node); });
      if (!prefersReducedMotion) {
        var exitNodes = Array.prototype.slice.call(homeMotion.querySelectorAll('.home-scroll-reveal:not(.rice-journey-section)'));
        var heroMotion = homeMotion.querySelector('.figma-hero');
        var mediaNodes = Array.prototype.slice.call(homeMotion.querySelectorAll('.figma-feature-row figure, .figma-feature-chapter figure, .figma-health figure'));
        var textMotionNodes = Array.prototype.slice.call(homeMotion.querySelectorAll('.figma-feature-intro > div, .figma-feature-copy, .figma-feature-chapter-copy, .figma-health > div'));
        var exitScheduled = false;
        function updateHomeExit() {
          exitScheduled = false;
          if (!document.body.contains(homeMotion)) {
            window.removeEventListener('scroll', requestHomeExit);
            window.removeEventListener('resize', requestHomeExit);
            return;
          }
          homeMotion.style.setProperty('--ambient-shift', Math.max(-36, Math.min(36, window.scrollY * .018 - 18)).toFixed(1) + 'px');
          exitNodes.forEach(function (node) {
            var rect = node.getBoundingClientRect();
            node.classList.toggle('is-past', rect.bottom < window.innerHeight * .18);
          });
          if (heroMotion) {
            var heroRect = heroMotion.getBoundingClientRect();
            var heroProgress = Math.max(0, Math.min(1, -heroRect.top / Math.max(heroMotion.offsetHeight * .72, 1)));
            homeMotion.style.setProperty('--hero-scroll-opacity', (1 - heroProgress).toFixed(3));
            homeMotion.style.setProperty('--hero-scroll-lift', (-heroProgress * 34).toFixed(1) + 'px');
          }
          mediaNodes.forEach(function (media) {
            var mediaRect = media.getBoundingClientRect();
            var mediaProgress = Math.max(0, Math.min(1, (window.innerHeight * .82 - mediaRect.top) / Math.max(window.innerHeight + mediaRect.height, 1)));
            media.style.setProperty('--media-scroll-lift', (-mediaProgress * 96).toFixed(1) + 'px');
          });
          textMotionNodes.forEach(function (textNode) {
            var textRect = textNode.getBoundingClientRect();
            var textProgress = Math.max(0, Math.min(1, (window.innerHeight * .72 - textRect.top) / Math.max(window.innerHeight + textRect.height, 1)));
            textNode.style.setProperty('--text-scroll-shift', ((.48 - textProgress) * 64).toFixed(1) + 'px');
          });
        }
        function requestHomeExit() {
          if (!exitScheduled) {
            exitScheduled = true;
            window.requestAnimationFrame(updateHomeExit);
          }
        }
        window.addEventListener('scroll', requestHomeExit, { passive: true });
        window.addEventListener('resize', requestHomeExit);
        updateHomeExit();
      }
    }
    var journeySection = document.querySelector('.rice-journey-section');
    var journey = document.querySelector('.rice-journey-stage');
    var journeyPath = document.querySelector('.rice-journey-path');
    var journeyOutlines = document.querySelectorAll('.rice-journey-outline');
    var journeyImage = document.querySelector('.rice-journey-image');
    var journeySvg = document.querySelector('.rice-journey-stage svg');
    var journeyCopy = document.querySelector('.rice-journey-section > .figma-company-copy');
    if (journeySection && journey && journeyPath && journeyImage && journeyOutlines.length) {
      var rectanglePath = [
        [33.33, 0, 66.67, 0, 100, 0], [100, 33.33, 100, 66.67, 100, 100],
        [66.67, 100, 33.33, 100, 0, 100], [0, 66.67, 0, 33.33, 0, 0]
      ];
      var ricePath = [
        [45, 16, 54, 34, 54, 50], [54, 66, 45, 84, 29, 96],
        [13, 84, 4, 66, 4, 50], [4, 34, 13, 16, 29, 4]
      ];
      var reduceMotion = prefersReducedMotion;
      var compactJourney = window.matchMedia('(max-width: 720px)').matches;
      var scheduled = false;
      function between(start, end, amount) { return start + (end - start) * amount; }
      function makeJourneyPath(amount, width) {
        var riceOffset = (width - 100) / 2;
        var fullFramePath = [
          [width / 3, 0, width * 2 / 3, 0, width, 0], [width, 100 / 3, width, 200 / 3, width, 100],
          [width * 2 / 3, 100, width / 3, 100, 0, 100], [0, 200 / 3, 0, 100 / 3, 0, 0]
        ];
        var centredRicePath = ricePath.map(function (segment) {
          return segment.map(function (point, pointIndex) { return pointIndex % 2 === 0 ? point + riceOffset : point; });
        });
        var segments = fullFramePath.map(function (segment, index) {
          return segment.map(function (point, pointIndex) { return between(point, centredRicePath[index][pointIndex], amount).toFixed(2); });
        });
        return 'M' + between(0, riceOffset + 29, amount).toFixed(2) + ' ' + between(0, 4, amount).toFixed(2) + ' C' + segments[0].join(' ') + ' C' + segments[1].join(' ') + ' C' + segments[2].join(' ') + ' C' + segments[3].join(' ') + ' Z';
      }
      function updateJourney() {
        scheduled = false;
        if (!document.body.contains(journeySection)) {
          window.removeEventListener('scroll', requestJourney);
          window.removeEventListener('resize', requestJourney);
          return;
        }
        var progress = compactJourney ? 0 : 1;
        if (!reduceMotion && !compactJourney) {
          var distance = Math.max(journeySection.offsetHeight - window.innerHeight, 1);
          progress = Math.max(0, Math.min(1, (window.scrollY - journeySection.offsetTop) / distance));
        }
        var shapeProgress = progress <= .08 ? 0 : (progress - .08) / .92;
        shapeProgress = 1 - Math.pow(1 - shapeProgress, 2);
        var viewportAspect = window.innerWidth / Math.max(window.innerHeight, 1);
        var viewBoxWidth = 100 * viewportAspect;
        journeySvg.setAttribute('viewBox', '0 0 ' + viewBoxWidth.toFixed(2) + ' 100');
        journeyImage.setAttribute('width', viewBoxWidth.toFixed(2));
        var path = makeJourneyPath(shapeProgress, viewBoxWidth);
        journeyPath.setAttribute('d', path);
        journeyOutlines.forEach(function (outline) {
          outline.setAttribute('d', path);
          outline.style.visibility = shapeProgress > .82 ? 'visible' : 'hidden';
        });
        var zoom = between(1, 1.28, progress);
        var inset = (100 - 100 * zoom) / 2;
        var xNudge = between(0, 8, shapeProgress);
        journeyImage.setAttribute('transform', 'translate(' + (inset + xNudge).toFixed(2) + ' ' + inset.toFixed(2) + ') scale(' + zoom.toFixed(3) + ')');
        if (journeyCopy) {
          var copyProgress = Math.max(0, Math.min(1, (progress - .18) / .22));
          journeyCopy.style.opacity = copyProgress.toFixed(3);
          journeyCopy.style.transform = 'translateY(' + ((1 - copyProgress) * 34).toFixed(1) + 'px)';
        }
      }
      function requestJourney() {
        if (!scheduled) {
          scheduled = true;
          window.requestAnimationFrame(updateJourney);
        }
      }
      window.addEventListener('scroll', requestJourney, { passive: true });
      window.addEventListener('resize', requestJourney);
      updateJourney();
    }
    var rail = document.querySelector('.figma-board-colours-rail');
    if (rail) {
      var dragging = false;
      var startX = 0;
      var startScroll = 0;
      rail.addEventListener('pointerdown', function (event) {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        dragging = true;
        startX = event.clientX;
        startScroll = rail.scrollLeft;
        rail.classList.add('is-dragging');
        rail.setPointerCapture(event.pointerId);
      });
      rail.addEventListener('pointermove', function (event) {
        if (!dragging) return;
        rail.scrollLeft = startScroll - (event.clientX - startX);
      });
      function finishDrag(event) {
        if (!dragging) return;
        dragging = false;
        rail.classList.remove('is-dragging');
        if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
      }
      rail.addEventListener('pointerup', finishDrag);
      rail.addEventListener('pointercancel', finishDrag);
      rail.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        rail.scrollBy({ left: event.key === 'ArrowRight' ? 292 : -292, behavior: 'smooth' });
      });
    }
  }
  function render() {
    var data = source[state.lang];
    document.documentElement.lang = state.lang === 'zh' ? 'zh-Hant' : 'en';
    document.title = data.metaTitle;
    renderHeader(data);
    var main = document.querySelector('main');
    main.classList.toggle('has-rice-journey', state.page === 'home');
    main.classList.toggle('has-about-sticky', state.page === 'about');
    main.classList.toggle('has-service-sticky', state.page === 'services');
    main.innerHTML = renderPage(data);
    renderFooter(data);
    bindInteractions(data);
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', function () {
    state.page = location.hash.replace('#', '') || 'home';
    render();
  });
  render();
}());


/* Public case-study gallery enhancement */
(function () {
  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]; });
  }
  function br(value) { return esc(value).replace(/\n/g, '<br>'); }
  function img(src, alt) { return '<img src="' + src + '" alt="' + esc(alt) + '">'; }
  function gallery(images, title, label) {
    return '<div class="figma-case-gallery"><figure><img data-case-gallery-main src="' + images[0] + '" alt="' + esc(title) + '"></figure><div class="figma-case-gallery-nav">' + images.map(function (src, i) { return '<button type="button" class="figma-case-gallery-thumb' + (i === 0 ? ' is-active' : '') + '" data-case-gallery-thumb data-case-src="' + src + '" aria-label="' + esc(label + ' ' + (i + 1)) + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' + img(src, '') + '</button>'; }).join('') + '</div></div>';
  }
  function mountPublicCases() {
    if (location.hash !== '#cases') return;
    var source = window.RICEFORT_CONTENT;
    if (!source || !source.zh.cases.workshop || !source.assets.figmaCaseWorkshop) return;
    var lang = localStorage.getItem('ricefort-language') || 'zh';
    var data = source[lang] || source.zh;
    var copy = data.cases;
    var workshop = copy.workshop;
    var north = copy.north;
    var social = lang === 'en' ? source.assets.figmaCaseSocialEn : source.assets.figmaCaseSocialCn;
    var main = document.querySelector('main');
    if (!main) return;
    main.innerHTML = '<div class="figma-cases ' + (lang === 'en' ? 'figma-cases-en' : 'figma-cases-cn') + '">' +
      '<section class="figma-case-hero figma-case-hero-primary"><div class="figma-case-social-media"><figure>' + img(social, 'RiceFort social service case study') + '</figure></div><div><p class="section-label">' + esc(copy.label) + '</p><p class="figma-case-category">' + esc(copy.category) + '</p><h1>' + br(copy.title) + '</h1><dl><div><dt>' + esc(copy.partnerLabel) + '</dt><dd>' + esc(copy.partner) + '</dd></div><div><dt>' + esc(copy.programmeLabel) + '</dt><dd>' + br(copy.programme) + '</dd></div></dl><p class="figma-case-funding">' + esc(copy.funding) + '</p></div></section>' +
      '<section class="figma-case-hero figma-case-workshop"><div><p class="section-label">02  /  ' + esc(workshop.category) + '</p><p class="figma-case-category">' + esc(workshop.category) + '</p><h1>' + br(workshop.title) + '</h1><dl><div><dt>' + esc(workshop.partnerLabel) + '</dt><dd>' + esc(workshop.partner) + '</dd></div></dl><p class="figma-case-funding">' + esc(workshop.body) + '</p></div>' + gallery(source.assets.figmaCaseWorkshop, workshop.title, workshop.galleryLabel) + '</section>' +
      '<section class="figma-case-hero figma-case-north">' + gallery(source.assets.figmaCaseNorth, north.title, north.galleryLabel) + '<div><p class="section-label">03  /  ' + esc(north.category) + '</p><p class="figma-case-category">' + esc(north.category) + '</p><h1>' + br(north.title) + '</h1><dl><div><dt>' + esc(north.partnerLabel) + '</dt><dd>' + esc(north.partner) + '</dd></div><div><dt>' + esc(north.programmeLabel) + '</dt><dd>' + br(north.programme) + '</dd></div></dl><p class="figma-case-funding">' + esc(north.body) + '</p></div></section>' +
      '<section class="figma-case-statement"><p class="section-label">01  /  ' + (lang === 'en' ? 'SOCIAL SERVICE' : '社會服務') + '</p><h2>' + br(copy.statement) + '</h2></section><section class="figma-case-close"><span>RICEFORT LIMITED&nbsp;&nbsp;·&nbsp;&nbsp;REHUSK BOARD&nbsp;&nbsp;·&nbsp;&nbsp;BIO-BASED MATERIALS</span></section></div>';
  }
  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-case-gallery-thumb]');
    if (button) {
      var galleryRoot = button.closest('.figma-case-gallery');
      var mainImage = galleryRoot && galleryRoot.querySelector('[data-case-gallery-main]');
      if (mainImage) mainImage.src = button.dataset.caseSrc;
      if (galleryRoot) galleryRoot.querySelectorAll('[data-case-gallery-thumb]').forEach(function (thumb) { var active = thumb === button; thumb.classList.toggle('is-active', active); thumb.setAttribute('aria-pressed', String(active)); });
      return;
    }
    if (event.target.closest && event.target.closest('[data-language]') && location.hash === '#cases') window.setTimeout(mountPublicCases, 0);
  });
  window.addEventListener('hashchange', function () { window.setTimeout(mountPublicCases, 0); });
  mountPublicCases();
}());
