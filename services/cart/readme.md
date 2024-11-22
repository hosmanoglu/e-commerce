Cart Service
This service manages the user's shopping cart in the e-commerce platform, including adding, removing, retrieving, and clearing items in the cart.

Endpoints
1. Add to Cart
Endpoint: POST /add

Description: Adds products to the user's cart. If the product already exists in the cart, it increases the quantity. It also checks the stock availability.

Request Headers:

Authorization: Bearer token (User access required)

Request Body:

json
{
  "products": [
    {
      "productId": "product1",
      "quantity": 1
    },
    {
      "productId": "product2",
      "quantity": 2
    }
  ]
}
Response:

json
{
  "oldCart": [
    {
      "productId": "product1",
      "quantity": 2
    }
  ],
  "currentCart": [
    {
      "productId": "product1",
      "quantity": 3,
      "price": 100
    },
    {
      "productId": "product2",
      "quantity": 2,
      "price": 200
    }
  ]
}
2. Remove from Cart
Endpoint: POST /remove

Description: Removes products from the user's cart. If the product's quantity is reduced to 0, it is removed from the cart.

Request Headers:

Authorization: Bearer token (User access required)

Request Body:

json
{
  "products": [
    {
      "productId": "product1",
      "quantity": 1
    }
  ]
}
Response:

json
{
  "oldCart": [
    {
      "productId": "product1",
      "quantity": 3
    }
  ],
  "currentCart": [
    {
      "productId": "product1",
      "quantity": 2,
      "price": 100
    }
  ]
}
3. Get Cart
Endpoint: GET /

Description: Retrieves the current user's cart with the latest stock information.

Request Headers:

Authorization: Bearer token (User access required)

Request Body: N/A

Response:

json
{
  "currentCart": [
    {
      "productId": "product1",
      "quantity": 2,
      "price": 100
    },
    {
      "productId": "product2",
      "quantity": 1,
      "price": 200
    }
  ]
}
4. Clear Cart
Endpoint: POST /clear

Description: Clears all items from the user's cart.

Request Headers:

Authorization: Bearer token (User access required)

Request Body: N/A

Response:

json
{
  "oldCart": [
    {
      "productId": "product1",
      "quantity": 2
    },
    {
      "productId": "product2",
      "quantity": 1
    }
  ]
}
Implementation Details
Prisma Client: Used for database operations.

Catalog Service: Interacts with the catalog service to check stock availability.