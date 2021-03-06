// book Constructor
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Constructor
function UI(){
    UI.prototype.addBookToList = function(book){
        console.log(book);
    }
}

//Event Listeners
document.getElementById('book-form').addEventListener('submit',
   function(e){
    // Get Form values
    const title = document.getElementById('title').value;
          author = document.getElementById('author').value;
          isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);  

    // δημιουργω Ui Object
    const ui = new UI();

    ui.addBookToList(book);


    e.preventDefault();
   }
);