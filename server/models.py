from config import db, bcrypt
#, MetaData

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    # Columns
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)
    date_of_birth = db.Column(db.Date)
    profile_image = db.Column(db.String)

    # Genres? Actors? Directors?
    movie_preferences = db.Column(db.String)

    # family_account = db.Column(db.Boolean)

    country = db.Column(db.String)
    state = db.Column(db.String)
    city = db.Column(db.String)
    address_line_1 = db.Column(db.String)
    address_line_2 = db.Column(db.String)
    postal_code = db.Column(db.String)


    # Foreign Keys

    # Relationships
    favorites = db.relationship('Favorite', back_populates='user', cascade="all, delete")

    # Serialization Rules
    serialize_rules = ('-favorites.user', '-_password_hash',)


    # Properties
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    director = db.Column(db.String)
    writer = db.Column(db.String)
    year_of_release = db.Column(db.String)
    motion_picture_rating = db.Column(db.String)
    run_time = db.Column(db.String)
    thumbnail = db.Column(db.String)

    # either a summary or a description
    summary = db.Column(db.String)

    # Not hosting our own video files so not sure if we'd need a video element / file
    trailer = db.Column(db.String)
    
    # Number 0-10
    rating = db.Column(db.Integer)

    # Write a property that check and see whether the other rows and take into account the rating, release date, etc
    # Strings ? Most popular? 
    # Numbers 1 least popular, array -1 if array starts at [1,2,3,...,100] in the array index -1=100
    popularity = db.Column(db.Integer)

    # of clicks to help gauge interest / popularity
    num_of_clicks = db.Column(db.Integer, default=0)

    # Major stars of the film
    stars = db.Column(db.String)
    # Lighting ,etc credits
    all_cast_and_crew = db.Column(db.String)

    # Self explanatory, genres,
    genres = db.Column(db.String)


    # Foreign Keys

    # Relationships
    favorites = db.relationship('Favorite', back_populates='movie', cascade="all, delete")

    # Serialization Rules
    serialize_rules = ('-favorites.movie',)


    # Properties

class TelevisionSeries(db.Model, SerializerMixin):
    __tablename__ = 'tv_series'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    director = db.Column(db.String)
    writer = db.Column(db.String)
    year_of_release = db.Column(db.String)
    thumbnail = db.Column(db.String)
    motion_picture_rating = db.Column(db.String)
    # Not hosting our own video files so not sure if we'd need a video element / file
    trailer = db.Column(db.String)
    
    seasons = db.Column(db.String)
    episode_count = db.Column(db.String)
    average_episode_time = db.Column(db.String)
    is_airing = db.Column(db.String)
    # either a summary or a description
    summary = db.Column(db.String)

    # Number 0-10
    rating = db.Column(db.Integer)

    # Write a property that check and see whether the other rows and take into account the rating, release date, etc
    # Strings ? Most popular? 
    # Numbers 1 least popular, array -1 if array starts at [1,2,3,...,100] in the array index -1=100
    popularity = db.Column(db.Integer)

    # of clicks to help gauge interest / popularity
    num_of_clicks = db.Column(db.Integer, default=0)

    # Major stars of the film
    stars = db.Column(db.String)
    # Lighting ,etc credits
    all_cast_and_crew = db.Column(db.String)

    # Self explanatory, genres,
    genres = db.Column(db.String)


    # Foreign Keys

    # Relationships
    favorites = db.relationship('Favorite', back_populates='tv_series', cascade="all, delete")

    # Serialization Rules
    serialize_rules = ('-favorites.tv_series',)


    # Properties

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key = True)

    # Foreign Keys
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    tv_series_id = db.Column(db.Integer, db.ForeignKey('tv_series.id'))

    # Relationship
    # If there's an issue with the back_populates being favorites we'll get to that bridge when we get there
    movie = db.relationship('Movie', back_populates = 'favorites')
    user = db.relationship('User', back_populates = 'favorites')
    tv_series= db.relationship('TelevisionSeries', back_populates='favorites')

    # Serialization Rules
    serialize_rules=('-movie.favorites', '-user.favorites', '-tv_series.favorites',)









