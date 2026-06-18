import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import bookBaseUrl from "../../axiosInstance";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    BookAuthor: "",
    SellingPrice: "",
    PublishDate: "",
    Id: "",
  });

  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const getAllBokkList = async () => {
    try {
      const { data } = await bookBaseUrl.get("booklists");
      setBookList(data?.BookList);
      console.log("booklist", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBokkList();
  }, []);
  // console.log("bookList State:", booklists);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("bookForm", bookForm);

  const handleSubmit = async () => {
    try {
      if (
        !bookForm.BookName ||
        !bookForm.BookTitle ||
        !bookForm.BookAuthor ||
        !bookForm.SellingPrice
      ) {
        alert("All Fields are required");
        return;
      }

      let data;

      if (isUpdating) {
        const response = await bookBaseUrl.put("/updatebook", bookForm);
        data = response.data;
      } else {
        const response = await bookBaseUrl.post("/addbook", bookForm);
        data = response.data;
      }

      if (data?.Success) {
        alert(data.Message);

        setBookForm({
          BookName: "",
          BookTitle: "",
          BookAuthor: "",
          SellingPrice: "",
          PublishDate: "",
          Id: "",
        });

        setIsUpdating(false);

        getAllBokkList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.post("deletebook", {
        Id: id,
      });
      if (data?.Success) {
        alert(data?.Message);
        getAllBokkList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (book) => {
    setBookForm({
      BookName: book?.BookName,
      BookTitle: book?.BookTitle,
      BookAuthor: book?.BookAuthor,
      SellingPrice: book?.SellingPrice,
      // PublishDate: book?.PublishDate,
      PublishDate: book?.PublishDate?.split("T")[0],
      Id: book?._id, // keep id for update API
    });

    setIsUpdating(true);
  };

  return (
    <div className="w-full px-5 min-h-[calc(100vh-60px)]">
      <div className="w-full grid grid-cols-5 gap-3 my-4">
        <div className="flex flex-col w-full ">
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder="Book Name"
            className="w-full border-gray-300 rounded-sm outline-1 outline-gray-500 h-8 px-2 border-2 text-gray-800"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col w-full gap2">
          <label htmlFor="">Book Title</label>
          <input
            type="text"
            placeholder="Book Name"
            className="w-full border-gray-300 rounded-sm outline-1 outline-gray-500 h-8 px-2 border-2 text-gray-800"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col w-full gap2">
          <label htmlFor="">Book Author</label>
          <input
            type="text"
            placeholder="Book Author"
            className="w-full border-gray-300 rounded-sm outline-1 outline-gray-500 h-8 px-2 border-2 text-gray-800"
            name="BookAuthor"
            value={bookForm.BookAuthor}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col w-full gap2">
          <label htmlFor="">Selling Price</label>
          <input
            type="text"
            placeholder="Selling Price"
            className="w-full border-gray-300 rounded-sm outline-1 outline-gray-500 h-8 px-2 border-2 text-gray-800"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col w-full gap2">
          <label htmlFor="">Publish Date</label>
          <input
            type="date"
            placeholder="Selling Date"
            className="w-full border-gray-300 rounded-sm outline-1 outline-gray-500 h-8 px-2 border-2 text-gray-800"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-gray-700 text-white h-9 w-22 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          {isUpdating ? "UPDATE" : "SUBMIT"}
        </button>
      </div>
      <div className="w-full mt-10">
        <div className="w-full">
          <table className="w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="tracking-wide px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Name
                </th>
                <th className="tracking-wide px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Title
                </th>
                <th className="tracking-wide px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Author
                </th>
                <th className="tracking-wide px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  selling price
                </th>
                <th className="tracking-wide px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Publish Date
                </th>
                <th className="tracking-wide px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookList?.map((book, index) => (
                <tr className="hover:bg-gray-200" key={index}>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book?.BookName}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book?.BookTitle}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book?.BookAuthor}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {book?.SellingPrice}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {new Date(book?.PublishDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="w-20 flex justify-center gap-5">
                      <div
                        className="w-20 flex justify-center items-center bg-red-100 text-red-600 cursor-pointer rounded text-lg"
                        onClick={() => handleDelete(book._id)}
                      >
                        <span>
                          <MdDelete />
                        </span>
                      </div>
                      <div
                        className="w-20 flex justify-center items-center bg-green-100 cursor-pointer text-green-600 rounded text-lg"
                        onClick={() => handleUpdate(book)}
                      >
                        <span>
                          <FaPen />
                        </span>
                      </div>
                    </div>
                  </td>
                  {/* <td className="px-6 py-3 whitespace-nowrap">Action</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
