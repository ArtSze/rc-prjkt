/// <reference types="cypress" />

describe('Projects home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000');
    });

    it('front page can be opened', () => {
        cy.contains('RC Projects');
    });

    it('can authorize', () => {
        cy.visit('http://localhost:4000', {
            onBeforeLoad(win) {
                win.document.cookie =
                    'connect.sid=s%3AaS3QicISaErm6vnMQkhw6f6XjB4lssiO.4KD6Ar3xAVGbRuqxmgiZxxDIZaImzS8Qsi1zsN%2FJhM8';
            },
        });
        cy.getCookie('connect.sid').should(
            'have.property',
            'value',
            's%3AaS3QicISaErm6vnMQkhw6f6XjB4lssiO.4KD6Ar3xAVGbRuqxmgiZxxDIZaImzS8Qsi1zsN%2FJhM8',
        );
    });

    it('add project form can be opened', () => {
        cy.visit('http://localhost:4000', {
            onBeforeLoad(win) {
                win.document.cookie =
                    'connect.sid=s%3AaS3QicISaErm6vnMQkhw6f6XjB4lssiO.4KD6Ar3xAVGbRuqxmgiZxxDIZaImzS8Qsi1zsN%2FJhM8';
            },
        });
        cy.contains('Add Project').click();
        cy.contains('Submit');
    });
});
