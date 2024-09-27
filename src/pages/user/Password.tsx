const ChangePassword = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Change Password Not Implemented Yet');
  };
  return (
    <div className="px-6">
      <h3 className="text-lg font-semibold text-gray-700">Ganti Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-gray-600">Password Lama</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <div className="mt-4 w-1/2">
            <label className="block text-gray-600">Password Baru</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-4 w-1/2">
            <label className="block text-gray-600">Konfirmasi Password Baru</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button type="submit" className="mt-6 w-full py-2 rounded-lg bg-primary text-white hover:bg-primaryDark">
          Ganti Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
