/// <reference types="cypress" />
import { user } from '../fixtures/user';

describe('Projects home page', () => {
    before(() => {
        cy.visit('/');
        cy.login(user);
        cy.visit('/');
    });

    it('Add Project can be clicked', () => {
        cy.get('[data-testid="Add Project"]').click();
    });
});
