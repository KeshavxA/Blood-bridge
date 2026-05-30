function BloodSamples() {
  // Dummy data
  const samples = [
    { id: 1, blood_group: 'O+', units_available: 5, hospital_name: 'City Hospital', address: '123 Main St' },
    { id: 2, blood_group: 'A-', units_available: 2, hospital_name: 'Metro Care', address: '456 Park Ave' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Blood Samples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {samples.map(sample => (
          <div key={sample.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl font-bold text-red-600">{sample.blood_group}</span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">{sample.units_available} Units</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{sample.hospital_name}</h3>
            <p className="text-gray-600 text-sm mt-2">{sample.address}</p>
            <button className="mt-4 w-full bg-red-50 text-red-600 border border-red-200 py-2 rounded-md hover:bg-red-100 transition-colors font-medium">Request Blood</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BloodSamples;
