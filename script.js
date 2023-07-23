// Function to perform movie search
async function searchMovies() {
  const searchInput = document.getElementById('searchInput').value;
  const url = `http://127.0.0.1:5000/search_movies?query=${encodeURIComponent(searchInput)}`; // Replace with your back-end API URL

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to display search results
function displayResults(movies) {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = '';

  movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      const poster = document.createElement('img');
      poster.src = movie.poster_url || 'no-image.jpg'; // Use a placeholder image if no poster URL available
      poster.alt = movie.title;

      const title = document.createElement('h2');
      title.classList.add('movie-title');
      title.textContent = movie.title;

      const overview = document.createElement('p');
      overview.classList.add('movie-overview');
      overview.textContent = movie.overview;

      const releaseDate = document.createElement('p');
      releaseDate.classList.add('movie-release');
      releaseDate.textContent = `Release Date: ${movie.release_date}`;

      movieCard.appendChild(poster);
      movieCard.appendChild(title);
      movieCard.appendChild(overview);
      movieCard.appendChild(releaseDate);

      resultsContainer.appendChild(movieCard);
  });
}
