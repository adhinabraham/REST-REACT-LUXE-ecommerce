import React from "react";

function Datatable({ data }) {
    const tabledata=data
   
  return (
    <div>
      <table>
        
        <thead>
          <tr>username </tr>
        </thead>
        <tbody>
          {tabledata.map((obj, index) => {
            return (
              <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  <div className="relative w-10">
                    <div className="text-gray-600 dark:text-gray-400"></div>
                  </div>
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  {obj.id}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  {obj.products}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  ₹{obj.price}
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  {obj.username}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Datatable;
