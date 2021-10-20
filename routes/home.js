'use strict';

function get(request, response) {
  const html = /* html */ `
        <section>
      <div>
      <a href="/signup">Sign up</a>
      </div>
      </section>
      `;
  response.send(html);
}

module.exports = { get };
