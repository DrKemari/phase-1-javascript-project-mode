# Book Library Manager

This is a simple project to manage a collection of books using DOM manipulation and a local JSON database (`db.json`). Users can add books, remove them, mark them as read/unread, and sort the list.

---

## Features Included

### 1. Add a Book

Users can fill out a form to add a new book to the library.
Each book includes:

* Title
* Description
* Author Name
* Image URL
* Read status (default is unread)

### 2. Mark Read / Unread

Each book card includes a toggle to switch between **Read** and **Unread** status.

### 3. Delete a Book

Users can remove a book entirely from the library.

### 4. Sort Books

Sort the library based on:

* Title (A–Z / Z–A)
* Read status (Read first / Unread first)

---

##  Setup Instructions

### Prerequisites

* Node.js installed
* JSON Server installed globally

### Run the JSON Server

```bash
npm install -g json-server
json-server --watch db.json
```

The server will start on [http://localhost:3000](http://localhost:3000)

### Open the App

Just open `index.html` in your browser (use Live Server in VS Code for best results).

---

##  Author

**Matara Kemari**
[GitHub](https://github.com/DrKemari)
Email: [drkemari@gmail.com](mailto:drkemari@gmail.com)

---

##  License

MIT – Use, build, remix, and share freely. Just give credit!
## Rising Stacker at Moringa

Enjoy the Book Library Manager
