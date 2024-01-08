from flask_restful import Resource

from models import User, Movie, Favorite

from flask import Flask, request, make_response, jsonify, session
from config import db, app, api

not_needed_data = '-favorites.user.postal_code',  '-favorites.user.country', '-favorites.user.state', '-favorites.user.address_line_1', '-favorites.user.address_line_2', '-favorites.user.city'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]

        if users:
            response = make_response(jsonify(users), 200)
        else:
            response = make_response({"error" : "Users not found"}, 404)
        
        return response

        # return make_response(users, 200)
    
api.add_resource(Users, '/users')


class Movies(Resource):
    def get(self):
        movies = [movie.to_dict(rules=(not_needed_data)) for movie in Movie.query.all()]

        # if users:
        #     response = make_response(jsonify(users), 200)
        # else:
        #     response = make_response({"error" : "Movies not found"}, 404)
        
        # return response

        return make_response(movies, 200)
    
api.add_resource(Movies, '/movies')

class MovieById(Resource):
    def get(self, id):
        movie = Movie.query.filter(Movie.id == id).first()

        if movie:
            response = make_response(movie.to_dict(), 200)
        else:
            response = make_response({
                "error": "Movie not found"
            }, 404)
        
        return response
    
api.add_resource(MovieById, '/movies/<int:id>')


class MovieByDirector(Resource):
    def get(self, actor):
        array_of_movies = []
        # actor = 'Robert Downey Jr.'
        all_movies = Movie.query.all()
        for movie in all_movies:
            if actor.lower() in movie.stars.lower():
                array_of_movies.append(movie)

        # movies = Movie.query.filter(Movie.director == director).all()

        # movies_to_send = [movie.to_dict(rules=(not_needed_data)) for movie in movies]
        movies_to_send = [movie.to_dict(rules=(not_needed_data)) for movie in array_of_movies]

        if movies_to_send:
            response = make_response(movies_to_send, 200)
        else:
            response = make_response({
                "error": "Movie not found"
            }, 404)
        
        return response
    
api.add_resource(MovieByDirector, '/movies/<string:actor>')

class Favorites(Resource):
    def get(self):
        favorites = [favorite.to_dict() for favorite in Favorite.query.all()]

        # if users:
        #     response = make_response(jsonify(users), 200)
        # else:
        #     response = make_response({"error" : "Movies not found"}, 404)
        
        # return response

        return make_response(favorites, 200)
    
api.add_resource(Favorites, '/favorites')

if __name__ == '__main__':
    app.run(port=5555, debug=True)