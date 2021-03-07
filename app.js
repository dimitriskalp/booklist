// book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){
    UI.prototype.addBookToList = function(book){
      const list = document.getElementById('book-list');
      const row = document.createElement('tr');
      
      // insert cols
      row.innerHTML = `<td>${book.title}</td>
                       <td>${book.author}</td>
                       <td>${book.isbn}</td>
                       <td><a href="#" class="delete">X</a></td>`;
      list.appendChild(row);

    }
}
//Shoe allert

UI.prototype.showAlert = function(message, className){
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
//Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}
//Clear fields function

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
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

    // Validate 
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error');
    }else{
        ui.addBookToList(book);
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

    //show message
    ui.showAlert('Book removed', 'success')
    
    e.preventDefault();
});