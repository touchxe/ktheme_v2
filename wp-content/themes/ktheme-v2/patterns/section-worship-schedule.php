<?php
/**
 * Title: Worship Schedule
 * Slug: ktheme-v2/section-worship-schedule
 * Categories: ktheme-v2-sections
 * Description: An editable worship schedule built with native WordPress blocks.
 */
?>
<!-- wp:group {"align":"wide","className":"kt-section kt-section--worship-schedule","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide kt-section kt-section--worship-schedule">
	<!-- wp:group {"className":"kt-section__header","layout":{"type":"constrained"}} -->
	<div class="wp-block-group kt-section__header">
		<!-- wp:paragraph {"className":"kt-card-label"} -->
		<p class="kt-card-label"><?php echo esc_html__( 'Worship Schedule', 'ktheme-v2' ); ?></p>
		<!-- /wp:paragraph -->
		<!-- wp:heading {"level":2} -->
		<h2 class="wp-block-heading"><?php echo esc_html__( '예배 시간 안내', 'ktheme-v2' ); ?></h2>
		<!-- /wp:heading -->
		<!-- wp:paragraph -->
		<p><?php echo esc_html__( '예배 시간과 장소는 사이트 편집기에서 교회 운영 일정에 맞게 수정해 주세요.', 'ktheme-v2' ); ?></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->

	<!-- wp:columns {"align":"wide","className":"kt-worship-schedule"} -->
	<div class="wp-block-columns alignwide kt-worship-schedule">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":3} -->
			<h3 class="wp-block-heading"><?php echo esc_html__( '주일예배', 'ktheme-v2' ); ?></h3>
			<!-- /wp:heading -->
			<!-- wp:list -->
			<ul class="wp-block-list"><li><?php echo esc_html__( '주일 오전 11:00', 'ktheme-v2' ); ?></li><li><?php echo esc_html__( '본당', 'ktheme-v2' ); ?></li></ul>
			<!-- /wp:list -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":3} -->
			<h3 class="wp-block-heading"><?php echo esc_html__( '수요예배', 'ktheme-v2' ); ?></h3>
			<!-- /wp:heading -->
			<!-- wp:list -->
			<ul class="wp-block-list"><li><?php echo esc_html__( '수요일 오후 7:30', 'ktheme-v2' ); ?></li><li><?php echo esc_html__( '본당', 'ktheme-v2' ); ?></li></ul>
			<!-- /wp:list -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":3} -->
			<h3 class="wp-block-heading"><?php echo esc_html__( '새벽기도', 'ktheme-v2' ); ?></h3>
			<!-- /wp:heading -->
			<!-- wp:list -->
			<ul class="wp-block-list"><li><?php echo esc_html__( '월요일부터 토요일 오전 5:30', 'ktheme-v2' ); ?></li><li><?php echo esc_html__( '기도실', 'ktheme-v2' ); ?></li></ul>
			<!-- /wp:list -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
