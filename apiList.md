# DevTinder API's

## authRouter
- POST /signup
- POST /login
- POST /logout
  

## profileRouter
- GET /profile/view
- PATCH /profile/password
- PATCH /profile/edit

## connectionRequestRouter
- POST /request/send/:status/: userId
- POST /request/reveiw/:status/:requestId

Staus: interested, ignored, accepted, rejected

## userRouter
- GET user/connections
- GET user/requests/received
- GET user/feed - Gets you the profiles of other users on platform

