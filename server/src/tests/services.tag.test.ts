// import db from './utils/dbConfig'
import Tag from '../models/tag'
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import tag from '../services/tagService'

describe('Tag database tests', () => {
  let mongoServer = new MongoMemoryServer();

  beforeAll(async () => {
    const mongoUri = await mongoServer.getUri();
    const options = {
      useNewUrlParser: true,
      autoReconnect: true,
      useUnifiedTopology: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      poolSize: 15,
    }
    mongoose.connect(mongoUri, options, (err) => {
      if (err) console.error(err);
    });

    // await db.connect()
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    // await db.close()
  })

  describe('Create tags', () => {

    it('should a create new tag with a category of language', async () => {
      const tagData = {
        category: 'language',
        value: 'Python'
      }
      // @ts-expect-error
      await tag.createTag(tagData)
      expect.objectContaining(tagData)
    })

    it('should create a new tag with a category of library', async () => {
      const tagData = {
        category: 'library',
        value: 'Bootstrap'
      }
      // @ts-expect-error
      await tag.createTag(tagData)
      expect.objectContaining(tagData)
    })

    it('should create a new tag with a valid category of category', async () => {
      const tagData = {
        category: 'category',
        value: 'web development'
      }
      // @ts-expect-error
      await tag.createTag(tagData)
      expect.objectContaining(tagData)
    })

    it('should create a new tag with a category of collaboration style', async () => {
      const tagData = {
        category: 'collaboration style',
        value: 'pairing'
      }
      // @ts-expect-error
      await tag.createTag(tagData)
      expect.objectContaining(tagData)
    })

    it('should fail to create a new tag with an invalid category enum', async () => {
      async function newTag() {
        const tagData = {
          category: 'test',
          value: 'pairing'
        }
        // @ts-expect-error
        return await tag.createTag(tagData)
      }
      expect(newTag).rejects.toThrow('Tag validation failed: category: `test` is not a valid enum value for path `category`.')
    })

    it('should fail to create a new tag if a category is not provided', async () => {
      async function newTag() {
        const tagData = {
          value: 'pairing'
        }
        // @ts-expect-error
        return await tag.createTag(tagData)
      }
      expect(newTag).rejects.toThrow('Tag validation failed: category: Path `category` is required.')
    })

    it('should fail to create a new tag if a value is not provided', async () => {
      async function newTag() {
        const tagData = {
          category: 'category'
        }
        // @ts-expect-error
        return tag.createTag(tagData)
      }
      expect(newTag).rejects.toThrow('Tag validation failed: value: Path `value` is required.')
    })

    it('should fail to create a tag with a value of undefined', async () => {
      async function newTag() {
        const tagData = {
          category: 'language',
          value: undefined
        }
        // @ts-expect-error
        return await tag.createTag(tagData)
      }
      expect(newTag).rejects.toThrow('Tag validation failed: value: Path `value` is required.')
    })

    it('should fail to create a tag with a value of null', async () => {
      async function newTag() {
        const tagData = {
          category: 'language',
          value: null
        }
        // @ts-expect-error
        return await tag.createTag(tagData)
      }
      expect(newTag).rejects.toThrow('Tag validation failed: value: Path `value` is required.')
    })

    it('should fail to create a tag with a category of undefined', async () => {
      async function newTag() {
        const tagData = {
          category: undefined,
          value: 'test'
        }
        // @ts-expect-error
        return await tag.createTag(tagData)
      }
      expect(newTag).rejects.toThrow('Tag validation failed: category: Path `category` is required.')
    })

    it('should fail to create a tag with a category of null', async () => {
      async function newTag() {
        const tagData = {
          category: null,
          value: 'test'
        }
        // @ts-expect-error
        return await tag.createTag(tagData)
      }
      expect(newTag).rejects.toThrow('Tag validation failed: category: Path `category` is required.')
    })

  })

  describe('Fetch tags', () => {
    const tag1 = {
      category: 'language',
      value: 'Python'
    }
    const tag2 = {
      category: 'library',
      value: 'Bootstrap'
    }
    const tag3 = {
      category: 'category',
      value: 'web development'
    }
    const tag4 = {
      category: 'collaboration style',
      value: 'pairing'
    }

    describe('Fetch all tags', () => {
      it('should fetch all tags', async () => {
        const tags = await tag.fetchAllTags()
        console.log({ tags })
        // expect.arrayContaining([
        //   objectContaining(tag1),
        //   objectContaining(tag2),
        //   objectContaining(tag3),
        //   objectContaining(tag4)
        // ])
      })
    })

    describe('fetchTagsByValues', () => {
      it.todo('should fetch with an empty array')
      it.todo('should fetch with an array with one object')
      it.todo('should fetch with an array with a value of null')
      it.todo('should fetch with an array with a value of undefined')
      it.todo('should fetch with an array containing multiple objects')
      it.todo('should return null when fetching with a single value that doesn\'t exist')
      it.todo('should return null when fetching with multiple values that don\'t exist')
      it.todo('should values that exist when fetching with a combination of values that exist and do not exist')
    })

    describe('fetchSingleTagByValue', () => {
      it.todo('should fetch with one value')
      it.todo('should fetch with a value of null')
      it.todo('should fetch with a value of undefined')
      it.todo('should return null with a value that doesn\'t exist')
    })
  })

})