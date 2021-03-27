const express = require("express");
const router = express.Router();

const admin = require("./../../firebase-admin");
const db = admin.firestore();

db.settings({ timestampsInSnapshots: true });
router.get("/", (req, res) => {
  res.render("login/login");
});
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  let adminFlag = false;
  let teacherFlag = false;
  let userFlag = false;
  let userDetails = {};
  let errors = [];
  await db
    .collection("admin")
    .get()
    .then((user) => {
      user.docs.forEach((c) => {
        if (c.data().password == password && c.data().email == email) {
          userDetails = c.data();
          adminFlag = true;
        }
      });
    });
  if (adminFlag) {
    res.render("login/admin/dashboard", {
      userStatus: "admin",
      userDetails: JSON.stringify(userDetails),
    });
  } else {
    await db
      .collection("teacher")
      .get()
      .then((user) => {
        user.docs.forEach((c) => {
          if (c.data().password == password && c.data().email == email) {
            userDetails = c.data();
            teacherFlag = true;
          }
        });
      });
    if (teacherFlag) {
      res.render("login/teacher/dashboard", {
        userStatus: "login",
        userDetails: JSON.stringify(userDetails),
      });
    } else {
      await db
        .collection("user")
        .get()
        .then((user) => {
          user.docs.forEach((c) => {
            if (c.data().password == password && c.data().email == email) {
              userDetails = c.data();
              userFlag = true;
            }
          });
        });
      if (userFlag) {
        res.render("login/user/dashboard", {
          userStatus: "login",
          userDetails: JSON.stringify(userDetails),
        });
      }
    }
  }
  if (!(userFlag || teacherFlag || adminFlag)) {
    errors.push({ msg: "Incorrect Detail" });
    res.render("login/login", { errors });
  }
});
module.exports = router;
