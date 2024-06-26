from flask_restful import Resource

from models import User, Movie, Favorite, TelevisionSeries, Admin, WatchHistory, TvSeason

from flask import Flask, request, make_response, jsonify, session
from config import db, app, api

from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity, unset_jwt_cookies, create_refresh_token, get_jwt
from datetime import datetime, timezone, timedelta

not_needed_data = '-favorites.user.postal_code',  '-favorites.user.country', '-favorites.user.state', '-favorites.user.address_line_1', '-favorites.user.address_line_2', '-favorites.user.city'

class Login(Resource):
    def post(self):
        data = request.get_json()

        # maybe we should have the option to log in using username?
        email = data['email']
        password = data['password']

        user = User.query.filter(User.email == email).first()
        admin = Admin.query.filter(Admin.email == email).first()

        if user and user.authenticate(password):
            access_token = create_access_token(identity={'id': user.id, 'role': 'user'})
            user_data = user.to_dict(rules=('-_password_hash',))

            response = make_response((jsonify({
                "msg": "User login successful", 
                "user": user_data,
                "role": "user"
            })))

            set_access_cookies(response, access_token)

            return response
        
        elif admin and admin.authenticate(password):
            access_token = create_access_token(identity={'id': admin.id, 'role': 'admin'})
            admin_data = admin.to_dict(rules=('-password_hash',))

            response = make_response((jsonify({
                'msg': 'Admin login successful',
                'admin': admin_data,
                'role': 'admin'
            })))

            set_access_cookies(response, access_token)

            return response
        
        return make_response({"error": "Invalid login credentials provided"}, 401)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session.clear()
        response = make_response({"message": "Logout successful"}, 200)
        unset_jwt_cookies(response)

        return response

api.add_resource(Logout, '/logout')

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))

        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)

        return response

    except(RuntimeError, KeyError):

        return response

class CheckSession(Resource):
    @jwt_required()
    def get(self):
        identity = get_jwt_identity()

        identity_id = identity['id']
        identity_role = identity['role']

        if identity_role == 'user':
            user = User.query.get(identity_id)

            if user:
                return make_response({
                    'role': identity_role,
                    'details': user.to_dict(rules=('-password_hash',))
                }, 200)
            else:
                return make_response({'message': 'User not found'}, 404)
            
        elif identity_role == 'admin':
            admin = Admin.query.get(identity_id)

            if admin:
                return make_response({
                    'role': identity_role,
                    'details': admin.to_dict(rules=('-password_hash',))
                }, 200)
            else:
                return make_response({'message': 'Admin not found'}, 404)
        
            
        return make_response({'message': 'Invalid session or role'}, 401)

api.add_resource(CheckSession, '/check_session')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]

        if users:
            response = make_response(jsonify(users), 200)
        else:
            response = make_response({"error" : "Users not found"}, 404)
        
        return response

        # return make_response(users, 200)

    @jwt_required()
    def post(self):
        identity = get_jwt_identity()

        identity_role = identity['role']

        if identity_role != 'admin':
            response = make_response({
                "message": "Permission denied"
            }, 403)

            return response

        data = request.get_json()

        try:
            new_user = User (
                first_name = data['first_name'],
                last_name = data['last_name'],
                email = data['email'],
                phone = data['phone'],
                _password_hash = data['password'],
                date_of_birth = data['date_of_birth'],
                profile_image = data['profile_image'],
                movie_preferences = "",
                country = data['country'],
                state = data['state'],
                city = data['city'],
                address_line_1 = data['address_line_1'],
                address_line_2 = data['address_line_2'],
                postal_code = data['postal_code'],
            )

            db.session.add(new_user)

            new_user.password_hash = new_user._password_hash

            db.session.commit()

            response = make_response(new_user.to_dict(), 201)
            return response

        except ValueError:
            return make_response({"error" : "Validation error, please try again"}, 400)
                
api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()

        if user:
            response = make_response(user.to_dict(), 200)
        else:
            response = make_response({
                "error": "User not found"
            }, 404)

        return response
    
    @jwt_required()
    def delete(self, id):
        identity = get_jwt_identity()

        identity_role = identity['role']

        if identity_role != 'admin':
            response = make_response({
                "message": "Permission denied"
            }, 403)

            return response

        user = User.query.filter(User.id == id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            response = make_response({
                "message": f"User with id of: {id} was successfully deleted"
            }, 204)
        else:
            response = make_response({
                "error": f"User with id of: {id} was not found"
            }, 404)
        
        return response
    
    @jwt_required()
    def patch(self, id):
        identity = get_jwt_identity()

        identity_role = identity['role']

        if identity_role != 'admin':
            response = make_response({
                "message": "Permission denied"
            }, 403)

            return response
        
        user = User.query.filter(User.id == id).first()

        if user: 
            try:
                data = request.get_json()

                for key in data:
                    if data.get(key) != '':
                        if key == 'password' and data['password']:
                            user.password_hash = data['password']

                    else:
                        data[key] = user.key
                        setattr(user, key, data[key])
                
                db.session.commit()

                response = make_response({"Success" : user.to_dict()}, 202)
                return response
            
            except ValueError:
                return make_response({"error" : "Validation error, please try again"}, 400)

api.add_resource(UserByID, '/users/<int:id>')

class Movies(Resource):
    def get(self):
        movies = [movie.to_dict(rules=(not_needed_data)) for movie in Movie.query.all()]

        # if users:
        #     response = make_response(jsonify(users), 200)
        # else:
        #     response = make_response({"error" : "Movies not found"}, 404)
        
        # return response

        return make_response(movies, 200)
    
    @jwt_required()
    def post(self):
        identity = get_jwt_identity()

        identity_role = identity['role']

        if identity_role != 'admin':
            response = make_response({
                "message": "Permission denied"
            }, 403)

            return response

        data = request.get_json()

        try:
            new_movie = Movie(
                title = data['title'],
                director = data['director'],
                writer = data['writer'],
                year_of_release = data['year_of_release'],
                motion_picture_rating = data['motion_picture_rating'],
                run_time = data['run_time'],
                thumbnail = data['thumbnail'],
                summary = data['summary'],
                trailer = data['trailer'],
                stars = data['stars'],
                all_cast_and_crew = data['all_cast_and_crew'],
                genres = data['genres'],
            )

            db.session.add(new_movie)

            db.session.commit()

            response = make_response(new_movie.to_dict(), 201)
            return response

        except ValueError:
            return make_response({"error" : "Validation error, please try again"}, 400)
    
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

    @jwt_required()
    def delete(self, id):
        identity = get_jwt_identity()

        identity_role = identity['role']

        if identity_role != 'admin':
            response = make_response({
                "message": "Permission denied"
            }, 403)

            return response

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

    @jwt_required()
    def post(self):
        identity = get_jwt_identity()

        identity_role = identity['role']

        if identity_role != 'admin':
            response = make_response({
                "message": "Permission denied"
            }, 403)

            return response

        data = request.get_json()

        try:
            new_tv_series = TelevisionSeries(
                title = data['title'],
                director = data['director'],
                writer = data['writer'],
                year_of_release = data['year_of_release'],
                motion_picture_rating = data['motion_picture_rating'],
                thumbnail = data['thumbnail'],
                seasons = data['seasons'],
                episode_count = data['episode_count'],
                is_airing = data['is_airing'],
                summary = data['summary'],
                trailer = data['trailer'],
                stars = data['stars'],
                all_cast_and_crew = data['all_cast_and_crew'],
                genres = data['genres'],
            )

            db.session.add(new_tv_series)

            db.session.commit()

            response = make_response(new_tv_series.to_dict(), 201)
            return response

        except ValueError:
            return make_response({"error" : "Validation error, please try again"}, 400)
    
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

    @jwt_required()
    def delete(self, id):
        identity = get_jwt_identity()

        identity_role = identity['role']

        if identity_role != 'admin':
            response = make_response({
                "message": "Permission denied"
            }, 403)

            return response
        
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

class OneTvShowContinueWatching(Resource):
    def get(self, user_id, show_title, episode_title, episode_number):
        
        watch_history_entry = WatchHistory.query.filter_by(episode_name = episode_title, episode_number = episode_number, series_name = show_title, user_id = user_id).first()

        if watch_history_entry:
            response = make_response(watch_history_entry.to_dict(), 200)

        else:
            response = make_response({
                'error': 'TV Series not found'
            }, 404)
        
        return response
    
api.add_resource(OneTvShowContinueWatching, '/user/<int:user_id>/watch/list/show/<string:show_title>/<string:episode_title>/<string:episode_number>')

class OneMovieContinueWatching(Resource):
    def get(self, user_id, movie_title):

        watch_history_entry = WatchHistory.query.filter_by(movie_title = movie_title, user_id = user_id).first()

        # print(watch_history_entry.movie_title)

        if watch_history_entry:
            response = make_response(watch_history_entry.to_dict(), 200)

        else:
            response = make_response({
                'error': 'Movie not found'
            }, 404)
        
        return response
    
api.add_resource(OneMovieContinueWatching, '/user/<int:user_id>/watch/list/movie/<string:movie_title>')


# Handles creating a new entry into a users watch history, allowing hopefully to be taken back to that timestamp
class TvOrMoviePostToWatchHistory(Resource):
    def post(self, user_id):
        
        data = request.get_json()
        user = User.query.filter(User.id == user_id).first()

        if not user:
        # Immediately return an error response if the user is not found
            return make_response({'error': 'User not found'}, 404)

        print(user.first_name)

        episode_name = data.get('episodeTitle', None)
        movie_title = data.get('movie_title', None)

        # Initialize new_watch_history_item to None
        new_watch_history_item = None

        if episode_name: 
            new_watch_history_item = WatchHistory(
            episode_number = data['episodeNumber'],
            episode_name = data['episodeTitle'],
            season_number = data['seasonNumber'],
            series_name = data['showTitle'],
            video_duration = data['videoDuration'],
            time_stamp = data['timeStamp'],
            user_id = user.id
            )
        
        if movie_title:
            new_watch_history_item = WatchHistory(
            movie_title = data['movie_title'],
            video_duration = data['videoDuration'],
            time_stamp = data['timeStamp'],
            user_id = user.id
        )

        if new_watch_history_item:
            db.session.add(new_watch_history_item)
            db.session.commit()
            response = make_response(new_watch_history_item.to_dict(), 200)

        else:
            response = make_response({
                'error': 'TV Series or Movie not found'
            }, 404)
        
        return response
    
api.add_resource(TvOrMoviePostToWatchHistory, '/user/<int:user_id>/watch/list/')

class TvPatchWatchHistory(Resource):
    def patch(self, tv_watch_history_id):
        watch_history_entry = WatchHistory.query.filter(WatchHistory.id == tv_watch_history_id).first()
        if watch_history_entry:
            try:
                data = request.get_json()
                print("THE DATA:", data)
                for key in data:
                    if key == 'timeStamp' and data['timeStamp']:
                        print("THE PREVIOUS TIME STAMP:", watch_history_entry.time_stamp )
                        print("THE NEW TIME STAMP:", data['timeStamp'])
                        watch_history_entry.time_stamp = data['timeStamp']
                    else:
                        setattr(watch_history_entry, key, data[key])
                db.session.commit()

                response = make_response(watch_history_entry.to_dict(), 202)
                return response
            except ValueError as ve:
                # Log the error message and the data causing the error
                print(f"ValueError occurred: {ve}")
                print(f"Data received: {data}")
                return make_response({"error": ["Validation errors, check your input and try again", str(ve)]}, 400)

        else:
            response = make_response({
            "error": "Watch History Entry not found"
            }, 404)
            return response

api.add_resource(TvPatchWatchHistory, '/watch/list/entry/<int:tv_watch_history_id>')



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