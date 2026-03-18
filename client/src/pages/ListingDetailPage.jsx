import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Loader from '../components/ui/Loader';
import ErrorMessage from '../components/ui/ErrorMessage';
import { getListingById } from '../services/listingApi';
import { getImageUrl } from '../utils/getImageUrl';

function ListingDetailPage() {
    const { id } = useParams();

    const [listing, setListing] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadListing() {
            try {
                setIsLoading(true);
                setError('');

                const response = await getListingById(id);
                setListing(response.data);
            } catch (err) {
                const message =
                    err?.response?.data?.message || 'Failed to load listing.';
                setError(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadListing();
    }, [id]);

    if (isLoading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-gradient-to-b from-airbnb-light-gray via-white to-white px-4 py-16">
                    <div className="max-w-6xl mx-auto">
                        <Loader message="Loading listing details..." />
                    </div>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-gradient-to-b from-airbnb-light-gray via-white to-white px-4 py-16">
                    <div className="max-w-3xl mx-auto">
                        <ErrorMessage message={error} />
                    </div>
                </main>
            </>
        );
    }

    if (!listing) {
        return null;
    }

    const mainImage = getImageUrl(listing.images?.[0]);
    const galleryImages = (listing.images?.slice(1, 5) || []).map((imagePath) => getImageUrl(imagePath));
    const amenities = listing.amenities || [];

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gradient-to-b from-airbnb-light-gray via-white to-white">
                <section className="max-w-7xl mx-auto px-4 py-10 sm:py-12 animate-fade-in">
                    <div className="mb-8">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-airbnb-pink mb-4"
                        >
                            ← Back to all listings
                        </Link>

                        <h1 className="mb-3">{listing.title}</h1>

                        <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-600">
                            <span className="inline-flex items-center gap-1">
                                📍 {listing.location?.city}, {listing.location?.state}, {listing.location?.country}
                            </span>
                            <span className="inline-flex items-center gap-1">
                                ★ 4.8
                            </span>
                            <span className="inline-flex items-center gap-1">
                                Hosted by {listing.host?.username || 'Host'}
                            </span>
                        </div>
                    </div>

                    <section className="grid gap-4 lg:grid-cols-[2fr_1fr] mb-10">
                        <div className="overflow-hidden rounded-[2rem] bg-airbnb-light shadow-card min-h-[320px] sm:min-h-[440px]">
                            {mainImage ? (
                                <img
                                    src={mainImage}
                                    alt={listing.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full min-h-[320px] items-center justify-center text-6xl text-gray-400">
                                    📷
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {galleryImages.length > 0 ? (
                                galleryImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-3xl bg-airbnb-light shadow-card min-h-[150px]"
                                    >
                                        <img
                                            src={image}
                                            alt={`${listing.title} ${index + 2}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="rounded-3xl bg-airbnb-light shadow-card min-h-[150px] flex items-center justify-center text-4xl text-gray-400">
                                        🏡
                                    </div>
                                    <div className="rounded-3xl bg-airbnb-light shadow-card min-h-[150px] flex items-center justify-center text-4xl text-gray-400">
                                        ✨
                                    </div>
                                    <div className="rounded-3xl bg-airbnb-light shadow-card min-h-[150px] flex items-center justify-center text-4xl text-gray-400">
                                        🌄
                                    </div>
                                    <div className="rounded-3xl bg-airbnb-light shadow-card min-h-[150px] flex items-center justify-center text-4xl text-gray-400">
                                        🛏️
                                    </div>
                                </>
                            )}
                        </div>
                    </section>

                    <section className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_380px]">
                        <div className="space-y-8">
                            <div className="rounded-[2rem] border border-airbnb-border bg-white p-6 shadow-card sm:p-8">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-airbnb-dark mb-2">
                                            Entire place hosted by {listing.host?.username || 'Host'}
                                        </h2>
                                        <p className="text-gray-600">
                                            A curated stay in {listing.location?.city} with comfort, privacy, and local character.
                                        </p>
                                    </div>

                                    <div className="h-14 w-14 rounded-full bg-airbnb-light border border-airbnb-border flex items-center justify-center text-lg font-bold text-airbnb-dark">
                                        {(listing.host?.username?.[0] || 'H').toUpperCase()}
                                    </div>
                                </div>

                                <div className="divider my-6"></div>

                                <div>
                                    <h3 className="mb-3">About this place</h3>
                                    <p className="text-gray-700 leading-8">
                                        {listing.description}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-airbnb-border bg-white p-6 shadow-card sm:p-8">
                                <h3 className="mb-4">What this place offers</h3>

                                {amenities.length > 0 ? (
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {amenities.map((amenity, index) => (
                                            <div
                                                key={`${amenity}-${index}`}
                                                className="rounded-2xl bg-airbnb-light-gray px-4 py-3 text-gray-700 font-medium"
                                            >
                                                ✨ {amenity}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">
                                        Amenities have not been added for this listing yet.
                                    </p>
                                )}
                            </div>

                            <div className="rounded-[2rem] border border-airbnb-border bg-white p-6 shadow-card sm:p-8">
                                <h3 className="mb-4">Host information</h3>
                                <div className="space-y-2 text-gray-700">
                                    <p>
                                        <span className="font-semibold text-airbnb-dark">Host:</span> {listing.host?.username || 'Unknown'}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-airbnb-dark">Email:</span> {listing.host?.email || 'Not available'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <aside className="lg:sticky lg:top-24 h-fit">
                            <div className="rounded-[2rem] border border-airbnb-border bg-white p-6 shadow-card sm:p-8">
                                <div className="flex items-end gap-2 mb-6">
                                    <span className="text-3xl font-bold text-airbnb-dark">
                                        ₹{listing.pricePerNight}
                                    </span>
                                    <span className="text-gray-500 mb-1">/ night</span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="rounded-2xl border border-airbnb-border px-4 py-3">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Location</p>
                                        <p className="text-sm text-airbnb-dark font-medium">
                                            {listing.location?.city}, {listing.location?.country}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-airbnb-border px-4 py-3">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Category</p>
                                        <p className="text-sm text-airbnb-dark font-medium">
                                            Perfect for weekend trips and longer stays
                                        </p>
                                    </div>
                                </div>

                                <button type="button" className="btn-primary w-full mb-3">
                                    Reserve
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    You won’t be charged yet
                                </p>
                            </div>
                        </aside>
                    </section>
                </section>
            </main>
        </>
    );
}

export default ListingDetailPage;