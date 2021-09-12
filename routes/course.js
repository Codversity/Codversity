import { ensureLoggedIn } from "connect-ensure-login";
import { Router } from "express";
import { metaphone } from "metaphone";
import Course from "../model/courseModel.js";

const route = Router();

route
  .get("/", function (req, res) {
    res.sendStatus(500);
  })
  .get("/create", ensureLoggedIn("/login"), function (req, res) {
    // if (req.user.designation == "instructor")
    res.render("courseAdd", { done: false });
    // else {
    //   res.sendStatus(400);
    // }
  })
  .post("/create", function (req, res) {
    // res.sendStatus(500);
    let { title, author, thumbnail, description, price } = req.body;
    const course = new Course({
      author: author,
      title: title,
      keywords: metaphone(title),
    });
    course.save(function (err) {
      if (err) console.log(err);
      else {
        res.render("courseAdd", { done: true });
      }
    });
  })
  .get("/search", function (req, res) {
    if (!req.query.search) res.redirect("/");
    try {
      Course.fuzzySearch(metaphone(req.query.search), (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

export default route;
