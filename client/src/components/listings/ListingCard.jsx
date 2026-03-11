import { Link } from 'react-router-dom';

function ListingCard({ listing }) {
	const coverImage = listing.images?.[0];

	return (
		<article>
			<Link to={`/listings/${listing._id}`}>
				{coverImage ? (
					<img src={coverImage} alt={listing.title} loading="lazy" />
				) : (
					<div>No image available</div>
				)}
				<h3>{listing.title}</h3>
			</Link>
			<p>
				{listing.location?.city}, {listing.location?.country}
			</p>
			<p>{listing.description}</p>
			<p>Rs. {listing.pricePerNight} per night</p>
		</article>
	);
}

export default ListingCard;
