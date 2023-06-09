// HTML elements.
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const favListContainer = document.getElementById('favorite-list-container');
const favoriteList = document.getElementById('favorite-list');
const favIncon = document.getElementById('fav-icon');
const searchContainer = document.getElementById('search-container');
const container = document.getElementById('container');

// Local storage setup for favorite movies list
let favMovies = JSON.parse(localStorage.getItem('favMovies') || '[]');
// console.log(favMovies);

// load movies from API
async function loadMovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=bfd6b563`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data.Response == "True") {
        displayMovieList(data.Search);
    }
}

// Find movies for Suggestion list
function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

// Display suggestion list to the DOM
function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        // Check if poster found or not
        let moviePoster;
        if (movies[i].Poster != "N/A") {
            moviePoster = movies[i].Poster;
        } else {
            moviePoster = "imagenotfound.jpg";
        }
        // Create and append the dynamic html for list items to the DOM
        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
            <i class="fa-regular fa-heart"></i>
        </div>
        `;
        searchList.appendChild(movieListItem);
        container.style.opacity = "0.2";

        // Add movie to favorite list from search list
        const addToFavIcon = movieListItem.querySelector("i.fa-heart");
        // Check and change the heart icon if the movie already in favorite list.
        if (favMovies && favMovies.some(movie => movie.imdbID === movieListItem.dataset.id)) {
            addToFavIcon.classList.remove('fa-regular');
            addToFavIcon.classList.add('fa-solid');
        }

        // Add if the movie not in favorite list or Remove. 
        addToFavIcon.addEventListener('click', () => {
            const movieId = movieListItem.dataset.id;
            if (favMovies && favMovies.some(movie => movie.imdbID === movieId)) {
                // Movie is already in favorites, remove it
                addToFavIcon.classList.remove('fa-solid');
                addToFavIcon.classList.add('fa-regular');
                favMovies = favMovies.filter(movie => movie.imdbID !== movieId);
                localStorage.setItem('favMovies', JSON.stringify(favMovies));
                displayFavMovieList(favMovies);
            } else {
                // Movie is not in favorites, add it
                addToFavIcon.classList.remove('fa-regular');
                addToFavIcon.classList.add('fa-solid');
                favMovies.push(movies[i]); // Push that ith movie to the list.
                localStorage.setItem('favMovies', JSON.stringify(favMovies));
                displayFavMovieList(favMovies);
            }
        });

    }
    loadMovieDetails();
}

// Load movie details from API
function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=bfd6b563`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

// Display the movie details 
function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;

    // Add to favorite button 
    const addToFavBtn = document.createElement('button');
    addToFavBtn.innerHTML = "Add to Favorites";
    addToFavBtn.classList.add('add-to-fav-btn');
    addToFavBtn.dataset.id = details.imdbID;
    resultGrid.appendChild(addToFavBtn);

    addToFavBtn.addEventListener('click', () => {
        const movieId = details.imdbID;
        if (favMovies && favMovies.some(movie => movie.imdbID === movieId)) {
            addToFavBtn.innerHTML = "Already Added To Favorites";
        } else {
            addToFavBtn.innerHTML = "Added To Favorites";
            favMovies.push(details);
            localStorage.setItem('favMovies', JSON.stringify(favMovies));
            displayFavMovieList(favMovies);
        }
    });

}

// Display the favorite list
function displayFavMovieList(movies) {
    favoriteList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        let moviePoster;
        if (movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else
            moviePoster = "imagenotfound";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
            <i class="fa-solid fa-circle-minus"></i>
        </div>
        `;
        favoriteList.appendChild(movieListItem);

        // Show movie details from favorite list
        const favListMovies = favoriteList.querySelectorAll('.search-list-item');
        favListMovies.forEach(movie => {
            movie.addEventListener('click', async () => {
                searchList.classList.add('hide-search-list');
                const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=bfd6b563`);
                const movieDetails = await result.json();
                displayMovieDetails(movieDetails);
                if (window.innerWidth < 800) {
                    resultGrid.style.display = 'block';
                    favListContainer.style.display = 'none';
                    favIncon.classList.remove('fa-xmark');
                    favIncon.classList.add('fa-bars');
                    searchContainer.style.display = 'flex';
                }
            });
        });


        // Remove from favorite list
        const trashIcon = movieListItem.querySelector("i.fa-circle-minus");
        trashIcon.addEventListener('click', () => {
            const movieId = movieListItem.dataset.id;
            favMovies = favMovies.filter(movie => movie.imdbID !== movieId);
            localStorage.setItem('favMovies', JSON.stringify(favMovies));
            displayFavMovieList(favMovies);
        });
    }
    loadMovieDetails();
}

displayFavMovieList(favMovies);


// Random movie details from favorite list
if (favMovies.length > 0) {
    const randomIndex = Math.floor(Math.random() * favMovies.length);
    displayMovieDetails(favMovies[randomIndex])
}


// Favorite Icon for small screens
favIncon.addEventListener('click', () => {
    if (resultGrid.style.display === 'block') {
        resultGrid.style.display = 'none';
        favListContainer.style.display = 'block';
        searchContainer.style.display = 'none';
        favIncon.classList.remove('fa-bars');
        favIncon.classList.add('fa-xmark');
    } else {
        resultGrid.style.display = 'block';
        favListContainer.style.display = 'none';
        searchContainer.style.display = 'flex';
        favIncon.classList.remove('fa-xmark');
        favIncon.classList.add('fa-bars');
    }
});


window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
        container.style.opacity = "1";
    }
});
