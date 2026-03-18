import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/getImageUrl';

function ListingCard({ listing }) {
	const coverImage = getImageUrl(listing.images?.[0]);
	const rating = 4.8; // Placeholder rating
	const reviews = 128; // Placeholder reviews

	return (
		<article className="card-listing group">
			<Link to={`/listings/${listing._id}`} className="block overflow-hidden relative">
				<div className="aspect-square bg-gray-200 overflow-hidden relative">
					{coverImage ? (
						<img 
							src={coverImage} 
							alt={listing.title} 
							loading="lazy" 
							className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
						/>
					) : (
						<div className="flex items-center justify-center h-full bg-gradient-to-br from-airbnb-light-gray to-gray-200 text-gray-500">
							📷 No image
						</div>
					)}

					<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
				</div>
			</Link>
			<div className="p-5">

				<div className="flex items-center gap-2 mb-2">
					<span className="star text-lg">★</span>
					<span className="text-sm font-semibold text-gray-900">{rating}</span>
					<span className="text-xs text-gray-500">({reviews})</span>
				</div>
				
				<Link to={`/listings/${listing._id}`} className="block hover:text-airbnb-pink transition-colors mb-1">
					<h4 className="font-semibold line-clamp-2 text-airbnb-dark hover:text-airbnb-pink">{listing.title}</h4>
				</Link>
				
				<p className="text-sm text-gray-600 mb-2">
					📍 {listing.location?.city}, {listing.location?.country}
				</p>
				
				<p className="text-sm text-gray-600 mb-4 line-clamp-2">{listing.description}</p>
				
				<div className="flex items-baseline gap-1 border-t border-airbnb-border pt-3">
					<span className="text-base font-bold text-airbnb-dark">₹{listing.pricePerNight}</span>
					<span className="text-sm text-gray-600">/night</span>
				</div>
			</div>
		</article>
	);
}

export default ListingCard;
