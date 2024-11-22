User Service
This service manages user authentication and provides JSON Web Key Set (JWKS) endpoint for JWT validation.

Admin API Endpoints
These endpoints allow administrators to manage users in the system. Each request requires administrator authentication.

1. Create Users
Endpoint: POST /admin/create

Description: Creates multiple users by hashing their passwords and sending user data to a RabbitMQ queue.

Request Headers:

Authorization: Bearer token (Admin access required)

Request Body: { "users": [ { "email": "user1@example.com", "password": "password123" }, { "email": "user2@example.com", "password": "password456" } ] }

Response: { "message": "ok" }

Notes:

Passwords are hashed before being stored.

User data is sent to RabbitMQ queue defined in RABBITMQ_USER_QUEUE.

2. Get All Users
Endpoint: GET /admin/

Description: Retrieves a list of all users with their IDs and email addresses.

Request Headers:

Authorization: Bearer token (Admin access required)

Response: [ { "id": 1, "email": "user1@example.com" }, { "id": 2, "email": "user2@example.com" } ]

3. Get a User by ID
Endpoint: GET /admin/:id

Description: Retrieves a single user's details by their ID.

Request Headers:

Authorization: Bearer token (Admin access required)

Path Parameters:

id: The ID of the user to retrieve.

Response: { "id": 1, "email": "user1@example.com" }

Notes:

Returns null if the user with the specified ID does not exist.

4. Delete a User
Endpoint: DELETE /admin/:id

Description: Deletes a user by their ID.

Request Headers:

Authorization: Bearer token (Admin access required)

Path Parameters:

id: The ID of the user to delete.

Response: { "message": "ok" }

Notes:

If the user with the specified ID does not exist, the request will fail.

User API Endpoints
These endpoints allow users to register and log in to the system. All requests require proper validation.

1. Register User
Endpoint: POST /user/register

Description: Registers a new user by hashing their password and saving the user information in the database.

Request Body: { "email": "user@example.com", "password": "password123" }

Response (Success): { "email": "user@example.com" }

2. Login User
Endpoint: POST /user/login

Description: Authenticates a user by verifying their email and password, then generates a JWT token.

Request Body: { "email": "user@example.com", "password": "password123" }

Response (Success): { "token": "JWT_TOKEN_HERE" }

JWKS Endpoint
GET /jwks
Returns the JSON Web Key Set (JWKS) for JWT validation.

Request

Method: GET

URL: /jwks

Response

Status: 200 OK

Body: JSON object containing the JWKS.

Example Response

{ "keys": [ { "kid": "12345", "use": "sig", "kty": "RSA", "alg": "RS256", "n": "public_key_modulus", "e": "AQAB" } ] }

Implementation Details
Public Key: The public key used for JWT signature validation is provided as an environment variable (PUBLIC_KEY).

JOSE Library: This service uses the node-jose library to manage and create the key store.

Environment Variables
PUBLIC_KEY: The RSA public key in PEM format used for verifying JWT signatures.

Example Usage
To retrieve the JWKS, send a GET request to the /jwks endpoint. This will return the keys used to validate JWTs.

curl http://localhost:3000/jwks

Make sure the PUBLIC_KEY environment variable is set in your .env file or environment:

PUBLIC_KEY="your_rsa_public_key_here"

Error Handling
If the public key is not properly set or an error occurs during the generation of the JWKS, the service will respond with an appropriate error message and status code.

This documentation provides an overview of the user-service endpoints and usage. For more details on how to use and integrate this service, refer to the implementation code and comments.