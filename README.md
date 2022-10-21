# opencollective.foundation

This is the code for opencollective.foundation.

## Architecture and tools

opencollective.foundation is a static site built with [Eleventy](https://11ty.dev/), a JavaScript-based static site generator. Eleventy compiles template code written in [EJS](https://ejs.co/), content written in [Markdown](https://spec.commonmark.org/current/), and styles written in [LESS](https://lesscss.org/), into pure HTML and CSS. Being a static site, there is no backend, database, or (much) frontend rendering. At opencollective.foundation/admin, [Netlify CMS](https://www.netlifycms.org/) provides a GUI to edit content. This is really just a fancy interface that commits changes to Markdown files to Git, as there is no database like in popular CMSes such as WordPress. The Admin site is authenticated using GitHub OAuth.
The site is deployed to [Vercel](https://vercel.com/opencollective/foundation-website), a static site host, and served via their CDNs.

(Note that Netlify is a competitor to Vercel. We do not use Netlify for deployments, only their open source CMS library.)

## Development environment

### Prerequisites

This site was built with the node version specified in `.nvmrc`.

### Installing dependencies

```
npm install
```

### Running locally

```
npm run serve
```

And open the URL shown.

### Deployment

Vercel manages automatic deployment of changes to `master`, and creates preview branch deploys automatically.
See Vercel documentation for more information.

### Code Style

Git hooks will be automatically installed by `husky` to lint files with `prettier` upon saving. Unfortunately it's not great at `.ejs` files, so try to keep those tidy yourself.

## Overview

### Sectional layout

This is a single-page site that uses a sectional layout. That is, the page is rendered by concatenating together items in Eleventy collections in one page (implemented in `/_includes/sectionalLayout.ejs`). The collection items are the `/home` directory. They are rendered in the order of the `position` attribute of each item. The navigation is generated from these items, exempting those with `hideInNavigation: true`.

Markdown files are editable in the CMS, `ejs` files are not, but allow a developer to write custom HTML for when a custom layout is needed. Alternating ejs and Markdown sections is one way to intersperse editable and non-editable content.

### Styles

LESS files are in `/styles`. `/styles/styles.less` is the entrypoint and must import all other files.

`/styles/variables` contains declarations of reusable colors, fonts, etc. Please try to always reuse a variable rather than using literal colors anywhere else.

`/styles/partials` has larger blocks of reusable styles.

Most other files map 1:1 with an item of content. They should be wrapped in a scoping block that ensures they only affect the element they intend to style, and shouldn't be reused.

### Assets

`/assets/uploads` contains files uploaded into the CMS's media manager.

`/assets/images` - static images not managed by the CMS

`/assets/scripts` - a small amount of JavaScript
While the site is mostly static, there are a few cases for which we need client-side JS.

- There are a few interactive elements like the photos carousel and some hide/show buttons.
- Client-side JS is also used when editable Markdown needs to be modified, such as converting the "services" table into a very different DOM structure for its mobile view.
- And it's also used to localize date-times to display in the locale and timezone of the user.

But mainly this is a static site, so for simplicity and performance it does not use an interactive library like React or Vue.

There is no transpiler or polyfills, so party like it's 2012 🕺🏻 ! Check [CanIUse](https://caniuse.com/) for what JS features have cross-browser support and please be careful! We do not have a browser matrix but try to write compatible code. We are not supporting Internet Explorer, so ES6 should be okay.

### Image resizing

This is an image-heavy site.
It's important that content creators be able to add high-quality imagery without without hurting the site's performance.
Images are resized as part of the build process using the [`eleventy-img`](https://github.com/11ty/eleventy-img) plugin.
The helper function `image()` in `_data/image.js` generates a `picture` tag with various sizes.

Content editors should provide high-quality imagery and allow our resizer to do its job.

The resizing process is the slowest part of the build. If anyone wants to improve caching, please have a go!

### External content

Some content on the site like the blog, set of hosted collectives, and events are pulled from external sources _at build time_.
These functions are in `_data`.

A Github Actions job (`.github/workflows`) triggers a regular re-deploy of the site to refresh this content.

### Admin

Netlify CMS is loaded from a CDN in `/admin/index.html`.
The configuration in in `/admin/config.yml`. This file specifies what files are editable in the UI.
For sections, we use "folder collections", meaning each item is a file in a folder.
For other data that doesn't have a clear "content body", we use "file collections" which mean all the collection items are in a JSON file in `/_data`.
See the Netlify CMS documentation for details.

#### Toast Markdown UI

This is one of those "okay…let me explain" moments, because it's a doozy.

The Markdown editor that comes with Netlify CMS is lacking, specifically in its support for editing tables, and we have a large table that content editors want to be able to change. So we plug in a more advanced Markdown editor "Toast UI".

To do this I (@jboolean) publish a separate npm package (https://github.com/jboolean/netlify-cms-widget-markdown-toast-ui) that re-packages the Toast UI React library as a Netlify plugin. Then, in `src/scripts.11ty`.js we run a little Webpack build to compile Netlify CMS (since the pre-compiled CDN version doesn't allow the plugin to be installed.). In `main.js` we initialize Netlify CMS and register the plugin, and this script is included in the admin page at `admin/index.html`.

### `/_data`

The data folder is a convenient way to store arbitrary data for use in templates.
There are a couple things in here: actual data and utility functions.

Data files like `featuredCollectives.json` are editable in the CMS and used in templates.

The second, hacky use of `_data` is to make JavaScript functions available to templates.
This includes `_.js` which exports lodash, and `markdown.js` which provides a function to render markdown (Eleventy automatically renders Markdown when it's the body of a Markdown file, but not if it's just a string in a JSON blob in `/_data`).

### Misc.

### Markdown containers

If we need some custom layout but also need a section to be editable, it's possible to define custom markdown blocks that turn into CSS classes. These are defined in the markdown-it configuration in `.eleventy.js` and the styles are in `markdown-containers.less`.

## Backend

There are a few backend lambda functions in `/api`. These support Oauth for the CMS and the newsletter sign-up form.
