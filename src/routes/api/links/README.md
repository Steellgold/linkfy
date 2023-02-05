### Route: `GET /api/links`

This route returns a list of links, filtered by a user/visitor ID.

#### Request

One of the following query parameters must be provided:

| Parameter   | Type     | Description                                        |
| ----------- | -------- | -------------------------------------------------- |
| `userId`    | `string` | **Required/Optional** The visitor ID to filter by. |
| `visitorId` | `string` | **Required/Optional** The visitor ID to filter by. |

#### Response Codes

| Code  | Description                   |
| ----- | ----------------------------- |
| `200` | The request was successful.   |
| `400` | The request was invalid.      |
| `429` | The request was rate limited. |
| `500` | An error occurred.            |

#### Example

```json
{
  "links": [
    {
      "id": "an-example-link-id",
      "userId": "an-example-user-id",
      "visitorId": "an-example-visitor-id",
      "url": "https://example.com",
      "createdAt": "2020-01-01T00:00:00.000Z"
    }
  ]
}
```
