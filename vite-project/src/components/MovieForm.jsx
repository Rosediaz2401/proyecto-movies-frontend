import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";

export default function MovieForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const [original_language, setOriginal_language] = useState( "" );
	const [original_title, setOriginal_title] = useState( "" );
	const [poster_path, setPoster_path] = useState( "" );
	const [video, setVideo] = useState(false);
	const [title, setTitle] = useState("");
	const [overview, setOverview] = useState("");
	const [_id, setId] = useState("")

	const getDataObj = location.state;
	const movieId = location.state && location.state._id !== undefined ? location.state._id : "";
	const movieOriginal_language = location.state && location.state.original_language !== undefined ? location.state.original_language : "";
	const movieOriginal_title = location.state && location.state.original_title !== undefined ? location.state.original_title : "";
	const moviePoster_path = location.state && location.state.poster_path !== undefined ? location.state.poster_path : "";
	const movieVideo = location.state && location.state.video !== undefined ? location.state.video : "";
	const movieTitle = location.state && location.state.title !== undefined ? location.state.title : "";
	const movieOverview = location.state && location.state.overview !== undefined ? location.state.overview : "";

	useEffect(() => {
		if ( getDataObj ) {
			setOriginal_language( movieOriginal_language );
			setOriginal_title(movieOriginal_title);
			setOverview( movieOverview );
			setPoster_path(moviePoster_path);
			setTitle( movieTitle );
			setVideo( movieVideo);
			setId(movieId)
		}
	}, [])
	
	const CREATE_MOVIE = gql`
		mutation createMovie(
			$original_language: String
            $original_title: String 
            $overview: String
            $poster_path:String
            $title: String
            $video:Boolean
		) {
			createMovie(original_language: $original_language, original_title: $original_title, overview: $overview, poster_path: $poster_path, title: $title, video: $video) {
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
	const [createMovie] = useMutation(CREATE_MOVIE, {});

	const UPDATE_MOVIE = gql`
		mutation updateMovie(
            $original_language: String
            $original_title: String
            $overview: String
            $poster_path:String
            $title: String
            $video:Boolean
            $_id: ID!

		) {
			updateMovie(
                input: {original_language: $original_language, original_title: $original_title, overview: $overview, poster_path: $poster_path, title: $title, video: $video}
                _id: $_id
			) {
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
	const [updateMovie] = useMutation(UPDATE_MOVIE, {});
	return (
		<div className="row">
			<div className="col-md-6 offset-md-3">
				<div className="card">
					<div className="card-body">
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								if (getDataObj) {
									await updateMovie( {
										variables: {  _id,original_language, original_title, overview, poster_path, title, video,}
									})
								} else {
									await createMovie({
										variables: { original_language,original_title, overview, poster_path, title, video },
									});
								}
								navigate("/");
							}}
						>
							<div className="mb-3">
								<label for="original_language" className="form-label">
									Original Language
								</label>
								<input
									type="text"
									className="form-control"
									value={original_language}
									onChange={( e ) => {
										console.log('changing language')
										setOriginal_language( e.target.value )
									}}
								/>
							</div>
							<div className="mb-3">
								<label for="overview" className="form-label">
									Overview
								</label>
								<input
									type="text"
									className="form-control"
									value={overview}
									onChange={(e) => setOverview(e.target.value)}
								/>
							</div>
                            <div className="mb-3">
								<label for="title" className="form-label">
									Title
								</label>
								<input
									type="text"
									className="form-control"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<button className="btn btn-success btn-block">
								{getDataObj ? "Update" : "Save"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}