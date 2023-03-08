import { Collection, MongoClient } from 'mongodb'

let collections: {
    [key: string]: Collection
} = {}

let client: MongoClient
const uri = "mongodb://localhost:27017";

async function connectToDatabase() {
    console.log(`Start connecting to database...`)

    client = new MongoClient(uri);

    await client.connect();

    const db = client.db('lowcode');

    collections = {
        'user': db.collection('user'),
        'page': db.collection('page')
    }

    console.log(`Successfully connected to database: ${db.databaseName}`);

}

// connectToDatabase()

async function getCollection(collection: string) {
    if (!collections[collection]) {
        await connectToDatabase()
    }

    return collections[collection]
}


export { getCollection }

//张弛的：mongodb+srv://test_user:test123456@cluster0.um9hs.mongodb.net/?retryWrites=true&w=majority