# IMDB clone
This is a simple IMDB clone built with HTML, CSS and javaScript.

# WEB STRUCTURE : HTML 
    - Head section -
        - In the <head> section, we have some meta tags and the page title.
        - Here, we include the Font Awesome icons using a Content Delivery Network (CDN). This allows us to use the icons in our application.
        - Next, we link a custom CSS file called 'style.css'. This file contains the styles for our web page.

    - Body Section -
        - The <div> element with the class 'wrapper'       contains the entire content of our web page.
        - Inside the wrapper, we have the logo section. It consists of the IMDB Clone text and a heart icon.
        - "Next, we have the search container. It contains an input field where users can search for movies.
        - Underneath the search input, we have a search list. This is where the search results will be displayed.
        - Moving on, we have the result container. It will display detailed information about a selected movie.
        - Lastly, we have the favorite list container. It will show a list of the user's favorite movies.

    - Script Tag
        - To make the application interactive, we include a JavaScript file called 'script.js'.
        - Inside the 'script.js' file, we have the necessary JavaScript code to handle user interactions and fetch movie data from an API.

# JavaScript File -
    - HTML Elements:
        - Several HTML elements are accessed using their IDs and assigned to corresponding variables. These elements include movie search box, search list, result grid, favorite list container, favorite list, favorite icon, search container, and container.

    - Local Storage:
        - The code initializes a favMovies variable by parsing the JSON data stored in the "favMovies" key of the local storage. If there is no data available, an empty array is assigned to favMovies.

    - Loading Movies:
        - The loadMovies function takes a search term as a parameter and constructs a URL to query the OMDB API for movie search results.
        - The function uses the fetch function to send an HTTP GET request to the API and awaits the response.
        - The response is then parsed as JSON, and if the response indicates success (data.Response == "True"), the displayMovieList function is called with the movie search results.

    - Finding Movies:
        - The findMovies function is called whenever the user enters a search term in the movie search box.
        - It retrieves the trimmed search term from the input box and checks its length.
        - If the search term is not empty, the search list is displayed and the loadMovies function is called with the search term. Otherwise, the search list is hidden.

    - Displaying Movie List:
        - The displayMovieList function takes an array of movie objects as a parameter and displays them in the search list.
        - It clears the existing search list content.
        - For each movie, it creates a new HTML element using document.createElement and sets its properties and content dynamically.
        - The movie's poster, title, year, and a heart icon are displayed in the element.
        - Event listeners are added to the heart icon to handle adding/removing movies to/from the favorites list.
        - The new element is appended to the search list container.

    - Loading Movie Details:
        - The loadMovieDetails function is called after the movie list is displayed.
        - It retrieves all movie elements in the search list using querySelectorAll and attaches click event listeners to each movie element.
        - When a movie element is clicked, the function makes a request to the OMDB API to get the detailed information of the clicked movie.
        - The movie details are then displayed using the displayMovieDetails function.

    - Displaying Movie Details:
        - The displayMovieDetails function takes a movie object as a parameter and displays its details in the result grid.
        - The function creates HTML elements dynamically and sets their content based on the movie details.
        - The movie poster, title, year, ratings, release date, genre, writer, actors, plot, language, and awards are displayed.
        - An "Add to Favorites" button is created and attached with a click event listener to handle adding the movie to the favorites list.

    - Displaying Favorite Movie List:
        -The displayFavMovieList function takes an array of favorite movies as a parameter and displays them in the favorite list.
        - It clears the existing favorite list content.
        - For each favorite movie, it creates a new HTML element similar to the movie elements in the search list, including a trash icon to remove the movie from favorites.
        - Event listeners are added to the movie elements and trash icons to display movie details and remove movies from favList.
        - The new favorite movie element is appended to the favorite list container.

    - Displaying Initial Favorite Movie:
        - After displaying the favorite movie list, the code checks if there are any favorite movies (favMovies.length > 0).
        - If there are favorite movies, it randomly selects a movie from the list (favMovies[randomIndex]) and displays its details using the displayMovieDetails function.

    - Favorite Icon for Small Screens:
        - An event listener is added to the favorite icon (favIcon) to toggle the display of the result grid, favorite list container, and search container when clicked.
        - The icon and display styles are modified based on the current state.

    - Click Event Listener:
        - A window-level click event listener is added to hide the search list and adjust the container's opacity when the user clicks outside the search box.
