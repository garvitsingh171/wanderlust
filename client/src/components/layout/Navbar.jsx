import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<header>
			<nav aria-label="Main navigation">
				<Link to="/">Wanderlust</Link>
				<div>
					<Link to="/listings/new">Airbnb your home</Link>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
