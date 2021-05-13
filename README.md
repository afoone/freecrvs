# FreeCRVS

Civil Registration and Vital Statistics for The Gambia

# development environment

1. run `docker-compose up -d mongo`

2. In mongo, you'll need an admin user. create database `gambia` and collection `users`

insert: 
```json
{
    "password" : "cac76f43eb9243de03d52a0d12702d268fb101f50446af58a8c18985824c9587",
    "firstName" : "Lamin ",
    "lastName" : "Admin ",
    "email" : "test@test.com",
    "role" : "ADMIN",
    "username" : "admin "
}
```

3. run `yarn dev`
4. login with admin/test