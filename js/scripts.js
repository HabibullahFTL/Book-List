// UI Elements 
let inputForm = document.querySelector('#input_form');
let bookList = document.querySelector('#book_list');


// Classes
// Creating a new book object class
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
} 
// UI interface changer class
class UI{
    static showNewBook(title,author,isbn){
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${isbn}</td>
        <td><a href='#'>x</a></td>
        `;
        bookList.appendChild(row);
    }
    static showAlert(message,status){
        let div = document.createElement('div');
        let container = document.querySelector('.container');
        div.className = `alert ${status}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div,inputForm);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
        
    }
}

// Local Storage Handling Class
class LS{
    static getLS(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addToLS(book){
        let books = this.getLS();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))
    }
    static getFromLS(){
        let books = this.getLS();
        books.forEach(book=>{
            UI.showNewBook(book.title,book.author,book.isbn)
        })
    }
    static removeFromLS(isbn){
        let books = this.getLS();
        
        books.forEach((book,index)=>{
            if (isbn === book.isbn) {
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}


// Add Event Listener
inputForm.addEventListener('submit',addBook);
bookList.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',LS.getFromLS())

// Functions
    // Add Book Functions
function addBook(e){
    let title = document.querySelector('#title'), 
    author = document.querySelector('#author'),
    isbn = document.querySelector('#isbn');
    if(title.value == '' || author.value == '' || isbn.value == ''){
        UI.showAlert('Empty feiled does not allow to input!', 'error')
    }else{
        let book = new Book(title.value,author.value,isbn.value);
        UI.showNewBook(title.value,author.value,isbn.value);
        UI.showAlert('Book Added Successfully!','success');
        LS.addToLS(book);
        title.value = '';
        author.value = '';
        isbn.value = '';
    }
    e.preventDefault();
}
    // Remove a book function
function removeBook(e){
    if(e.target.hasAttribute('href')){
        e.target.parentElement.parentElement.remove();
        let isbn = e.target.parentElement.previousElementSibling.textContent;
        LS.removeFromLS(isbn);
        UI.showAlert('Book removed!','delete');
    }
}