# Backend for expense tracking

## Available routes

### Authorization

```http
POST /auth
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `login`    | `string` | **Required**. Your login    |
| `password` | `string` | **Required**. Your password |

Response

```javascript
{
  "token" : string,
  "user_id" : number,
}
```

All other HTTP requests **must be** signed with authorization header like so:

```http
  Authorization: $token
```

Where `$token` is a token which was received from `/auth` request

### Get user by ID

```http
GET /api/user/:id
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. User ID |

Response

```javascript
{
  "meta": {
      "count": number
  },
  "data": {
      "id": number,
      "name": string
  }
}
```

### Get possible payment types

```http
GET /api/payment/types
```

Response

```javascript
{
  "meta": {
      "count": number
  },
  "data": [
      {
          "id": number,
          "name": string
      },
  ]
}
```

### Get user payments

```http
GET /api/payments
```

Response

```javascript
{
  "meta": {
    "count": number
  },
  "data": [
    {
        "id": number,
        "user_id": number,
        "type_id": number,
        "name": string,
        "cost": number,
        "created_at": number,
    },
  ]
}
```

### Get user payment by id

```http
GET /api/payments/:id
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `number` | **Required**. Payment ID |

Response

```javascript
{
  "meta": {
    "count": number
  },
  "data": [
    {
        "id": number,
        "user_id": number,
        "type_id": number,
        "name": string,
        "cost": number,
        "created_at": number,
    },
  ]
}
```

### Create new payment

```http
POST /api/payments
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `name`    | `string` | **Required**. Name            |
| `cost`    | `number` | **Required**. Cost            |
| `type_id` | `number` | **Required**. Payment Type ID |

Response is empty

### Delete payment by ID

```http
DELETE /api/payments/:id
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `number` | **Required**. Payment ID |

Response: 204 if succesful, 404 if not
