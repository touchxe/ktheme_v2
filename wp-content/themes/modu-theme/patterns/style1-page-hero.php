<?php
/**
 * Title: Style 1 Page Hero
 * Slug: modu-theme/style1-page-hero
 * Categories: modu-theme-style1
 * Description: Theme-owned Style 1 page hero with breadcrumb, title, description, and tabs.
 */
?>
<!-- wp:html -->
<section class="modu-page-hero modu-page-hero--basic">
  <nav class="modu-breadcrumb" aria-label="현재 위치">
    <a href="/"><svg class="modu-icon modu-icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>HOME</a>
    <span>›</span>
    <strong>페이지명</strong>
  </nav>
  <div class="modu-page-hero__body">
    <div>
      <h1>페이지명</h1>
      <p>페이지의 목적을 한 문장으로 설명합니다. 방문자가 이 페이지에서 무엇을 확인할 수 있는지 알려주세요.</p>
    </div>
    <nav class="modu-page-tabs" aria-label="하위 메뉴">
      <a class="is-active" href="#">전체</a>
      <a href="#">하위 메뉴</a>
      <a href="#">관련 페이지</a>
    </nav>
  </div>
</section>
<!-- /wp:html -->
