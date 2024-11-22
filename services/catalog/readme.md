Catalog Service
Product controller
This service manages the product catalog in the e-commerce platform, including creating, retrieving, and deleting products.

Endpoints
1. Create Product
Endpoint: POST /

Description: Creates new products and sends product data to a RabbitMQ queue.

Request Headers:

Authorization: Bearer token (Admin access required)

Request Body:

json
{
  "products": [
    {
      "productId": "product1",
      "name": "Product 1",
      "price": 100,
      "quantity": 10
    },
    {
      "productId": "product2",
      "name": "Product 2",
      "price": 200,
      "quantity": 20
    }
  ]
}
Response:

json
{
  "message": "ok"
}
Notes:

Sends product data to the RabbitMQ queue defined in RABBITMQ_CATALOG_QUEUE.

2. Get All Products
Endpoint: GET /

Description: Retrieves a list of all products.

Request Headers:

Authorization: Bearer token (User access required)

Request Body: N/A

Response:

json
[
  {
    "productId": "product1",
    "name": "Product 1",
    "price": 100,
    "quantity": 10
  },
  {
    "productId": "product2",
    "name": "Product 2",
    "price": 200,
    "quantity": 20
  }
]
3. Get Product by ID
Endpoint: GET /:productId

Description: Retrieves a single product by its ID.

Request Headers:

Authorization: Bearer token (User access required)

Path Parameters:

productId: The ID of the product to retrieve.

Response:

json
{
  "productId": "product1",
  "name": "Product 1",
  "price": 100,
  "quantity": 10
}
4. Delete Product
Endpoint: DELETE /:productId

Description: Deletes a product by its ID.

Request Headers:

Authorization: Bearer token (Admin access required)

Path Parameters:

productId: The ID of the product to delete.

Response:

json
{
  "message": "ok"
}
Implementation Details
Prisma Client: Used for database operations.

RabbitMQ: Used for messaging to handle product data updates.

Environment Variables
RABBITMQ_CATALOG_QUEUE: Queue name for sending product data.

Stock controller
This service manages stock validation for products in the e-commerce platform. It checks the available stock and adjusts the requested quantities accordingly.

Endpoints
1. Check Stock
Endpoint: POST /check

Description: Checks the stock availability for a list of products and adjusts the quantities based on available stock.

Request Headers:

Authorization: Bearer token (User access required)

Request Body:

json
{
  "products": [
    {
      "productId": "product1",
      "quantity": 5
    },
    {
      "productId": "product2",
      "quantity": 3
    }
  ]
}
Response:

json
[
  {
    "productId": "product1",
    "quantity": 4,
    "price": 100
  },
  {
    "productId": "product2",
    "quantity": 3,
    "price": 200
  }
]
Notes:

If the requested quantity exceeds the available stock, the quantity is adjusted to the available stock.

If a product is not found, its quantity is set to 0 and price to 0.

Implementation Details
Prisma Client: Used for database operations.

Error Handling
If an error occurs during the operations, the service will respond with an appropriate error message and status code.