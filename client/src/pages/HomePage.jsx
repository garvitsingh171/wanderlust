import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllListings } from '../services/listingApi';

function HomePage() {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadListings() {
            try {
                setIsLoading(true);
                setError('');
                const response = await getAllListings();
                setListings(response.data || []);
            } catch (err) {
                const message = err?.response?.data?.message || 'Failed to load listings';
                setError(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadListings();
    }, []);

    return (
        <main>
            <h1>Wanderlust Listings</h1>

            {isLoading && <p>Loading listings...</p>}

            {!isLoading && error && <p>{error}</p>}

            {!isLoading && !error && listings.length === 0 && (
                <p>No listings available yet.</p>
            )}

            {!isLoading && !error && listings.length > 0 && (
                <ul>
                    {listings.map((listing) => (
                        <li key={listing._id}>
                            <Link to={`/listings/${listing._id}`}>{listing.title}</Link>
                            <p>
                                {listing.location?.city}, {listing.location?.country}
                            </p>
                            <p>Rs. {listing.pricePerNight} per night</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

export default HomePage;