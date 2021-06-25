// import db from './utils/dbConfig'
import Tag, { ETagCategories } from '../models/tag'
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

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

  describe('Delete tags', () => {

    it('should delete the tag provided by category', async () => {
      async function deleteTag() {
        const tagData = {
          category: 'language',
          value: 'JavaScript'
        }

        const tag = new Tag(tagData)
        await tag.save()

        const findTag = await Tag.findOne({ 'category': 'language' as ETagCategories })
        const deletedTag = await findTag?.delete()
        return deletedTag
      }

      expect(deleteTag).rejects.toThrow('DocumentNotFoundError')
    })

    it('should delete the tag provided by value', async () => {
      // FIXME: thowing 'topology was destroyed' error
      async function deleteTag() {
        const tagData = {
          category: 'category',
          value: 'web development'
        }

        const tag = new Tag(tagData)
        await tag.save()


        const findTag = await Tag.findOne({ 'value': 'web development' })
        const deletedTag = await findTag?.delete()
        return deletedTag
      }

      expect(deleteTag).rejects.toThrow('TypeError: Cannot read property \'save\' of null')
    })

    it('should return null when searching to delete a tag that isn\'t found', async () => {
      const tagData = {
        category: 'category',
        value: 'web development'
      }

      const tag = new Tag(tagData)
      await tag.save()

      const response = Tag.findOneAndDelete({ 'value': 'test' })

      expect(response).resolves.toEqual(null)
    })

  })

  describe('Create tags', () => {

    it('should a create new tag with a category of language', async () => {
      const tagData = {
        category: 'language',
        value: 'Python'
      }
      const tag = new Tag(tagData)
      await tag.save()
      expect.objectContaining({ 'category': 'language' })
      expect.objectContaining({ 'value': 'Python' })
    })

    it('should create a new tag with a category of library', async () => {
      const tagData = {
        category: 'library',
        value: 'Bootstrap'
      }
      const tag = new Tag(tagData)
      await tag.save()
      expect.objectContaining({ 'category': 'library' })
      expect.objectContaining({ 'value': 'Bootstrap' })
    })

    it('should create a new tag with a valid category', async () => {
      const tagData = {
        category: 'category',
        value: 'web development'
      }
      const tag = new Tag(tagData)
      await tag.save()
      expect.objectContaining({ 'category': 'category' })
      expect.objectContaining({ 'value': 'web development' })
    })

    it('should create a new tag with a category of collaboration style', async () => {
      const tagData = {
        category: 'collaboration style',
        value: 'pairing'
      }
      const tag = new Tag(tagData)
      await tag.save()
      expect.objectContaining({ 'category': 'collaboration style' })
      expect.objectContaining({ 'value': 'pairing' })
    })

    it('should fail to create a new tag with an invalid category enum', async () => {
      async function newTag() {
        const tagData = {
          category: 'test',
          value: 'pairing'
        }
        const tag = new Tag(tagData)
        const response = await tag.save()
        return response
      }
      expect(newTag).rejects.toThrow('Tag validation failed: category: `test` is not a valid enum value for path `category`.')
    })

    it('should fail to create a new tag if a category is not provided', async () => {
      async function newTag() {
        const tagData = {
          value: 'pairing'
        }
        const tag = new Tag(tagData)
        const response = await tag.save()
        return response
      }
      expect(newTag).rejects.toThrow('Tag validation failed: category: Path `category` is required.')
    })

    it('should fail to create a new tag if a value is not provided', async () => {
      async function newTag() {
        const tagData = {
          category: 'category'
        }
        const tag = new Tag(tagData)
        const response = await tag.save()
        console.log({ response })
        return response
      }
      expect(newTag).rejects.toThrow('Tag validation failed: value: Path `value` is required.')
    })

    it('should fail to create a tag with a value of undefined', async () => {
      async function newTag() {
        const tagData = {
          category: 'language',
          value: undefined
        }
        const tag = new Tag(tagData)
        const response = await tag.save()
        return response
      }
      expect(newTag).rejects.toThrow('Tag validation failed: value: Path `value` is required.')
    })

    it('should fail to create a tag with a value of null', async () => {
      async function newTag() {
        const tagData = {
          category: 'language',
          value: null
        }
        const tag = new Tag(tagData)
        const response = await tag.save()
        return response
      }
      expect(newTag).rejects.toThrow('Tag validation failed: value: Path `value` is required.')
    })

    it('should fail to create a tag with a category of undefined', async () => {
      async function newTag() {
        const tagData = {
          category: undefined,
          value: 'test'
        }
        const tag = new Tag(tagData)
        const response = await tag.save()
        return response
      }
      expect(newTag).rejects.toThrow('Tag validation failed: category: Path `category` is required.')
    })

    it('should fail to create a tag with a category of null', async () => {
      async function newTag() {
        const tagData = {
          category: null,
          value: 'test'
        }
        const tag = new Tag(tagData)
        const response = await tag.save()
        return response
      }
      expect(newTag).rejects.toThrow('Tag validation failed: category: Path `category` is required.')
    })

  })

  describe('Edit existing tags', () => {

    it('should edit the value of an existing tag', async () => {
      const tagData = {
        category: 'category',
        value: 'test'
      }

      const tag = new Tag(tagData)
      await tag.save()

      tag.value = 'updated'
      await tag.save()
      expect.objectContaining({ 'value': 'updated' })
      expect.objectContaining({ 'category': 'category' })
    })

    it('should edit the category of an existing tag', async () => {
      const tagData = {
        category: 'category',
        value: 'test'
      }

      const tag = new Tag(tagData)
      await tag.save()

      tag.category = 'language' as ETagCategories
      await tag.save()
      expect.objectContaining({ 'category': 'language' })
      expect.objectContaining({ 'value': 'test' })
    })

    it('should not edit the category of an existing tag if it is not a valid category enum', async () => {
      // FIXME: thowing 'topology was destroyed' error
      async function editTag() {

        const tagData = {
          category: 'category',
          value: 'test'
        }

        const tag = new Tag(tagData)
        await tag.save()

        const findTag = await Tag.findOne({ 'value': 'test' })
        const updatedTag = await findTag?.update(
          { 'category': 'test' as ETagCategories }
        )
        return updatedTag
      }
      expect(editTag).rejects.toThrow('Tag validation failed: category: `test` is not a valid enum value for path `category`.')
    })

  })

})