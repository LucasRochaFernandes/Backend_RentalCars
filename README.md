
# API requirements
## Cars

**Functional requirements**

It must be possible to register a new car;

It must be possible to lust all the categories.

**Business rules**

It should not be possible to register a car with an existing license plate;

It should not be possible to change the license plate of a car already registered;

The Car must be registered by default with availability;

The user responsible for the registration must be an administrator user.

## Car listing

**Functional requirements**

It should be possible to list all available cars;

It should be possible to list all available cars by category name

It should be possible to list all available cars by mark name

It should be possible to list all available cars by car name

**Business rules**

The user doesn't need to be logged into the system

## Car specification 

**Functional requirements**

It must be possible to register a specification for a car

It must be possible to list all specifications

It must be possible to list all cars

**Business rules**

It should not be possible to register a specification for an unregistered car

It should not be possible to register an existing specification for the same car

The user responsible for the registration must be an administrator user

## Car image 

**Functional requirements**

It should be possible to register the car image;

It must be possible to list all cars

**Non-functional requirements**

Use _multer_ to upload files

**Business rules**

The user must be able to register more than one image for the same car

The user responsible for the registration must be an administrator user

## Car rental

**Functional requirements**

It must be possible to register the rental of a car;

**Business rules**

The rental must have a minimum duration of 24 hours;

It should not be possible to register a new rental if there is already one open for the same car or the same user 



