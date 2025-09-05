import express from "express";
import { titles } from "../data/titles.mjs";
const router = express.Router();

// @route GET /api/titles
// @desc Get all titles
// @access Public

router
  .route("/")
  .get((req, res) => {
    res.json(titles);
  })
  .post((req, res) => {
    const { userId, title, content } = req.body; // grabbing data the client entered through req.body
    let id = titles[titles.length - 1].id + 1; // creating a new id
    // let id = titles.length++;

    // creating a new object that will be pushed to the titles array
    if (userId && title && content) {
      const post = {
        id: id,
        userId: userId,
        title: title,
        content: content,
      };
      titles.push(post);
      res.json(titles[titles.length - 1]);
    } else {
      res.json({ error: "Insufficient Data" });
    }
  });

//  @route GET /api/titles/:id
//  @desc Get ONE post
//  @access Public

router
  .route("/:id")
  .get((req, res) => {
    const post = titles.find((post) => post.id == req.params.id);

    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    // find the item that the client wants to update
    const id = req.params.id;
    const data = req.body;
    const post = titles.find((post, i) => {
      if (post.id == id) {
        for (const item in data) {
          // in the titles array grab the post that the client wants to change
          titles[i][item] = data[item]; // make the change
        }
        return true;
      }
    });

    // send a response
    if (post) {
      res.json(titles);
    } else next();
  })
  .delete((req, res, next) => {
    // find the post that the client want to delete
    const id = req.params.id;
    const post = titles.find((post, i) => {
      if (post.id == id) {
        titles.splice(i, 1); // remove the post at index i
        return true;
      }
    });

    // send the client a response
    if (post) {
      res.json(titles);
    } else next();
  });

export default router;
