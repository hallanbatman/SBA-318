import express from "express";
import { contents } from "../data/contents.mjs";
const router = express.Router();

// @route GET /api/contents
// @desc Get all contents
// @access Public

router
  .route("/")
  .get((req, res) => {
    res.json(contents);
  })
  .post((req, res) => {
    const { userId, title, content: postContent } = req.body; // now pulls title and content
    let id = contents.length > 0 ? contents[contents.length - 1].id + 1 : 1; // creating a new id

    // creating a new object that will be pushed to the content array
    if (userId && title && postContent) {
      const post = {
        id: id,
        userId: userId,
        title: title,
        content: postContent,
      };
      contents.push(post);
      res.json(post);
    } else {
      res.status(400).json({ error: "Insufficient Data" });
    }
  });

//  @route GET /api/contents/:id
//  @desc Get ONE post
//  @access Public

router
  .route("/:id")
  .get((req, res, next) => {
    const post = contents.find((post) => post.id == req.params.id);

    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    // find the item that the client wants to update
    const id = req.params.id;
    const data = req.body;
    const post = contents.find((post, i) => {
      if (post.id == id) {
        for (const item in data) {
          contents[i][item] = data[item]; // make the change
        }
        return true;
      }
    });

    // send a response
    if (post) {
      res.json(contents);
    } else next();
  })
  .delete((req, res, next) => {
    // find the post that the client want to delete
    const id = req.params.id;
    const post = contents.find((post, i) => {
      if (post.id == id) {
        contents.splice(i, 1); // remove the post at index i
        return true;
      }
    });

    // send the client a response
    if (post) {
      res.json(contents);
    } else next();
  });

export default router;
