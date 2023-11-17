export default function List() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="container mx-auto bg-indigo-500 rounded-lg p-14">
          <form>
            <h1 className="text-center font-bold text-white text-4xl">
              Find the perfect domain name
            </h1>
            <p className="mx-auto font-normal text-sm my-6 max-w-lg">
              Enter your select domain name and choose any extension name in the
              next step (choose between .com, .online, .tech, .site, .net, and
              more)
            </p>
            <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
              <input
                className="text-base text-gray-400 flex-grow outline-none px-2 "
                type="text"
                placeholder="Search your domain name"
              />
              <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                <select
                  id="Com"
                  className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
                >
                  <option value="com" selected>
                    com
                  </option>
                  <option value="net">net</option>
                  <option value="org">org</option>
                  <option value="io">io</option>
                </select>
                <button className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
