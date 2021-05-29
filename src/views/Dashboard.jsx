import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  Spinner,
  Card,
  Button,
  Col,
  Row,
  Tooltip,
  OverlayTrigger,
  Toast,
} from "react-bootstrap";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import UpdatePostModal from "../components/posts/UpdatePostModal";
// import {setShowAddPostModel} from "../components/posts/setShowAddPostModel";

const Dashboard = () => {
  //Context
  const {
    authState: {
      user: { userName },
    },
  } = useContext(AuthContext);

  const {
    postState: { posts, postsLoading, post },
    getPosts,
    setShowAddPostModel,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  //Start: Get all posts
  useEffect(() => getPosts(), []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {userName}</Card.Header>
          <Card.Body>
            <Card.Title>Wellcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skil to learn
            </Card.Text>
            <Button variant="primary" onClick={setShowAddPostModel.bind(this, true)}>LearnIt!</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => {
            return (
              <Col key={post._id} className="my-2">
                <SinglePost post={post} />
              </Col>
            );
          })}
        </Row>

        {/* Open Add Post Model */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn.</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddPostModel.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal/>}
      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
