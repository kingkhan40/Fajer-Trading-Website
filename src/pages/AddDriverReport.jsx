import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddDriverReport() {
    const [driverName, setDriverName] = useState('');
    const [location, setLocation] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [price, setPrice] = useState('');
    const [fuel, setFuel] = useState('');
    const [containerNo, setContainerNo] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const getCurrentDate = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
            const day = now.getDate().toString().padStart(2, '0');
            setCurrentDate(`${year}-${month}-${day}`);
        };

        getCurrentDate();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            name: driverName,
            location,
            customerName,
            price: Number(price), 
            fuel: Number(fuel), 
            containerNo,
            date: currentDate 
        };

        try {
            const response = await axios.post('https://import-export-iisi.vercel.app/driverReport/addDriverReport', formData);
            console.log('Form submitted:', response.data);

            setDriverName('');
            setLocation('');
            setCustomerName('');
            setPrice('');
            setFuel('');
            setContainerNo('');
            
            alert('Report submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit report. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                    <label htmlFor="driverName" className="block text-gray-700 text-sm font-bold mb-2">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="driverName"
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <div className="absolute -top-4 font-semibold shadow-md bg-gray-50 rounded-xl right-0 mt-2 mr-3 text-gray-600">{currentDate}</div>
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                        Location:
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">
                        Customer Name:
                    </label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fuel" className="block text-gray-700 text-sm font-bold mb-2">
                        Fuel:
                    </label>
                    <input
                        type="number"
                        id="fuel"
                        value={fuel}
                        onChange={(e) => setFuel(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="containerNo" className="block text-gray-700 text-sm font-bold mb-2">
                        Container No:
                    </label>
                    <input
                        type="text"
                        id="containerNo"
                        value={containerNo}
                        onChange={(e) => setContainerNo(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddDriverReport;
