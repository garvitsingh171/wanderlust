import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../services/listingApi';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';

function CreateListingPage() {
    const navigate = useNavigate();
    const { isAuthenticated, isCheckingAuth } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pricePerNight: '',
        location: {
            city: '',
            state: '',
            country: '',
        },
        images: [''],
    });

    const [amenitiesInput, setAmenitiesInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isCheckingAuth && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, isCheckingAuth, navigate]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleLocationChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                [name]: value,
            },
        }));
    }

    function handleImageChange(index, value) {
        setFormData((prev) => {
            const updatedImages = [...prev.images];
            updatedImages[index] = value;

            return {
                ...prev,
                images: updatedImages,
            };
        });
    }

    function addImageField() {
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ''],
        }));
    }

    function removeImageField(indexToRemove) {
        setFormData((prev) => {
            if (prev.images.length === 1) {
                return {
                    ...prev,
                    images: [''],
                };
            }

            return {
                ...prev,
                images: prev.images.filter((_, index) => index !== indexToRemove),
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        const cleanedImages = formData.images
            .map((imageUrl) => imageUrl.trim())
            .filter(Boolean);

        const cleanedAmenities = amenitiesInput
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

        if (!formData.title || !formData.description || !formData.pricePerNight) {
            setError('Title, description, and price are required.');
            return;
        }

        if (
            !formData.location.city ||
            !formData.location.state ||
            !formData.location.country
        ) {
            setError('City, state, and country are required.');
            return;
        }

        if (cleanedImages.length === 0) {
            setError('At least one image URL is required.');
            return;
        }

        const payload = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            pricePerNight: Number(formData.pricePerNight),
            location: {
                city: formData.location.city.trim(),
                state: formData.location.state.trim(),
                country: formData.location.country.trim(),
            },
            images: cleanedImages,
            amenities: cleanedAmenities,
        };

        try {
            setIsSubmitting(true);
            await createListing(payload);
            navigate('/');
        } catch (err) {
            const message =
                err?.response?.data?.message || 'Failed to create listing.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isCheckingAuth) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-gradient-to-b from-airbnb-light-gray via-white to-white px-4 py-20">
                    <div className="max-w-xl mx-auto text-center rounded-3xl border border-airbnb-border bg-white p-10 shadow-card animate-fade-in">
                        <p className="text-4xl mb-3">🏡</p>
                        <h1 className="text-3xl font-bold text-airbnb-dark mb-2">Preparing your host dashboard</h1>
                        <p className="text-gray-600">Checking authentication before opening the listing form.</p>
                    </div>
                </main>
            </>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-airbnb-light-gray via-white to-white">
                <section className="px-4 py-12 sm:py-16">
                    <div className="max-w-5xl mx-auto animate-fade-in">
                        <div className="mb-8 rounded-[2rem] border border-airbnb-border bg-white/90 p-6 shadow-card sm:mb-10 sm:p-8">
                            <span className="badge-primary mb-4">Host setup</span>
                            <h1 className="mb-3">Create a listing</h1>
                            <p className="max-w-2xl text-lg text-gray-600">
                                Add the core details guests need first: title, story, price, location, photos, and amenities.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-airbnb-border bg-white p-6 shadow-card sm:p-8 lg:p-10">
                            <div className="grid gap-8">
                            <section className="grid gap-5 rounded-3xl bg-airbnb-light-gray/60 p-5 sm:p-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-airbnb-dark">Basic details</h2>
                                    <p className="mt-1 text-sm text-gray-600">Start with the headline and a clear description of the stay.</p>
                                </div>

                                <div className="grid gap-5">
                                    <div>
                                        <label htmlFor="title" className="mb-2 block text-sm font-semibold text-airbnb-dark">Title</label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Cozy cabin in the hills"
                                            className="input-field"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="mb-2 block text-sm font-semibold text-airbnb-dark">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="6"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Describe the stay, vibe, and nearby attractions"
                                            className="input-field min-h-36 resize-y"
                                        />
                                    </div>

                                    <div className="max-w-xs">
                                        <label htmlFor="pricePerNight" className="mb-2 block text-sm font-semibold text-airbnb-dark">Price Per Night</label>
                                        <input
                                            id="pricePerNight"
                                            name="pricePerNight"
                                            type="number"
                                            min="0"
                                            value={formData.pricePerNight}
                                            onChange={handleChange}
                                            placeholder="2500"
                                            className="input-field"
                                        />
                                    </div>
                                </div>
                            </section>

                            <fieldset className="grid gap-5 rounded-3xl border border-airbnb-border p-5 sm:p-6">
                                <legend className="px-2 text-lg font-semibold text-airbnb-dark">Location</legend>
                                <p className="text-sm text-gray-600">Guests search by place first, so keep this accurate and specific.</p>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <label htmlFor="city" className="mb-2 block text-sm font-semibold text-airbnb-dark">City</label>
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            value={formData.location.city}
                                            onChange={handleLocationChange}
                                            placeholder="Manali"
                                            className="input-field"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="mb-2 block text-sm font-semibold text-airbnb-dark">State</label>
                                        <input
                                            id="state"
                                            name="state"
                                            type="text"
                                            value={formData.location.state}
                                            onChange={handleLocationChange}
                                            placeholder="Himachal Pradesh"
                                            className="input-field"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="country" className="mb-2 block text-sm font-semibold text-airbnb-dark">Country</label>
                                        <input
                                            id="country"
                                            name="country"
                                            type="text"
                                            value={formData.location.country}
                                            onChange={handleLocationChange}
                                            placeholder="India"
                                            className="input-field"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="grid gap-5 rounded-3xl border border-airbnb-border p-5 sm:p-6">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <legend className="text-lg font-semibold text-airbnb-dark">Images</legend>
                                        <p className="text-sm text-gray-600">Add one or more direct image URLs for the listing gallery.</p>
                                    </div>
                                    <button type="button" onClick={addImageField} className="btn-ghost self-start sm:self-auto">
                                        + Add another image
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    {formData.images.map((imageUrl, index) => (
                                        <div key={index} className="rounded-2xl bg-airbnb-light-gray/70 p-4">
                                            <div className="mb-3 flex items-center justify-between gap-3">
                                                <label htmlFor={`image-${index}`} className="text-sm font-semibold text-airbnb-dark">
                                                    Image URL {index + 1}
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImageField(index)}
                                                    className="text-sm font-medium text-gray-500 hover:text-airbnb-pink"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <input
                                                id={`image-${index}`}
                                                type="url"
                                                value={imageUrl}
                                                onChange={(event) =>
                                                    handleImageChange(index, event.target.value)
                                                }
                                                placeholder="https://example.com/image.jpg"
                                                className="input-field"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </fieldset>

                            <section className="grid gap-4 rounded-3xl bg-airbnb-light-gray/60 p-5 sm:p-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-airbnb-dark">Amenities</h2>
                                    <p className="mt-1 text-sm text-gray-600">Separate each amenity with a comma so the backend can store them as a list.</p>
                                </div>

                                <div>
                                    <label htmlFor="amenities" className="mb-2 block text-sm font-semibold text-airbnb-dark">
                                        Amenities
                                    </label>
                                    <input
                                        id="amenities"
                                        type="text"
                                        value={amenitiesInput}
                                        onChange={(event) => setAmenitiesInput(event.target.value)}
                                        placeholder="WiFi, Pool, Parking, Mountain View"
                                        className="input-field"
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Example: WiFi, Kitchen, Free parking, Balcony</p>
                                </div>
                            </section>

                            {error && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                                    <p className="text-sm font-medium text-red-700">{error}</p>
                                </div>
                            )}

                                <div className="flex flex-col gap-3 border-t border-airbnb-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm text-gray-500">Your listing will be validated before it is published.</p>
                                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto sm:min-w-48">
                                        {isSubmitting ? 'Creating listing...' : 'Create listing'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default CreateListingPage;