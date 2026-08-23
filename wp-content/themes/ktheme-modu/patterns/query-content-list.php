<?php
/**
 * Title: Content List
 * Slug: ktheme/query-content-list
 * Categories: ktheme-queries
 * Description: A neutral post list with an editable empty state.
 */
?>
<!-- wp:query {"query":{"perPage":6,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","inherit":false}} -->
<div class="wp-block-query"><!-- wp:post-template --><!-- wp:group {"layout":{"type":"constrained"}} --><div class="wp-block-group"><!-- wp:post-title {"isLink":true,"level":3} /--><!-- wp:post-excerpt {"moreText":""} /--></div><!-- /wp:group --><!-- /wp:post-template --><!-- wp:query-no-results --><p>No items have been published yet.</p><!-- /wp:query-no-results --></div>
<!-- /wp:query -->
