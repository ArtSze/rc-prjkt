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

    it('contains the footer', () => {
        cy.get('[data-testid=footer]').within(() => {
            cy.get('p').should('have.length', 2);
            cy.get('p').first().get('a').should('contain', 'Made with');
            cy.get('p').last().get('a').should('contain', 'View source code');
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
            cy.get('[data-testid="add-project-button"]').should('contain', 'Add Project');
        });
    });

    describe('Mobile view', () => {
        beforeEach(() => {
            cy.viewport(400, 600);
        });

        it('contains the navigation bar with an authorize button without the title', () => {
            cy.get('[data-testid=nav]').should('not.contain', 'h1').and('not.contain', 'RC Projects');
            cy.get('[data-testid=nav]').within(() => {
                cy.get('a').should('contain', 'Authorize').and('have.attr', 'href', '/api/auth');
            });
        });
        it('contains the footer', () => {
            cy.get('[data-testid=footer]').within(() => {
                cy.get('p').should('have.length', 2);
                cy.get('p').first().get('a').should('contain', 'Made with');
                cy.get('p').last().get('a').should('contain', 'View source code');
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
                cy.get('button').should('not.contain', 'Add Project');
                cy.get('[data-testid="add-project-button"]').within(() => {
                    cy.get('[data-testid="add-project-plus"]');
                });
            });
        });
    });
});
