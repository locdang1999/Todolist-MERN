import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  //contexts
  const { showAddPostModel, setShowAddPostModel, addPost, setShowToast } = useContext(PostContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    state: "To LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const closeDialog = () => {
      resetAddPostData();
  };

  const onSubmit = async (e) => {
      e.preventDefault();
      const {success, message} = await addPost(newPost);
      resetAddPostData();
      setShowToast({show: true, message, type: success? 'success' : 'danger'});
  }

  const resetAddPostData = () =>{
    setNewPost({
        title: "",
        description: "",
        url: "",
        state: "TO LEARN",
      })
      setShowAddPostModel(false);
  }

  return (
    <Modal show={showAddPostModel} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value = {title}
              onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              row={3}
              placeholder="Description"
              name="description"
              value = {description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              row={3}
              placeholder="Youtobe Tutorial URL"
              name="url"
              value = {url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
