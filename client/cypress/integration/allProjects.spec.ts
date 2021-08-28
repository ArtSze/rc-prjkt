/// <reference types="cypress" />

import { project1, project2, project3, user1, user2, user3 } from '../fixtures/index';

describe('All Projects', () => {
    before(() => {
        cy.clearDB();
        cy.login(user1);
        cy.postProject(project1);
        cy.login(user2);
        cy.postProject(project2);
        cy.postProject(project3);
        cy.createUser(user3);
    });

    beforeEach(() => {
        cy.login(user2);
    });

    it('contains the navigation bar with 3 buttons with icons', () => {
        cy.get('[data-testid=nav]').should('not.contain', 'h1').and('contain', 'RC Projects');
        cy.get('[data-testid=nav]').within(() => {
            cy.get('button').should('have.length', 3);
        });
        cy.get('[data-testid="add-project-button"]').within(() => {
            cy.contains('Add Project');
        });
        cy.get('[data-testid="all-projects-tab"]').within(() => {
            cy.contains('All Projects');
        });
        cy.get('[data-testid="my-projects-tab"]').within(() => {
            cy.contains('My Projects');
        });
    });

    it('has the all projects tab selected', () => {
        cy.get('[data-testid="all-projects-tab"]').should('have.class', 'Mui-selected');
        cy.get('[data-testid="my-projects-tab"]').should('not.have.class', 'Mui-selected');
    });

    it('shows all active projects by default');

    it('filters the projects when clicking on a collaborator chip');

    it('filters the projects when clicking on a tag chip');

    it('allows you to edit a project');

    it('allows you to delete a project');

    it('adds a second tag filter when clicking on another tag chip');

    it('shows the edit and delete button for the projects where user is an owner');

    it('does not show the edit and delete button for the projects where user is not an owner');

    it('contains the footer', () => {
        cy.get('[data-testid=footer]').within(() => {
            cy.get('p').should('have.length', 2);
            cy.get('p').first().get('a').should('contain', 'Made with');
            cy.get('p').last().get('a').should('contain', 'View source code');
        });
    });

    describe('Mobile view', () => {
        beforeEach(() => {
            cy.viewport(400, 600);
        });

        it('contains the navigation bar with 3 buttons with icons', () => {
            cy.get('[data-testid=nav]').should('not.contain', 'h1').and('not.contain', 'RC Projects');
            cy.get('[data-testid=nav]').within(() => {
                cy.get('button')
                    .should('have.length', 3)
                    .within(() => {
                        cy.get('svg');
                    });
            });
            cy.get('[data-testid="add-project-button"]').within(() => {
                cy.get('svg');
            });
            cy.get('[data-testid="all-projects-tab"]').within(() => {
                cy.get('svg');
            });
            cy.get('[data-testid="my-projects-tab"]').within(() => {
                cy.get('svg');
            });
        });

        it('has the all projects tab selected', () => {
            cy.get('[data-testid="all-projects-tab"]').should('have.class', 'Mui-selected');
            cy.get('[data-testid="my-projects-tab"]').should('not.have.class', 'Mui-selected');
        });

        it('contains a the filter and projects', () => {
            cy.get('[data-testid=filter]').within(() => {
                cy.get('[data-testid=tag-filter]').should('contain', 'Tag Filter');
                cy.get('[data-testid=owner-filter]').should('contain', 'Owner Filter');
                cy.get('[data-testid=status-filter]').should('contain', 'Status');
                cy.get('[data-testid=sort]').should('contain', 'Sort');
            });
            cy.get('[data-testid=project-list]').within(() => {
                cy.get('[data-testid=project]').should('have.length', 2);
            });
        });
    });
});
