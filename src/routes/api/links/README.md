## API Reference (Links)

#### Get all links

```http
  GET /api/links/all
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `type`    | `string` | **Required**. `visitorId` or `userId` |
| `id`      | `string` | **Required**. ID of user/visitor      |

#### Get single link

```http
  GET /api/links/single
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `type`    | `string` | **Required**. `visitorId` or `userId` |
| `id`      | `string` | **Required**. ID of user/visitor      |
| `sortUrl` | `string` | **Required**. shortUrl of link        |

#### Get only by link

```http
  GET /api/link
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `sortUrl` | `string` | **Required**. shortUrl of link        |