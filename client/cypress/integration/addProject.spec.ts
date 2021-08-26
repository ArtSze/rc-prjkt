import 'cypress-react-selector';

/// <reference types="cypress" />
import { user } from '../fixtures/user';

describe('Add Projects', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(user);
        cy.visit('/');
        cy.waitForReact();
    });

    it('Initially does not contain any projects', () => {
        cy.get('[data-testid="no-projects"]').contains('No projects matching your search criteria have been found.');
    });

    it('Add Project modal can be opened', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.get('[data-testid="add-project-modal-title"]').contains('Add Project');
    });

    it('Title field accepts input', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'title' } }).type('Sample Title');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.react('input', { props: { name: 'title' } }).should('have.value', 'Sample Title');
    });

    it('Description field accepts input', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('textarea', { props: { name: 'description' } }).type('sample description here');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.react('textarea', { props: { name: 'description' } }).should('have.value', 'sample description here');
    });

    it('Github Link field accepts input', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'githubLink' } }).type('github.com');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.react('input', { props: { name: 'githubLink' } }).should('have.value', 'github.com');
    });

    it('Collaborators field allows selection of multiple options', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
            cy.get('[class*="-multiValue"]').contains('Artur Szerejko');
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .last()
                .click();
            cy.get('[class*="-multiValue"]').contains('user two');
        });
    });

    it('Tags field allows creation of single option', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .type('javascript{enter}');
            cy.get('[class*="-multiValue"]').contains('javascript');
        });
    });
});
