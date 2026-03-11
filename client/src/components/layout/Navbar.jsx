import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<header className="sticky top-0 z-50 bg-white border-b border-airbnb-border shadow-elevated">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16" aria-label="Main navigation">
				<Link to="/" className="text-2xl font-bold text-gradient hover:opacity-80 transition-all flex items-center gap-2">
					<span className="text-3xl">🏠</span>
					Wanderlust
				</Link>
				<div className="flex items-center gap-2 sm:gap-6">
					<Link to="/listings/new" className="hidden sm:block text-gray-700 font-medium hover:text-airbnb-pink hover:bg-airbnb-light px-4 py-2 rounded-lg transition-all">
						🏡 Become a host
					</Link>
					<Link to="/login" className="text-gray-700 font-medium hover:text-airbnb-pink transition-colors">
						Login
					</Link>
					<Link to="/register" className="btn-primary">
						Sign up
					</Link>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
