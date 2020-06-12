function makeMobile() {
  cy.viewport(375, 812);
}

function makeDesktop() {
  cy.viewport(1280, 743);
}

Cypress.on('window:before:load', (win) => {
  // because this is called before any scripts
  // have loaded - the ga function is undefined
  // so we need to create it.
  // eslint-disable-next-line no-param-reassign
  win.ga = cy.stub().as('ga');
});

describe('Sapper template app', () => {
  beforeEach(() => {
    makeDesktop();
    cy.visit('/');
  });

  it('has the correct <h1>', () => {
    cy.contains('h1', 'Who are my representatives?');
  });

  it('can find a representative', () => {
    cy.get('[data-automation=state-ca]').should(
      'include.text',
      'CA',
    );
    cy.get('[data-automation=state-ca]').click();

    cy.url().should('include', '/representatives/ca');
    cy.contains('h1', 'California');
    cy.get('[data-automation=rep-D000598]').should('exist');
    cy.get('[data-automation=rep-D000598] img').should('be.visible');
    cy.get('[data-automation=rep-D000598]').click();
    cy.get('[data-automation=rep-info-fullname]').should(
      'have.html',
      'Susan A. Davis',
    );
  });

  it('mobile :: can find a representative with no images', () => {
    makeMobile();

    cy.get('[data-automation=state-ca]').should(
      'include.text',
      'CA',
    );
    cy.get('[data-automation=state-ca]').click();

    cy.url().should('include', '/representatives/ca');
    cy.get('[data-automation=rep-D000598]').should('exist');
    cy.get('[data-automation=rep-D000598] img').should('not.be.visible');
    cy.get('[data-automation=rep-D000598]').click();

    cy.get('[data-automation=rep-info-fullname]').should(
      'have.html',
      'Susan A. Davis',
    );
  });

  it('navigates to /about', () => {
    cy.get('nav a').contains('about').click();
    cy.url().should('include', '/about');
    cy.get('[data-automation=about-title]').should('have.html', 'About this site');
  });

  it('navigates to /district-map', () => {
    cy.get('nav a').contains('district map').click();
    cy.url().should('include', '/district-map');
    cy.get('[data-automation=district-map-title]').should('have.html', 'District Map');
  });

  it('fills out form with representative data', () => {
    cy.get('nav a').contains('district map').click();
    cy.url().should('include', '/district-map');
    cy.get('[data-automation=district-map-form-state-code]').type('ca');
    cy.get('[data-automation=district-map-form-district-code]').type('53');
    cy.get('[data-automation=district-map-form-submit]').click();

    cy.url().should('include', '/representatives/ca?rep_id=53');
    cy.get('[data-automation=rep-info-fullname]').should('have.html', 'Susan A. Davis');
    cy.get('[data-automation=invalid-rep-warning]').should('not.exist');
  });

  it('fills out form with bad representative data', () => {
    cy.get('nav a').contains('district map').click();
    cy.url().should('include', '/district-map');
    cy.get('[data-automation=district-map-form-state-code]').type('ca');
    cy.get('[data-automation=district-map-form-district-code]').type('111');
    cy.get('[data-automation=district-map-form-submit]').click();

    cy.url().should('include', '/representatives/ca?rep_id=111');
    cy.get('[data-automation=invalid-rep-warning]').should('exist');
  });

  it('fills out form with bad representative data, then fixes', () => {
    cy.get('nav a').contains('district map').click();
    cy.url().should('include', '/district-map');
    cy.get('[data-automation=district-map-form-state-code]').type('ca');
    cy.get('[data-automation=district-map-form-district-code]').type('111');
    cy.get('[data-automation=district-map-form-submit]').click();

    cy.url().should('include', '/representatives/ca?rep_id=111');
    cy.get('[data-automation=invalid-rep-warning]').should('exist');
    cy.get('[data-automation=invalid-rep-warning] a').click();

    cy.get('[data-automation=district-map-form-state-code]').type('ca');
    cy.get('[data-automation=district-map-form-district-code]').type('53');
    cy.get('[data-automation=district-map-form-submit]').click();

    cy.url().should('include', '/representatives/ca?rep_id=53');
    cy.get('[data-automation=rep-info-fullname]').should(
      'have.html',
      'Susan A. Davis',
    );
    cy.get('[data-automation=invalid-rep-warning]').should('not.exist');
  });
});
