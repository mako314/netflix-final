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

class MoviesByMotionPictureRating(Resource):
    def get(self, movie_rating):
        array_of_movies = []

        all_movies = Movie.query.all()

        for movie in all_movies:
            if movie_rating.lower() == movie.motion_picture_rating.lower():
                array_of_movies.append(movie)
        
        movies_by_rating = [movie.to_dict(rules=(not_needed_data)) for movie in array_of_movies]

        if not movies_by_rating:
            response = make_response({
                "error": f"A movie with a rating of {movie_rating} was not found"
            }, 404)
            return response
        
        response = make_response(movies_by_rating, 200)

        return response

api.add_resource(MoviesByMotionPictureRating, '/movies/movie-rating/<string:movie_rating>')

class MoviesByGenre(Resource):
    def get(self, movie_genre):
        movie_list = [movie.to_dict(rules=(not_needed_data)) for movie in Movie.query.all()]

        movies_by_genre = []

        for movie in movie_list:
            if movie_genre.lower() in movie['genres'].lower():
                movies_by_genre.append(movie)

        if not movies_by_genre:
            response = make_response({
                'error': f'Movies by genre {movie_genre} not found'
            }, 404)
        
        response = make_response(movies_by_genre, 200)

        return response

api.add_resource(MoviesByGenre, '/movies/genre/<string:movie_genre>')


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

class FavoritesByUserID(Resource):
    def get(self, id):
        favorites = [favorite.to_dict() for favorite in Favorite.query.all()]

        favorites_by_user_id = []

        for favorite in favorites:
            if favorite['user_id'] == id:
                favorites_by_user_id.append(favorite)
        
        if not favorites_by_user_id:
            response = make_response({
                "error": f"Favorites for user id: {id} not found"
            }, 404)
            return response
        
        response = make_response(favorites_by_user_id, 200)

        return response

api.add_resource(FavoritesByUserID, "/favorites/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)