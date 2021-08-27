/// <reference types="cypress" />
import 'cypress-react-selector';
import { user1 } from '../fixtures/user1';

describe('Filter', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(user1);
        cy.waitForReact();
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
            // TODO: verify filtered projects are correct
        });
    });

    it('filters to a single tag', () => {
        cy.get('[data-testid="tag-filter"]').within(() => {
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            // FIXME: replace hard-coded tag with fixture
            cy.get('p').contains('javascript').click();
            cy.get('div.react-select-tag-filter__multi-value');
            // FIXME: replace hard-coded tag with fixture
            cy.get('p').contains('javascript');
            // TODO: verify filtered projects are correct
        });
    });

    it('filters to multiple tags', () => {
        cy.get('[data-testid="tag-filter"]').within(() => {
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            // FIXME: replace hard-coded tag with fixture
            cy.get('p').contains('javascript').click();
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            // FIXME: replace hard-coded tag with fixture
            cy.get('p').contains('react').click();
            cy.get('div.react-select-tag-filter__multi-value').should('have.length', 2);
            cy.get('div.react-select-tag-filter__multi-value').within(() => {
                // FIXME: replace hard-coded tag with fixture
                cy.get('p').contains('javascript');
                // FIXME: replace hard-coded tag with fixture
                cy.get('p').contains('react');
                // TODO: verify filtered projects are correct
            });
        });
    });

    it('clears the owner filter', () => {
        cy.get('[data-testid="owner-filter"]').within(() => {
            cy.get('div.react-select-owner-filter__dropdown-indicator').click();
            cy.get('p').contains(`${user1.first_name} ${user1.last_name}`).click();
            cy.get('div.react-select-owner-filter__single-value');
            cy.get('p').contains(`${user1.first_name} ${user1.last_name}`);
            // TODO: verify filtered projects are correct
            cy.get('div.react-select-owner-filter__clear-indicator').click();
            cy.get('div.react-select-owner-filter__value-container').find('p').contains('Select user1...');
            // TODO: verify filtered projects are correct
            //
        });
    });

    it('clears the tag filter', () => {
        cy.get('[data-testid="tag-filter"]').within(() => {
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            // FIXME: replace hard-coded tag with fixture
            cy.get('p').contains('javascript').click();
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            // FIXME: replace hard-coded tag with fixture
            cy.get('p').contains('react').click();
            cy.get('div.react-select-tag-filter__multi-value').should('have.length', 2);
            cy.get('div.react-select-tag-filter__multi-value').within(() => {
                // FIXME: replace hard-coded tag with fixture
                cy.get('p').contains('javascript');
                // FIXME: replace hard-coded tag with fixture
                cy.get('p').contains('react');
                // TODO: verify filtered projects are correct
            });
            cy.get('div.react-select-tag-filter__clear-indicator').click();
            cy.get('div.react-select-tag-filter__value-container').find('p').contains('Select tags...');
            // TODO: verify filtered projects are correct
        });
    });

    it('removes a single tag when multiple tags are selected', () => {
        cy.get('[data-testid="tag-filter"]').within(() => {
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            // FIXME: replace hard-coded tag with fixture
            cy.get('p').contains('javascript').click();
            cy.get('div.react-select-tag-filter__dropdown-indicator').click();
            // FIXME: replace hard-coded tag with fixture
            cy.get('p').contains('react').click();
            cy.get('div.react-select-tag-filter__multi-value').should('have.length', 2);
            cy.get('div.react-select-tag-filter__multi-value').within(() => {
                // FIXME: replace hard-coded tag with fixture
                cy.get('p').contains('javascript');
                // FIXME: replace hard-coded tag with fixture
                cy.get('p').contains('react');
                // TODO: verify filtered projects are correct
            });
            cy.get('div.react-select-tag-filter__multi-value__remove').first().click();
            cy.get('div.react-select-tag-filter__multi-value').within(() => {
                // FIXME: replace hard-coded tag with fixture
                cy.get('p').contains('react');
                // TODO: verify filtered projects are correct
            });
        });
    });

    it('sorts by last created');

    it('sorts by first updated');

    it('shows all projects');

    it('shows only inactive projects');
});
