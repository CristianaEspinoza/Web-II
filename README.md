# Web II Product API - PUT Method Update

This branch implements the `PUT` method to allow updating existing products in the catalog.

## Prerequisites

- Node.js installed on your machine.

## Installation & Setup

1.  **Install Dependencies**:
    Ensure you have Express installed.
    ```bash
    npm install express
    ```

2.  **Start the Server**:
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:9000`.


### Update a Product
Update an existing product by its ID.

- **URL**: `/products/:id`
- **Method**: `PUT`
- **Body (JSON)**: Include the fields you wish to update.


### Postman Testing


