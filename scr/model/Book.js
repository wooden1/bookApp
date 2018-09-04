// The Model Code is the basis for writing the view and controller code 🏆

// Book object
class Book {
    constructor(slots) {
        this.isbn = slots.isbn;
        this.title = slots.title;
        this.year = slots.year;                                          
    }
}
// For representing the collection of all Book instances managed by the app
Book.instances = {};

// Add Method: takes care of creating a new Book instance and adding it to the Book.instances collection
Book.add = (slots) => {
    const book = new Book(slots);
    // add book to the Book collection
    Book.instances[slots.isbn] = book;
    console.log(`Book: ${slots.isbn} Title: ${slots.title} created!`);
};

// Loading all Book instances from local storage
// TODO: Implement either localforage or indexDB
Book.loadAll = () => {
    let key='';
    let keys=[];
    let bookStr='';
    let books={};

    try {
        if(localStorage.books){
            bookStr = localStorage.books;    
        }
    } catch (err) {
        console.log(`Error when reading from Local Storage ${err}`);
        alert(`Error when reading from Local Storage\n ${err}`);
    }
    if(bookStr){
        books = JSON.parse(bookStr);
        keys = Object.keys(books);
        console.log((keys.length +' books loaded.'));
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            Book.instances[key] = Book.convertRow2Obj(books[key]);
        }
    }
};

// Convert each row of books, representing a record(an untyped object), into Book.instances
Book.convertRow2Obj = (bookRow) => {
    const book = new Book(bookRow);
};

// Update method
Book.update = (slots) => {
    const book = Book.instances[slots.isbn];
    const year = parseInt(slots.year);
    if(book.title !== slots.title){
        book.title = slots.title;
    }
    if(book.year !== year){
        book.year = year;
    }
    console.log(`Book ${slots.isbn} modified!`);
}


// Delete method
Book.destroy = (isbn) => {
    if(Book.instances[isbn]){
        console.log(`Book ${isbn} deleted`);
        delete Book.instances[isbn];
    } else{
        console.log(`There is no book with ISBN ${isbn} in the database`);
    }
};

// Save all method
// TODO: implement localforage or indexDB
Book.saveAll = () => {
    let bookStr =''; 
    let error = false;
    let numOfBooks = Object.keys(Book.instances).length;
     try {
         bookStr = JSON.stringify(Book.instances);
         localStorage.books = bookStr;
     } catch (err) {
         console.log(`Error when writing to Local Storage\n ${err}`);
         alert(`Error when writing to Local Storage\n ${err}`);
         error = true;
     }
     if(!err) console.log(`${numOfBooks} books saved.`);
};

// Test data: Will create test data and save it in local storage database
Book.createTestData = () => {
    Book.instances['006251587x'] = new Book(
        {
            isbn: '006251587x',
            title: 'Weaving the Web',
            year: 2000
        }
    );
    Book.instances["0465026567"] = new Book({
        isbn: "0465026567",
        title: "Gödel, Escher, Bach",
        year: 1999
    });
    Book.instances["0465030793"] = new Book({
        isbn: "0465030793",
        title: "I Am A Strange Loop",
        year: 2008
    });
    Book.saveAll();
};

// Clear all method
Book.clearData = () => {
    if(confirm('Do you really want to delete all book data?')){localStorage.books = '{}'}
};
