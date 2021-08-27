import 'cypress-react-selector';

/// <reference types="cypress" />
import { user } from '../fixtures/user';
import project1 from '../fixtures/project1.json';

describe('Add Project', () => {
    before(() => {
        cy.login(user);
        cy.postProject(project1);
    });

    beforeEach(() => {
        cy.login(user);
        cy.visit('/');
        cy.waitForReact();
    });

    it('Initially does not contain a project with title of `Sample Title`', () => {
        cy.get('[data-testid="project-list"]').contains('Sample Title').should('not.exist');
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
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type('javascript{enter}');
            cy.get('[class*="-multiValue"]').contains('javascript');
        });
    });

    it.skip('Tags field allows creation of multiple options', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type('javascript{enter}');
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type('rust{enter}');
            cy.get('[class*="-multiValue"]').contains('javascript');
            cy.get('[class*="-multiValue"]').contains('rust');
        });
    });

    it('Tags field allows selection of single option', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
            cy.get('[class*="-multiValue"]').contains('python');
        });
    });

    it('Tags field allows selection of multiple options', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .last()
                .click();
            cy.get('[class*="-multiValue"]').contains('python');
            cy.get('[class*="-multiValue"]').contains('css');
        });
    });

    it('A project can be submitted and successfully created', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // add title
        cy.react('input', { props: { name: 'title' } }).type('Sample Title');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add description
        cy.react('textarea', { props: { name: 'description' } }).type('sample description here');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add github link
        cy.react('input', { props: { name: 'githubLink' } }).type('github.com');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add collaborators
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .last()
                .click();
        });

        // select single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
        });

        // create single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type('javascript{enter}');
        });

        // submit
        cy.get('[data-testid=form-submit-button]').click();

        // Very wonky needs second look
        cy.get('[data-testid=form-submit-button]').should('not.be.visible');

        // validate successful creation
        cy.get('[data-testid="project-list"]').contains('Sample Title');
    });

    after(() => {
        cy.clearDB();
    });
});
