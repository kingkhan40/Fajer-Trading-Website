import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



const BillDetail = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await axios.get(
          `https://import-export-iisi.vercel.app/bill/getAllBills?page=1&limit=700`
        );
        const bills = response.data.result;
        const foundBill = bills.find((bill) => bill._id === id);
        if (foundBill) {
          setBill(foundBill);
        } else {
          setError("Bill not found");
        }
      } catch (error) {
        setError("Error fetching bill details");
        console.error("Error fetching bill details:", error);
      }
    };

    fetchBill();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!bill) {
    return <div>Loading...</div>;
  }

  const totalAmountIncludingVAT = bill.totalAmount + (bill.totalAmount * (bill.vatPercentage / 100));
  const totalAmountInWords = numberToWords(Math.round(totalAmountIncludingVAT));

  const downloadPDF = () => {
    const input = document.getElementById('billDetail');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`bill_${bill.invoice_number}.pdf`);
    });
  };

  return (
    <div id="billDetail" className="container mx-auto h-auto items-center justify-center px-10 bg-white py-10 max-sm:px-2">
      <div className="py-8 max-sm:px-2">

        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold my-2 border bg-white py-2 px-4 sm:rounded-lg">
            Invoice : {bill.invoice_number}
          </h2>
          <h2 className="border font-semibold text-xl bg-white py-2 px-4 sm:ml-2 mt-2 sm:mt-0 sm:rounded-lg">
            <strong>Date:</strong> {bill.date}
          </h2>
        </div>

        <div className="max-w-3xl my-5 bg-gray-200 border border-gray-500 rounded-lg overflow-hidden shadow-xl">
          <h2 className="text-xl font-semibold bg-blue-300 p-4 text-center rounded-t-lg">Bill To :</h2>
          <div className="bg-white p-4">
            <p className="flex items-center justify-between border-b-2 p-1 py-2">
              <strong >Name :</strong> {bill.name}
            </p>
            <p className="flex items-center justify-between border-b-2 p-1 py-2">
              <strong>Company :</strong> {bill.company}
            </p>
            <p className="flex items-center justify-between border-b-2 p-1 py-2">
              <strong>VAT No :</strong> {bill.vatNo}
            </p>
            <p className="flex items-center justify-between border-b-2 p-1 py-2">
              <strong>Email :</strong> {bill.email || "N/A"}
            </p>
          </div>
        </div>

        <div className="py-3 flex items-center text-base p-2 text-gray-400 uppercase before:flex-1 before:border-t-2 before:border-gray-200 before:me-6 after:flex-1 after:border-t-2 after:border-gray-200 after:ms-6"> Or </div>

        <h3 className="text-xl font-semibold my-2 text-center">Bill No : {bill.bl_no}</h3>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-hidden overflow-x-auto">
          <div className="min-w-full overflow-x-auto">
            {bill.fieldsData.length > 0 ? (
              <table className="min-w-full leading-normal">
                <thead className="bg-blue-300">
                  <tr>
                    <th className="px-5 py-3  border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                      Container No
                    </th>
                    <th className="px-5 py-3  border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-5 py-3  border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-5 py-3  border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3  border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 py-3  border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bill.fieldsData.map((field, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                        {field.container_no}
                      </td>
                      <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                        {field.location}
                      </td>
                      <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                        {field.customer_name}
                      </td>
                      <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                        {field.price}
                      </td>
                      <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                        {field.Qty}
                      </td>
                      <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                        {field.price * field.Qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No fields data available</p>
            )}
          </div>
          <div className="border-b-2 p-1 py-2 bg-white px-4">
            <h3 className="text-xl font-semibold ">Extra Charges:</h3>
            {bill.extraChargeData.length > 0 ? (
              <ul>
                {bill.extraChargeData.map((charge, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b-2 p-1 text-base font-medium"
                  >
                    {charge}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex justify-end mb-2 text-base font-medium">No extra charges</p>
            )}
          </div>

          <p className="flex items-center justify-between border-b-2 p-1 py-2 bg-white px-4">
            <strong>VAT Tax:</strong> {bill.vatPercentage}%
          </p>

          <p className="flex items-center justify-between border-b-2 p-1 py-2 bg-white px-4">
            <strong>Paid Amount:</strong> {bill.paidAmount}
          </p>

          <p className="flex items-center justify-between border-b-2 p-1 py-2 bg-white px-4">
            <strong >Extra Charge Description:</strong>{" "}
            {bill.extraChargeDescription || "N/A"}
          </p>

        </div>

        <div className="flex flex-wrap items-center justify-between p-1 py-2">
          <p>
            <strong className="text-xl">Total Amount in Words : </strong>
            <span className="text-base font-bold">
              {totalAmountInWords}
            </span>
          </p>
          <button onClick={downloadPDF} className="px-4 py-3 bg-blue-400 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="ml-2">Download In PDF</span>
          </button>


        </div>
      </div>
    </div>
  );
};

export default BillDetail;


const numberToWords = (number) => {
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ];
  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];
  const thousands = ["", "thousand", "million", "billion"];

  if (number === 0) return "zero";

  let words = "";
  for (let i = 0; number > 0; i++) {
    if (number % 1000 !== 0) {
      words = convertHundreds(number % 1000) + thousands[i] + " " + words;
    }
    number = Math.floor(number / 1000);
  }

  return words.trim();

  function convertHundreds(num) {
    if (num === 0) {
      return "";
    } else if (num < 20) {
      return ones[num] + " ";
    } else if (num < 100) {
      return tens[Math.floor(num / 10)] + " " + ones[num % 10] + " ";
    } else {
      return ones[Math.floor(num / 100)] + " hundred " + convertHundreds(num % 100);
    }
  }
};
