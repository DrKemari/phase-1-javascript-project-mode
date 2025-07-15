let books = []; // Global array to hold book data

document.addEventListener('DOMContentLoaded', () => {
  initialize();
});

// FORM SUBMISSION
document.querySelector('#book-form').addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let bookObj = {
    name: e.target.name.value,
    imageUrl: e.target.image_url.value,
    description: e.target.description.value,
    Author_name: e.target.Author_name.value,
    read: false // Add read status
  };
  adoptBook(bookObj);
}

// FETCH & RENDER ALL BOOKS
function getAllBooks() {
  fetch('http://localhost:3000/books')
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

// RENDER ONE BOOK CARD
function renderOneBook(book) {
  let card = document.createElement('li');
  card.className = 'card';
  card.innerHTML = `
    <div class="book-card">
      <img src="${book.imageUrl}" alt="Image of ${book.name}" />
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

  // MARK AS READ/UNREAD HANDLER
  card.querySelector('.read').addEventListener('click', () => {
    book.read = !book.read;
    updateBook(book);
  });

  // DELETE HANDLER
  card.querySelector('.delete').addEventListener('click', () => {
    deleteBook(book.id);
  });

  document.querySelector('#book-list').appendChild(card);
}

// ADD NEW BOOK TO DATABASE
function adoptBook(bookObj) {
  fetch('http://localhost:3000/books', {
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

// UPDATE BOOK (for read toggle)
function updateBook(book) {
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read: book.read })
  })
    .then(res => res.json())
    .then(() => renderAllBooks());
}

// DELETE BOOK
function deleteBook(bookId) {
  fetch(`http://localhost:3000/books/${bookId}`, {
    method: 'DELETE'
  })
    .then(() => {
      books = books.filter(b => b.id !== bookId);
      renderAllBooks();
    });
}

// SORTING BY TITLE
document.getElementById('sortTitle').addEventListener('change', function () {
  const order = this.value;
  if (order === 'az') {
    books.sort((a, b) => a.name.localeCompare(b.name));
  } else if (order === 'za') {
    books.sort((a, b) => b.name.localeCompare(a.name));
  }
  renderAllBooks();
});

// SORTING BY READ STATUS
document.getElementById('sortRead').addEventListener('change', function () {
  const status = this.value;
  if (status === 'read') {
    books.sort((a, b) => (b.read === true) - (a.read === true));
  } else if (status === 'unread') {
    books.sort((a, b) => (a.read === true) - (b.read === true));
  }
  renderAllBooks();
});

// INITIALIZE
function initialize() {
  getAllBooks();
}
