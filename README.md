# qp-assessment

## Setup and Installation

### Docker Compose
To run the application using Docker Compose:

1. navigate to the root directory
2. run the command 
`docker-compose up`


## API Routes

### Admin Routes (Requires Admin Role)
- `POST /api/groceries` - Add new grocery items
- `PUT /api/groceries/:id` - Update grocery item details
- `DELETE /api/groceries/:id` - Remove grocery items
- `PUT /api/groceries/:id/inventory` - Manage grocery inventory

- `GET /api/groceries/all` - View all grocery items (Available to both Admin & User)

### User Routes
- `POST /api/groceries/order` - Place new order 

All routes require JWT authentication.


## API Testing

### Postman Collection
A Postman collection is available in the `/postman` directory. To use it:

1. Import `grocery-api.postman_collection.json` into Postman
2. Remember to update the Authorization header