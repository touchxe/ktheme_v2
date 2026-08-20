<?php
/**
 * Title: Community Media Gallery
 * Slug: ktheme/section-media-gallery
 * Categories: ktheme-sections
 * Description: An editable native gallery section for community and ministry pages.
 */

$ktheme_v2_gallery_images = array(
	get_theme_file_uri( 'assets/images/ktheme-demo-community-04.png' ),
	get_theme_file_uri( 'assets/images/ktheme-demo-community-01.png' ),
	get_theme_file_uri( 'assets/images/ktheme-demo-community-03.png' ),
);
?>
<!-- wp:group {"align":"wide","className":"kt-section kt-section--media-gallery","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide kt-section kt-section--media-gallery">
	<!-- wp:group {"className":"kt-section__header","layout":{"type":"constrained"}} -->
	<div class="wp-block-group kt-section__header">
		<!-- wp:paragraph {"className":"kt-card-label"} -->
		<p class="kt-card-label"><?php echo esc_html__( 'Community Gallery', 'ktheme-v2' ); ?></p>
		<!-- /wp:paragraph -->
		<!-- wp:heading {"level":2} -->
		<h2 class="wp-block-heading"><?php echo esc_html__( '함께한 순간을 소개합니다', 'ktheme-v2' ); ?></h2>
		<!-- /wp:heading -->
		<!-- wp:paragraph -->
		<p><?php echo esc_html__( '사진과 설명은 사이트 편집기에서 각 공동체와 사역에 맞게 교체할 수 있습니다.', 'ktheme-v2' ); ?></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->

	<!-- wp:gallery {"linkTo":"none","columns":3,"align":"wide","className":"kt-media-gallery"} -->
	<figure class="wp-block-gallery alignwide has-nested-images columns-3 is-cropped kt-media-gallery">
		<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
		<figure class="wp-block-image size-large"><img src="<?php echo esc_url( $ktheme_v2_gallery_images[0] ); ?>" alt="<?php echo esc_attr__( '예배와 공동체가 함께하는 모습', 'ktheme-v2' ); ?>" /></figure>
		<!-- /wp:image -->
		<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
		<figure class="wp-block-image size-large"><img src="<?php echo esc_url( $ktheme_v2_gallery_images[1] ); ?>" alt="<?php echo esc_attr__( '말씀을 나누는 공동체 모임', 'ktheme-v2' ); ?>" /></figure>
		<!-- /wp:image -->
		<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
		<figure class="wp-block-image size-large"><img src="<?php echo esc_url( $ktheme_v2_gallery_images[2] ); ?>" alt="<?php echo esc_attr__( '교제와 섬김이 이어지는 모습', 'ktheme-v2' ); ?>" /></figure>
		<!-- /wp:image -->
	</figure>
	<!-- /wp:gallery -->
</div>
<!-- /wp:group -->
