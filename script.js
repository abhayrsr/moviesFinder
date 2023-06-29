const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=b8f81ed3537c08aeec4c7063ef1492d5';
const imgPath = "https://image.tmdb.org/t/p/w1280/";
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=b8f81ed3537c08aeec4c7063ef1492d5&query=';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovies(apiUrl)
async function getMovies(url){
    const res =  await fetch(url);
    const data = await res.json();
    console.log(data.results);
    displayMovies(data.results);
   
}


function displayMovies(movies){
    main.innerHTML = ''
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie;
        const moviesElement = document.createElement('div');
        moviesElement.classList.add('movie');
        moviesElement.innerHTML = `
        <img src = "${imgPath + poster_path}" alt = "${title}" >
        <div class = 'movie-info'>
        <h3>${title}</h3>
        <span class = "${getClassesByRating(vote_average)}"> ${vote_average} </span>
        <div class = 'overview'>
        <h3> Overview </h3>
        ${overview}
        </div>
        </div>
        `
        main.appendChild(moviesElement);
    })
}

function getClassesByRating(rating){
    if(rating >= 8){
        return 'green'
    } else if(rating >= 5){
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchValue = search.value;
    console.log(searchValue);
    if(searchValue && searchValue !== ''){
        getMovies(searchUrl+searchValue)
        searchValue = ''
    } else {
        window.location.reload();
    }
})
