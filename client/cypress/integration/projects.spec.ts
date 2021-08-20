describe('Projects home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000');
    });

    it('front page can be opened', () => {
        cy.contains('RC Projects');
    });

    // this needs to be reorganized/split into a separate test in order to deal with CORS
    it.skip('can authorize', () => {
        cy.contains('AUTHORIZE').click();
        cy.contains('SUBMIT');
    });

    it.skip('add project form can be opened', () => {
        cy.contains('ADD PROJECT').click();
        cy.contains('SUBMIT');
    });
});
