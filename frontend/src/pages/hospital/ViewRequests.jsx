function ViewRequests() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Blood Requests</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Sample</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">O+</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O+ (5 Units)</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-green-600 hover:text-green-900 mr-4">Approve</button>
                <button className="text-red-600 hover:text-red-900">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRequests;
