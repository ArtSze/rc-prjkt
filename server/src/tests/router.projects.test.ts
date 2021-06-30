import express from 'express';
import supertest from 'supertest';
// @ts-expect-error
import session from 'supertest-session';

import db from './utils/dbConfig';
import userService from '../services/userService';
import projectService from '../services/projectService';
import tagService from '../services/tagService';
import { ProjectsRouter } from '../routes/projects';
import { ETagCategories } from '../models/tag';

const app = express();
app.use(express.json());
app.use(ProjectsRouter);
// const api = supertest(app);

describe('Project router tests without using app', () => {
	// @ts-expect-error
	let createdTag1;
	// @ts-expect-error
	let createdUser1;
	// @ts-expect-error
	let testSession = null;

	beforeAll(async () => {
		await db.connect();
		createdUser1 = await userService.createUser({
			rcId: 1,
			first_name: 'first1',
			last_name: 'last1',
			zulip_id: 1,
			image_path: 'image1.com',
			batch: `S2 '21`,
		});
		createdTag1 = await tagService.createTag({
			category: ETagCategories['CollaborationStyle'],
			value: 'solo',
		});
		testSession = session(app, {
			before: function (req: any) {
				// @ts-expect-error
				req.set('session', JSON.stringify({ user: { createdUser1 } }));
			},
		});
	});
	afterAll(async () => {
		await db.close();
	});

	describe('POST /projects', () => {
		it.only('should return a 200 status code and valid response for creation of a valid project', async () => {
			// @ts-expect-error
			const result = await testSession.post('/').send({
				title: 'Sample Project 1',
				description: 'A sample description of a sample project',
				githubLink: 'https://github.com/User1/sample_project1',
				collaborators: [],
				active: true,
				tags: [
					{
						category: ETagCategories['CollaborationStyle'],
						value: 'solo',
					},
				],
			});
			console.log({ result });

			expect(result.status).toEqual(200);
			// expect.objectContaining({
			// 	title: 'Sample Project 1',
			// 	description: 'A sample description of a sample project',
			// 	githubLink: 'https://github.com/User1/sample_project1',
			// 	collaborators: expect.arrayContaining([]),
			// 	active: true,
			// 	// @ts-expect-error
			// 	owner: createdUser1._id,
			// });
		});
		it('should return a 400 status code and error response for creation of an invalid project (owner prop not provided)', async () => {
			// @ts-expect-error
			const result = await testSession.post('/').send({
				description: 'A sample description of a sample project',
				githubLink: 'https://github.com/User1/sample_project1',
				collaborators: [],
				active: true,
				tags: [
					{
						category: ETagCategories['CollaborationStyle'],
						value: 'pairing',
					},
				],
				// @ts-expect-error
				owner: createdUser1._id,
			});
			expect(result.status).toEqual(400);
		});
	});

	describe('GET /projects/:projectid', () => {
		// @ts-expect-error
		let createdProject1;
		beforeEach(async () => {
			createdProject1 = await projectService.createProject({
				title: 'Sample Project 2',
				description: 'A sample description of a sample project',
				githubLink: 'https://github.com/User1/sample_project2',
				collaborators: [],
				active: true,
				// @ts-expect-error
				tags: [createdTag1._id],
				// @ts-expect-error
				owner: createdUser1._id,
			});
		});

		it('should return a 200 status code and a response containing the project data', async () => {
			// @ts-expect-error
			const result = await testSession.get(`/${createdProject1._id}`);
			expect(result.status).toEqual(200);
		});
		it('should return a 404 status code and for an invalid project', async () => {
			// @ts-expect-error
			const result = await testSession.get('asf1ka1n3sl3223');
			expect(result.statusCode).toEqual(404);
		});
	});

	describe('PUT /projects/:projectid', () => {
		// @ts-expect-error
		let createdProject1;
		beforeEach(async () => {
			createdProject1 = await projectService.createProject({
				title: 'Sample Project 2',
				description: 'A sample description of a sample project',
				githubLink: 'https://github.com/User1/sample_project2',
				collaborators: [],
				active: true,
				// @ts-expect-error
				tags: [createdTag1._id],
				// @ts-expect-error
				owner: createdUser1._id,
			});
		});

		it('should return a 200 status code and valid response for updating a valid project with a new title', async () => {
			// @ts-expect-error
			const result = await testSession
				// @ts-expect-error
				.put(`/${createdProject1._id}`)
				.send({
					title: 'Updated Sample Project 2',
					description: 'A sample description of a sample project',
					githubLink: 'https://github.com/User1/sample_project2new',
					collaborators: [],
					active: true,
					// @ts-expect-error
					tags: [createdTag1._id],
					// @ts-expect-error
					owner: createdUser1._id,
				});
			expect(result.status).toEqual(200);
			expect.objectContaining({
				title: 'Updated Sample Project 2',
				description: 'A sample description of a sample project',
				githubLink: 'https://github.com/User1/sample_project2new',
				collaborators: expect.arrayContaining([]),
				active: true,
				// @ts-expect-error
				owner: createdUser1._id,
			});
		});
		it('should return a 200 status code and valid response for updating a valid project when adding a tag', async () => {
			// @ts-expect-error
			const result = await testSession
				// @ts-expect-error
				.put(`/${createdProject1._id}`)
				.send({
					title: 'Updated Sample Project 2',
					description: 'A sample description of a sample project',
					githubLink: 'https://github.com/User1/sample_project2new',
					collaborators: [],
					active: true,
					// @ts-expect-error
					tags: [createdTag1._id],
					// @ts-expect-error
					owner: createdUser1._id,
				});
			expect(result.status).toEqual(200);
			expect.objectContaining({
				title: 'Updated Sample Project 2',
				description: 'A sample description of a sample project',
				githubLink: 'https://github.com/User1/sample_project2new',
				collaborators: expect.arrayContaining([]),
				active: true,
				// @ts-expect-error
				owner: createdUser1._id,
			});
		});
		it.todo(
			'should return a 200 status code and valid response for updating a valid project when removing a tag'
		);
		it.todo(
			"should return a 500 status code and valid response for updating a valid project when removing a tag that doesn't exist"
		);
		it.todo(
			'should return a 200 status code and valid response for updating a valid project when changing the active status'
		);
		it.todo(
			'should return a 200 status code and valid response for updating a valid project when adding a collaborator'
		);
		it.todo(
			'should return a 200 status code and valid response for updating a valid project when removing a collaborator'
		);
		it.todo(
			'should return a 200 status code and valid response for updating a valid project when adding github link'
		);
		it.todo(
			"should return a 500 status code and valid response for updating a valid project when removing a collaborator that doesn't exist"
		);
		it.todo(
			'should return a 500 status code and valid response for updating a valid project with a description longer than 240 characters'
		);
		it.todo(
			'should return a 500 status code and valid response for updating a valid project with a description shorter than 20 characters'
		);
		it.todo(
			'should return a 500 status code and error response for updating an invalid project'
		);
	});
});
