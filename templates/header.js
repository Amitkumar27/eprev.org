html`
<!doctype html>
<html lang="en">
  <meta charset="utf-8">
  <title>${page.title ? `${page.title} – ${site.title}` : site.title}</title>
  <link rel="shortcut icon" href="${url('icon.png')}">
  <link href="${url('main.css')}" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${page.description || site.description}">
  <script src="${url('main.js')}" type="module"></script>
  <link rel="alternate" type="application/atom+xml" title="Feed" href="${url(
    'atom.xml',
  )}">
  <link rel="canonical" href="${url(page.url)}">
  ${
    page.description
      ? html`
    <meta property="og:url" content="${url(page.url)}">
    <meta property="og:title" content="${page.title}">
    <meta property="og:site_name" content="${site.title}">
    <meta property="og:type" content="article">
    <meta property="og:description" content="${page.description}">
    ${
      page.ogImage
        ? html`
      <meta property="og:image" content="${url(page.url + page.ogImage)}">
      <meta name="twitter:image" content="${url(page.url + page.ogImage)}">
      <meta name="twitter:card" content="summary_large_image">
      `
        : ''
    }
    <meta name="twitter:creator" content="@{{ site.twitter }}">
    <meta name="twitter:title" content="{{ page.title }}">
    <meta name="twitter:description" content="{{ page.description }}">
  `
      : ''
  }
    <div class="page">
      <div class="page__sidebar">
        <div class="page__user-picture-story">
          ${
            page.url == '/'
              ? html`
            <h1 class="page__user-name">@${site.twitter}</h1>`
              : html`
            <a class="page__user-name" href="/">@${site.twitter}</a>`
          }
          <div class="page__user-picture">
            <svg viewBox="0 0 484 570" width="200">
              <path d="M39 503v67h343v-67H39z" fill="#feffff"/>
              <path d="M10.502 569.5v-41c0-28 37.29-41.04 37.29-41.04L127.5 556.5H150v13H10.502zM367 437h27c19 0 65.5 0 85 83v50H367V437zM255 553.5h33v16h-33v-16z" fill="#ff2600"/>
              <path d="M39 191v282c0 19.5 51.5 84 87 84h171c49 0 85-66.5 85-84V191c0-4-48-80-52-80H90.5c-4 0-51.5 80-51.5 80" fill="#ffd400"/>
              <path d="M38 268.92v-122.5c0-34.5 22.736-33.687 53-34-21.5.5-27.5-28.5-27.5-43.5 0-14.5 0-41.5 29-55.5 28.5-14 69.5 4 69.5 4s-20.5 18-34 51.5c1.5 9.5 9 4 9 4s13-41.5 100-63c95.5-9.5 197-16.5 246.5 0-19.5 66.5-101 103-147 102 46 1 46 34.5 46 34.5v122.5h-64v-157c0 9-216.5 7.5-216.5 7.5v150c-30-.5-64-.5-64-.5z" fill="#ff2600"/>
              <path d="M417 342v-55c0-37-36-37-40-37h-15c-4 0-8 4-8 8v113c0 4 4 8 8 8h15c4 0 40 0 40-37M0 287v55c0 37 36 37 40 37h15c4 0 8-4 8-8V258c0-4-4-8-8-8H40c-4 0-40 0-40 37" fill="#ffd400"/>
              <path d="M150 436v17h116v-17H150" fill="#770b00" data-id="mouth"/>
              <path d="M279 342c-25.5 0-46-20.5-46-46s20.5-46 46-46 46 20.5 46 46-20.5 46-46 46m-142 0c-25.5 0-46-20.5-46-46s20.5-46 46-46 46 20.5 46 46-20.5 46-46 46" fill="#feffff"/>
              <circle cx="137" cy="296" r="24" fill="#aad6d7" data-id="right-eye" transform="translate(20, 0)"/>
              <circle cx="279" cy="296" r="24" fill="#aad6d7" data-id="left-eye" transform="translate(20, 0)"/>
              <path d="M137.5 373c-42 0-76.5-34.5-76.5-76.5S95.5 220 137.5 220c32.003 0 59.65 20.03 71 48.147C219.85 240.03 247.497 220 279.5 220c42 0 76.5 34.5 76.5 76.5S321.5 373 279.5 373c-32.003 0-59.65-20.03-71-48.147C197.15 352.97 169.503 373 137.5 373m-.5-31c25.5 0 46-20.5 46-46s-20.5-46-46-46-46 20.5-46 46 20.5 46 46 46m142 0c25.5 0 46-20.5 46-46s-20.5-46-46-46-46 20.5-46 46 20.5 46 46 46" fill="#770b00"/>
            </svg>
          </div>
          <div class="page__user-story">
            ${site.description}
            I’m on <a href="https://twitter.com/eprev">Twitter</a>,
            <a href="https://github.com/eprev">GitHub</a> and <a href="https://unsplash.com/@eprev">Unsplash</a>.
          </div>
        </div>
        <ul class="page__nav">
          <li>
            ${page.url == '/' ? 'Home' : '<a href="/">Home</a>'}
          </li>
          <li>
            ${
              page.url == '/archive/'
                ? 'Archive'
                : '<a href="/archive/">Archive</a>'
            }
          </li>
          <li>
            ${page.url == '/tags/' ? 'Tags' : '<a href="/tags/">Tags</a>'}
          </li>
        </ul>
      </div>
      <div class="page__content">
`;