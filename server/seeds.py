from config import app, db

from models import User, Movie, Favorite
from datetime import datetime

if __name__ == '__main__':
    with app.app_context():
        
        print("Clearing db...")
        User.query.delete()
        Movie.query.delete()
        Favorite.query.delete()

#-------------------------------User Seeding-------------------------------

        print("Seed Users...")

        user_list = [
            User(
            first_name = 'Jane',
            last_name = 'Doe',
            email = '',
            phone = '',
            _password_hash = '123',
            date_of_birth = datetime(2024 - 32, 1, 15),
            profile_image = '',
            movie_preferences = '',
            country = '',
            state = '',
            city = '',
            address_line_1 = '',
            address_line_2 = '',
            postal_code = '',
        ),
        User(
            first_name = 'Bob',
            last_name = 'Jones',
            email = '',
            phone = '',
            _password_hash = '123',
            date_of_birth = datetime(2024 - 32, 1, 15),
            profile_image = '',
            movie_preferences = '',
            country = '',
            state = '',
            city = '',
            address_line_1 = '',
            address_line_2 = '',
            postal_code = '',
        ),
        ]

        db.session.add_all(user_list)

        for user in user_list:
            password = user._password_hash
            user.password_hash = password
            # print(user._password_hash)

        db.session.commit()

#-------------------------------Movie Seeding-------------------------------
        print("Generating Movie List...")
        movie_list = [
        Movie(
            title="The Avengers",
            director="Joss Whedon",
            writer="Joss Whedon",
            year_of_release="2012",
            motion_picture_rating="PG-13",
            run_time="143 minutes",
            summary="Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
            trailer="[Link to The Avengers trailer]",
            rating=8,  
            popularity=95,  
            num_of_clicks=0,  
            stars="Robert Downey Jr., Chris Evans, Scarlett Johansson, Chris Hemsworth, Mark Ruffalo, Jeremy Renner, Tom Hiddleston",
            all_cast_and_crew="[Complete list of cast and crew]",
            genres="Action, Adventure, Sci-Fi",
        ),
        Movie(
            title="Avengers: Age of Ultron",
            director="Joss Whedon",
            writer="Joss Whedon",
            year_of_release="2015",
            motion_picture_rating="PG-13",
            run_time="141 minutes",
            summary="When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
            trailer="[Link to Avengers: Age of Ultron trailer]",
            rating=7.5,
            popularity=90,
            num_of_clicks=0,
            stars="Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson, Jeremy Renner, James Spader",
            all_cast_and_crew="[Complete list of cast and crew]",
            genres="Action, Adventure, Sci-Fi",
        ),
        ]

        db.session.add_all(movie_list)
        db.session.commit()

#-------------------------------Favorite Seeding-------------------------------

        print("Generating Favorite List...")
        favorite_list = [
            Favorite(
                movie_id = movie_list[0].id,
                user_id= user_list[0].id,
            ),
            Favorite(
                movie_id = movie_list[1].id,
                user_id= user_list[0].id,
            ),
            Favorite(
                movie_id = movie_list[0].id,
                user_id= user_list[1].id,
            ),
        ]

        db.session.add_all(favorite_list)
        db.session.commit()

        print("!!FINISHED SEEDING!!")




