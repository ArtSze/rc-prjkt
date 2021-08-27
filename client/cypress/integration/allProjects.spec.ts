/// <reference types="cypress" />
import { user } from '../fixtures/user';
import 'cypress-react-selector';

describe('All Projects', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(user);
        cy.visit('/');
        cy.waitForReact();
    });

    it('shows all active projects by default');

    it('filters the projects when clicking on a collaborator chip');

    it('filters the projects when clicking on a tag chip');

    it('allows you to edit a project');

    it('allows you to delete a project');

    it('adds a second tag filter when clicking on another tag chip');

    it('shows the edit and delete button for the projects where user is an owner');

    it('does not show the edit and delete button for the projects where user is not an owner');

    it('contains the footer');

    it('contains the nav bar');
});
