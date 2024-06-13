import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ViewAll = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://import-export-iisi.vercel.app/bill/getAllBills?page=1&limit=700`);
        setBills(response.data.result);
        setFilteredBills(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(filteredBills.length / perPage);
  const indexOfLastBill = currentPage * perPage;
  const indexOfFirstBill = indexOfLastBill - perPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4; // Maximum number of page numbers to show

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 ${currentPage === i ? 'bg-gray-400' : 'bg-gray-300'}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = bills.filter((bill) => {
      return (
        bill.bl_no.toLowerCase().includes(value) ||
        (bill.fieldsData.length > 0 && bill.fieldsData[0].Qty.toString().includes(value)) ||
        bill.company.toLowerCase().includes(value) ||
        bill.invoice_number.toLowerCase().includes(value)
      );
    });
    setFilteredBills(filteredData);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mx-6">
          <div>
            <input
              type="text"
              placeholder="Search by Company, BL No, Invoice Number, or Container Quantity"
              value={searchTerm}
              onChange={handleSearch}
              className="appearance-none rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
              className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
            >
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    BL No
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Invoice Number
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Container
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Remaining Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentBills.map((bill) => (
                  <tr key={bill._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{bill.bl_no}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{bill.company}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{bill.invoice_number}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{bill.fieldsData.length > 0 ? bill.fieldsData[0].Qty : '-'}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{bill.date}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{bill.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing {Math.min(indexOfFirstBill + 1, filteredBills.length)} to {Math.min(indexOfLastBill, filteredBills.length)} of {filteredBills.length} Entries
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
                  disabled={currentPage === totalPages || filteredBills.length === 0}
                  className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r ${currentPage === totalPages || filteredBills.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaChevronRight />
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ViewAll;
