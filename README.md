# CSC 4610 Project: Personal Blog

## Roles:
    Full Stack: 	Mingyang Li

## Languages and Technologies Planned to be Used:
    Javascript * React * Nodejs
    SQLite

## Deploy instruction on **Debian** machine
makesure you have npm installed:
    `sudo apt isntall npm`
    
use git to install the repository:
    `git clone https://github.com/LunarianCubed/4610Project.git`

install dependencies:
    `cd ./4610Project && npminstall`
    `cd ./server && npminstall`
    `sudo npm install -g serve`

remove test database&articles if you want a new one:
    ```
    rm ./server/Blog.db;
    rm ./server/articles/*
    ```
to run the program:
    you need to run the backend and frontend at the same time, so make sure use `screen` or just open 2 terminals
    for the backend
    ```
    cd 4610Project/server
    node server.js
    ```
    
    for the frontend
    ```
    cd 4610Project
    npm run build
    serve -s build
    ```
