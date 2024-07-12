# SousAI: A Full-stack Recipes App

## Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Screenshots](#Screenshots)
- [Built With](#Built-With)
- [Contributing](#Contributing)
- [Acknowledgments](#Acknowledgments)

## Description
SousAI is a web application that features a cutting-edge recipe-generating AI assistant and a personalized recipe box. With SousAI, users can:

- **Create Recipes:** Use Sous, the AI-powered recipe assistant, to generate unique and tailored recipes.
- **Save and Personalize:** Save your favorite recipes to your personal recipe box, where you can add notes and photos for future reference.
- **Customization:** Input your cooking devices, ingredients, and dietary preferences to receive recipes specifically tailored to your needs.

SousAI is hosted at [https://www.sousai.io/](https://www.sousai.io/) using AWS and Heroku. The app is built with React, Redux, Node.js, PostgreSQL, and OpenAI's API.

## Installation
1. Create a database named ```sous_ai```
2. Fork and clone this repository
3. The queries in the database.sql file are set up to create all necessary tables and populate the needed data to allow the app to run correctly. The project is built on PostgreSQL, so you will need to have PostgreSQL installed for the app to work. We recommend using Postico to run those queries as that was used to create the queries.
4. Open up your editor of choice and run an ```npm install```
5. Run ```npm run server``` in your terminal
6. Run ```npm run client``` in your terminal
7. The ```npm run client``` command will open up a new browser tab for you

## Usage
After starting the application:
1. Register a new account for the app
2. Navigate into the SousAI view once signed-in to the app
3. Request a recipe of your choice using the input field at the bottom of the SousAI page
4. Save a recipe that appeals to you using the button at the bottom of the recipe
5. Navigate into the 'Saved recipes' page to view your saved recipes

## Screenshots
<!-- <img width="1440" alt="home" src="https://github.com/n-greensweig/sous-ai/assets/129970968/0c1ca0a6-7d44-467b-8add-a722c22bc0e1">
<img width="1000" alt="user-page-1" src="https://github.com/n-greensweig/sous-ai/assets/129970968/6a977cef-412d-4768-92f9-dbb879711dc4">
<img width="1000" alt="user-page-2" src="https://github.com/n-greensweig/sous-ai/assets/129970968/bf3c60dc-d901-42e0-ba85-424a3b4393ce">
<img width="1000" alt="saved-recipes" src="https://github.com/n-greensweig/sous-ai/assets/129970968/fb009d17-48ae-44e1-a9ee-e5c9ef24fdf6">
<img width="1000" alt="recipe-item-1" src="https://github.com/n-greensweig/sous-ai/assets/129970968/9e54f6dd-e52a-42b8-a101-74c0b5820403">
<img width="1000" alt="recipe-item-2" src="https://github.com/n-greensweig/sous-ai/assets/129970968/e25ed9a8-b309-4d1e-b249-991a4e409770"> -->
<img width="1440" alt="SousAI" src="public/images/readme-screenshots/sous_ai.png">
<img width="1440" alt="Recipe box" src="public/images/readme-screenshots/recipe_items.png">
<img width="1440" alt="Recipe details" src="public/images/readme-screenshots/recipe_details.png">
<img width="1440" alt="User dietary preferences and household items" src="public/images/readme-screenshots/preferences.png.png">

## Built With
1. React.js - Frontend framework.
2. Redux - State management.
3. Node.js - Backend server.
4. Express - Server framework.
5. PostgreSQL - Database management.
6. OpenAI's API - AI recipe generation.

## Contributing
Contributions are welcome. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.

## Acknowledgments
Thank you to Chris Black and Chris Cantoni for your contributions to the success of this project. I am also grateful to OpenAI for making their API available to build with.

