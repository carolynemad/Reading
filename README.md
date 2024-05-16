# Koinz Test API

## Overview

An API designed to manage reading intervals and provide information on the most-read books. The API allows users to create reading intervals and fetch the list of books with the highest number of pages read.

## Table of Contents

- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
    - [Create Reading Interval](#create-reading-interval)
    - [Most Read Books](#most-read-books)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## API Documentation

### Endpoints

#### Create Reading Interval

- **URL**: `/reading-intervals/add`
- **Method**: `POST`
- **Description**: Creates a new reading interval.
- **Request Body**:
  ```json
  {
    "userId": "d92fddca-701d-460a-b769-43407562478d",
    "bookId": "59bea9dd-22c4-4f12-811f-60b9c3908937",
    "startPage": 5,
    "endPage": 10
  }
  ```
- **Responses**:
  - `201`: Successfully created the reading interval.
    ```json
    {
      "intervalId": "some-interval-id",
      "userId": "d92fddca-701d-460a-b769-43407562478d",
      "bookId": "59bea9dd-22c4-4f12-811f-60b9c3908937",
      "startPage": 5,
      "endPage": 10
    }
    ```
  - `400`: The request was invalid or missing required fields.
  - `500`: A server error occurred.

#### Most Read Books

- **URL**: `/books/most-read`
- **Method**: `GET`
- **Description**: Lists the books with the highest number of pages read.
- **Responses**:
  - `200`: Successfully retrieved the list.
    ```json
    [
      {
        "bookId": "59bea9dd-22c4-4f12-811f-60b9c3908937",
        "pagesRead": 150
      },
      {
        "bookId": "another-book-id",
        "pagesRead": 120
      }
    ]
    ```
  - `404`: No reading intervals found.
  - `500`: A server error occurred.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/reading-books.git
   ```
2. Navigate to the project directory:
   ```sh
   cd reading-books
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the application, use the following command:
```sh
npm start
```

For development mode with live-reloading:
```sh
npm run dev
```

### Running Tests

To run the tests, use the following command:
```sh
npm test
```

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js
- **Swagger UI**: API documentation tool
- **Jest**: JavaScript testing framework

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.