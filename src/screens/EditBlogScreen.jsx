import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";

import axios from "axios";
import { getBlog, editBlog } from "../actions/blogsActions";
import { BLOG_EDIT_RESET, GET_BLOG_RESET } from "../constants/blogsConstants";

const NewBlogScreen = () => {
  // initialize
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blog } = useSelector((state) => state.blog);
  const { loading, error, success } = useSelector((state) => state.blogEdit);

  // set the state for the form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [errorUpload, setErrorUpload] = useState("");
  const [uploading, setUploading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editBlog({
        slug,
        title,
        description,
        body,
        image,
      })
    );
  };

  useEffect(() => {
    if (!blog) {
      dispatch(getBlog(slug));
    } else {
      setTitle(blog.title);
      setDescription(blog.description);
      setBody(blog.body);
      setImage(blog.image);
    }

    if (success) {
      dispatch({ type: BLOG_EDIT_RESET });
      dispatch({ type: GET_BLOG_RESET });
      navigate(`/blogs/${slug}`);
    }
  }, [success, blog, slug, navigate, dispatch]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const config = {
        header: { "Content-Type": "multipart/form-data" },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
      console.log(image);
    } catch (error) {
      setErrorUpload(error.response.data.message);
      setUploading(false);
    }
  };

  return (
    <Container>
      <h1 className="my-3">Write a new Post</h1>
      <Form className="d-grid gap-2" onSubmit={submitHandler}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="2"
            name="description"
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="body">
          <Form.Label>Body: markdown</Form.Label>
          <Form.Control
            as="textarea"
            rows="7"
            name="body"
            value={body}
            placeholder="## content"
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Upload an Image</Form.Label>
          {errorUpload && <Message variant="danger">{errorUpload}</Message>}
          <Form.Control name="image" type="file" onChange={uploadFileHandler} />
          {uploading && <p>Uploading...</p>}
        </Form.Group>
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">success</Message>}
        <div className="buttons d-flex flex-row-reverse">
          <Button
            variant="outline-danger"
            onClick={() => {
              dispatch({ type: BLOG_EDIT_RESET });
              navigate(`/blogs/${slug}`);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" className=" px-3 mx-3" type="submit">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default NewBlogScreen;
