describe('Sapper template app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct <h1>', () => {
    cy.contains('h1', 'Who are my representatives?');
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

    cy.url().should('include', '/representatives/ca/53');
    cy.get('[data-automation=rep-info-fullname]').should('have.html', 'Susan A. Davis');
    cy.get('[data-automation=invalid-rep-warning]').should('not.exist');
  });

  it('fills out form with bad representative data', () => {
    cy.get('nav a').contains('district map').click();
    cy.url().should('include', '/district-map');
    cy.get('[data-automation=district-map-form-state-code]').type('ca');
    cy.get('[data-automation=district-map-form-district-code]').type('111');
    cy.get('[data-automation=district-map-form-submit]').click();

    cy.url().should('include', '/representatives/ca/111');
    cy.get('[data-automation=invalid-rep-warning]').should('exist');
  });
});
