// Function to add a new book to the table
function addBook(e) {
  e.preventDefault();

  // Retrieve the input values
  const bookName = document.getElementById("bookname").value;
  const author = document.getElementById("Author").value;
  const date = document.getElementById("date").value;
  const type = document.querySelector('input[name="type"]:checked').value;

  // Create a new row with book details
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${bookName}</td>
    <td>${author}</td>
    <td>${date}</td>
    <td>${type}</td>
  `;

  // Append the new row to the table body
  const tableBody = document.getElementById("tableBody");
  tableBody.appendChild(newRow);

  // Clear the form input fields
  document.getElementById("bookname").value = "";
  document.getElementById("Author").value = "";
  document.getElementById("date").value = "";

  // Update the book counts
  updateBookCounts();
  updatePagination();
}

// Function to update the book counts
function updateBookCounts() {
  const books = document.getElementsByTagName("tr");
  const nameCount = document.getElementById("nameCount");
  const authorCount = document.getElementById("authorCount");
  const dateCount = document.getElementById("dateCount");
  const typeCount = document.getElementById("typeCount");

  // Subtract 1 from the book count to exclude the table header row
  nameCount.textContent = `Name Count: ${books.length - 1}`;
  authorCount.textContent = `Author Count: ${books.length - 1}`;
  dateCount.textContent = `Date Count: ${books.length - 1}`;
  typeCount.textContent = `Type Count: ${books.length - 1}`;
}

// Function to filter books based on criteria
function filterBooks() {
  const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
  const authorFilter = document.getElementById("authorFilter").value.toLowerCase();
  const dateFilter = document.getElementById("dateFilter").value.toLowerCase();
  const typeFilter = document.getElementById("typeFilter").value.toLowerCase();

  const books = document.getElementsByTagName("tr");

  for (let i = 1; i < books.length; i++) {
    const book = books[i];
    const bookName = book.getElementsByTagName("td")[0].textContent.toLowerCase();
    const author = book.getElementsByTagName("td")[1].textContent.toLowerCase();
    const date = book.getElementsByTagName("td")[2].textContent.toLowerCase();
    const type = book.getElementsByTagName("td")[3].textContent.toLowerCase();

    if (bookName.includes(nameFilter) && author.includes(authorFilter) && date.includes(dateFilter) && type.includes(typeFilter)) {
      book.style.display = "table-row";
    } else {
      book.style.display = "none";
    }
  }
  updatePagination();
}

// Function to update pagination
function updatePagination() {
  const booksPerPage = 10;
  const books = Array.from(document.getElementsByTagName("tr")).slice(1);
  const totalPages = Math.ceil(books.length / booksPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("li");
    pageLink.classList.add("page-item");
    const pageButton = document.createElement("button");
    pageButton.classList.add("page-link");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      showPage(i, booksPerPage, books);
    });
    pageLink.appendChild(pageButton);
    pagination.appendChild(pageLink);
  }

  showPage(1, booksPerPage, books);
}

// Function to show a specific page of books
function showPage(pageNumber, booksPerPage, books) {
  const startIndex = (pageNumber - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  books.forEach((book, index) => {
    if (index >= startIndex && index < endIndex) {
      book.style.display = "table-row";
    } else {
      book.style.display = "none";
    }
  });
}

// Add event listeners
document.getElementById("LibraryForm").addEventListener("submit", addBook);
document.getElementById("filterButton").addEventListener("click", filterBooks);

// Initial update of book counts and pagination
updateBookCounts();
updatePagination();

