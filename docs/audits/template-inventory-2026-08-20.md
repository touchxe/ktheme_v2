# Template Inventory — 2026-08-20

## Purpose

This is the Phase 0 baseline for converting the current church-oriented theme into a reusable commercial platform. The current visual design is preserved; the classification only determines how each artifact is handled in later phases.

| Classification | Meaning |
| --- | --- |
| `core` | Keep as a product-level generic template or shell. |
| `engine-transition` | Keep temporarily, then move the content model and query behavior to `ktheme-engine`. |
| `preset` | Keep as a church preset/example, but do not make it a required generic core feature. |
| `integration` | Keep as a reusable integration shell; capability lives in a plugin/module. |
| `development-only` | Exclude from the commercial release package after its test/design-library role is replaced. |

## Templates

### Core

`404`, `archive`, `front-page`, `index`, `page`, `search`, `single`.

### Engine-transition

`archive-ktheme_album`, `archive-ktheme_event`, `archive-ktheme_sermon`, `single-ktheme_album`, `single-ktheme_event`, `single-ktheme_sermon`.

The `sermon` names are legacy content-model names. Their final generic counterparts are the `ktheme_media`, `ktheme_event`, and `ktheme_resource` models defined in the extension registry.

### Church preset

`page-about`, `page-admin-guide`, `page-annual-schedule`, `page-bulletin`, `page-community`, `page-dawn-prayer`, `page-faq`, `page-history`, `page-library`, `page-media`, `page-mission`, `page-newcomers`, `page-news`, `page-next-generation`, `page-people`, `page-qt`, `page-senior-ministry`, `page-small-groups`, `page-sunday-worship`, `page-support`, `page-training`, `page-vision`, `page-wednesday-worship`, `page-worship`, `page-youth-ministry`.

### Reusable integration shell

`page-contact`, `page-documents`, `page-facility-request`, `page-giving`, `page-location`, `page-vehicle-request`, `page-login`, `page-find-id`, `page-register`, `page-register-without-verification`, `page-reset-password`.

### Development-only

`page-design-library`, `page-lecture`, `page-lecture-style2`.

The `*.test.ts` files found under `templates/` are tests, not WordPress templates; they remain in the test suite until their coverage is relocated.

## Template Parts

| Classification | Parts |
| --- | --- |
| `core` | `header`, `footer`, `archive-hero`, `page-hero`, `page-hero-404`, `search-hero`, `single-hero` |
| `engine-transition` | `archive-hero-album`, `archive-hero-event`, `archive-hero-sermon`, `sermon-item-card` |
| `preset` | `page-hero-about`, `page-hero-admin-guide`, `page-hero-community`, `page-hero-media`, `page-hero-training`, `page-hero-worship`, `ministry-contact-modal` |

## Patterns and style variations

| Current artifact | Classification | Phase 1 action |
| --- | --- | --- |
| `section-donation-shell` | integration | move to stable `ktheme/` pattern namespace |
| `section-form-shell` | integration | move to stable `ktheme/` pattern namespace |
| `section-location-shell` | integration | move to stable `ktheme/` pattern namespace |
| `section-media-gallery` | engine-transition | move to stable `ktheme/` pattern namespace |
| `section-subpage-cta` | core | move to stable `ktheme/` pattern namespace |
| `section-worship-schedule` | preset | move to stable `ktheme/` pattern namespace; church copy remains a preset concern |
| `style1-home` | core | rename to semantic `page-home` |
| `style1-page-hero` | core | rename to semantic `section-page-hero` |
| `styles/style1.json` | design skin | rename to `styles/skin-foundation.json` without changing token values |

## Phase 0 decisions

1. No existing customer site requires migration compatibility.
2. The production folder and text domain remain `ktheme-modu` for this phase; only public pattern/category/style identifiers are stabilized.
3. Church-specific language remains in preset templates until the preset extraction phase. It must not appear in new engine, plugin, widget, or pattern naming.
4. New additions must follow `docs/architecture/EXTENSION_NAMING_STANDARD.md` and the extension registry before implementation.
