import React from 'react';

const DataGrid = ({ data }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 m-auto rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Organisation
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  } border-b dark:bg-gray-800 dark-border-gray-700`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.org}</td>
                  {/* <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.price}</td> */}
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
