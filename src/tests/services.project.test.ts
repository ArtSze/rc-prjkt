import db from './utils/dbConfig';
import projectService from '../services/projectService';
import tagService from '../services/tagService';
import userService from '../services/userService';

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

// @ts-expect-error
let createdUser1;
// @ts-expect-error
let createdTag1;

describe('Project service tests', () => {
    describe('Create projects', () => {
        beforeEach(async () => {
            await db.connect();
            // @ts-expect-error
            createdUser1 = await userService.createUser(sampleData.user1);
            createdTag1 = await tagService.createTag(sampleData.tag1);
        });

        afterEach(async () => {
            await db.close();
        });

        it('should a create new project', async () => {
            // @ts-expect-error
            const newProject = await projectService.createProject({
                ...sampleData.projects.project1,
                // @ts-expect-error
                tags: [createdTag1._id],
                // @ts-expect-error
                owner: createdUser1._id,
            });

            const result = {
                title: 'Sample Project 1',
                description: 'A sample description of a sample project',
                githubLink: 'https://github.com/User1/sample_project1',
                collaborators: expect.arrayContaining([]),
                active: true,
            };

            return expect(newProject).toEqual(expect.objectContaining(result));
        });

        it('should fail to create a new project with a title of `undefined`', async () => {
            const newProject = async () => {
                // @ts-expect-error
                return await projectService.createProject({
                    ...sampleData.projects.project2,
                    // @ts-expect-error
                    tags: [createdTag1._id],
                    // @ts-expect-error
                    owner: createdUser1._id,
                });
            };
            return expect(newProject).rejects.toThrow('Project validation failed: title: Path `title` is required.');
        });

        it('should fail to create a new project with a title of `null`', async () => {
            const newProject = async () => {
                return await projectService.createProject({
                    ...sampleData.projects.project2,
                    // @ts-expect-error
                    title: null,
                    // @ts-expect-error
                    tags: [createdTag1._id],
                    // @ts-expect-error
                    owner: createdUser1._id,
                });
            };
            return expect(newProject).rejects.toThrow('Project validation failed: title: Path `title` is required.');
        });

        it('should fail to create a new project if value for title not provided', async () => {
            const newProject = async () => {
                // @ts-expect-error
                return await projectService.createProject({
                    ...sampleData.projects.project6,
                    // @ts-expect-error
                    tags: [createdTag1._id],
                    // @ts-expect-error
                    owner: createdUser1._id,
                });
            };
            return expect(newProject).rejects.toThrow('Project validation failed: title: Path `title` is required.');
        });

        it('should fail to create a new project with owner property of `undefined`', async () => {
            const newProject = async () => {
                return await projectService.createProject({
                    ...sampleData.projects.project1,
                    // @ts-expect-error
                    tags: [createdTag1._id],
                    // @ts-expect-error
                    owner: undefined,
                });
            };
            return expect(newProject).rejects.toThrow('Project validation failed: owner: Path `owner` is required.');
        });

        it('should fail to create a new project with owner property of `null`', async () => {
            const newProject = async () => {
                return await projectService.createProject({
                    ...sampleData.projects.project1,
                    // @ts-expect-error
                    tags: [createdTag1._id],
                    // @ts-expect-error
                    owner: null,
                });
            };
            return expect(newProject).rejects.toThrow('Project validation failed: owner: Path `owner` is required.');
        });

        it('should fail to create a new project with active property of`undefined`', async () => {
            const newProject = async () => {
                // @ts-expect-error
                return await projectService.createProject({
                    ...sampleData.projects.project3,
                    // @ts-expect-error
                    tags: [createdTag1._id],
                    // @ts-expect-error
                    owner: createdUser1._id,
                });
            };
            return expect(newProject).rejects.toThrow('Project validation failed: active: Path `active` is required.');
        });

        it('should fail to create a new project with active property of`null`', async () => {
            const newProject = async () => {
                return await projectService.createProject({
                    ...sampleData.projects.project3,
                    // @ts-expect-error
                    active: null,
                    // @ts-expect-error
                    tags: [createdTag1._id],
                    // @ts-expect-error
                    owner: createdUser1._id,
                });
            };
            return expect(newProject).rejects.toThrow('Project validation failed: active: Path `active` is required.');
        });

        it('should fail to create a new project if `description` value not of minLength', async () => {
            const newProject = async () => {
                // @ts-expect-error
                return await projectService.createProject({
                    ...sampleData.projects.project5,
                    // @ts-expect-error
                    tags: [createdTag1._id],
                    // @ts-expect-error
                    owner: createdUser1._id,
                });
            };
            return expect(newProject).rejects.toThrow(
                'Project validation failed: description: Path `description` (`lol`) is shorter than the minimum allowed length (20).',
            );
        });
    });

    describe('Get projects', () => {
        let result1 = {
            title: 'Sample Project 1',
            description: 'A sample description of a sample project',
            githubLink: 'https://github.com/User1/sample_project1',
            collaborators: expect.arrayContaining([]),
            active: true,
        };

        let result4 = {
            title: 'Sample Project 4',
            description: 'A sample description of a sample project',
            githubLink: 'https://github.com/User4/sample_project4',
            collaborators: expect.arrayContaining([]),
            active: false,
        };
        // @ts-expect-error
        let createdProject1;

        // @ts-expect-error
        let createdProject4;

        beforeEach(async () => {
            await db.connect();
            // @ts-expect-error
            createdUser1 = await userService.createUser(sampleData.user1);
            createdTag1 = await tagService.createTag(sampleData.tag1);

            // @ts-expect-error
            createdProject1 = await projectService.createProject({
                ...sampleData.projects.project1,
                tags: [createdTag1._id],
                owner: createdUser1._id,
            });

            // @ts-expect-error
            createdProject4 = await projectService.createProject({
                ...sampleData.projects.project4,
                tags: [createdTag1._id],
                owner: createdUser1._id,
            });
        });

        afterEach(async () => {
            await db.close();
        });

        describe('getAllProjects', () => {
            it('should get all projects', async () => {
                const projects = await projectService.getAllProjects();
                return expect(projects).toEqual(
                    expect.arrayContaining([expect.objectContaining(result1), expect.objectContaining(result4)]),
                );
            });
        });
        describe('getSingleProject', () => {
            it('should fetch single project by id', async () => {
                const project = await projectService.getSingleProject(
                    // @ts-expect-error
                    createdProject1._id,
                );
                return expect(project).toEqual(expect.objectContaining(result1));
            });
            it('should return null given a non-existent id', async () => {
                const project = await projectService.getSingleProject('60da400739275a760fb93e97');
                return expect(project).toEqual(null);
            });
        });
    });

    describe('Update projects', () => {
        // @ts-expect-error
        let createdProject1;
        // @ts-expect-error
        let createdProject4;

        beforeEach(async () => {
            await db.connect();
            // @ts-expect-error
            createdUser1 = await userService.createUser(sampleData.user1);
            createdTag1 = await tagService.createTag(sampleData.tag1);

            // @ts-expect-error
            createdProject1 = await projectService.createProject({
                ...sampleData.projects.project1,
                tags: [createdTag1._id],
                owner: createdUser1._id,
            });

            // @ts-expect-error
            createdProject4 = await projectService.createProject({
                ...sampleData.projects.project4,
                tags: [createdTag1._id],
                owner: createdUser1._id,
            });
        });

        afterEach(async () => {
            await db.close();
        });

        describe('updateProject', () => {
            it('should update a given project by id', async () => {
                const projectUpdateArg = {
                    ...sampleData.projects.project4,
                    title: 'Updated Sample Project 4',
                    description: 'A new sample description of a sample project',
                    // @ts-expect-error
                    tags: [createdTag1._id],
                    // @ts-expect-error
                    owner: createdUser1._id,
                };

                // console.log({ projectUpdateArg });

                const updatedProject = await projectService.updateProject(
                    // @ts-expect-error
                    createdProject4._id,
                    // @ts-expect-error
                    projectUpdateArg,
                );

                // console.log({ updatedProject });

                return expect(updatedProject).toEqual(
                    expect.objectContaining({
                        title: 'Updated Sample Project 4',
                        description: 'A new sample description of a sample project',
                    }),
                );
            });
        });
    });

    describe('Delete projects', () => {
        // @ts-expect-error
        let createdProject1;
        // @ts-expect-error
        let createdProject4;

        beforeEach(async () => {
            await db.connect();
            // @ts-expect-error
            createdUser1 = await userService.createUser(sampleData.user1);
            createdTag1 = await tagService.createTag(sampleData.tag1);

            // @ts-expect-error
            createdProject1 = await projectService.createProject({
                ...sampleData.projects.project1,
                tags: [createdTag1._id],
                owner: createdUser1._id,
            });
        });

        afterEach(async () => {
            await db.close();
        });

        describe('deleteProject', () => {
            it('should delete a given project by id', async () => {
                const allProjects = await projectService.getAllProjects();
                expect(allProjects.length).toEqual(1);
                // @ts-expect-error
                await projectService.deleteProject(createdProject1._id);
                const updatedProjects = await projectService.getAllProjects();
                expect(updatedProjects.length).toEqual(0);
            });
        });
    });
});
