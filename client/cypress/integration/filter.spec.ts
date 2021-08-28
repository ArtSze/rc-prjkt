/// <reference types="cypress" />
import 'cypress-react-selector';
import project1 from '../fixtures/project1.json';
import project2 from '../fixtures/project2.json';
import project3 from '../fixtures/project3.json';
import { user1 } from '../fixtures/user1';
import { user2 } from '../fixtures/user2';
import { user3 } from '../fixtures/user3';

describe('Filter tests', () => {
    before(() => {
        cy.clearDB();
        cy.login(user1);
        cy.postProject(project1);
        cy.visit('/');
        cy.login(user2);
        cy.postProject(project2);
        cy.postProject(project3);
        cy.createUser(user3);
    });

    beforeEach(() => {
        cy.visit('/');
        cy.login(user2);
    });

    it('initializes the filters with correct defaults', () => {
        cy.get('[data-testid="filter"]').within(() => {
            cy.get('[data-testid="owner-filter"]').within(() => {
                cy.get('h6').contains('Owner Filter');
                cy.get('div.react-select-owner-filter__value-container').find('p').contains('Select user1...');
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

    it('filters to an owner', () => {
        cy.get('[data-testid="owner-filter"]').within(() => {
            cy.get('div.react-select-owner-filter__dropdown-indicator').click();
            cy.get('p').contains(`${user1.first_name} ${user1.last_name}`).click();
            cy.get('div.react-select-owner-filter__single-value');
            cy.get('p').contains(`${user1.first_name} ${user1.last_name}`);
        });
        cy.get('[data-testid="project-list"]').should('have.length', 1).and('contain', project1.title);
        cy.get('[data-testid="owner-filter"]').within(() => {
            cy.get('div.react-select-owner-filter__dropdown-indicator').click();
            cy.get('p').contains(`${user2.first_name} ${user2.last_name}`).click();
            cy.get('div.react-select-owner-filter__single-value');
            cy.get('p').contains(`${user2.first_name} ${user2.last_name}`);
        });
        cy.get('[data-testid="project-list"]').should('have.length', 1).and('contain', project2.title);
    });

    it('filters to a single tag', () => {
        cy.get('[data-testid="tag-filter"]').within(() => {
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            cy.get('p').contains(project1.tags[0].value).click();
            cy.get('div.react-select-tag-filter__multi-value');
            cy.get('p').contains(project1.tags[0].value);
        });
        cy.get('[data-testid="project-list"]').should('have.length', 1).and('contain', project1.title);
    });

    it('filters to multiple tags', () => {
        cy.get('[data-testid="tag-filter"]').within(() => {
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            cy.get('p').contains(project1.tags[0].value).click();
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            cy.get('p').contains(project1.tags[1].value).click();
            cy.get('div.react-select-tag-filter__multi-value').should('have.length', 2);
            cy.get('div.react-select-tag-filter__multi-value').within(() => {
                cy.get('p').contains(project1.tags[0].value);
                cy.get('p').contains(project1.tags[1].value);
            });
        });
        cy.get('[data-testid="project-list"]').children().should('have.length', 1).and('contain', project1.title);
    });

    it('clears the owner filter', () => {
        cy.get('[data-testid="owner-filter"]').within(() => {
            cy.get('div.react-select-owner-filter__dropdown-indicator').click();
            cy.get('p').contains(`${user1.first_name} ${user1.last_name}`).click();
            cy.get('div.react-select-owner-filter__single-value');
            cy.get('p').contains(`${user1.first_name} ${user1.last_name}`);
        });
        cy.get('[data-testid="project-list"]').should('have.length', 1).and('contain', project1.title);

        cy.get('[data-testid="owner-filter"]').within(() => {
            cy.get('div.react-select-owner-filter__clear-indicator').click();
            cy.get('div.react-select-owner-filter__value-container').find('p').contains('Select user...');
        });
        cy.get('[data-testid="project-list"]')
            .children()
            .should('have.length', 2)
            .and('contain', project1.title)
            .and('contain', project2.title);
    });

    it('clears the tag filter', () => {
        cy.get('[data-testid="tag-filter"]').within(() => {
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            cy.get('p').contains(project1.tags[0].value).click();
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            cy.get('p').contains(project1.tags[1].value).click();
            cy.get('div.react-select-tag-filter__multi-value').should('have.length', 2);
            cy.get('div.react-select-tag-filter__multi-value').within(() => {
                cy.get('p').contains(project1.tags[0].value);
                cy.get('p').contains(project1.tags[1].value);
            });
        });
        cy.get('[data-testid="project-list"]').should('have.length', 1).and('contain', project1.title);

        cy.get('[data-testid="tag-filter"]').within(() => {
            cy.get('div.react-select-tag-filter__clear-indicator').click();
            cy.get('div.react-select-tag-filter__value-container').find('p').contains('Select tags...');
        });
        cy.get('[data-testid="project-list"]')
            .children()
            .should('have.length', 2)
            .and('contain', project1.title)
            .and('contain', project2.title);
    });

    it('removes a single tag when multiple tags are selected', () => {
        cy.get('[data-testid="tag-filter"]').within(() => {
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            cy.get('p').contains(project1.tags[0].value).click();
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            cy.get('p').contains(project1.tags[1].value).click();
            cy.get('div.react-select-tag-filter__multi-value').should('have.length', 2);
            cy.get('div.react-select-tag-filter__multi-value').within(() => {
                cy.get('p').contains(project1.tags[0].value);
                cy.get('p').contains(project1.tags[1].value);
            });
            cy.get('div.react-select-tag-filter__multi-value').within(() => {
                cy.get('p')
                    .contains(project1.tags[0].value)
                    .parent()
                    .parent()
                    .siblings('div.react-select-tag-filter__multi-value__remove')
                    .click();
            });
            cy.get('div.react-select-tag-filter__multi-value').within(() => {
                cy.get('p').contains(project1.tags[1].value);
            });
        });
        cy.get('[data-testid="project-list"]').children().should('have.length', 1).and('contain', project1.title);
    });

    it('sorts by last created');

    it('sorts by first updated');

    describe('it sorts by batch', () => {
        it('sorts by latest batch', () => {
            cy.get('[data-testid="sort"]').within(() => {
                cy.get('div.react-select-sort__dropdown-indicator').click();
                cy.get('p').contains('Latest Batch').click();
            });
            cy.wait(100);
            cy.get('[data-testid="project-list"]').children().should('have.length', 2);
            cy.get('[data-testid="project-list"]').children().first().should('contain', project1.title);
        });

        it('sorts by oldest batch', () => {
            cy.get('[data-testid="sort"]').within(() => {
                cy.get('div.react-select-sort__dropdown-indicator').click();
                cy.get('p').contains('Oldest Batch').click();
            });
            cy.wait(100);

            cy.get('[data-testid="project-list"]').children().should('have.length', 2);
            cy.get('[data-testid="project-list"]').children().first().should('contain', project2.title);
        });
    });

    it('shows all projects', () => {
        cy.get('[data-testid="status-filter"]').within(() => {
            cy.get('div.react-select-status-filter__dropdown-indicator').click();
            cy.get('p').contains('All').click();
        });
        cy.get('[data-testid="project-list"]')
            .children()
            .should('have.length', 3)
            .and('contain', project1.title)
            .and('contain', project2.title)
            .and('contain', project3.title);
    });

    it('shows only inactive projects', () => {
        cy.get('[data-testid="status-filter"]').within(() => {
            cy.get('div.react-select-status-filter__dropdown-indicator').click();
            cy.get('p').contains('Inactive').click();
        });
        cy.get('[data-testid="project-list"]').children().should('have.length', 1).and('contain', project3.title);
    });
});
