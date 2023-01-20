## API Reference (Links)

#### Get all links for a user/visitor

```http
  GET /api/links/all
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `type`    | `string` | **Required**. `visitorId` or `userId` |
| `id`      | `string` | **Required**. ID of user/visitor      |
| `api_key` | `string` | **Required**. Prod API key            |