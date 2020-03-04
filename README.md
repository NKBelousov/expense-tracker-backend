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

To be continued...
