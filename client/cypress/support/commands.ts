import { NewUser } from '../../src/types/types';
import { IProjectFromClient } from '../../../src/utils/types';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            login(user: NewUser): void;
            createUser(user: NewUser): void;
            postProject({ ...project }: Omit<IProjectFromClient, 'owner' | 'tags'>): void;
            clearDB(): void;
        }
    }
}

Cypress.Commands.add('login', (user) => {
    cy.request({
        method: 'GET',
        url: '/api/auth/callback',
        body: { user },
    });
    cy.visit('/');
});

Cypress.Commands.add('createUser', (user) => {
    cy.request({
        method: 'POST',
        url: '/api/users',
        body: { ...user },
    });
});

Cypress.Commands.add('postProject', (project) => {
    cy.request({
        method: 'POST',
        url: '/api/projects',
        body: { ...project },
    });
});

Cypress.Commands.add('clearDB', () => {
    cy.request({
        method: 'GET',
        url: '/api/nuke',
    });
});

export {};
