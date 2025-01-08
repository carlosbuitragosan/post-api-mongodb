# POST MANAGEMENT API

This project is a RESTful API for managing posts. It allows users to create, read, update, and delete posts from a MongoDB database. The project is built using Node.js, Express, and Mongoose, with integration testing using mongodb-memory-server.

## FEATURES

1. Create Posts: Add new posts with a unique ID, content, and author.
2. Read Posts:
   - Retrieve all posts.
   - Retrieve a single post by its ID.
   - Update Posts: Update the content or author of an existing post by its ID.
   - Delete Posts: Delete a specific post by its ID.
3. Validation: Ensures all inputs are valid, such as checking if IDs conform to MongoDB's ObjectId format.
4. Error Handling: Handles and returns appropriate HTTP error responses for various scenarios (e.g., invalid input, post not found).
5. Environment Specific Database Handling:
   - Uses MongoMemoryServer for in-memory database testing.
   - Connects to a MongoDB instance in production and development.

## INSTALLATION

### Prerequisites
Ensure you have the following installed:

- Node.js (>=16.x)
- npm or yarn
- MongoDB (if not using in-memory testing)

### Steps

1. Clone the repository:

```
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

- Create a .env file in the root directory with the following:

```
NODE_ENV=test
MONGO_URI=your-mongodb-uri
PORT=3000
```

- Run the server:

```
npm start
```

4. Access the API at http://localhost:3000

## TESTING

This project uses Jest and mongodb-memory-server for integration tests.

### Run Tests

1. Ensure the server is not running.

2. Run the tests:

```
npm test
```

3. Coverage and output will be displayed in the terminal.

### Example Test Setup

Tests are written to:

- Start an in-memory MongoDB instance.
- Seed the database with mock data.
- Clean up data after each test.
- Stop the database after all tests.
