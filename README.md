foodtruck-uber
==============

[Resume] (https://docs.google.com/document/d/1mgOHd8RIuHKqSnpkCREL-XPtP1KfS3O6-vxkRSB2vgg/edit?usp=sharing)

# FoodTruck map challenge

Web application built for [Uber] (https://www.uber.com) coding challenge.

## Live Demo

Built on Google App Engine, viewable [here] (foodtruck-uber.appspot.com).

Technical track: Full Stack

# Development

## Frontend
    -HTML:Intermediate
    -CSS:Beginner
    -JavaScript:Beginner
    -jQuery:No experience
    -Google Maps JavaScript API v3:No experience

## Backend
    -webapp2:Beginner
    -jinja2:No experience
    -Python:Well-versed
    -Google App Engine:Intermediate
    -NDB Datastore:No experience (See notes in improvements)

##Reasoning
    *Chose Full Stack as am interested in making both front and back ends to play nice with each other
    *Heroku might have been a better (still free) choice, however I was most familiar with App Engine.
        *In the interest of time decided to stick with it
        *Averse affect on the project later (see improvements section).
    *Front end HTML/CSS/JavaScript Industry standards- jQuery to deal with JSON objects.
    *Google Maps JavaScript API allows for easy deployment of maps, markers, and information windows, default icon set and map looks nice.
    *webapp2 and jinja2 allow for easy templating and generation of HTML.
    *Familiarity with Python, Uber uses a lot of Python

##Next Steps
    *Custom Icons, better looking info boxes, UI more branded consistent with Uber's styling.
    *Split JavaScript function into multiple for easier access/modification/readability
    *Sidebar with search to filter by food types, distance, etc.
    *Perhaps filter by foodtrucks seen in the map viewport
        *Tradeoff of having to constantly call to the datastore/database each time the map view changes. 
        *Depending on implementation, could be more expensive.

##Improvements
Initially I had intended to strip and store the relevant information (Approved only, has location, etc) for each food truck as a NDB entity in the provided NDB datastore linked directly to App Engine. However, during the course of developing, I quickly blazed through the free quota provided for any standard App Engine project. This could be addressed by moving the project over the Heroku and using something akin to mongoDB. I decided not to however, as I was already desining and planning the project on App Engine. Another solution would be to purchase a higher quota. My design idea behind the NDB datastore was to provide a stripped down, relevant informationly only entity per food truck, and on command, to scan the API and update each entity or add/remove entities as their licenses were approved/expired.

