### Route: `DELETE /api/link/delete`

This route deletes a link.

#### Request

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| `slug`    | `string` | **Required** The slug of the link to update. |

#### Response Codes

| Code  | Description                   |
| ----- | ----------------------------- |
| `200` | The request was successful.   |
| `400` | The request was invalid.      |
| `429` | The request was rate limited. |
| `500` | An error occurred.            |