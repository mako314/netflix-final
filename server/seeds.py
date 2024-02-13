from config import app, db

from models import User, Movie, Favorite, TelevisionSeries, Admin
from datetime import datetime

if __name__ == '__main__':
    with app.app_context():
        
        print("Clearing db...")
        Favorite.query.delete()
        User.query.delete()
        Movie.query.delete()
        TelevisionSeries.query.delete()

#-------------------------------User Seeding-------------------------------

        print("Seed Admins...")

        admin_list = [
            Admin(
            first_name = 'Admin',
            last_name = 'Istrator',
            email = 'admin@flickforge.com',
            phone = '',
            _password_hash = 'P@ssword123',
            profile_image = '',
            movie_preferences = '',
            country = '',
            state = '',
            city = '',
            address_line_1 = '',
            address_line_2 = '',
            postal_code = '',
        )]

        db.session.add_all(admin_list)

        for admin in admin_list:
            password = admin._password_hash
            admin.password_hash = password
            print(admin._password_hash)

        db.session.commit()

#-------------------------------User Seeding-------------------------------

        print("Seed Users...")

        user_list = [
            User(
            first_name = 'Jane',
            last_name = 'Doe',
            email = 'makindoe@hotmail.com',
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
            email = 'billybobjones@gmail.com',
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
            trailer="eOrNdBpGMv8?si=eEUEnknX1muA-AyZ",
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
            trailer="tmeOjFno6Do?si=NAXNtHE0wvWcMq70",
            rating=7.5,
            popularity=90,
            num_of_clicks=0,
            stars="Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson, Jeremy Renner, James Spader",
            all_cast_and_crew="[Complete list of cast and crew]",
            genres="Action, Adventure, Sci-Fi",
        ),
        Movie(
            title="Inception",
            director="Christopher Nolan",
            writer="Christopher Nolan",
            year_of_release="2010",
            motion_picture_rating="PG-13",
            run_time="148 minutes",
            thumbnail="https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
            summary="A skilled extractor is offered a chance to regain his old life as payment for a task considered to be impossible: 'Inception', the implantation of another person's idea into a target's subconscious.",
            trailer="YoHD9XEInc0?si=jLTSUXD0SG9-4kgC",
            rating=8.8,
            popularity=93,
            num_of_clicks=0,
            stars="Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy, Ken Watanabe",
            all_cast_and_crew="[Complete list of cast and crew]",
            genres="Action, Adventure, Sci-Fi, Thriller",
        ),

        Movie(
            title="The Grand Budapest Hotel",
            director="Wes Anderson",
            writer="Wes Anderson",
            year_of_release="2014",
            motion_picture_rating="R",
            run_time="100 minutes",
            thumbnail="https://m.media-amazon.com/images/I/91E99hNQO7L._AC_UF894,1000_QL80_.jpg",
            summary="The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
            trailer="1Fg5iWmQjwk?si=Xb5gMrXIqLV4ZQXY",
            rating=8.1,
            popularity=85,
            num_of_clicks=0,
            stars="Ralph Fiennes, F. Murray Abraham, Mathieu Amalric, Adrien Brody, Willem Dafoe",
            all_cast_and_crew="[Complete list of cast and crew]",
            genres="Adventure, Comedy, Crime",
        ),

        Movie(
            title="La La Land",
            director="Damien Chazelle",
            writer="Damien Chazelle",
            year_of_release="2016",
            motion_picture_rating="PG-13",
            run_time="128 minutes",
            thumbnail="https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
            summary="While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
            trailer="0pdqf4P9MB8?si=K34skItky8au7Zkb",
            rating=8.0,
            popularity=88,
            num_of_clicks=0,
            stars="Ryan Gosling, Emma Stone, John Legend, Rosemarie DeWitt",
            all_cast_and_crew="[Complete list of cast and crew]",
            genres="Comedy, Drama, Music, Romance",
        ),

        Movie(
            title="Parasite",
            director="Bong Joon-ho",
            writer="Bong Joon-ho, Jin Won Han",
            year_of_release="2019",
            motion_picture_rating="R",
            run_time="132 minutes",
            thumbnail="https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
            summary="Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            trailer="5xH0HfJHsaY?si=dqoHoN23KAHuz3ef",
            rating=8.6,
            popularity=91,
            num_of_clicks=0,
            stars="Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo, Woo-sik Choi, So-dam Park",
            all_cast_and_crew="[Complete list of cast and crew]",
            genres="Comedy, Drama, Thriller",
        )]

        db.session.add_all(movie_list)
        print(movie_list)
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
                trailer="mnd7sFt5c3A?si=g1RC7FR4VQ39sylA",
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
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
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

        print("What you'd expect to be an ID of 1:", movie_list[0].id)
        print("What you'd expect to be an ID of 1:",  user_list[1].id)


        db.session.add_all(favorite_list)
        db.session.commit()

        print("!!FINISHED SEEDING!!")