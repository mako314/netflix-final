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
        
        # NEED TO CHANGE ALL IMAGES TO BE LIKE THE COVER PHOTO FOR THE MOVIE / SERIES. OR else the styling is dang near impossible because of the aspect ratio
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
                thumbnail="https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==",
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
                thumbnail="https://resizing.flixster.com/AEFisg6G7Gkjsijnn5lOKJE5s_4=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7892176_b_v10_ac.jpg",
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
            TelevisionSeries(
                title="BoJack Horseman",
                director="Raphael Bob-Waksberg",
                writer="Raphael Bob-Waksberg",
                year_of_release="2014",
                thumbnail="https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
                motion_picture_rating="TV-MA",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="6",
                episode_count="77",
                is_airing="False",
                summary="BoJack Horseman was the star of the hit TV show 'Horsin' Around' in the '90s, now he's washed up, living in Hollywood, complaining about everything, and wearing colorful sweaters.",
                rating=8.7,
                popularity=90,
                num_of_clicks=0,
                stars="Will Arnett, Amy Sedaris, Alison Brie, Aaron Paul, Paul F. Tompkins",
                all_cast_and_crew="https://www.imdb.com/title/tt3398228/fullcredits",
                genres="Animation, Comedy, Drama",
            ),
            TelevisionSeries(
                title="The Mandalorian",
                director="Jon Favreau",
                writer="Jon Favreau",
                year_of_release="2019",
                thumbnail="https://lumiere-a.akamaihd.net/v1/images/the-mandalorian-poster-s3-serieslp_aa55f7a4.jpeg?region=0%2C0%2C1024%2C1517",
                motion_picture_rating="TV-14",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="2",
                episode_count="16",
                is_airing="True",
                summary="The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
                rating=8.8,
                popularity=93,
                num_of_clicks=0,
                stars="Pedro Pascal, Gina Carano, Carl Weathers, Giancarlo Esposito, Temuera Morrison",
                all_cast_and_crew="https://www.imdb.com/title/tt8111088/fullcredits",
                genres="Action, Adventure, Fantasy",
            ),
            TelevisionSeries(
                title="Chernobyl",
                director="Johan Renck",
                writer="Craig Mazin",
                year_of_release="2019",
                thumbnail="https://upload.wikimedia.org/wikipedia/en/a/a7/Chernobyl_2019_Miniseries.jpg",
                motion_picture_rating="TV-MA",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="1",
                episode_count="5",
                is_airing="False",
                summary="A dramatization of the true story of one of the worst man-made catastrophes in history, the catastrophic nuclear accident at Chernobyl. A tale of the brave men and women who sacrificed to save Europe from unimaginable disaster.",
                rating=9.4,
                popularity=95,
                num_of_clicks=0,
                stars="Jared Harris, Stellan Skarsgård, Emily Watson, Paul Ritter, Jessie Buckley",
                all_cast_and_crew="https://www.imdb.com/title/tt7366338/fullcredits",
                genres="Drama, History, Thriller",
            ),
            TelevisionSeries(
                title="The Wire",
                director="David Simon",
                writer="David Simon",
                year_of_release="2002",
                thumbnail="https://m.media-amazon.com/images/I/81ucKbnIugS._AC_UF894,1000_QL80_.jpg",
                motion_picture_rating="TV-MA",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="5",
                episode_count="60",
                is_airing="False",
                summary="Exploring the drug trade in Baltimore through the eyes of both law enforcers and drug dealers, this series captures the often grim realities of urban life.",
                rating=9.3,
                popularity=90,
                num_of_clicks=0,
                stars="Dominic West, Idris Elba, Michael K. Williams, Lance Reddick, Sonja Sohn",
                all_cast_and_crew="https://www.imdb.com/title/tt0306414/fullcredits",
                genres="Crime, Drama, Thriller",
            ),

            TelevisionSeries(
                title="Mad Men",
                director="Matthew Weiner",
                writer="Matthew Weiner",
                year_of_release="2007",
                thumbnail="https://m.media-amazon.com/images/M/MV5BNTgxNDZlODQtNDcwOC00NWQ5LTljNWMtMDhjY2U5YTUzMTc4XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg",
                motion_picture_rating="TV-14",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="7",
                episode_count="92",
                is_airing="False",
                summary="Set in the 1960s, this series explores the lives, loves, and work of the staff of a New York advertising agency, at a time when the business had begun to wield significant cultural power.",
                rating=8.6,
                popularity=85,
                num_of_clicks=0,
                stars="Jon Hamm, Elisabeth Moss, Vincent Kartheiser, January Jones, Christina Hendricks",
                all_cast_and_crew="https://www.imdb.com/title/tt0804503/fullcredits",
                genres="Drama",
            ),
            TelevisionSeries(
                title="Black Mirror",
                director="Charlie Brooker",
                writer="Charlie Brooker",
                year_of_release="2011",
                thumbnail="https://hips.hearstapps.com/hmg-prod/images/black-mirror-font-1513096756.jpg",
                motion_picture_rating="TV-MA",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="5",
                episode_count="22",
                is_airing="False",
                summary="An anthology series that taps into our collective unease with the modern world, with each stand-alone episode a sharp, suspenseful tale exploring themes of technology, society, and human psyche.",
                rating=8.8,
                popularity=89,
                num_of_clicks=0,
                stars="Various",
                all_cast_and_crew="https://www.imdb.com/title/tt2085059/fullcredits",
                genres="Drama, Sci-Fi, Thriller",
            ),
            TelevisionSeries(
                title="Fargo",
                director="Noah Hawley",
                writer="Noah Hawley",
                year_of_release="2014",
                thumbnail="https://m.media-amazon.com/images/I/710WL7y9KBL._AC_UF894,1000_QL80_.jpg",
                motion_picture_rating="TV-MA",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="4",
                episode_count="41",
                is_airing="False",
                summary="An anthology series inspired by the 1996 Coen Brothers film, each season of 'Fargo' presents a new story, following a varied cast of characters involved in murder, mystery, and mayhem in Minnesota.",
                rating=8.9,
                popularity=87,
                num_of_clicks=0,
                stars="Billy Bob Thornton, Martin Freeman, Kirsten Dunst, Ewan McGregor, Chris Rock",
                all_cast_and_crew="https://www.imdb.com/title/tt2802850/fullcredits",
                genres="Crime, Drama, Thriller",
            ),
            TelevisionSeries(
                title="Better Call Saul",
                director="Vince Gilligan, Peter Gould",
                writer="Vince Gilligan, Peter Gould",
                year_of_release="2015",
                thumbnail="https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMmRmNS00Mzk2LTlhM2MtNjk4NzBjZGE1MmIyXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
                motion_picture_rating="TV-MA",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="6",
                episode_count="63",
                is_airing="False",
                summary="The series follows Jimmy McGill, who eventually transforms into Saul Goodman, the morally flexible lawyer from 'Breaking Bad.' Set six years before he becomes Walter White's lawyer, Jimmy's evolution into Saul Goodman is the focus.",
                rating=8.7,
                popularity=90,
                num_of_clicks=0,
                stars="Bob Odenkirk, Jonathan Banks, Rhea Seehorn, Patrick Fabian, Michael Mando",
                all_cast_and_crew="https://www.imdb.com/title/tt3032476/fullcredits",
                genres="Crime, Drama",
            ),
            TelevisionSeries(
                title="The Crown",
                director="Peter Morgan",
                writer="Peter Morgan",
                year_of_release="2016",
                thumbnail="https://upload.wikimedia.org/wikipedia/en/b/ba/The_Crown_season_2.jpeg",
                motion_picture_rating="TV-MA",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="5",
                episode_count="50",
                is_airing="True",
                summary="This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
                rating=8.7,
                popularity=88,
                num_of_clicks=0,
                stars="Claire Foy, Olivia Colman, Imelda Staunton, Matt Smith, Tobias Menzies",
                all_cast_and_crew="https://www.imdb.com/title/tt4786824/fullcredits",
                genres="Biography, Drama, History",
            ),
            TelevisionSeries(
                title="Brooklyn Nine-Nine",
                director="Michael Schur, Dan Goor",
                writer="Michael Schur, Dan Goor",
                year_of_release="2013",
                thumbnail="https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_.jpg",
                motion_picture_rating="TV-14",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="8",
                episode_count="153",
                is_airing="False",
                summary="Follows Jake Peralta, an immature but talented NYPD detective in Brooklyn's 99th Precinct, along with his diverse, lovable colleagues as they police the NYPD's most precinct.",
                rating=8.4,
                popularity=90,
                num_of_clicks=0,
                stars="Andy Samberg, Stephanie Beatriz, Terry Crews, Melissa Fumero, Joe Lo Truglio",
                all_cast_and_crew="https://www.imdb.com/title/tt2467372/fullcredits",
                genres="Comedy, Crime",
            ),
            TelevisionSeries(
                title="The Good Place",
                director="Michael Schur",
                writer="Michael Schur",
                year_of_release="2016",
                thumbnail="https://m.media-amazon.com/images/M/MV5BYmMxNjM0NmItNGU1Mi00OGMwLTkzMzctZmE3YjU1ZDE4NmFjXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_FMjpg_UX1000_.jpg",
                motion_picture_rating="TV-PG",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="4",
                episode_count="50",
                is_airing="False",
                summary="A woman finds herself in the afterlife's Good Place, which she realizes she has been mistaken for someone else and tries to hide her morally imperfect behavior.",
                rating=8.2,
                popularity=85,
                num_of_clicks=0,
                stars="Kristen Bell, William Jackson Harper, Jameela Jamil, D'Arcy Carden, Manny Jacinto",
                all_cast_and_crew="https://www.imdb.com/title/tt4955642/fullcredits",
                genres="Comedy, Fantasy",
            ),
            TelevisionSeries(
                title="Parks and Recreation",
                director="Greg Daniels, Michael Schur",
                writer="Greg Daniels, Michael Schur",
                year_of_release="2009",
                thumbnail="https://m.media-amazon.com/images/M/MV5BYWNkOTg0OTMtZTcyNy00MWU1LWJhZDQtYjQzMjU1NjBhYzI2XkEyXkFqcGdeQXVyOTE4NzcwNzI@._V1_.jpg",
                motion_picture_rating="TV-PG",
                trailer="MczMB8nU1sY?si=JwUz9tu2BrehV9zt",
                seasons="7",
                episode_count="125",
                is_airing="False",
                summary="The absurd antics of an Indiana town's public officials as they pursue sundry projects to make their city a better place.",
                rating=8.6,
                popularity=88,
                num_of_clicks=0,
                stars="Amy Poehler, Rashida Jones, Aziz Ansari, Nick Offerman, Aubrey Plaza",
                all_cast_and_crew="https://www.imdb.com/title/tt1266020/fullcredits",
                genres="Comedy",
            )
                    
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