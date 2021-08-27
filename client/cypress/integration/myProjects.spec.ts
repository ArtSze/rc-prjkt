/// <reference types="cypress" />
import { user1 } from '../fixtures/user1';
import 'cypress-react-selector';

describe('My Projects', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(user1);
        cy.visit('/');
        cy.waitForReact();
    });

    it('shows all projects that the current user1 owns');

    it('hides the filter');

    it('shows the edit and delete button for all projects');

    it('allows you to edit a project');

    it('allows you to delete a project');

    it('contains the footer');

    it('contains the nav bar');

    it('resets the filters after clicking on all projects');
});
