import { useParams } from 'react-router-dom';

function EditListingPage() {
    const { id } = useParams();

    return (
        <main>
            <h1>Edit Listing Page</h1>
            <p>Editing listing: {id}</p>
        </main>
    );
}

export default EditListingPage;