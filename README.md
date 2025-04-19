# Tech Research Blog – Project Exam 1

This project is a front-end web application developed for the Project Exam 1 at Noroff. It serves as a technology research blog where users can explore recent blog posts, and logged-in owners can manage their content.

## Overview

The application allows users to:

- View a rotating carousel highlighting featured posts
- Browse a grid of the latest 12 posts fetched from the Noroff API
- Read full blog posts dynamically using URL query parameters
- Register and log in as an owner
- Edit and delete posts (for authenticated users)
- Copy or share post links directly

## Features

- Responsive layout across devices
- Dynamic carousel with animated transitions
- Real-time blog feed from the Noroff API
- Single post view based on post ID
- Token-based login and secure API interactions
- Functional copy link and native share buttons
- Modular and clean folder structure

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Noroff Blog API (Version 2)
- Fetch API
- LocalStorage

## API Endpoints

- POST /auth/register
- POST /auth/login
- GET /blog/posts/:username
- GET /blog/posts/:username/:id
- PUT /blog/posts/:username/:id
- DELETE /blog/posts/:username/:id

## Developer Info

Name: Sirak Getachew  
GitHub Username: si-rak  
Email: sirakfinal@stud.noroff.no  
Class: OCT23FT  
Exam: Project Exam 1 (PE-1)

## Project Links

GitHub Repository:

Live Site (Netlify):
