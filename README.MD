This is the new version of the backend from The Waystone Inn, my personal project that i've been working to pratice. I'ts rewritten in  Typescript, has a better implementatin of SOLID principles and a few more minor changes.

In a little overview, the main database implementation is with mongodb, using mongoose as ORM, and the server is powered by the classic Express. It also works with RabbitMQ as message broker.

# How to use it

After clone the repository 

`git clone https://github.com/FueledByRage/waystone-inn-backend-typescript.git`

Run the yarn command to install the depedencies on package.json file

`yarn`

Use the Docker-compose command to run the database and MessageBroker service, both of them on the docker-compose.yml file.


`docker-compose up`

Use the .env.sample file as a guide to create a .env file with the local variables.



## User:

ENDPOINT | METHOD | PARAMS | EXPECTED SUCCESS | EXPECTED ERROR
---------|--------|--------|------------------|---------------|
/user/login | POST | Email, password | CODE 200 - ok Return user's token and username | {Message with error description} 
/user/register| POST | email, name, user and password | CODE 201 - ok Register a new user and return it | {Message with error description} 
/user/update | PUT | file | CODE 200 - ok Edit a profile photo of an user | {Message with error description} 
/user/:username | GET | user | CODE 200 - ok User's data | {Message with error description} 

## Community: 

ENDPOINT | METHOD | PARAMS | EXPECTED SUCCESS | EXPECTED ERROR
---------|--------|--------|------------------|---------------|
/community/register | POST | token, name and description | CODE 201 - ok Register a new community and return it | {Message with error description} 
/community/read/:id/ | GET | id | CODE 200 - ok Get data of a community | {Message with error description} 
/communities | GET | Authorization Header | CODE 200 - ok Return the communities from an user | {Message with error description}
/communities/:name | GET | community name | CODE 200 - ok Get communities using the name as param | {Message with error description} 

## Post:

ENDPOINT | METHOD | PARAMS | EXPECTED SUCCESS | EXPECTED ERROR
---------|--------|--------|------------------|---------------|
/post/register | POST | token, title, body or file and Authorization token | CODE 201 - ok Register a post and return it | { Message with error description}
/post/:id | GET | id | CODE 200 - ok Get a post using the post id as param | { Message with error description}
/post/:id/:page/:registers | GET | id, page, number of register to return | CODE 200 - ok Return a number of posts based on community id and a page number as param | { Message with error description}
/posts/feed/:page/:registers | GET | subs, page and Authorization token | CODE 200 - ok it's receive the currenty page of a index and a mod that gonna be added to the page number and return a number of post from a list get using the subs as param | { Message with error description}
/post/:id | DELETE | id, Authorization token | CODE 204 - ok Delete a post by it's id | { Message with error description}

## Comment:

ENDPOINT | METHOD | PARAMS | EXPECTED SUCCESS | EXPECTED ERROR
---------|--------|--------|------------------|---------------|
/comment/register | POST | token, postId, comment | CODE 201 - ok Register a new comment and return it | { Message with error description}
/comments/:id| GET | id | CODE 200 - ok Return comments from a post based on it's id  | { Message with error description}
/comment/deleteComment/:id | DELETE | id, token | CODE 204 - ok Delete a comment taking it's id as param | { Message with error description}

## Sub

ENDPOINT | METHOD | PARAMS | EXPECTED SUCCESS | EXPECTED ERROR
---------|--------|--------|------------------|---------------|
/sub/:communityId | GET | communityId and authorization header | CODE 201 - Created | { message with error description }
/sub/delete/:communityId | DELETE | communityId and authorization header | CODE 200 | { message with error description }

## Likes

ENDPOINT | METHOD | PARAMS | EXPECTED SUCCESS | EXPECTED ERROR
---------|--------|--------|------------------|---------------|
/like/create/:postId | GET | postId and authorization header | CODE 201 - Created | { message with error description }
/like/:postId | DELETE | postId | Cose 204 - Success | { message with error description }