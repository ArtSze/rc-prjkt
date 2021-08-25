/// <reference types="cypress" />

import { user } from '../fixtures/user';

describe('Authorization Page contents', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('contains the navigation bar with an authorize button', () => {
        cy.get('header').within(() => {
            cy.get('h1').should('contain', 'RC Projects');
            cy.get('a').should('contain', 'Authorize').and('have.attr', 'href', '/api/auth');
        });
    });

    it('contains a box with the logo, greeting, and authorization button', () => {
        cy.get('#root').within(() => {
            cy.get('h2').should('contain', 'Welcome to RC Projects!');
            cy.get('img').should('have.attr', 'alt', 'logo');
            cy.get('a').should('contain', 'Authorize').and('have.attr', 'href', '/api/auth');
        });
    });

    it('should allow authentication', () => {
        cy.login(user);
        cy.visit('/');
        cy.get('header').within(() => {
            cy.get('button').should('contain', 'Add Project');
        });
    });
});
