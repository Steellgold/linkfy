### Route: `POST /api/link/create`

This route is used to create a new link.

#### Request

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `url` | `string` | **Required** The URL to shorten. |
| `slug` | `string` | **Required** The slug to use for the link. |
| `userId` | `string` | **Optional** The user ID to associate with the link. |
| `visitorId` | `string` | **Required** The visitor ID to associate with the link. |

#### Response Codes

| Code  | Description                        |
| ----- | ---------------------------------- |
| `201` | The link was created successfully. |
| `400` | The request was invalid.           |
| `429` | The request was rate limited.      |
| `500` | An error occurred.                 |

#### Example

```json
{
  "url": "https://example.com",
  "slug": "B2sR4",
  "visitorId": "1234567890"
}
```