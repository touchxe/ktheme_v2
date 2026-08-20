<?php
/**
 * Title: Profile Grid
 * Slug: ktheme/query-profile-grid
 * Categories: ktheme-queries
 * Description: A reusable profile grid for people or teams.
 */
?>
<!-- wp:query {"query":{"perPage":6,"pages":0,"offset":0,"postType":"ktheme_profile","order":"asc","orderBy":"title","inherit":false}} -->
<div class="wp-block-query"><!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} --><!-- wp:group {"layout":{"type":"constrained"}} --><div class="wp-block-group"><!-- wp:post-featured-image {"isLink":true,"aspectRatio":"1"} /--><!-- wp:post-title {"isLink":true,"level":3} /--><!-- wp:post-excerpt {"moreText":""} /--></div><!-- /wp:group --><!-- /wp:post-template --><!-- wp:query-no-results --><p>No profiles are available yet.</p><!-- /wp:query-no-results --></div>
<!-- /wp:query -->
