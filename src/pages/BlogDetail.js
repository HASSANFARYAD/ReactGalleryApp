// BlogDetail.js
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import noImage from "../assets/img/No image.png";

const BlogDetail = ({ blog, onReset }) => {
  return (
    <Container className="blog-detail">
      <Row>
        <Col md={12} className="text-center mb-4">
          <Image
            src={blog.image_url || noImage}
            onError={(e) => {
              e.target.src = noImage;
            }}
            rounded
            fluid
          />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <h2>{blog.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <p>{blog.description}</p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <p>{blog.content}</p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <p>
            <strong>Creator:</strong>{" "}
            {blog.creator ? blog.creator[0] : "Anonymous"}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <p>
            <strong>Published Date:</strong> {blog.pubDate}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <p>
            <strong>Keywords:</strong>{" "}
            {blog.keywords && blog.keywords.join(", ")}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <p>
            <strong>Video URL:</strong> {blog.video_url || "Not available"}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <p>
            <strong>Source ID:</strong> {blog.source_id}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <p>
            <strong>Country:</strong> {blog.country && blog.country.join(", ")}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center mb-4">
          <p>
            <strong>Category:</strong>{" "}
            {blog.category && blog.category.join(", ")}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center">
          <a href={blog.link} target="_blank" rel="noreferrer">
            Read more
          </a>
          <br />
          <button className="btn btn-secondary" onClick={onReset}>
            Show More
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetail;
