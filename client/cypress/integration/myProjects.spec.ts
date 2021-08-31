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
        cy.wait(100);
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

        it('hides the filter', () => {
            cy.get('[data-testid="filter"]').should('not.be.visible');
        });

        it('resets the filters after clicking on all projects', () => {
            cy.get('[data-testid="all-projects-tab"]').click();

            // add owner
            cy.get('[data-testid="owner-filter"]').within(() => {
                cy.get('div.react-select-owner-filter__dropdown-indicator').click();
                cy.get('p').contains(`${user1.first_name} ${user1.last_name}`).click();
                cy.get('div.react-select-owner-filter__single-value');
                cy.get('p').contains(`${user1.first_name} ${user1.last_name}`);
            });

            // add tag
            cy.get('[data-testid="tag-filter"]').within(() => {
                cy.get('div.react-select-tag-filter__dropdown-indicator').click();
                cy.get('p').contains(project1.tags[0].value).click();
                cy.get('div.react-select-tag-filter__multi-value');
                cy.get('p').contains(project1.tags[0].value);
            });

            // change sort
            cy.get('[data-testid="sort"]').within(() => {
                cy.get('div.react-select-sort__dropdown-indicator').click();
                cy.get('p').contains('Last Created').click();
            });

            // change status filter
            cy.get('[data-testid="status-filter"]').within(() => {
                cy.get('div.react-select-status-filter__dropdown-indicator').click();
                cy.get('p').contains('All').click();
            });

            cy.get('[data-testid="my-projects-tab"]').click();
            cy.get('[data-testid="all-projects-tab"]').click();
            cy.wait(100);
            cy.get('[data-testid="filter"]').within(() => {
                cy.get('[data-testid="owner-filter"]').within(() => {
                    cy.get('h6').contains('Owner Filter');
                    cy.get('div.react-select-owner-filter__value-container').find('p').contains('Select user...');
                });
                cy.get('[data-testid="tag-filter"]').within(() => {
                    cy.get('h6').contains('Tag Filter');
                    cy.get('div.react-select-tag-filter__value-container').find('p').contains('Select tags...');
                });
                cy.get('[data-testid="sort"]').within(() => {
                    cy.get('h6').contains('Sort');
                    cy.get('div.react-select-sort__value-container').find('p').contains('Last Updated');
                });
                cy.get('[data-testid="status-filter"]').within(() => {
                    cy.get('h6').contains('Status');
                    cy.get('div.react-select-status-filter__value-container').find('p').contains('Active');
                });
            });
        });

        it.skip('tag and collaborator chips are disabled and do not filter', () => {
            // FIXME: remove skip after chips are no longer clickable
            cy.get('[data-testid="project-list"]').children().should('have.length', 3);
            cy.get('[data-testid=project]').contains(project3.description).parent().parent().parent().as('project3');
            cy.get('@project3').within(() => {
                cy.get('[data-testid=project-tags]').contains(project3.tags[1].value).click();
            });
            cy.get('[data-testid="project-list"]').children().should('have.length', 3);
        });
    });

    describe('Correct database results', () => {
        it('shows all projects that the current user owns including inactive', () => {
            cy.get('[data-testid=project-list]').within(() => {
                cy.get('[data-testid=project]').should('have.length', 2);
            });
        });

        it('all the project details are correctly shown for project2', () => {
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

        it('all the project details are correctly shown for project3', () => {
            cy.get('[data-testid=project]').contains(project3.description).parent().parent().parent().as('project3');
            // verify title
            cy.get('@project3').should('contain', project3.title);
            cy.get('@project3').within(() => {
                // verify title and status
                const status = project3.active ? 'active' : 'inactive';
                cy.get('div.MuiCardHeader-content')
                    .first()
                    .children()
                    .should('have.length', 2)
                    .and('contain', project3.title)
                    .and('contain', status);
                // verify owner details
                cy.get('div.MuiCardHeader-content')
                    .find('a')
                    .should('have.length', 1)
                    .and('contain', `${user2.first_name} ${user2.last_name} (${user2.batch})`);
                // verify github and zulip links
                cy.get('div.MuiCardHeader-action').children().find('a').should('have.length', 2).as('action-links');
                cy.get('@action-links').first().should('have.attr', 'href').and('contain', project3.githubLink);
                cy.get('@action-links').last().should('have.attr', 'href').and('contain', user2.zulip_id);
                // verify owner buttons are visible
                cy.get('div.MuiCardHeader-action').children().find('div').should('have.length', 2).as('owner-buttons');
                cy.get('@owner-buttons').first().children().should('contain', 'Edit');
                cy.get('@owner-buttons').last().children().should('contain', 'Delete');
                // verify tags
                cy.get('[data-testid=project-tags]')
                    .children()
                    .children()
                    .last()
                    .children()
                    .should('have.length', project3.tags.length)
                    .and('contain', project3.tags[0].value);
                // verify collaborators
                cy.get('[data-testid=project-collaborators]').children().find('p').contains('No Collaborators');
            });
        });
    });

    describe('Owner actions', () => {
        it('allows you to edit a project', () => {
            cy.get('[data-testid=project-list]').children().should('have.length', 2);
            cy.get('[data-testid=project]').contains(project2.description).parent().parent().parent().as('project2');
            cy.get('@project2').within(() => {
                cy.get('div.MuiCardHeader-action').children().find('div').should('have.length', 2).as('owner-buttons');
                cy.get('@owner-buttons').first().children().should('contain', 'Edit').click();
            });
            cy.get('h2').contains('Edit Project');
            cy.get('span').contains('Cancel').parent().click();
        });

        it('allows you to cancel project deletion', () => {
            cy.get('[data-testid=project-list]').children().should('have.length', 2);
            cy.get('[data-testid=project]').contains(project2.description).parent().parent().parent().as('project2');
            cy.get('@project2').within(() => {
                cy.get('div.MuiCardHeader-action').children().find('div').should('have.length', 2).as('owner-buttons');
                cy.get('@owner-buttons').last().children().should('contain', 'Delete').click();
            });
            cy.get('h2').contains('Delete Project');
            cy.get('span').contains('Cancel').parent().click();
        });

        it('allows you to delete a project', () => {
            cy.get('[data-testid=project-list]').children().should('have.length', 2);
            cy.get('[data-testid=project]').contains(project2.description).parent().parent().parent().as('project2');
            cy.get('@project2').within(() => {
                cy.get('div.MuiCardHeader-action').children().find('div').should('have.length', 2).as('owner-buttons');
                cy.get('@owner-buttons').last().children().should('contain', 'Delete').click();
            });
            cy.get('h2').contains('Delete Project');
            cy.get('span').contains('Confirm Deletion').parent().click();
            cy.wait(100);
            cy.get('[data-testid=project-list]').should('have.length', 1);
            cy.postProject(project2);
        });

        it('does not show any projects without the edit and delete button', () => {
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
            cy.get('[data-testid=project]')
                .contains(project3.description)
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
