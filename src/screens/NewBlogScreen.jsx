import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";

import axios from "axios";
import { createBlog } from "../actions/blogsActions";
import { BLOG_CREATE_RESET } from "../constants/blogsConstants";

const NewBlogScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.blogCreate);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [errorUpload, setErrorUpload] = useState("");
  const [uploading, setUploading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBlog({ title, description, body, image }));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: BLOG_CREATE_RESET });
      navigate("/");
    }
  }, [error, success, dispatch, navigate]);
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
          <Button variant="outline-danger">Cancel</Button>
          <Button variant="primary" className=" px-3 mx-3" type="submit">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default NewBlogScreen;
