/// <reference types="cypress" />
import { project1, project2, project3, user1, user2, user3 } from '../fixtures/index';

describe('My Projects', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(user1);
        cy.visit('/');
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
