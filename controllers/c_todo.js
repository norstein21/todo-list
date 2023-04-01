//Tempat untuk menyimpan logic
// Memudahkan untuk debugging
const { db } = require("../db/dbconfig");

const getAllToDo = (req, res) => {
  let sql = "SELECT * FROM todo_items";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ status: "fail", msg: err });
    }
    res.status(200).json({ status: "success", result });
  });
};

const getToDoItem = async (req, res) => {
  const { id: todoID } = req.params;
  let sql = `SELECT * FROM todo_items WHERE id= ${todoID}`;
  await db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ title: "Data types not match", msg: err });
    } else if (!result.length) {
      return res
        .status(404)
        .json({ msg: `Theres no list with ID : ${todoID}` });
    } else {
      res.status(200).json({ status: "success", result });
    }
  });
};

const createToDoItem = (req, res) => {
  let sql = "INSERT INTO todo_items SET ?";
  let post = {
    name: req.body.name,
    completed: req.body.completed,
  };
  db.query(sql, post, (err, result) => {
    if (err) {
      res.status(404).json({ msg: err });
    }
    const hasil = result.insertId;
    res.status(201).json({ status: "success", success: hasil });
  });
};

const updateToDoItem = (req, res) => {
  const { id: todoID } = req.params;
  const { name: todoName, completed: todoDone } = req.body;
  let sql = `UPDATE todo_items SET name='${todoName}',completed='${todoDone}' WHERE id=${todoID}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else if (result.length) {
      res.status(404).json({ msg: `Theres no list with ID : ${todoID}` });
    } else {
      res.status(200).json({ status: "success", result });
    }
  });
};

const deleteToDoItem = (req, res) => {
  const { id: todoID } = req.params;
  let sql = `DELETE FROM todo_items WHERE id=${todoID}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ msg: err });
    }
    res
      .status(200)
      .json({ status: "success", msg: `ID ${todoID} has been deleted.` });
  });
};

module.exports = {
  getAllToDo,
  getToDoItem,
  createToDoItem,
  updateToDoItem,
  deleteToDoItem,
};
