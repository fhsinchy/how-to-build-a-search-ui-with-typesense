const fs = require('fs');
const readline = require('readline');
const Typesense = require('typesense');

// initialize a new client
const client = new Typesense.Client({
  'nodes': [{
    'host': 'localhost',
    'port': '8108',
    'protocol': 'http'
  }],
  'apiKey': 'vaqcyr27eJ',
  'connectionTimeoutSeconds': 2
});

// schema for the book collection
const booksSchema = {
    'name': 'books',
    'fields': [
        { 'name': 'title', 'type': 'string' },
        { 'name': 'authors', 'type': 'string[]', 'facet': true },
        { 'name': 'image_url', 'type': 'string' },
        
        { 'name': 'publication_year', 'type': 'int32', 'facet': true },
        { 'name': 'ratings_count', 'type': 'int32' },
        { 'name': 'average_rating', 'type': 'float' }
    ],
    'default_sorting_field': 'ratings_count'
};

// create a new collection on the server
client.collections().create(booksSchema)
    .then(function () {
        // index each book from the book.jsonl file to the collection
        readline.createInterface({
            input: fs.createReadStream('books.jsonl'),
            terminal: false
        }).on('line', function (line) {
            let bookDocument = JSON.parse(line);
            
            client.collections('books').documents().create(bookDocument);
            console.log(`${bookDocument.title}`);
        });
    });

