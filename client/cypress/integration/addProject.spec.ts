import 'cypress-react-selector';

/// <reference types="cypress" />

import { project1, project2, tag1, tag2, user1, user2, user3 } from '../fixtures/index';

describe('Add Project', () => {
    before(() => {
        cy.clearDB();
        cy.login(user1);
        cy.postProject(project1);
        cy.createUser(user3);
    });

    beforeEach(() => {
        cy.login(user2);
        cy.waitForReact();
    });

    it(`Initially does not contain a project with title of ${project2.title}`, () => {
        cy.get('[data-testid="project-list"]').contains(`${project2.title}`).should('not.exist');
    });

    it('Add Project modal can be opened', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.get('[data-testid="add-project-modal-title"]').contains('Add Project');
    });

    it('Title field accepts input', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'title' } }).type(`${project2.title}`);
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.react('input', { props: { name: 'title' } }).should('have.value', `${project2.title}`);
    });

    it('Description field accepts input', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('textarea', { props: { name: 'description' } }).type(`${project2.description}`);
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.react('textarea', { props: { name: 'description' } }).should('have.value', `${project2.description}`);
    });

    it('Github Link field accepts input', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'githubLink' } }).type(`${project2.githubLink}`);
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.react('input', { props: { name: 'githubLink' } }).should('have.value', `${project2.githubLink}`);
    });

    it('Collaborators field allows selection of multiple options', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${user1.first_name} ${user1.last_name}`)
                .click();
            cy.get('[class*="-multiValue"]').contains(`${user1.first_name} ${user1.last_name}`);
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${user3.first_name} ${user3.last_name}`)
                .click();
            cy.get('[class*="-multiValue"]').contains(`${user3.first_name} ${user3.last_name}`);
        });
    });

    it('Tags field allows creation of single option', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type(`${tag1.value}{enter}`);
            cy.get('[class*="-multiValue"]').contains(`${tag1.value}`);
        });
    });

    it.skip('Tags field allows creation of multiple options', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type(`${tag1.value}{enter}`);
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type(`${tag2.value}{enter}`);
            cy.get('[class*="-multiValue"]').contains(`${tag1.value}`);
            cy.get('[class*="-multiValue"]').contains(`${tag2.value}`);
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
                .contains(`${project1.tags[0].value}`)
                .click();
            cy.get('[class*="-multiValue"]').contains(`${project1.tags[0].value}`);
        });
    });

    it('Tags field allows selection of multiple options', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]');
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${project1.tags[0].value}`)
                .click();
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${project1.tags[1].value}`)
                .click();
            cy.get('[class*="-multiValue"]').contains(`${project1.tags[0].value}`);
            cy.get('[class*="-multiValue"]').contains(`${project1.tags[1].value}`);
        });
    });

    it('A project can be submitted and successfully created', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // add title
        cy.react('input', { props: { name: 'title' } }).type(`${project2.title}`);
        cy.get('[data-testid=add-project-modal-title]').click();

        // add description
        cy.react('textarea', { props: { name: 'description' } }).type(`${project2.description}`);
        cy.get('[data-testid=add-project-modal-title]').click();

        // add github link
        cy.react('input', { props: { name: 'githubLink' } }).type(`${project2.githubLink}`);
        cy.get('[data-testid=add-project-modal-title]').click();

        // add collaborators
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${user1.first_name} ${user1.last_name}`)
                .click();
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${user3.first_name} ${user3.last_name}`)
                .click();
        });

        // select single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${project1.tags[0].value}`)
                .click();
        });

        // create single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type(`${tag1.value}{enter}`);
        });

        // submit
        cy.get('[data-testid=form-submit-button]').click();

        // Very wonky needs second look
        cy.get('[data-testid=form-submit-button]').should('not.exist');

        // validate successful creation
        cy.get('[data-testid="project-list"]').contains(`${project2.title}`);
    });

    it('After creating project with new tags, tag filter populates with new tags', () => {
        cy.get('.jss7 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${tag1.value}`)
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${project1.tags[0].value}`)
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${project1.tags[1].value}`);
        });
    });
});
