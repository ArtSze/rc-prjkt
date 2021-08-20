/// <reference types="cypress" />

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
        const user = {
            first_name: 'test',
            last_name: 'test',
            rcId: 1234,
            ownedProjects: [],
            collabProjects: [],
            zulip_id: 1234,
            image_path: '',
            batch: '',
            batchEndDate: new Date(),
        };
        cy.login(user);
        cy.visit('/');
        cy.get('header').within(() => {
            cy.get('button').should('contain', 'Add Project');
        });
    });
});
