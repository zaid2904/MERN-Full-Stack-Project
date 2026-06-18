const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center h-20 bg-gray-200 shadow px-5">
      <div className="w-[10%] h-full flex items-center">
        <h1 className="text-xl font-bold">Logo</h1>
      </div>

      <div className="w-[50%] h-full">
        <ul className="w-full h-full flex gap-6 list-none items-center justify-end">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
