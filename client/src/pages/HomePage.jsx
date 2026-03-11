import { useEffect, useState } from 'react';
import { getAllListings } from '../services/listingApi';
import Navbar from '../components/layout/Navbar';
import PageContainer from '../components/layout/PageContainer';
import ListingCard from '../components/listings/ListingCard';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';

const CATEGORIES = ['All', 'Trending', 'City', 'Beach', 'Mountain', 'Countryside'];

function HomePage() {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

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

    const normalizedSearch = searchInput.trim().toLowerCase();

    const filteredListings = listings.filter((listing) => {
        const title = listing.title?.toLowerCase() || '';
        const description = listing.description?.toLowerCase() || '';
        const city = listing.location?.city?.toLowerCase() || '';
        const country = listing.location?.country?.toLowerCase() || '';

        const matchesSearch =
            !normalizedSearch ||
            title.includes(normalizedSearch) ||
            description.includes(normalizedSearch) ||
            city.includes(normalizedSearch) ||
            country.includes(normalizedSearch);

        if (selectedCategory === 'All') {
            return matchesSearch;
        }

        return matchesSearch && description.includes(selectedCategory.toLowerCase());
    });

    return (
        <>
            <Navbar />

            <PageContainer>
                <main>
                    <section aria-label="Search listings">
                        <h1>Find your next stay</h1>
                        <p>Search places to stay and explore homes around the world.</p>

                        <form onSubmit={(event) => event.preventDefault()}>
                            <label htmlFor="home-search">Where are you going?</label>
                            <input
                                id="home-search"
                                type="search"
                                placeholder="Try Goa, Manali, Delhi..."
                                value={searchInput}
                                onChange={(event) => setSearchInput(event.target.value)}
                            />
                            <button type="submit">Search</button>
                        </form>
                    </section>

                    <section aria-label="Listing categories">
                        <h2>Categories</h2>
                        <div>
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setSelectedCategory(category)}
                                    aria-pressed={selectedCategory === category}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section aria-label="Listings feed">
                        <h2>Stays</h2>

                        {isLoading && <Loader message="Loading listings..." />}

                        {!isLoading && error && <ErrorMessage message={error} />}

                        {!isLoading && !error && listings.length === 0 && (
                            <p>No listings available yet.</p>
                        )}

                        {!isLoading && !error && listings.length > 0 && filteredListings.length === 0 && (
                            <p>No listings matched your search.</p>
                        )}

                        {!isLoading && !error && filteredListings.length > 0 && (
                            <div>
                                {filteredListings.map((listing) => (
                                    <ListingCard key={listing._id} listing={listing} />
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </PageContainer>
        </>
    );
}

export default HomePage;