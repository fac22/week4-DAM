'use strict';

function buildPage(title, content) {
  return /* html */ `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Facats">
      
   <title>${title}</title>
   </head>
   <body>
   <header><h1>FACats<h1></header>
   <main><section><div>${content}<div></section></main>
   </body>`;
}

module.exports = { buildPage };
