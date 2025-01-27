# SpeakX Project

## Overview

SpeakX is a web application designed to provide users with a powerful search functionality for a question database. The application allows users to search for questions by title, filter them by type, and navigate through paginated results. Built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, the project emphasizes efficiency, user-friendliness, and mobile responsiveness.

---

## Features

- **Search Functionality**: Search questions by title using keywords.
- **Type-Based Filtering**: Filter results by question types such as `READ_ALONG`, `MCQ`, and `ANAGRAM`.
- **Pagination**: Navigate through results efficiently with next and previous buttons.
- **Mobile Responsiveness**: Fully optimized for mobile and desktop devices.
- **Interactive UI**: Smooth transitions, hover effects, and dynamic feedback for a seamless user experience.

---

## Technologies Used

### Frontend

- **React.js**: For building the user interface and managing application state.
- **CSS**: To design a visually appealing and responsive interface.
- **Axios**: For making HTTP requests to the backend.

### Backend

- **Node.js**: For building the server-side logic.
- **Express.js**: For creating RESTful APIs.
- **MongoDB**: As the database for storing and querying questions.

---

## API Implementation

The `/search` API endpoint handles querying the database for questions based on user input. The API supports:

- **Search by Title**: Finds questions where the title matches a regular expression of the search query.
- **Type Filtering**: Filters results by type if a type parameter is provided.
- **Pagination**: Uses `.skip()` and `.limit()` methods to fetch a specific range of results for the current page.

**Backend Code Example:**

```javascript
app.get('/search', async (req, res) => {
  console.log('Request received:', req.query);
  const { query, page = 1, type } = req.query;

  const filter = { title: new RegExp(query, 'i') };

  if (type) {
    filter.type = type;
  }

  try {
    const results = await Product.find(filter)
      .skip((page - 1) * 10)
      .limit(10);
    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions', error: err.message });
  }
});
```

---

## How It Works

1. **Search**: Users enter a keyword in the search bar, and the frontend sends the query to the `/search` API.
2. **Filter**: Users can select a question type from the dropdown to refine the results.
3. **Pagination**: The frontend manages the current page state and sends it to the backend for fetching the appropriate results.
4. **Results Display**: The backend returns the filtered and paginated results, which are rendered dynamically on the UI.

---

## Enhancements and Unique Features

- **Mobile Responsiveness**: Ensures the application is fully functional and visually consistent on all devices.
- **Sorting Options**: Allows users to filter questions by type for a tailored experience.
- **Optimized Performance**: Fetches only the required data to minimize load times and improve efficiency.
- **User-Centric Design**: Clean and interactive UI with smooth transitions and hover effects for buttons and dropdowns.

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/speakx.git
   ```
2. Navigate to the project directory:
   ```bash
   cd speakx
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd client && npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   npm run server
   ```
2. Start the frontend:
   ```bash
   cd client && npm start
   ```
3. Access the application at `http://localhost:3000`.

---

## Folder Structure

```
SpeakX/
├── Backend/
│   └── server.js
├── Client/
│   ├── public/
│   ├── src/
│   └── package.json
├── .gitignore
├── README.md
└── package.json
```

---

## Future Improvements

- Implement user authentication for a personalized experience.
- Add advanced sorting and filtering options.
- Enable exporting search results to CSV.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

## Contact

For any questions or feedback, feel free to reach out at [[your-email@example.com](mailto\:your-email@example.com)].

