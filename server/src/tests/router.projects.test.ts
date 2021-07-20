import express from 'express';
import supertest from 'supertest';
import { ProjectsRouter } from '../routes/projects';
import db from './utils/dbConfig';
import projectService from '../services/projectService';
import tagService from '../services/tagService';
import userService from '../services/userService';

const app = express();
const api = supertest(app);
app.use(express.json());
app.use(ProjectsRouter);

const sampleData = {
    tag1: {
        value: 'pairing',
    },
    user1: {
        rcId: 1,
        first_name: 'first1',
        last_name: 'last1',
        zulip_id: 1,
        image_path: 'image1.com',
        batchEndDate: '2021-08-06T00:00:00.000Z',
        batch: `S2 '21`,
    },
    projects: {
        project1: {
            title: 'Sample Project 1',
            description: 'A sample description of a sample project',
            githubLink: 'https://github.com/User1/sample_project1',
            collaborators: [],
            active: true,
        },
        project2: {
            title: undefined,
            description: 'A sample description of a sample project',
            githubLink: 'https://github.com/User2/sample_project2',
            collaborators: [],
            active: false,
        },
        project3: {
            title: 'Sample Project 3',
            description: 'A sample description of a sample project',
            githubLink: 'https://github.com/User3/sample_project3',
            collaborators: [],
            active: undefined,
        },
        project4: {
            title: 'Sample Project 4',
            description: 'A sample description of a sample project',
            githubLink: 'https://github.com/User4/sample_project4',
            collaborators: [],
            active: false,
        },
        project5: {
            title: 'Sample Project 5',
            description: 'lol',
            githubLink: 'https://github.com/User4/sample_project5',
            collaborators: [],
            active: false,
        },
        project6: {
            description: 'A sample description of a sample project',
            githubLink: 'https://github.com/User4/sample_project6',
            collaborators: [],
            active: false,
        },
    },
};

let createdUser1;
let createdTag1;
let newProject: any;

describe('Project Router tests without using app', () => {
    beforeAll(async () => {
        await db.connect();
        // @ts-expect-error
        createdUser1 = await userService.createUser(sampleData.user1);
        createdTag1 = await tagService.createTag(sampleData.tag1);
        newProject = await projectService.createProject({
            ...sampleData.projects.project1,
            tags: [createdTag1._id],
            owner: createdUser1._id,
        });
    });
    afterAll(async () => {
        await db.close();
    });

    describe('GET /projects', () => {
        it.skip('should return all projects in the database', async () => {
            const result = await api.get('/');
            expect(result.status).toEqual(200);
            expect.arrayContaining([expect.objectContaining({ newProject })]);
        });

        it('should return a 200 status code and the project object and for a valid project', async () => {
            const result = await api.get(`/${newProject._id}`);
            expect(result.status).toEqual(200);
            expect.objectContaining({ newProject });
        });

        it('should return a 404 status code and for an invalid project', async () => {
            const result = await api.get('/9999999');
            expect(result.status).toEqual(400);
        });
    });
});
