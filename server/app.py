from flask_restful import Resource

from models import User, Movie, Favorite, TelevisionSeries

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

    def delete(self, id):
        movie = Movie.query.filter(Movie.id == id).first()

        if movie: 
            db.session.delete(movie)
            db.session.commit()

            response = make_response({
                "message": f"Movie with id of: {id} was successfully deleted"
            }, 204)
        else:
            response = make_response({
                "error": f"Movie with id of: {id} was not found"
            }, 404)
        
        return response
    
api.add_resource(MovieById, '/movies/<int:id>')


class MovieByActor(Resource):
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
    
api.add_resource(MovieByActor, '/movies/<string:actor>/actors')

class MovieByDirector(Resource):
    def get(self, director):
        array_of_movies = []
        all_movies = Movie.query.all()

        for movie in all_movies:
            if director.lower() in movie.director.lower():
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
    
api.add_resource(MovieByDirector, '/movies/<string:director>/directors')

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

api.add_resource(MoviesByMotionPictureRating, '/movies/<string:movie_rating>/movie-rating')

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

api.add_resource(MoviesByGenre, '/movies/<string:movie_genre>/genres')

class MoviesByUserRating(Resource):
    def get(self):
        movie_list = [movie.to_dict(rules=(not_needed_data)) for movie in Movie.query.all()]

        movie_list_by_user_rating = sorted(movie_list, key=lambda movie: movie['rating'], reverse=True)

        if not movie_list_by_user_rating:
            response = make_response({
                'error': 'Movies not found'
            }, 404)
            
            return response
        
        response = make_response(movie_list_by_user_rating, 200)

        return response
    
api.add_resource(MoviesByUserRating, '/movies/user-rating')

class MoviesByPopularity(Resource):
    def get(self):
        movie_list = [movie.to_dict(rules=(not_needed_data)) for movie in Movie.query.all()]

        if not movie_list:
            response = make_response({
                'error': 'Movies not found'
            }, 404)
            
            return response

        movie_list_by_popularity = sorted(movie_list, key=lambda movie: movie['popularity'], reverse=True)
        
        response = make_response(movie_list_by_popularity, 200)

        return response
    
api.add_resource(MoviesByPopularity, '/movies/popular') 

class TVSeries(Resource):
    def get(self):
        tv_series_list = [tv_series.to_dict(rules=(not_needed_data)) for tv_series in TelevisionSeries.query.all()]

        if tv_series_list:
            response = make_response(tv_series_list, 200)
        else:
            response = make_response({
                'error': 'TV Series data not found'
            }, 404)

        return response
    
api.add_resource(TVSeries, '/tv-series')

class TVSeriesById(Resource):
    def get(self, id):
        tv_series = TelevisionSeries.query.filter(TelevisionSeries.id == id).first()

        if tv_series:
            response = make_response(tv_series, 200)
        else:
            response = make_response({
                "error": f"TV Series with an id of {id} not found"
            }, 404)
        
        return response

    def delete(self, id):
        tv_series = TelevisionSeries.query.filter(TelevisionSeries.id == id).first()

        if tv_series:
            db.session.delete(tv_series)
            db.session.commit()

            response = make_response({
                "message": f"TV Series with id of: {id} was successfully deleted"
            }, 204)
        else:
            response = make_response({
                "error": f"TV Series with id of: {id} was not found"
            }, 404)
        
        return response

api.add_resource(TVSeriesById, '/tv-series/<int:id>')

class TVSeriesByActor(Resource):
    def get(self, actor):
        array_of_tv_series = []

        all_tv_series = TelevisionSeries.query.all()

        for tv_series in all_tv_series:
            if actor.lower() in tv_series.stars.lower():
                array_of_tv_series.append(tv_series)

        tv_series_to_send = [tv_series.to_dict(rules=(not_needed_data)) for tv_series in array_of_tv_series]

        if tv_series_to_send:
            response = make_response(tv_series_to_send, 200)
        else:
            response = make_response({
                "error": f"TV Series containing the following actor: {actor} was not found"
            }, 404)
        
        return response
    
api.add_resource(TVSeriesByActor, '/tv-series/<string:actor>/actors')

class TVSeriesByDirector(Resource):
    def get(self, director):
        array_of_tv_series = []
        all_tv_series = TelevisionSeries.query.all()

        for tv_series in all_tv_series:
            if director.lower() in tv_series.director.lower():
                array_of_tv_series.append(tv_series)

        tv_series_to_send = [tv_series.to_dict(rules=(not_needed_data)) for tv_series in array_of_tv_series]

        if tv_series_to_send:
            response = make_response(tv_series_to_send, 200)
        else:
            response = make_response({
                "error": f"TV Series with director: {director} was not found"
            }, 404)
        
        return response
    
api.add_resource(TVSeriesByDirector, '/tv-series/<string:director>/directors')

class TVSeriesByMotionPictureRating(Resource):
    def get(self, tv_series_rating):
        array_of_tv_series = []

        all_tv_series = TelevisionSeries.query.all()

        for tv_series in all_tv_series:
            if tv_series_rating.lower() == tv_series.motion_picture_rating.lower():
                array_of_tv_series.append(tv_series)
        
        tv_series_by_rating = [tv_series.to_dict(rules=(not_needed_data)) for tv_series in array_of_tv_series]

        if not tv_series_by_rating:
            response = make_response({
                "error": f"A TV Series with a rating of {tv_series_rating} was not found"
            }, 404)
            return response
        
        response = make_response(tv_series_by_rating, 200)

        return response

api.add_resource(TVSeriesByMotionPictureRating, '/tv-series/<string:tv_series_rating>/tv-series-rating')

class TVSeriesByGenre(Resource):
    def get(self, tv_series_genre):
        tv_series_list = [tv_series.to_dict(rules=(not_needed_data)) for tv_series in TelevisionSeries.query.all()]

        tv_series_by_genre = []

        for tv_series in tv_series_list:
            if tv_series_genre.lower() in tv_series['genres'].lower():
                tv_series_by_genre.append(tv_series)

        if tv_series_by_genre:
            response = make_response(tv_series_by_genre, 200)
        else:
            response = make_response({
                'error': f'TV series by genre of: {tv_series_genre} not found'
            }, 404)
        
        return response

api.add_resource(TVSeriesByGenre, '/tv-series/<string:tv_series_genre>/genres')

class TVSeriesByUserRating(Resource):
    def get(self):
        tv_series_list = [tv_series.to_dict(rules=(not_needed_data)) for tv_series in TelevisionSeries.query.all()]

        tv_series_list_by_user_rating = sorted(tv_series_list, key=lambda tv_series: tv_series['rating'], reverse=True)

        if tv_series_list_by_user_rating:
            response = make_response(tv_series_list_by_user_rating, 200)
        else:
            response = make_response({
                'error': 'TV Series not found'
            }, 404)
             
        return response
          
api.add_resource(TVSeriesByUserRating, '/tv-series/user-rating')

class TVSeriesByPopularity(Resource):
    def get(self):
        tv_series_list = [tv_series.to_dict(rules=(not_needed_data)) for tv_series in TelevisionSeries.query.all()]

        tv_series_list_by_popularity = sorted(tv_series_list, key=lambda tv_series: tv_series['popularity'], reverse=True)

        if tv_series_list_by_popularity:
            response = make_response(tv_series_list_by_popularity, 200)

        else:
            response = make_response({
                'error': 'TV Series not found'
            }, 404)
        
        return response
    
api.add_resource(TVSeriesByPopularity, '/tv-series/popular')

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

class FavoritesByID(Resource):
    def get(self, id):
        favorites = Favorite.query.filter(Favorite.id == id).first().to_dict()

        if favorites:
            return make_response(favorites, 200)
        
        else:
            return make_response({
                "error": f"Favorites record with id of {id} not found"
            }, 404)
    
    def delete(self, id):
        favorites = Favorite.query.filter(Favorite.id == id).first()

        if favorites:
            db.session.delete(favorites)
            db.session.commit()

            return make_response({
                "message": f"Favorites record with id of: {id} was successfully deleted"
            }, 204)
        else:
            return make_response({
                "error": f"Favorites with id of: {id} was not found"
            }, 404)
    
api.add_resource(FavoritesByID, '/favorites/<int:id>')

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

api.add_resource(FavoritesByUserID, "/favorites/<int:id>/users")

if __name__ == '__main__':
    app.run(port=5555, debug=True)