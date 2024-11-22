Order Service
This service manages orders in the e-commerce platform, including creating orders, retrieving orders, and managing order status.

Endpoints
1. Create Order
Endpoint: POST /

Description: Creates a new order from the user's cart and decreases the stock of the ordered items.

Request Headers:

Authorization: Bearer token (User access required)

Request Body: N/A

Response:

json
{
  "order": {
    "id": "order_id",
    "orderProducts": [
      {
        "id": "product_id",
        "orderId": "order_id",
        "productId": "product_id",
        "quantity": 1,
        "price": 100
      }
    ]
  }
}
Notes:

Decreases stock of the ordered items.

Clears the user's cart after creating the order.

2. Get User Orders
Endpoint: GET /

Description: Retrieves all orders for the authenticated user.

Request Headers:

Authorization: Bearer token (User access required)

Request Body: N/A

Response:

json
{
  "orders": [
    {
      "id": "order_id",
      "userId": "user_id",
      "orderProducts": [
        {
          "id": "product_id",
          "orderId": "order_id",
          "productId": "product_id",
          "quantity": 1,
          "price": 100
        }
      ],
      "status": "PENDING"
    }
  ]
}
3. Get Order by ID
Endpoint: GET /:id

Description: Retrieves a single order by its ID. Requires admin access.

Request Headers:

Authorization: Bearer token (Admin access required)

Path Parameters:

id: The ID of the order to retrieve.

Response:

json
{
  "order": {
    "id": "order_id",
    "userId": "user_id",
    "orderProducts": [
      {
        "id": "product_id",
        "orderId": "order_id",
        "productId": "product_id",
        "quantity": 1,
        "price": 100
      }
    ],
    "status": "PENDING"
  }
}
4. Finish Order
Endpoint: POST /finish/:orderId

Description: Marks an order as finished. Requires admin access.

Request Headers:

Authorization: Bearer token (Admin access required)

Path Parameters:

orderId: The ID of the order to finish.

Response:

json
{
  "updatedOrder": {
    "id": "order_id",
    "status": "FINISHED",
    "orderProducts": [
      {
        "id": "product_id",
        "orderId": "order_id",
        "productId": "product_id",
        "quantity": 1,
        "price": 100
      }
    ]
  }
}
5. Cancel Order
Endpoint: POST /cancel/:orderId

Description: Cancels an order and increases the stock of the ordered items. Requires user access.

Request Headers:

Authorization: Bearer token (User access required)

Path Parameters:

orderId: The ID of the order to cancel.

Response:

json
{
  "message": "order cancelled"
}
Notes:

Increases stock of the ordered items.

Only the user who created the order can cancel it.

Implementation Details
Prisma Client: Used for database operations.

RabbitMQ: Used for messaging to handle stock updates.

Environment Variables
RABBITMQ_DECRASE_STOCK: Queue name for decreasing stock.

RABBITMQ_INCREASE_STOCK: Queue name for increasing stock.

Error Handling
If an error occurs during the operations, the service will respond with an appropriate error message and status code.