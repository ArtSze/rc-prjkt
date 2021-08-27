// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { NewUser } from '../../src/types/types';
import { IProjectFromClient } from '../../../src/utils/types';

// Must be declared global to be detected by typescript (allows import/export)
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            login(user: NewUser): void;
            clearDB(): void;
            postProject({ ...project }: Omit<IProjectFromClient, 'owner'>): void;
        }
    }
}

Cypress.Commands.add('login', (user) => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:4000/api/auth/callback',
        body: { user },
    });
    cy.visit('http://localhost:4000/');
});

Cypress.Commands.add('clearDB', () => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:4000/api/nuke',
    });
    cy.visit('http://localhost:4000/');
});

Cypress.Commands.add('postProject', (project) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4000/api/projects',
        body: { ...project },
    });
    cy.visit('http://localhost:4000/');
});

export {};
