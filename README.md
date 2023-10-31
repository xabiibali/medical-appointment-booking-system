# medical-appointment-booking-system
medical-appointment-booking-system

BASE_URL = `https://medical-appointment-booking-system.onrender.com`

# Doctor API Documentation

# Authentication

The Doctor API provides endpoints for managing doctor information in a medical system. This API allows you to perform operations such as doctor registration, login, updating doctor details, deleting a doctor, and retrieving doctor information.

## Endpoints


**Endpoint:** `POST /api/doctor/signup`

##### Request Body



| Parameter      | Type     | Required | Description           |
| ----------     | ------   | -------- | ------------------------- |
| `name`         | string   | Yes | Name of the Doctor    |
| `email`        | string   | Yes | Email of the Doctor   |
| `password`     | string   | Yes | Password for the Doct |
| `phone`        | int      | Yes | phone of the Doctor   |
|`specialization`| string   | Yes |  specialization       |
| `bio,`         | strung   | Yes | bio of the Doctor     |
| `schedule,`    | strung   | Yes | schedule of the Doctor|
| `hospital,`    | strung   | Yes | hospital of the Doctor|


##### Response

```json
{
  "message": "Doctor created successfully",
  "Doctor": Doctor  data
}
```


### Authentication

#### dogtor Login

Authenticate a doctor and obtain a JWT token.

**Endpoint:** `POST /api/doctor/login`

##### Request Body

| Parameter  | Type   | Required | Description                          |
| ---------- | ------ | -------- | ------------------------------------ |
| `email`    | string | Yes      | Email of the doctor                  |
| `password` | string | Yes      | Password for the doctor's account    |

##### Response

```json
{
  "message": "doctor logged in successfully",
  "token": "<jwt_token>"
}
```



### Update Doctor Information

**Endpoint:** `PUT /api/doctor/:id`

**Authentication:** Requires a valid JWT token.

##### Request Body

| Parameter  | Type   | Required | Description                               |
| ---------- | ------ | -------- | ----------------------------------------- |
| `name`         | string   | Yes | Name of the Doctor    |
| `email`        | string   | Yes | Email of the Doctor   |
| `password`     | string   | Yes | Password for the Doct |
| `phone`        | int      | Yes | phone of the Doctor   |
|`specialization`| string   | Yes |  specialization       |
| `bio,`         | strung   | Yes | bio of the Doctor     |
| `schedule,`    | strung   | Yes | schedule of the Doctor|
| `hospital,`    | strung   | Yes | hospital of the Doctor|

##### Response

```json
{
  "message": "doctor information updated successfully",
  "doctor": Updated doctor data
}
```


### Doctor 

**Endpoint:** `DELETE /api/doctor/:id`

Delete a Doctor's account.

**Authentication:** authentication required.

##### Response

- `200 OK`: Doctor deleted successfully
- `404 Not Found`: Doctor was not found

### Retrieve Doctor Information

**Endpoint:** `GET /api/ doctorr/:id`

Retrieve information about a specific  Doctor.

**Authentication:** No authentication required.

##### Response


```json
{
  "message": " Doctor information retrieved successfully",
  " Doctor":  Doctor data
}
```


### List  Doctors

**Endpoint:** `GET /api/doctor`

Retrieve a list of all Doctors.

**Authentication:** No authentication required.

##### Response

```json
{
  "message": "Doctors list retrieved successfully",
  "Doctors": [List of Doctors data]
}
```







