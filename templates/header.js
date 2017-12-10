html`
<!doctype html>
<html lang="en">
  <meta charset="utf-8">
  <title>${ page.title ? `${page.title} – ${site.title}` : site.title }</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${ page.description || site.description }">
  <link rel="shortcut icon" href="${ url('icon.png') }">
  <body>
`;