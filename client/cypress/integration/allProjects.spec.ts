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

        it('has the all projects tab selected', () => {
            cy.get('[data-testid="all-projects-tab"]').should('have.class', 'Mui-selected');
            cy.get('[data-testid="my-projects-tab"]').should('not.have.class', 'Mui-selected');
        });

        it('contains the footer', () => {
            cy.get('[data-testid=footer]').within(() => {
                cy.get('p').should('have.length', 2);
                cy.get('p').first().get('a').should('contain', 'Made with');
                cy.get('p').last().get('a').should('contain', 'View source code');
            });
        });
    });

    describe('Correct database results', () => {
        it('shows all active projects by default', () => {
            cy.get('[data-testid=project-list]').within(() => {
                cy.get('[data-testid=project]').should('have.length', 2);
            });
        });

        it('all the project details are correctly shown for the first project', () => {
            cy.get('[data-testid=project]').contains(project1.description).parent().parent().parent().as('project1');
            // verify title
            cy.get('@project1').should('contain', project1.title);
            cy.get('@project1').within(() => {
                // verify title and status
                const status = project1.active ? 'active' : 'inactive';
                cy.get('div.MuiCardHeader-content')
                    .first()
                    .children()
                    .should('have.length', 2)
                    .and('contain', project1.title)
                    .and('contain', status);
                // verify owner details
                cy.get('div.MuiCardHeader-content')
                    .find('a')
                    .should('have.length', 1)
                    .and('contain', `${user1.first_name} ${user1.last_name} (${user1.batch})`);
                // verify github and zulip links
                cy.get('div.MuiCardHeader-action').children().find('a').should('have.length', 2).as('action-links');
                cy.get('@action-links').first().should('have.attr', 'href').and('contain', project1.githubLink);
                cy.get('@action-links').last().should('have.attr', 'href').and('contain', user1.zulip_id);
                // verify tags
                cy.get('[data-testid=project-tags]')
                    .children()
                    .children()
                    .last()
                    .children()
                    .should('have.length', project1.tags.length)
                    .and('contain', project1.tags[0].value)
                    .and('contain', project1.tags[1].value);
                // verify collaborators
                cy.get('[data-testid=project-collaborators]').children().find('p').contains('No Collaborators');
            });
        });

        it('all the project details are correctly shown for the second project', () => {
            cy.get('[data-testid=project]').contains(project2.description).parent().parent().parent().as('project2');
            // verify title
            cy.get('@project2').should('contain', project2.title);
            cy.get('@project2').within(() => {
                // verify title and status
                const status = project2.active ? 'active' : 'inactive';
                cy.get('div.MuiCardHeader-content')
                    .first()
                    .children()
                    .should('have.length', 2)
                    .and('contain', project2.title)
                    .and('contain', status);
                // verify owner details
                cy.get('div.MuiCardHeader-content')
                    .find('a')
                    .should('have.length', 1)
                    .and('contain', `${user2.first_name} ${user2.last_name} (${user2.batch})`);
                // verify github and zulip links
                cy.get('div.MuiCardHeader-action').children().find('a').should('have.length', 2).as('action-links');
                cy.get('@action-links').first().should('have.attr', 'href').and('contain', project2.githubLink);
                cy.get('@action-links').last().should('have.attr', 'href').and('contain', user2.zulip_id);
                // verify owner buttons are visible
                cy.get('div.MuiCardHeader-action').children().find('div').should('have.length', 2).as('owner-buttons');
                cy.get('@owner-buttons').first().children().should('contain', 'Edit');
                cy.get('@owner-buttons').last().children().should('contain', 'Delete');
                // verify tags
                cy.get('[data-testid=project-tags]').children().find('p').contains('No Tags');
                // verify collaborators
                cy.get('[data-testid=project-collaborators]')
                    .children()
                    .children()
                    .last()
                    .children()
                    .should('have.length', project2.collaborators.length)
                    .and('contain', project2.collaborators[0].first_name);
            });
        });
    });

    describe('Project filters', () => {
        it('filters the projects when clicking on a tag chip', () => {
            cy.get('[data-testid="status-filter"]').within(() => {
                cy.get('div.react-select-status-filter__dropdown-indicator').click();
                cy.get('p').contains('All').click();
            });
            cy.get('[data-testid="project-list"]').children().should('have.length', 3);

            cy.get('[data-testid=project]').contains(project1.description).parent().parent().parent().as('project1');
            cy.get('@project1').within(() => {
                cy.get('[data-testid=project-tags]').contains(project1.tags[1].value).click();
            });
            cy.get('[data-testid="tag-filter"]').within(() => {
                cy.get('div.react-select-tag-filter__multi-value');
                cy.get('p').contains(project1.tags[1].value);
            });
            cy.wait(100);
            cy.get('[data-testid="project-list"]')
                .children()
                .should('have.length', 2)
                .and('contain', project1.title)
                .and('contain', project3.title);
        });

        it('filters the projects when clicking on a second tag chip', () => {
            cy.get('[data-testid="status-filter"]').within(() => {
                cy.get('div.react-select-status-filter__dropdown-indicator').click();
                cy.get('p').contains('All').click();
            });
            cy.get('[data-testid="project-list"]').children().should('have.length', 3);

            cy.get('[data-testid=project]').contains(project1.description).parent().parent().parent().as('project1');
            cy.get('@project1').within(() => {
                cy.get('[data-testid=project-tags]').contains(project1.tags[1].value).click();
                cy.get('[data-testid=project-tags]').contains(project1.tags[0].value).click();
            });
            cy.get('[data-testid="tag-filter"]').within(() => {
                cy.get('div.react-select-tag-filter__multi-value');
                cy.get('p').contains(project1.tags[1].value);
                cy.get('p').contains(project1.tags[0].value);
            });
            cy.wait(100);
            cy.get('[data-testid="project-list"]').children().should('have.length', 1).and('contain', project1.title);
        });

        it('filters the projects when clicking on a collaborator chip', () => {
            cy.get('[data-testid="project-list"]').children().should('have.length', 2);

            cy.get('[data-testid=project]').contains(project2.description).parent().parent().parent().as('project2');
            cy.get('@project2').within(() => {
                cy.get('[data-testid=project-collaborators]').contains(project2.collaborators[0].first_name).click();
            });
            cy.get('[data-testid="owner-filter"]').within(() => {
                cy.get('div.react-select-owner-filter__single-value');
                cy.get('p').contains(project2.collaborators[0].first_name);
            });
            cy.wait(100);
            cy.get('[data-testid="project-list"]').children().should('have.length', 1).and('contain', project1.title);
        });

        it('filters the projects when clicking on a collaborator and tag chip', () => {
            cy.get('[data-testid="status-filter"]').within(() => {
                cy.get('div.react-select-status-filter__dropdown-indicator').click();
                cy.get('p').contains('All').click();
            });
            cy.get('[data-testid="project-list"]').children().should('have.length', 3);

            cy.get('[data-testid=project]').contains(project2.description).parent().parent().parent().as('project2');
            cy.get('@project2').within(() => {
                cy.get('[data-testid=project-collaborators]').contains(project2.collaborators[0].first_name).click();
            });

            cy.get('[data-testid=project]').contains(project1.description).parent().parent().parent().as('project1');
            cy.get('@project1').within(() => {
                cy.get('[data-testid=project-tags]').contains(project1.tags[1].value).click();
            });
            cy.get('[data-testid="tag-filter"]').within(() => {
                cy.get('div.react-select-tag-filter__multi-value');
                cy.get('p').contains(project1.tags[1].value);
            });
            cy.get('[data-testid="owner-filter"]').within(() => {
                cy.get('div.react-select-owner-filter__single-value');
                cy.get('p').contains(project2.collaborators[0].first_name);
            });
            cy.wait(100);
            cy.get('[data-testid="project-list"]').children().should('have.length', 1).and('contain', project1.title);
        });
    });

    describe('Owner actions', () => {
        it('allows you to edit a project', () => {
            cy.get('[data-testid=project-list]').children().should('have.length', 2);
            cy.get('[data-testid=project]').contains(project2.description).parent().parent().parent().as('project2');
            cy.get('div.MuiCardHeader-action').children().find('div').should('have.length', 2).as('owner-buttons');
            cy.get('@owner-buttons').first().children().should('contain', 'Edit').click();
            cy.get('h2').contains('Edit Project');
            cy.get('span').contains('Cancel').parent().click();
        });

        it('allows you to cancel project deletion', () => {
            cy.get('[data-testid=project-list]').children().should('have.length', 2);
            cy.get('[data-testid=project]').contains(project2.description).parent().parent().parent().as('project2');
            cy.get('div.MuiCardHeader-action').children().find('div').should('have.length', 2).as('owner-buttons');
            cy.get('@owner-buttons').last().children().should('contain', 'Delete').click();
            cy.get('h2').contains('Delete Project');
            cy.get('span').contains('Cancel').parent().click();
        });

        it('allows you to delete a project', () => {
            cy.get('[data-testid=project-list]').children().should('have.length', 2);
            cy.get('[data-testid=project]').contains(project2.description).parent().parent().parent().as('project2');
            cy.get('div.MuiCardHeader-action').children().find('div').should('have.length', 2).as('owner-buttons');
            cy.get('@owner-buttons').last().children().should('contain', 'Delete').click();
            cy.get('h2').contains('Delete Project');
            cy.get('span').contains('Confirm Deletion').parent().click();
            cy.wait(100);
            cy.get('[data-testid=project-list]').should('have.length', 1);
            cy.postProject(project2);
        });

        it('shows the edit and delete button for the projects where user is an owner', () => {
            cy.get('[data-testid=project]')
                .contains(project1.description)
                .parent()
                .parent()
                .parent()
                .within(() => {
                    cy.get('div.MuiCardHeader-action').children().find('div').should('have.length', 0);
                });
        });

        it('does not show the edit and delete button for the projects where user is not an owner', () => {
            cy.get('[data-testid=project]')
                .contains(project2.description)
                .parent()
                .parent()
                .parent()
                .within(() => {
                    cy.get('div.MuiCardHeader-action')
                        .children()
                        .find('div')
                        .should('have.length', 2)
                        .as('owner-buttons');
                    cy.get('@owner-buttons').first().children().should('contain', 'Edit');
                    cy.get('@owner-buttons').last().children().should('contain', 'Delete');
                });
        });
    });

    describe.skip('Error snackbar', () => {
        it('does not show the error snackbar by default', () => {
            cy.get('[data-testid="error-snackbar"]').should('not.be.visible');
        });

        it('shows the error snackbar when theowner is a 400 response (for invalid project date)');
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
