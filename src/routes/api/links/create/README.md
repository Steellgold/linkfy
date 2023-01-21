## API Reference (Links)

#### Create link

```http
  GET /api/links/create
```

#### Body
| Parameter   | Type     | Description                                        | Default    |
| :--------   | :------- | :------------------------------------------------- | :------    |
| `createdAt` | `string` | **Optional**. Date of creation (Defined in DB)     | Timestamp  |
| `userId`    | `string` | **Optional**. ID of user who created the link      | `null`     |
| `visitorId` | `string` | **Optional**. ID of visitor who created the link   | `null`     |
| `baseUrl`   | `string` | **Required**. Base URL of the link                 | `null`     |
| `shortUrl`  | `string` | **Required**. Short URL of the link                | `null`     |
| `clicks`    | `number` | **Required**. Number of clicks on the link         | `0`        |
| `coutries`  | `array`  | **Required**. Array of countries the link was used | `[]`       |
| `browsers`  | `array`  | **Required**. Array of browsers the link was used  | `[]`       |
| `platforms` | `array`  | **Required**. Array of platforms the link was used | `[]`       |
| `status`    | `boolean`| **Required**. Status of the link (active or not)   | `true`     |