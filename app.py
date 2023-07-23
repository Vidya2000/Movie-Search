from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/search_movies', methods=['GET'])
def search_movies():
    # Get the search query from the front-end
    query = request.args.get('query')

    # Your TMDb API key
    api_key = '54b5e51e75278733de93dc7d850f80ef'  # Replace 'YOUR_TMDB_API_KEY' with your actual TMDb API key

    # Make a request to TMDb API
    url = f'https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={query}'
    response = requests.get(url)

    # Parse the API response and extract relevant movie details
    data = response.json()
    movies = []
    for movie in data['results']:
        movie_details = {
            'title': movie['title'],
            'release_date': movie['release_date'],
            'overview': movie['overview'],
            'ratings': movie['vote_average'],
            'poster_url': f'https://image.tmdb.org/t/p/w500{movie["poster_path"]}' if movie['poster_path'] else None
        }
        movies.append(movie_details)

    return jsonify(movies)

if __name__ == '__main__':
    app.run()
