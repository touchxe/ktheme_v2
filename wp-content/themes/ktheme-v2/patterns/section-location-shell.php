<?php
/**
 * Title: Location Information Shell
 * Slug: ktheme-v2/section-location-shell
 * Categories: ktheme-v2-integrations
 * Description: Editable location, transport, parking, and map integration guidance.
 */
?>
<!-- wp:group {"className":"kt-admin-section","layout":{"type":"constrained"}} -->
<section class="wp-block-group kt-admin-section">
	<!-- wp:heading {"level":2} -->
	<h2>오시는 길</h2>
	<!-- /wp:heading -->
	<!-- wp:paragraph -->
	<p>교회 주소, 대중교통, 주차 안내는 이 패턴의 내용을 실제 정보로 교체해 주세요.</p>
	<!-- /wp:paragraph -->
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":3} -->
			<h3>주소와 연락처</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph -->
			<p>교회 주소<br>대표 전화<br>대표 이메일</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":3} -->
			<h3>교통과 주차</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph -->
			<p>대중교통 안내<br>주차 가능 여부와 이용 방법</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
	<!-- wp:group {"className":"kt-form-shell","layout":{"type":"constrained"}} -->
	<div class="wp-block-group kt-form-shell">
		<!-- wp:paragraph {"className":"kt-form-placeholder"} -->
		<p class="kt-form-placeholder">지도 플러그인 또는 지도 제공사의 임베드 블록을 이곳에 삽입하세요.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
