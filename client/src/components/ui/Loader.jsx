function Loader({ message = 'Loading...' }) {
	return (
		<div className="flex items-center justify-center py-16 animate-fade-in">
			<div className="text-center">
				<div className="flex justify-center mb-6">
					<div className="relative w-16 h-16">
						<div className="absolute inset-0 animate-spin rounded-full border-4 border-airbnb-light border-t-airbnb-pink border-r-airbnb-pink"></div>
						<div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-b-airbnb-pink opacity-50" style={{ animationDirection: 'reverse' }}></div>
					</div>
				</div>
				<p className="text-lg text-gray-700 font-medium">{message}</p>
				<p className="text-sm text-gray-500 mt-2">Just a moment...</p>
			</div>
		</div>
	);
}

export default Loader;
