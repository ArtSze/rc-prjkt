"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const projects_1 = require("../routes/projects");
const dbConfig_1 = __importDefault(require("./utils/dbConfig"));
const projectService_1 = __importDefault(require("../services/projectService"));
const tagService_1 = __importDefault(require("../services/tagService"));
const userService_1 = __importDefault(require("../services/userService"));
const app = express_1.default();
const api = supertest_1.default(app);
app.use(express_1.default.json());
app.use(projects_1.ProjectsRouter);
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
let newProject;
describe('Project Router tests without using app', () => {
    beforeAll(async () => {
        await dbConfig_1.default.connect();
        // @ts-expect-error
        createdUser1 = await userService_1.default.createUser(sampleData.user1);
        createdTag1 = await tagService_1.default.createTag(sampleData.tag1);
        // @ts-expect-error
        newProject = await projectService_1.default.createProject({
            ...sampleData.projects.project1,
            tags: [createdTag1._id],
            owner: createdUser1._id,
        });
    });
    afterAll(async () => {
        await dbConfig_1.default.close();
    });
    describe('GET /projects', () => {
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
