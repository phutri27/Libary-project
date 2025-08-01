const myLibrary = [
  new Book("1","The Hobbit", "J.R.R. Tolkien", 295, false),
  new Book("2", "1984", "George Orwell", 328, true),
  new Book("3", "Dune", "Frank Herbert", 412, false),
];

const article = document.querySelector("article");
const submitButton = document.querySelector('.btn');
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
const form = dialog.querySelector("form");

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function displayLibrary() {
  article.innerHTML = '';
  myLibrary.forEach((bookItem, index) => {
    const div = document.createElement("div");

    const bookTitle  = document.createElement("p");
    bookTitle.textContent = "Title: " + bookItem.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = "Author: " + bookItem.author;

    const bookPages  = document.createElement("p");
    bookPages.textContent ="Pages: " + bookItem.pages + " pages";

    const readYet    = document.createElement("button");
    readYet.setAttribute("data-book-id", `${bookItem.id}`);
    readYet.classList.add("read-btn");
    readYet.textContent = bookItem.read 
      ? "Have Read" 
      : "Not read";

    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    delBtn.setAttribute("data-book-id", `${bookItem.id}`);
    delBtn.textContent = "Delete";

    div.appendChild(bookTitle);
    div.appendChild(bookAuthor);
    div.appendChild(bookPages);
    div.appendChild(readYet);
    div.appendChild(delBtn);
    article.appendChild(div);


  });
}

function addBookToLibrary() {
  const id = crypto.randomUUID();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
  const newBook = new Book(id, title, author, pages, read);
  myLibrary.push(newBook);
}

article.addEventListener('click', (e)=>{
  const id = e.target.dataset.bookId;
  if (!id || !e.target.matches(".read-btn, .del-btn"))
    return;
  const index = myLibrary.findIndex(b => b.id === id);
  if (index == -1)
    return;
  
  if (e.target.matches(".read-btn")){
    myLibrary[index].read = !myLibrary[index].read;
  }
  else {
    myLibrary.splice(index, 1);
  }
  displayLibrary();
})



function register(){
  submitButton.addEventListener('click', (e)=>{
    dialog.showModal();
  })

  closeButton.addEventListener('click', (e)=>{
    e.preventDefault;
    dialog.close();
  })

  form.addEventListener('submit', e => {
    e.preventDefault();
    addBookToLibrary(e);
    dialog.close();
    form.reset();
    displayLibrary();
  });
}

register();

displayLibrary();