## API Reference (Links)

#### Get all links for a user/visitor

```http
  GET /api/links/single
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `type`    | `string` | **Required**. `visitorId` or `userId` |
| `id`      | `string` | **Required**. ID of user/visitor      |
| `sortUrl` | `string` | **Required**. shortUrl of link        |