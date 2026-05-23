Look at the approach and do it

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestedId
- POST /reuest/review/rejected/:requestedId

userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed

Status - ignored , accepted , rejected , interested

