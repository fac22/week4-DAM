'use strict';

beforeEach(() => {
  cy.task('resetDb');
});

describe('login', () => {
  it('displays Sign up and Log in', () => {
    cy.visit('http://localhost:3000/');
    cy.get('form').find('#email').click().type('test@gmail.com');
  });
});

describe('Sign up', () => {
  it('displays Sign up and Log in', () => {
    cy.visit('http://localhost:3000/');
    cy.url().should('include', '/login');
    cy.contains('Sign up').click();

    cy.get('form').find('#email').click().type('hey');
    cy.get('form').find('#password').click().type('hey');
  });
});
