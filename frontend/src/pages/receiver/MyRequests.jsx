function MyRequests() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Blood Requests</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">City Hospital</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">O+</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-27</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyRequests;
