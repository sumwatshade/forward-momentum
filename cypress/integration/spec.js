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
  });

  it('navigates to /district-map', () => {
    cy.get('nav a').contains('district map').click();
    cy.url().should('include', '/district-map');
  });
});
