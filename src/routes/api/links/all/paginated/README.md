## API Reference (Links)

#### Get all links for a user/visitor

```http
  GET /api/links/all/paginated
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `type`    | `string` | **Required**. `visitorId` or `userId` |
| `id`      | `string` | **Required**. ID of user/visitor      |

#### Futur improvements

- [ ] Max per page

#### Returns

The response is a JSON object with the following structure:

```json
{
  [
    {
      "id": "string",
      "createdAt": "string",
      "userId": "string",
      "visitorId": "string",
      "baseUrl": "string",
      "shortUrl": "string",
      "clicks": "number",
      "countries": "json",
      "browsers": "json",
      "platforms": "json",
      "status": "boolean"
    }
  ],
  "total": "number"
}
```