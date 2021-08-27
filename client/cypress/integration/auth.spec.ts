/// <reference types="cypress" />

import { user1 } from '../fixtures/user1';

describe('Authorization Page contents', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('contains the navigation bar with an authorize button', () => {
        cy.get('[data-testid=nav]').within(() => {
            cy.get('h1').should('contain', 'RC Projects');
            cy.get('a').should('contain', 'Authorize').and('have.attr', 'href', '/api/auth');
        });
    });

    it('contains a box with the logo, greeting, and authorization button', () => {
        cy.get('[data-testid=auth-main]').within(() => {
            cy.get('h2').should('contain', 'Welcome to RC Projects!');
            cy.get('img').should('have.attr', 'alt', 'logo');
            cy.get('a').should('contain', 'Authorize').and('have.attr', 'href', '/api/auth');
        });
    });

    it('should allow authentication', () => {
        cy.login(user1);
        cy.visit('/');
        cy.get('[data-testid=nav]').within(() => {
            cy.get('button').should('contain', 'Add Project');
        });
    });
});
