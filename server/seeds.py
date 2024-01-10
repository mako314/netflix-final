from config import app, db

from models import User, Movie, Favorite, TelevisionSeries
from datetime import datetime

if __name__ == '__main__':
    with app.app_context():
        
        print("Clearing db...")
        User.query.delete()
        Movie.query.delete()
        Favorite.query.delete()
        TelevisionSeries.query.delete()

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
            thumbnail="https://variety.com/wp-content/uploads/2014/04/01-avengers-2012.jpg?w=1000&h=563&crop=1",
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
            thumbnail="https://writinguntilragnarokhome.files.wordpress.com/2020/10/avengers-age-of-ultron-review.jpg?w=640",
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

#-------------------------------TV Series Seeding-------------------------------
        
        print("Generating TV Series list....")

        tv_series_list = [
            TelevisionSeries(
                title="Stranger Things",
                director="Matt Duffer, Ross Duffer",
                writer="Matt Duffer, Ross Duffer",
                year_of_release="2016",
                thumbnail="https://upload.wikimedia.org/wikipedia/commons/3/38/Stranger_Things_logo.png",
                motion_picture_rating="TV-14",
                trailer="[Link to Stranger Things trailer]",
                seasons="4",
                episode_count="34",
                is_airing="True",
                summary="When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
                rating=8.7,
                popularity=77,
                num_of_clicks=0,
                stars="Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour",
                all_cast_and_crew="[Complete list of cast and crew]",
                genres="Drama, Fantasy, Horror, Mystery, Sci-Fi, Thriller",
            ),
            TelevisionSeries(
                title="House",
                director="David Shore",
                writer="David Shore",
                year_of_release="2004",
                thumbnail="https://wallpapers.com/images/hd/house-md-lollipop-evzr2ufxppqcnc6t.jpg",
                motion_picture_rating="TV-14",
                trailer="[Link to House trailer]",
                seasons="8",
                episode_count="177",
                is_airing="False",
                summary="Using a crack team of doctors and his wits, an antisocial maverick doctor specializing in diagnostic medicine does whatever it takes to solve puzzling cases that come his way.",
                rating=8.7,
                popularity=84,
                num_of_clicks=0,
                stars="Hugh Laurie, Omar Epps, Robert Sean Leonard, Jesse Spencer, Lisa Edelstein",
                all_cast_and_crew="[Complete list of cast and crew]",
                genres="Drama, Mystery",
            ),
        ]
        db.session.add_all(tv_series_list)
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