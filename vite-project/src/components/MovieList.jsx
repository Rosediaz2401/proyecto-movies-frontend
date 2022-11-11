import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from 'react-router-dom'

export const GET_MOVIES = gql`
	{
		getMovies {
            _id
            original_language
            original_title
            overview
            poster_path
            title
            video
		}
	}
`;

export const DELETE_MOVIE = gql`
	mutation deleteMovie($_id: ID!) {
		deleteMovie(_id: $_id) {
            _id
            title
		}
	}
`;



export default function MovieList() {
	const { error, data } = useQuery( GET_MOVIES );

	const [removeMovieById] = useMutation( DELETE_MOVIE, {
		refetchQueries: [{ query: GET_MOVIES }]
	} );

	if (error) return <h1>Error: {{ error }}</h1>;
	if (data) {
		console.log(data);
	}

	return (
		<div className="row">
			<div className="col-md-6 flex-lg-row w-100 d-flex flex-wrap">
				{data &&
					data.getMovies.map(({_id, original_language, original_title, overview, poster_path, title,video}) => (
						<Link className="card m-2 w-25" data-id={_id} to='/'
							state={{ _id: _id, original_language: original_language, original_title: original_title, overview: overview, poster_path: poster_path, title: title, video: video }}
						>
							<div className="card-body p-0">
								<div>
								<img src="https://i.ytimg.com/vi/xCI1X31n0Z0/maxresdefault.jpg" alt="..." class="img-thumbnail"/>
								</div>
							
								<div>
									<h4 className="font-weight-bold text-md-">
										Title: <span> {title}</span>
									</h4>
								</div>
								<p>
									Overview:<span>{overview}</span>
								</p>
								<p>{original_language}</p>
							</div>
							<button
								onClick={ async (e) => {
									let target = e.target;
									let getDocumentId = target.parentElement.getAttribute( "data-id" );
								 return await removeMovieById({variables:{_id: getDocumentId}})
									
								}}
								className="btn btn-danger"
							>
								Delete
							</button>
						</Link>
					))}
			</div>
		</div>
	);
}