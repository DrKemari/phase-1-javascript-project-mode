let books = [];

document.addEventListener('DOMContentLoaded', () => {
  initialize();
});

// Form submission
document.querySelector('#book-form').addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let bookObj = {
    name: e.target.name.value,
    imageUrl: e.target.image_url.value,
    description: e.target.description.value,
    Author_name: e.target.Author_name.value,
    read: false
  };
  adoptBook(bookObj);
}

// Fetching and rendering all books
function getAllBooks() {
  fetch('https://phase-1-javascript-project-mode-jgv1.onrender.com/books')
    .then(res => res.json())
    .then(bookData => {
      books = bookData;
      renderAllBooks();
    })
    .catch(error => console.error("Error fetching books:", error));
}

function renderAllBooks() {
  const bookList = document.querySelector('#book-list');
  bookList.innerHTML = '';
  books.forEach(book => renderOneBook(book));
}

// Rendering one book
function renderOneBook(book) {
  let card = document.createElement('li');
  card.className = 'card';
  card.innerHTML = `
    <div class="book-card">
      <img src="${book.image_url}" alt="Image of ${book.name}" />
      <div class="content">
        <h4>${book.name}</h4>
        <h4>${book.Author_name}</h4>
        <p>${book.description}</p>
        <p>Status: <strong>${book.read ? 'Read' : 'Unread'}</strong></p>
      </div>
    </div>
    <div class="buttons">
      <button class="btn read">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
      <button class="btn delete">Delete</button>
    </div>
  `;

  // Mark Read or Unread
  card.querySelector('.read').addEventListener('click', () => {
    book.read = !book.read;
    updateBook(book);
  });

  // delete handler
  card.querySelector('.delete').addEventListener('click', () => {
    deleteBook(book.id);
  });

  document.querySelector('#book-list').appendChild(card);
}

// New book addition
function adoptBook(bookObj) {
  fetch('https://phase-1-javascript-project-mode-jgv1.onrender.com/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookObj)
  })
    .then(res => res.json())
    .then(book => {
      books.push(book);
      renderAllBooks();
    });
}

// updating book
function updateBook(book) {
  fetch(`https://phase-1-javascript-project-mode-jgv1.onrender.com/books/${book.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read: book.read })
  })
    .then(res => res.json())
    .then(() => renderAllBooks());
}

// deleting a book
function deleteBook(bookId) {
  fetch(`https://phase-1-javascript-project-mode-jgv1.onrender.com/books/${bookId}`, {
    method: 'DELETE'
  })
    .then(() => {
      books = books.filter(b => b.id !== bookId);
      renderAllBooks();
    });
}

// sorting by title
document.getElementById('sortTitle').addEventListener('change', function () {
  const order = this.value;
  if (order === 'az') {
    books.sort((a, b) => a.name.localeCompare(b.name));
  } else if (order === 'za') {
    books.sort((a, b) => b.name.localeCompare(a.name));
  }
  renderAllBooks();
});

// Sorting by status
document.getElementById('sortRead').addEventListener('change', function () {
  const status = this.value;
  if (status === 'read') {
    books.sort((a, b) => (b.read === true) - (a.read === true));
  } else if (status === 'unread') {
    books.sort((a, b) => (a.read === true) - (b.read === true));
  }
  renderAllBooks();
});


function initialize() {
  getAllBooks();
}
