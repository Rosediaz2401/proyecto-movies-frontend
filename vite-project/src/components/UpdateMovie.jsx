import React, {useState} from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export default function MovieForm() {

  const navigate = useNavigate();
  const [title, setTitle] = useState( "" );
  const [overview, setOverview] = useState( "" );
  const [original_language, setOriginal_language] = useState( "" );
  const [original_title, setOriginal_title] = useState( "" );
  const [poster_path, setPoster_path] = useState( "" );
  const [video, setVideo] = useState(false);

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
			updateMovie(input: {original_language: $original_language, original_title: $original_title, overview: $overview, poster_path: $poster_path, title: $title, video: $video},_id: $_id) {
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

	return (
		<div className="row">
			<div className="col-md-6 offset-md-3">
				<div className="card">
					<div className="card-body">
            <form onSubmit={ async( e ) => {
              e.preventDefault();
              await createMovie( { variables: { original_language, original_title, overview, poster_path, title, video } } )
              navigate('/')
            } }>
							<div className="mb-3">
								<label for="title" className="form-label">
									Title
								</label>
								<input type="text" className="form-control" value= {title} onChange={ (e) => setTitle(e.target.value)} />
							</div>
							<div className="mb-3">
								<label for="original_title" className="form-label">
									Original Title
								</label>
								<input type="text" className="form-control" value= {original_title} onChange={ (e) => setOriginal_title(e.target.value)} />
							</div>
							<div className="mb-3">
								<label for="overview" className="form-label">
									Overview
								</label>
								<input type="text" className="form-control" value= {overview} onChange={ (e) => setOverview(e.target.value)} />
							</div>

							<div className="mb-3">
								<label for="original_language" className="form-label">
									Original Language
								</label>
								<input type="text" className="form-control" value= {original_language} onChange={ (e) => setOriginal_language(e.target.value)} />
							</div>
							<div className="mb-3">
								<label for="poster_path" className="form-label">
									Poster Path
								</label>
								<input type="text" className="form-control" value= {poster_path} onChange={ (e) => setPoster_path(e.target.value)} />
							</div>
							<div className="mb-3">
								<label for="video" className="form-label">
									Video
								</label>
								<input type="text" className="form-control" value= {video} onChange={ (e) => setVideo(e.target.value)} />
							</div>

							<button className="btn btn-success btn-block">Save</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}