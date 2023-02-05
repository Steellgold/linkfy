### Route: `GET /api/links/sync`

This route is used to sync links between the user and visitor account.

#### Request

The following query parameters must be provided:

| Parameter   | Type     | Description                                                |
| ----------- | -------- | ---------------------------------------------------------- |
| `userId`    | `string` | **Required** The visitor ID to apply                       |
| `visitorId` | `string` | **Required** The visitor ID for the links to be applied to |

#### Response Codes

| Code  | Description                   |
| ----- | ----------------------------- |
| `200` | The request was successful.   |
| `400` | The request was invalid.      |
| `429` | The request was rate limited. |
| `500` | An error occurred.            |
