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

Cypress.Commands.add('login', () => {
    const user = {
        first_name: 'test',
        last_name: 'test',
        rcId: 1234,
        ownedProjects: [],
        collabProjects: [],
        zulip_id: 1234,
        image_path: '',
        batch: '',
        batchEndDate: new Date(),
    };
    cy.request({
        method: 'GET',
        url: 'http://localhost:4000/api/auth/callback',
        body: { user },
    });
    cy.visit('http://localhost:4000/');
});
