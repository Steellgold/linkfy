## API Reference (User)
#### Get user

```http
  GET /api/auth/user/
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch       |
| `data`    | `string` | **Optional**. Data you want to get back |
| `api_key` | `string` | **Required**. Prod API key              |

#### Data (Optional)

In the request body, you can specify the data you want to get back. If you don't specify any data, you will get back the whole user object.


__Example__:
```
https://domain.com/api/auth/user/?id=1234567890&data=firstName,lastName
```

| Parameter  | Type     | Description                                        | Return type    |
| :--------  | :------- | :------------------------------------------------- | :------------- |
| `id`       | `string` | Id of item to fetch                                | `null`         |
| `username` | `string` | Username of user                                   | `string`       |
| `email`    | `string` | Email of user                                      | `string`       |
| `firstName`| `string`| First name of user                                  | `string`       |
| `lastName` | `string`| Last name of user                                   | `string`       |
| `createdAt`| `string`| Date of creation (Defined in DB)                    | `string`       |
| `isPro`    | `boolean`| If user is pro or not                              | `boolean`      |