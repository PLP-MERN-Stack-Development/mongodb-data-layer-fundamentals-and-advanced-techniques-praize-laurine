// queries.js
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');

    const db = client.db(dbName);
    const books = db.collection('books');

    // --- Task 2: Basic CRUD Operations ---

    //Find all books in a specific genre
    console.log('\nBooks in Fiction genre:');
    const fictionBooks = await books.find({ genre: 'Fiction' }).toArray();
    console.log(fictionBooks);

    // - Find books published after a certain year

    console.log('\nBooks published after 1925:');
    console.log(await books.find({ published_year: { $gt: 1950 } }).toArray());

    // - Find books by a specific author

    console.log('\nBooks by George Orwell:');
    console.log(await books.find({ author: 'George Orwell' }).toArray());

    // - Update the price of a specific book

    console.log('\nUpdating the price of "1925"...');
    await books.updateOne({ title: '1925' }, { $set: { price: 13.99 } });



    // --- Task 3: Advanced Queries: ---

    // - Write a query to find books that are both in stock and published after 2010

    console.log('\nIn-stock books published after 1950:');
    console.log(await books.find({ in_stock: true, published_year: { $gt: 1950 } }).toArray());

    // - Use projection to return only the title, author, and price fields in your queries

    console.log('\nProjection: Title, Author, and Price only:');
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());

    // - Implement sorting to display books by price (both ascending and descending)

    console.log('\nSorted by Price (Ascending):');
    console.log(await books.find().sort({ price: 1 }).toArray());

    console.log('\nSorted by Price (Descending):');
    console.log(await books.find().sort({ price: -1 }).toArray());

    // - Use the `limit` and `skip` methods to implement pagination (5 books per page)

    console.log('\nPagination Example (First 5 books):');
    console.log(await books.find().limit(5).toArray());
    console.log('\nNext 5 books:');
    console.log(await books.find().skip(5).limit(5).toArray());


    // --- Task 4: Aggregation Pipeline: ---

    // - Create an aggregation pipeline to calculate the average price of books by genre

    console.log('\nAverage Price by Genre:');
    console.log(await books.aggregate([
      { $group: { _id: '$genre', avgPrice: { $avg: '$price' } } }
    ]).toArray());

    // - Create an aggregation pipeline to find the author with the most books in the collection

    console.log('\nAuthor with Most Books:');
    console.log(await books.aggregate([
      { $group: { _id: '$author', totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 }
    ]).toArray());

    // --- Task 5: Indexing ---

    // - Create an index on the `title` field for faster searches

    console.log('\nCreating Indexes...');
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: 1 });


  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

main();
