/// <reference types="cypress" />
import { project1, project2, project3, user1, user2, user3 } from '../fixtures/index';

describe('My Projects', () => {
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
        cy.get('[data-testid="my-projects-tab"]').click();
    });

    describe('Page display', () => {
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

        it('has the my projects tab selected', () => {
            cy.get('[data-testid="all-projects-tab"]').should('not.have.class', 'Mui-selected');
            cy.get('[data-testid="my-projects-tab"]').should('have.class', 'Mui-selected');
        });

        it('contains the footer', () => {
            cy.get('[data-testid=footer]').within(() => {
                cy.get('p').should('have.length', 2);
                cy.get('p').first().get('a').should('contain', 'Made with');
                cy.get('p').last().get('a').should('contain', 'View source code');
            });
        });

        it('hides the filter');
    });

    describe('Correct database results', () => {
        it('shows all projects that the current user owns including inactive');

        it('all the project details are correctly shown');
    });

    describe('Owner actions', () => {
        it('shows the edit and delete button for all projects');

        it('allows you to edit a project');

        it('allows you to delete a project');
    });

    it('resets the filters after clicking on all projects');

    it('tag and collaborator chips are disabled and do not filter');

    describe('Error snackbar', () => {
        it('does not show the error snackbar by default');

        it('shows the error snackbar when there is a 400 response (for invalid project date)');
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

        it('has the my projects tab selected', () => {
            cy.get('[data-testid="all-projects-tab"]').should('not.have.class', 'Mui-selected');
            cy.get('[data-testid="my-projects-tab"]').should('have.class', 'Mui-selected');
        });

        it('hides the filter and contains the projects', () => {
            // TODO: check filter is hidden
            cy.get('[data-testid=project-list]').within(() => {
                cy.get('[data-testid=project]').should('have.length', 2);
            });
        });
    });
});
