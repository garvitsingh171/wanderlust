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
                    {/* Hero Search Section */}
                    <section className="bg-gradient-to-b from-airbnb-light-gray via-white to-transparent py-16 px-4" aria-label="Search listings">
                        <div className="max-w-7xl mx-auto animate-fade-in">
                            <h1 className="text-5xl sm:text-6xl font-bold text-airbnb-dark mb-4 tracking-tight">
                                Find your next<br className="hidden sm:block" /> escape
                            </h1>
                            <p className="text-lg text-gray-700 mb-10 max-w-md leading-relaxed">Discover amazing homes and experiences around the world</p>

                            <form onSubmit={(event) => event.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <label htmlFor="home-search" className="sr-only">Where are you going?</label>
                                    <input
                                        id="home-search"
                                        type="search"
                                        placeholder="Try Goa, Manali, Delhi..."
                                        value={searchInput}
                                        onChange={(event) => setSearchInput(event.target.value)}
                                        className="input-search text-base"
                                    />
                                </div>
                                <button type="submit" className="btn-primary whitespace-nowrap text-base">
                                    🔍 Search
                                </button>
                            </form>
                        </div>
                    </section>

                    <div className="max-w-7xl mx-auto px-4 py-12">
                        {/* Category Section */}
                        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }} aria-label="Listing categories">
                            <div className="mb-8">
                                <h2 className="section-heading">Explore by category</h2>
                                <p className="text-gray-600 text-lg">Browse homes that match your style</p>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                                {CATEGORIES.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setSelectedCategory(category)}
                                        aria-pressed={selectedCategory === category}
                                        className={`btn-secondary flex-shrink-0 whitespace-nowrap transition-all duration-200 ${
                                            selectedCategory === category
                                                ? 'border-airbnb-dark bg-airbnb-dark text-white font-bold shadow-md'
                                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Listings Feed Section */}
                        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }} aria-label="Listings feed">
                            <div className="mb-10">
                                <h2 className="section-heading">
                                    {selectedCategory === 'All' ? '✨ All stays' : `${selectedCategory} stays`}
                                </h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-airbnb-pink to-airbnb-pink-light rounded-full"></div>
                            </div>

                            {isLoading && <Loader message="Loading amazing homes..." />}

                            {!isLoading && error && <ErrorMessage message={error} />}

                            {!isLoading && !error && listings.length === 0 && (
                                <div className="text-center py-20 bg-airbnb-light-gray rounded-2xl">
                                    <p className="text-2xl mb-2">🏠</p>
                                    <p className="text-gray-700 text-lg font-medium">No listings available yet</p>
                                    <p className="text-gray-600 mt-2">Check back soon for new homes!</p>
                                </div>
                            )}

                            {!isLoading && !error && listings.length > 0 && filteredListings.length === 0 && (
                                <div className="text-center py-20 bg-airbnb-light-gray rounded-2xl">
                                    <p className="text-2xl mb-2">🔍</p>
                                    <p className="text-gray-700 text-lg font-medium">No matches found</p>
                                    <p className="text-gray-600 mt-2">Try adjusting your filters or search terms</p>
                                </div>
                            )}

                            {!isLoading && !error && filteredListings.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                                    {filteredListings.map((listing, index) => (
                                        <div key={listing._id} style={{ animationDelay: `${index * 0.05}s` }} className="animate-slide-up">
                                            <ListingCard listing={listing} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </PageContainer>
        </>
    );
}

export default HomePage;