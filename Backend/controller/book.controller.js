const { Book } = require("../models/book.model");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;
    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.BookAuthor ||
      body.SellingPrice === undefined ||
      body.SellingPrice === null
    ) {
      return res.status(400).json({
        Message: "All fields are required",
        Success: false,
      });
    }

    const bookAdd = await Book.create(req.body);

    if (bookAdd) {
      return res.status(201).json({
        Message: "Book added successfully",
        Success: true,
        data: bookAdd,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
      Success: false,
    });
  }
};

const handleBookListController = async (req, res) => {
  try {
    const bookList = await Book.find({});
    return res.status(200).json({
      Message: "All books are fetched successfully",
      Success: true,
      TotalCount: bookList.length,
      BookList: bookList,
    });
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

const handleBookDeleteController = async (req, res) => {
  const body = req.body;
  try {
    const deleted = await Book.deleteOne({ _id: body.Id });

    // console.log("deleted", deleted);
    if (deleted.acknowledged) {
      return res.json({
        Message: "Book deleted successfully !",
        Success: true,
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

// const handleBookUpdateController = async (req, res) => {
//   try {
//     const body = req.body;
//     const updating = await Book.updateOne({ _id: body?._id }, { $set: body });
//     console.log("updating", updating);
//     if (updating?.acknowledged) {
//       return res.json({
//         Message: "Book updated successfully",
//         Success: true,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       Success: false,
//       Message: error.message,
//     });
//   }
// };

const handleBookUpdateController = async (req, res) => {
  try {
    const body = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      body.Id,
      {
        BookName: body.BookName,
        BookTitle: body.BookTitle,
        BookAuthor: body.BookAuthor,
        SellingPrice: body.SellingPrice,
        PublishDate: body.PublishDate,
      },
      { new: true },
    );

    return res.status(200).json({
      Success: true,
      Message: "Book Updated Successfully",
      data: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
};
