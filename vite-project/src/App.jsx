import "./App.css";
import "bootswatch/dist/lux/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import UpdateMovie from "./components/UpdateMovie"


function App() {
	return (
		<Router>
			<Navbar />
			<div className="container p-4">
				<Routes>
					<Route path="/" element={<MovieList />} />
					<Route path="/new-movie" element={<MovieForm />} />
					<Route path="/update" element={<UpdateMovie />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;