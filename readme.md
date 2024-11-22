# E-Commerce Microservices Project

This project aims to create a scalable e-commerce platform using various microservices. The platform includes core components such as user management, product catalog, cart management, order management, and payment processing.

## Setup

### Requirements

Ensure the following tools are installed on your system:

- **Node.js**: `v22.11` or higher  To check:
  ```bash
  node -v
  ```
  **NPM:** v10.9 or higher
  ```bash
  npm -v
  ```
  **Docker Compose:** v2.23 or higher
  ```bash
  docker-compose --version
  ```

### Steps

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/username/e-commerce-microservices.git
cd e-commerce-microservices
```
2. Install the required dependencies:
```bash
npm install
```
3. Configure environment variables (.env):
A sample .env file is included in the project directory. By default, all services use local addresses. You can modify the file as needed.

## Running the Services
1. Build and run the microservices using Docker:
```bash
docker-compose build
docker-compose up
```

The services will now run inside Docker containers. This may take a while.

## API Documentation
The project includes the following microservices:

# Users: Manages user accounts and authentication
# Catalog: Handles the product catalog
# Cart: Manages user shopping carts
# Order: Processes orders
Each service provides its own API documentation. Refer to the relevant files in the project directory for more details.

## Testing
# Running Tests
1. Navigate to the test collections directory:
```bash
cd testCollections
```
2.Install the test runner (Newman):
```bash
npm install -g newman
```
Run the tests:

```bash
newman run './senario tests.postman_collection.json'
```

Contribution
If you want to contribute, please submit a pull request or open an issue. Your contributions are valuable!

License
This project is licensed under the MIT License. For more information, see the LICENSE file.