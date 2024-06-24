import React, { useState } from 'react';
import Header from '../components/Header';
import { FaArrowAltCircleLeft, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddBill = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        container_no: '',
        location: '',
        customer_name: '',
        price: '',
        Qty: ''
    });
    const [secondModalFormData, setSecondModalFormData] = useState({
        notes: '',
        price: '',
        Qty: ''
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openSecondModal = () => setIsSecondModalOpen(true);
    const closeSecondModal = () => setIsSecondModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSecondModalInputChange = (e) => {
        const { name, value } = e.target;
        setSecondModalFormData({
            ...secondModalFormData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Process the form data (e.g., send it to an API or update state)
        console.log(formData);
        closeModal();
    };

    const handleSecondModalFormSubmit = (e) => {
        e.preventDefault();
        // Process the second modal form data (e.g., send it to an API or update state)
        console.log(secondModalFormData);
        closeSecondModal();
    };

    return (
        <>
            <Header title={"Add Bill"} />
            <div className="container mx-auto my-10 px-4 sm:px-8">
            

                <div className="mx-auto xl:max-w-3xl h-full p-4 flex bg-white rounded-lg shadow overflow-hidden">
                <Link to="/view">
                    <FaArrowAltCircleLeft size={28}  />
                </Link>
                    <div className="w-full my-10">
                        <form>
                            <div className="mb-4 mt-6">
                                <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="invoice-no">
                                    Invoice No :
                                </label>
                                <div className='flex gap-3'>
                                    <input className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10" id="invoice-no" type="text" placeholder="Your email address" />
                                    <input type="date" name="" id="" className='mx-2 bg-slate-500 p-2 text-white' />
                                </div>
                            </div>

                            <h1 className=" text-2xl font-bold">Add Bill to : </h1>

                            <div className="mb-4 mt-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="bl-no">
                                    Bl No :
                                </label>
                                <input className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10" id="bl-no" type="text" placeholder="Your email address" />
                            </div>

                            <div className="flex w-full mt-8 px-5">
                                <button
                                    onClick={openModal}
                                    className="w-full bg-gray-500 text-center cursor-pointer hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline h-10"
                                    type="button"
                                >
                                    Add Container
                                </button>
                            </div>

                            <div className="flex w-full mt-8 px-5">
                                <button
                                    onClick={openSecondModal}
                                    className="w-full bg-gray-500 text-center cursor-pointer hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline h-10"
                                    type="button"
                                >
                                    Add Another
                                </button>
                            </div>

                            <div className="mb-6 mt-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="vat-tax">
                                    Vat Tax (%) :
                                </label>
                                <input className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10" id="vat-tax" type="text" placeholder="VAT Tax" />
                            </div>

                            <div className="flex w-full mt-8">
                                <button className="w-full bg-gray-800 hover:bg-grey-900 text-white text-base py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" type="button">
                                    Generate Bills
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg sm:max-w-lg w-full">
                    <div className='flex items-center justify-between'>
                            <h2 className="text-xl font-bold mb-4">Container Data</h2>
                            <p className='mb-2 cursor-pointer'><FaTimesCircle onClick={closeModal} size={20} /></p>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="container_no">
                                    Container No:
                                </label>
                                <input
                                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="container_no"
                                    name="container_no"
                                    type="text"
                                    placeholder="Container Number"
                                    value={formData.container_no}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="location">
                                    Location:
                                </label>
                                <input
                                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="Location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="customer_name">
                                    Customer Name:
                                </label>
                                <input
                                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="customer_name"
                                    name="customer_name"
                                    type="text"
                                    placeholder="Customer Name"
                                    value={formData.customer_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="price">
                                    Price:
                                </label>
                                <input
                                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Qty">
                                    Qty:
                                </label>
                                <input
                                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="Qty"
                                    name="Qty"
                                    type="number"
                                    placeholder="Qty"
                                    value={formData.Qty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex justify-end mb-20">

                                <button
                                    className="bg-gray-500 text-white w-full text-sm py-3 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    1
                                </button>
                            </div>
                            <div className="flex justify-end">

                                <button
                                    className="bg-blue-500 text-white w-full text-sm py-3 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Save Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isSecondModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg sm:max-w-lg w-full">
                    <div className='flex items-center justify-between'>
                            <h2 className="text-xl font-bold mb-4">Extra Charge</h2>
                            <p className='mb-2 cursor-pointer'><FaTimesCircle onClick={closeSecondModal} size={20} /></p>
                        </div>
                        <form onSubmit={handleSecondModalFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="notes">
                                    Notes:
                                </label>
                                <textarea
                                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-20 resize-none"
                                    id="notes"
                                    name="notes"
                                    placeholder="Enter additional notes..."
                                    value={secondModalFormData.notes}
                                    onChange={handleSecondModalInputChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="price">
                                    Price:
                                </label>
                                <input
                                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Price"
                                    value={secondModalFormData.price}
                                    onChange={handleSecondModalInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="Qty">
                                    Qty:
                                </label>
                                <input
                                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="Qty"
                                    name="Qty"
                                    type="number"
                                    placeholder="Qty"
                                    value={secondModalFormData.Qty}
                                    onChange={handleSecondModalInputChange}
                                />
                            </div>
                            <div className="flex justify-end mb-20">

                                <button
                                    className="bg-gray-500 text-white w-full text-sm py-3 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    1
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-500 text-white w-full text-sm py-3 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Save Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddBill;
