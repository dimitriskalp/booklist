class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
      
        // insert cols
        row.innerHTML = `<td>${book.title}</td>
                       <td>${book.author}</td>
                       <td>${book.isbn}</td>
                       <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);

    }

    showAlert(message, className){
        //Create div 
        const div = document.createElement('div');
        // Add Classes
        div.className = `alert ${className}`;
        //Add  Name
        div.appendChild(document.createTextNode(message));
        //Get Parent 
        const container = document.querySelector('.container');
        //Get form
        const form = document.querySelector('#book-form');
        //Insert alert 
        container.insertBefore(div, form);
        //Timeout Alert
        setTimeout(function(){
           document.querySelector('.alert').remove();
        }, 3000);

    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

//Local storage class

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
          books = [];
        }else{
          books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //Add book to UI
            ui.addBookToList(book);
        });

    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);

            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }
}

//DOM load event

document.addEventListener('DOMContentLoaded',Store.displayBooks);

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

    // Validate 
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    }else{
        ui.addBookToList(book);

        // add book to LS
        Store.addBook(book);
        //Show success
        ui.showAlert('Book Added!', 'success');
        //Clearfields
        ui.clearFields();
    }


    e.preventDefault();
   }
);
//event lsitener for delete

document.getElementById('book-list').addEventListener('click', function(e){

    const ui = new UI();
    ui.deleteBook(e.target);

    //Remove from local storage

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show message
    ui.showAlert('Book removed', 'success')
    
    e.preventDefault();
});