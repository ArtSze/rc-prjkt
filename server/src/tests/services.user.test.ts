import db from './utils/dbConfig';
import '../models/project'; // import project model to initialize schema
import user from '../services/userService';

describe('User services tests', () => {

	beforeAll(async () => { await db.connect(); });
	afterAll(async () => { await db.close(); });

	const user1 = {
		'rcId': 1234,
		'first_name': 'test first name',
		'last_name': 'test last name',
		'zulip_id': 123456,
		'image_path': 'image.com',
        'batchEndDate': '2021-08-06T00:00:00.000Z',
		'batch': 'W2 2021'
	};
	const user1Result = {
		'rcId': 1234,
		'first_name': 'test first name',
		'last_name': 'test last name',
		'zulip_id': 123456,
		'image_path': 'image.com',
		'batch': 'W2 2021'
	};

	const user2 = {
		'rcId': 5678,
		'first_name': 'another first name',
		'last_name': 'another last name',
		'zulip_id': 98765,
		'image_path': 'anotherimage.com',
        'batchEndDate': '2021-08-06T00:00:00.000Z',
		'batch': 'S2 2020'
	};

	const user2Result = {
		'rcId': 5678,
		'first_name': 'another first name',
		'last_name': 'another last name',
		'zulip_id': 98765,
		'image_path': 'anotherimage.com',
		'batch': 'S2 2020'
	};

	describe('Create user', () => {
		it('should create a valid user',
			async () => {
                // @ts-expect-error
				const response = await user.createUser(user1);
				return expect(response).toEqual(expect.objectContaining(user1Result));
			});
		it('should create a second valid user',
			async () => {
                // @ts-expect-error
				const response = await user.createUser(user2);
				return expect(response).toEqual(expect.objectContaining(user2Result));
			});

		it('should fail to create an invalid user with an rcId that is not a number',
			async () => {
				async function createUser() {
					const userData = { 'rcId': '1234' };
					// @ts-expect-error
					return await user.createUser(userData);
				}
				return expect(createUser).rejects.toThrow('User validation failed');
			});

		it('should fail to create an invalid user',
			async () => {
				async function createUser() {
					const userData = { 'test': '' };
					// @ts-expect-error
					return await user.createUser(userData);
				}
				return expect(createUser).rejects.toThrow('User validation failed');
			});
	});

	describe('Get user', () => {
		it('should return all users in the database',
			async () => {
				const response = await user.getAllUsers();
				return expect(response).toEqual(
					expect.arrayContaining([
						expect.objectContaining(user1Result),
						expect.objectContaining(user2Result)
					])
				);
			});

		it('should return a single user in the database',
			async () => {
				const userData = 1234;
				const response = await user.getUser(userData);
				return expect(response).toEqual(expect.objectContaining(user1Result));
			});

		it('should fail to return a single user in the database that doesn\'t exist',
			async () => {
				const userData = 9999;
				const response = await user.getUser(userData);
				return expect(response).toEqual(null);
			});
	});
});