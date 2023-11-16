// pages/index.js
import SubmitForm from '../SubmitForm/page';

const Home = () => {
    // Example data
    const exampleData = [
        { path: '/api/1', body: '{"key": "value"}', requestType: 'POST' },
        { path: '/api/2', body: '{"key": "value2"}', requestType: 'PUT' },
    ];

    return (
        <div className="bg-gray-200 p-8">
            <SubmitForm initialData={exampleData} />
        </div>
    );
};

export default Home;
