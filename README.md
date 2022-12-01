# day 1

## Instructions

- setup project
- clone to your github
- Read the documentation https://sequelize.org/docs/v7/getting-started/
- Setup the following Models in models folder. Make sure tables made by sequelize:

```
shipping_dock
- id
- name
-status ENUM(active, inactive) (integer mapping)

transaction
- id
- order_id
- user_id
- shipping_dock_id
- amount
- notes

order
- id
- user_id
- amount
- tax
- notes
- status (paid, not paid) (integer mapping)
```

- Make the CRUD API for these tables

```
GET /api/v1/shipping_dock (get all)
GET /api/v1/shipping_dock/:id (get one)
POST /api/v1/shipping_dock/:id (add one)
PUT /api/v1/shipping_dock/:id (update one)
DELETE /api/v1/shipping_dock/:id (delete one)

GET /api/v1/order (get all)
GET /api/v1/order/:id (get one)
POST /api/v1/order/:id (add one)
PUT /api/v1/order/:id (update one)
DELETE /api/v1/order/:id (delete one)

GET /api/v1/transaction (get all)
GET /api/v1/transaction/:id (get one)
POST /api/v1/transaction/:id (add one)
PUT /api/v1/transaction/:id (update one)
DELETE /api/v1/transaction/:id (delete one)
```

- Everything must be done by end of date
