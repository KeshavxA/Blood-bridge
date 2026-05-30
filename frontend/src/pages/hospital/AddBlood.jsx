function AddBlood() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Blood Sample</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Group</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 p-2 border bg-white">
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Units Available</label>
          <input type="number" min="1" defaultValue="1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Collection Date</label>
          <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 p-2 border" />
        </div>
        <button type="button" className="w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-700 transition-colors">Add Sample</button>
      </form>
    </div>
  );
}

export default AddBlood;
