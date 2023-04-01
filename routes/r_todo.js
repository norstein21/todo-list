const express = require("express");
const router = express.Router();

const {
  getAllToDo,
  getToDoItem,
  createToDoItem,
  updateToDoItem,
  deleteToDoItem,
} = require("../controllers/c_todo");

router.route("/").get(getAllToDo).post(createToDoItem);
router
  .route("/:id")
  .get(getToDoItem)
  .patch(updateToDoItem)
  .delete(deleteToDoItem);

module.exports = router;
