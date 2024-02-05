const btnSearch = document.querySelector(".search-input")
btnSearch.addEventListener("keydown", (event) => keyPressed(event) )

function keyPressed(event) {
     if (event.key === 'Enter') {
        //get name movie
        const nameMovie = btnSearch.value
        //getmovie with that name
        showMovie(nameMovie)
     }
}

async function searchMovie(nameMovie) {
    const url = 'http://www.omdbapi.com/?apikey=5beb7ae3&t=' + nameMovie
    try {
        const response = await fetch(url)
        const result = await response.text()
        return result
    } catch(error){
        return error
    }
}

showMovie()

async function showMovie(nameMovie = "Berserk" ) {
    const movie = await searchMovie(nameMovie)
    handleData(movie)
}

const posterImgMovie = document.getElementById("poster-movie")
const titleMovie = document.querySelector(".title-movie")
const tagsMovie = document.querySelector(".list-tags")
const plotMovie = document.querySelector(".plot-movie")
const directorMovie = document.getElementById("director-movie")
const writersMovie = document.getElementById("writers-movie")
const starsMovie = document.getElementById("stars-movie")
const ratingMovie = document.getElementById("rating-movie")
const votesMovie = document.getElementById("votes-movie")


function handleData(movie) {

    const movieObject = JSON.parse(movie)

    posterImgMovie.setAttribute("src", movieObject.Poster)
    titleMovie.innerHTML = movieObject.Title
    tagsMovie.innerHTML = ""
    console.log(movieObject.Genre)
    const genres = movieObject.Genre.split(",")
    
    genres.map( genre => {
      tagsMovie.innerHTML += `<small class="tag-genre">`+ genre.trim() +`</small>`
    })

    plotMovie.innerHTML = movieObject.Plot
    directorMovie.innerHTML = movieObject.Director
    writersMovie.innerHTML = movieObject.Writer
    starsMovie.innerHTML = movieObject.Actors
    ratingMovie.innerHTML = movieObject.imdbRating + "/10"
    votesMovie.innerHTML = movieObject.imdbVotes

}