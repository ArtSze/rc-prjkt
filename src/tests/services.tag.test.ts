import db from './utils/dbConfig';
import tag from '../services/tagService';

describe('Tag service tests', () => {
	beforeAll(async () => {
		await db.connect();
	});
	afterAll(async () => {
		await db.close();
	});

	const tag1 = { value: 'Python' };
	const tag2 = { value: 'Bootstrap' };
	const tag3 = { value: 'web development' };
	const tag4 = { value: 'pairing' };

	describe('Create all tags', () => {
		it('should a create new tags with only a tag that already exists', async () => {
			// @ts-expect-error
			const newTag = await tag.createTag(tag1);

			const newTags = await tag.createTags([tag1]);
			return expect(newTags).toEqual(
				expect.arrayContaining([expect.objectContaining(tag1)])
			);
		});

		it('should a create new tags with a tag that already exists', async () => {
			// @ts-expect-error
			const newTag = await tag.createTag(tag1);

			const newTags = await tag.createTags([tag1, tag2, tag3, tag4]);
			return expect(newTags).toEqual(
				expect.arrayContaining([
					expect.objectContaining(tag1),
					expect.objectContaining(tag2),
					expect.objectContaining(tag3),
					expect.objectContaining(tag4),
				])
			);
		});

		it('should a create new tags', async () => {
			const newTags = await tag.createTags([tag1, tag2, tag3, tag4]);
			return expect(newTags).toEqual(
				expect.arrayContaining([
					expect.objectContaining(tag1),
					expect.objectContaining(tag2),
					expect.objectContaining(tag3),
					expect.objectContaining(tag4),
				])
			);
		});
	});
	describe('Create tags', () => {
		it(`should a create new tag with a value of 'Python'`, async () => {
			const newTag = await tag.createTag(tag1);
			return expect(newTag).toEqual(expect.objectContaining(tag1));
		});

		it(`should create a new tag with a value of 'Bootstrap'`, async () => {
			const newTag = await tag.createTag(tag2);
			return expect(newTag).toEqual(expect.objectContaining(tag2));
		});

		it(`should create a new tag with a value of 'web development'`, async () => {
			const newTag = await tag.createTag(tag3);
			return expect(newTag).toEqual(expect.objectContaining(tag3));
		});

		it(`should create a new tag with a value of 'pairing'`, async () => {
			const newTag = await tag.createTag(tag4);
			return expect(newTag).toEqual(expect.objectContaining(tag4));
		});

		it('should fail to create a new tag if a value is not provided', async () => {
			async function newTag() {
				const tagData = {
					category: 'now irrelevent but useful for this test',
				};
				// @ts-expect-error
				return tag.createTag(tagData);
			}
			return expect(newTag).rejects.toThrow(
				'Tag validation failed: value: Path `value` is required.'
			);
		});

		it('should fail to create a tag with a value of undefined', async () => {
			async function newTag() {
				const tagData = {
					value: undefined,
				};
				// @ts-expect-error
				return await tag.createTag(tagData);
			}
			return expect(newTag).rejects.toThrow(
				'Tag validation failed: value: Path `value` is required.'
			);
		});

		it('should fail to create a tag with a value of null', async () => {
			async function newTag() {
				const tagData = {
					value: null,
				};
				// @ts-expect-error
				return await tag.createTag(tagData);
			}
			return expect(newTag).rejects.toThrow(
				'Tag validation failed: value: Path `value` is required.'
			);
		});

		describe('Fetch tags', () => {
			describe('Fetch all tags', () => {
				it('should fetch all tags', async () => {
					const tags = await tag.fetchAllTags();
					return expect(tags).toEqual(
						expect.arrayContaining([
							expect.objectContaining(tag1),
							expect.objectContaining(tag2),
							expect.objectContaining(tag3),
							expect.objectContaining(tag4),
						])
					);
				});
			});

			describe('fetchTagsByValues', () => {
				it('should fetch with an empty array', async () => {
					const tags = await tag.fetchTagsByValues([]);
					return expect(tags).toEqual([]);
				});

				it('should fetch with an array with one object', async () => {
					const tags = await tag.fetchTagsByValues(['Bootstrap']);
					return expect(tags).toEqual(
						expect.arrayContaining([expect.objectContaining(tag2)])
					);
				});

				it('should fetch with an array with a value of null', async () => {
					// @ts-expect-error
					const tags = await tag.fetchTagsByValues([null]);
					return expect(tags).toEqual([]);
				});

				it('should fetch with an array with a value of undefined', async () => {
					// @ts-expect-error
					const tags = tag.fetchTagsByValues([undefined]);
					return expect(tags).resolves.toEqual([]);
				});

				it('should fetch with an array containing multiple objects', async () => {
					const tags = await tag.fetchTagsByValues([
						'Bootstrap',
						'Python',
						'pairing',
					]);
					return expect(tags).toEqual(
						expect.arrayContaining([
							expect.objectContaining(tag1),
							expect.objectContaining(tag2),
							expect.objectContaining(tag4),
						])
					);
				});

				it("should return null when fetching with a single value that doesn't exist", async () => {
					const tags = await tag.fetchTagsByValues(['test']);
					return expect(tags).toEqual([]);
				});

				it("should return null when fetching with multiple values that don't exist", async () => {
					const tags = await tag.fetchTagsByValues([
						'test',
						'another test',
					]);
					return expect(tags).toEqual([]);
				});

				it('should values that exist when fetching with a combination of values that exist and do not exist', async () => {
					const tags = await tag.fetchTagsByValues([
						'Python',
						'test',
					]);
					return expect(tags).toEqual(
						expect.arrayContaining([expect.objectContaining(tag1)])
					);
				});
			});

			describe('fetchSingleTagByValue', () => {
				it('should fetch with one value', async () => {
					const tags = await tag.fetchSingleTagByValue('Python');
					return expect(tags).toEqual(
						expect.arrayContaining([expect.objectContaining(tag1)])
					);
				});

				it('should fetch with a value of null', async () => {
					// @ts-expect-error
					const tags = await tag.fetchSingleTagByValue(null);
					return expect(tags).toEqual([]);
				});

				it('should fetch with a value of undefined', async () => {
					// @ts-expect-error
					const tags = await tag.fetchSingleTagByValue(undefined);
					return expect(tags).toEqual([]);
				});

				it("should return null with a value that doesn't exist", async () => {
					const tags = await tag.fetchSingleTagByValue('test');
					return expect(tags).toEqual([]);
				});
			});
		});
	});
});
