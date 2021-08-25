/// <reference types="cypress" />
import { user } from '../fixtures/user';

describe('Add Projects', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(user);
        cy.visit('/');
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
        // first instance of a Formik field component that is not accessible via a data-testid attribute
        // (nested selector taken from experimentalStudio feature) should hypothetically be '[data-testid="form-title-field"]'
        cy.get('.jss14 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type(
            'This is a sample title for a Cypress test',
        );
        cy.get('[data-testid=add-project-modal-title]').click();
        // (nested selector taken from experimentalStudio feature) should hypothetically be '[data-testid="form-title-field"]'
        cy.get('.jss14 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').should(
            'have.value',
            'This is a sample title for a Cypress test',
        );
    });

    it('Description field accepts input', () => {
        cy.get('[data-testid="add-project-button"]').click();
        // (nested selector taken from experimentalStudio feature) should hypothetically be '[data-testid="form-description-field"]'
        cy.get('[rows="1"]').type('This is a sample description for a Cypress test');
        cy.get('[data-testid=add-project-modal-title] > .MuiTypography-root').click();
        // (nested selector taken from experimentalStudio feature) should hypothetically be '[data-testid="form-description-field"]'
        cy.get('[rows="1"]').should('have.value', 'This is a sample description for a Cypress test');
    });

    it('Github Link field accepts input', () => {
        cy.get('[data-testid="add-project-button"]').click();
        // (nested selector taken from experimentalStudio feature) should hypothetically be '[data-testid="form-github-field"]'
        cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type('github.com');
        cy.get('[data-testid=add-project-modal-title] > .MuiTypography-root').click();
        // (nested selector taken from experimentalStudio feature) should hypothetically be '[data-testid="form-github-field"]'
        cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').should(
            'have.value',
            'github.com',
        );
    });

    it('Collaborators field allows selection of an option', () => {
        cy.get('[data-testid="add-project-button"]').click();
        // (nested selector taken from experimentalStudio feature) should hypothetically be '[data-testid="form-collaborators-field"]'
        cy.get(
            '.MuiGrid-spacing-xs-2 > :nth-child(1) > :nth-child(1) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3 > .css-1wa3eu0-placeholder > .MuiTypography-root',
        ).click();
        cy.get('[data-testid=add-project-modal-title] > .MuiTypography-root').click();
        // This validation doesn't work when referring to the same selector, tried other options... no luck
        cy.get(
            '.MuiGrid-spacing-xs-2 > :nth-child(1) > :nth-child(1) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3 > .css-1wa3eu0-placeholder > .MuiTypography-root',
        ).should('have.value', 'Artur Szerejko');
    });
});
