# Web II Product API - DELETE Method Update

This branch implements the `DELETE` method to allow deleting products by id and implements middlewares 

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


### Delete a Product
Update an existing product by its ID.

- **URL**: `/products/:id`
- **Method**: `DELETE`



### Postman Testing
**Non-existing product**
<img width="1357" height="369" alt="image" src="https://github.com/user-attachments/assets/22bc801f-bafd-427b-95bb-2c4cdb28c846" />
**Existing product**
<img width="1315" height="181" alt="image" src="https://github.com/user-attachments/assets/bd86cc71-8c54-44a5-b22c-70ebe14aac0b" />



