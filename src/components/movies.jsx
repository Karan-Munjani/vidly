import React, { Component } from 'react';
import '../services/fakeMovieService';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';

class MoviesTable extends Component {
    state = {
        movies: getMovies(),
    };

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    }

    handleLike = (movie) => {
        // console.log("clicked", movie)
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;

        this.setState({ movies });
    }
    render() {
        const { length: moviesCount } = this.state.movies
        if (moviesCount === 0) {
            return <h5 className="mt-3 mb-3">There Are No Movies In Database</h5>
        }


        return (
            <>
                <h5 className="mt-3 mb-3">Showing {moviesCount} Movies from Database</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>

                    <tbody>

                        {this.state.movies.map(movie => (

                            <tr key={movie._id}>

                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        liked={movie.liked}
                                        onClick={() => this.handleLike(movie)} />
                                </td>
                                <td>
                                    <button className="btn btn-danger"
                                        onClick={() => this.handleDelete(movie)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default MoviesTable;