/// <reference types="cypress" />
import { user } from '../fixtures/user';

describe('Projects home page', () => {
    before(() => {
        cy.visit('/');
        cy.login(user);
        cy.visit('/');
    });

    it('Initially does not contain any projects', () => {
        cy.get('[data-testid="no-projects"]').contains('No projects matching your search criteria have been found.');
    });

    it('Add Project can be clicked', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.get('[data-testid="add-project-modal-title"]').contains('Add Project');
    });
});
