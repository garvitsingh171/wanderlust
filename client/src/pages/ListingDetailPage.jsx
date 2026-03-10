import { useParams } from 'react-router-dom';

function ListingDetailPage() {
    const { id } = useParams();

    return (
        <main>
            <h1>Listing Detail Page</h1>
            <p>Listing ID: {id}</p>
        </main>
    );
}

export default ListingDetailPage;