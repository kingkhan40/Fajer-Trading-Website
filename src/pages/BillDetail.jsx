import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  return (
    <div className="container mx-auto items-center justify-center px-4 py-10 max-sm:px-2">
      <div className="py-8 max-w-7xl bg-white px-6 rounded-xl shadow-lg shadow-slate-900 max-sm:px-2">
        <h2 className="text-2xl font-semibold my-2">
          Bill Details Of {bill.company}
        </h2>
        <hr />
        <p className="flex flex-wrap items-center justify-between border-b-2 p-1 py-2">
          <strong>BL No:</strong> {bill.bl_no}
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>Name:</strong> {bill.name}
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>Company:</strong> {bill.company}
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>VAT No:</strong> {bill.vatNo}
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>Email:</strong> {bill.email || "N/A"}
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>Invoice Number:</strong> {bill.invoice_number}
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>VAT Percentage:</strong> {bill.vatPercentage}%
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>Paid Status:</strong> {bill.paidStatus ? "Paid" : "Unpaid"}
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>Paid Amount:</strong> {bill.paidAmount}
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>Credit Amount:</strong> {bill.creditAmount}
        </p>
        <p className="flex items-center justify-between border-b-2 p-1 py-2">
          <strong>Extra Charge Description:</strong>{" "}
          {bill.extraChargeDescription || "N/A"}
        </p>
        <div className="border-b-2 p-1 py-2">
          <h3 className="text-xl font-semibold">Extra Charges:</h3>
          {bill.extraChargeData.length > 0 ? (
            <ul>
              {bill.extraChargeData.map((charge, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b-2 p-1 py-2"
                >
                  {charge}
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex justify-end mb-2">No extra charges</p>
          )}
        </div>

        <h3 className="text-xl font-semibold my-2">Fields Data:</h3>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-hidden overflow-x-auto">
          <div className="min-w-full overflow-x-auto">
            {bill.fieldsData.length > 0 ? (
              <table className="min-w-full leading-normal">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Container No
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bill.fieldsData.map((field, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {field.container_no}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {field.location}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {field.customer_name}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {field.price}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {field.Qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No fields data available</p>
            )}
          </div>
        </div>


        <div className="flex flex-wrap items-center justify-between p-1 py-2">

          <p>
            <strong>Date:</strong> {bill.date}
          </p>
          <p>
            <strong>Total Amount:</strong> {bill.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillDetail;
