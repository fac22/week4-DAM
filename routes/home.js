'use strict';

function get(request, response) {
  return /* html */ `
        <section>
      <div>
      <a href="/signup">Sign up</a>
      </div>
      </section>
      `;
}

module.exports = { get };
