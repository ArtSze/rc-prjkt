/// <reference types="cypress" />
import { user1 } from '../fixtures/user1';

describe('Projects home page', () => {
    before(() => {
        cy.visit('/');
        cy.login(user1);
        cy.visit('/');
    });

    it('front page can be opened', () => {
        cy.contains('RC Projects');
    });

    it.only('Add Project button is displayed', () => {
        cy.get('header').within(() => {
            cy.contains('Add Project');
        });
    });

    it.only('All Projects tab is displayed', () => {
        cy.get('header').within(() => {
            cy.contains('All Projects');
        });
    });

    it.only('My Projects tab is displayed', () => {
        cy.get('header').within(() => {
            cy.contains('My Projects');
        });
    });

    it('the Tag Filter is displayed', () => {
        cy.contains('Tag Filter');
    });
});
