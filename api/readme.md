# Endpoints
- `/api/categories/`
- `/api/items/`
- `/api/sources/`
- `/api/users/`
- `/api/auth/`

All data endpoints support methods `GET`, `POST`, `PUT`, `DELETE`.
Endpoints are protected with JWT. To get token use `/auth`.

# Headers
All queries should have `Accept: application/json` header.
All data queries must include bearer token.

# Auth
| Method | Path | Payload | Desc |
| --- | --- | --- | --- |
| GET | `/login` | `{'email', 'password'}` | Login and get bearer token |
| GET | `/register` | `{'name', 'email', 'password'}` | Create user |
| POST | `/logout` | - | Terminate session |
| PUT | `/refresh` | - | Get new token |
| DELETE | `/user-profile` | - | Get user data |

# Categories, Items, Sources, Users
| Method | Path | Payload | Desc |
| --- | --- | --- | --- |
| GET | `/` | - | Get all |
| GET | `/{id}` | - | Get by id |
| POST | `/` | Object as json | Create |
| PUT | `/{id}` | Object as json | Update by id |
| DELETE | `/{id}` | - | Delete by id |
