import 'cypress-react-selector';

/// <reference types="cypress" />

import project1 from '../fixtures/project1.json';
import project2 from '../fixtures/project2.json';
import { user1 } from '../fixtures/user1';
import { user2 } from '../fixtures/user2';
import { user3 } from '../fixtures/user3';
import tag1 from '../fixtures/tag1.json';

describe('Form Validation', () => {
    before(() => {
        cy.login(user2);
        cy.postProject(project1);
        cy.createUser(user3);
    });

    beforeEach(() => {
        cy.visit('/');
        cy.login(user1);
        cy.visit('/');
        cy.waitForReact();
    });

    it('Title field validation displays error when focused and unfocused without value', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'title' } }).click();
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('title is required');
    });

    it('Description field displays error when value is < 20 characters', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('textarea', { props: { name: 'description' } }).type('a');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('must be 20 characters or longer');
    });

    it('Description field displays error when value is > 480 characters', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('textarea', { props: { name: 'description' } }).type(
            'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.',
        );
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('must be 480 characters or less');
    });

    it('Github Link field field displays error when url is not formatted properly (two `dots`)', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'githubLink' } }).type('github..c');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('enter a valid url');
    });

    it('Github Link field field displays error when url is not formatted properly (no prefix)', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'githubLink' } }).type('.com');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('enter a valid url');
    });

    it('Github Link field field displays error when url is not formatted properly (no `.com`)', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'githubLink' } }).type('guugel');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('enter a valid url');
    });

    it('A project cannot be submitted with a required field missing (title)', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // focus & unfocus title field
        cy.react('input', { props: { name: 'title' } }).click();
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
                .contains(`${user2.first_name} ${user2.last_name}`)
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
        cy.get('[data-testid=form-submit-button]').should('be.visible');
    });

    it('A project cannot be submitted if the description length is too short', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // add title
        cy.react('input', { props: { name: 'title' } }).type(`${project2.title}`);
        cy.get('[data-testid=add-project-modal-title]').click();

        // add description (too short)
        cy.react('textarea', { props: { name: 'description' } }).type('a');
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
                .contains(`${user2.first_name} ${user2.last_name}`)
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
        cy.get('[data-testid=form-submit-button]').should('be.visible');
    });

    it('A project cannot be submitted if the description length is too long', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // add title
        cy.react('input', { props: { name: 'title' } }).type(`${project2.title}`);
        cy.get('[data-testid=add-project-modal-title]').click();

        // add description (too long)
        cy.react('textarea', { props: { name: 'description' } }).type(
            'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.',
        );
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
                .contains(`${user2.first_name} ${user2.last_name}`)
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
        cy.get('[data-testid=form-submit-button]').should('be.visible');
    });

    it('A project cannot be submitted if the github link is not properly formatted', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // add title
        cy.react('input', { props: { name: 'title' } }).type(`${project2.title}`);
        cy.get('[data-testid=add-project-modal-title]').click();

        // add description (too short)
        cy.react('textarea', { props: { name: 'description' } }).type(`${project2.description}`);
        cy.get('[data-testid=add-project-modal-title]').click();

        // add github link (improperly formatted)
        cy.react('input', { props: { name: 'githubLink' } }).type(`guugle`);
        cy.get('[data-testid=add-project-modal-title]').click();

        // add collaborators
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .contains(`${user2.first_name} ${user2.last_name}`)
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
        cy.get('[data-testid=form-submit-button]').should('be.visible');
    });

    after(() => {
        cy.clearDB();
    });
});
