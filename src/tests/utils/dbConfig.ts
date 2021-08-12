import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let db: any;

async function connect() {
    db = await MongoMemoryServer.create();
    const uri = await db.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
}

async function close() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await db.stop();
}

export default { connect, close };
