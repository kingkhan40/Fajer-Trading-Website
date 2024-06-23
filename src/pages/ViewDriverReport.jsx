import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const ViewDriverReport = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await axios.get('https://import-export-iisi.vercel.app/driverReport/getAllDriverReports?page=1&limit=100');
                console.log("<> ************ fetchData ************ response:", response.data.result);
                setReports(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page when search query changes
    };

    const indexOfLastReport = currentPage * postsPerPage;
    const indexOfFirstReport = indexOfLastReport - postsPerPage;

    // Filter reports based on search query
    const filteredReports = reports.filter(report =>
        report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

    const totalPages = Math.ceil(filteredReports.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded ${currentPage === i ? 'bg-gray-400' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://import-export-iisi.vercel.app/driverReport/deleteDriverReport/${id}`);
            // Filter out the deleted report from the local state
            setReports(reports.filter(report => report._id !== id));
            console.log(`Report with id ${id} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (currentReports.length === 0) {
        return <div>No results found</div>;
    }

    return (
        <section className="flex justify-center bg-gray-200 min-h-screen p-6">
            <div className="max-w-4xl w-full">
                <div className="flex items-center justify-center mb-4">
                    <div className="mr-2">
                        <FaSearch className="text-gray-600" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {currentReports.map((report) => (
                    <div key={report._id} className="bg-white shadow-md rounded-md px-8 py-6 mb-4 relative">
                        <Link to={`/viewdrvreport/${report._id}`}>
                        <div className="absolute top-2 left-6 text-xs text-gray-500 mt-1 ml-2">DATE: {formatDate(report.date)}</div>
                        <div className="flex">
                            <div className="w-1/2">
                                <div className="mt-4"><span className="font-semibold">DRIVER:</span> {report.name}</div>
                                <div className=" mt-1"><span className="font-semibold">
                                     
                                    CUSTOMER:</span> {report.customerName}</div>
                            </div>
                            <RiDeleteBin6Fill 
                                size={30}
                                className="absolute top-0 right-4 p-1 rounded-md cursor-pointer bg-red-500  text-white mt-2 mr-2"
                                onClick={() => handleDelete(report._id)}
                            />
                            <div className="w-1/2 mt-4 text-right relative">
                                <div className=""> <span className="font-semibold"> LOCATION:</span> {report.location}</div>
                                <div className=" mt-2"><span className="font-semibold">BALANCE: </span> {report.balance}</div>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
                <div className="flex justify-center">
                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between w-full">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Showing {Math.min(indexOfFirstReport + 1, filteredReports.length)} to {Math.min(indexOfLastReport, filteredReports.length)} of {filteredReports.length} Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button
                                onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <FaChevronLeft />
                            </button>
                            {renderPageNumbers()}
                            <button
                                onClick={() => paginate(currentPage === totalPages ? totalPages : currentPage + 1)}
                                disabled={currentPage === totalPages || filteredReports.length === 0}
                                className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r ${currentPage === totalPages || filteredReports.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViewDriverReport;

// Helper function to format date in "dd/mm/yyyy" format
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
