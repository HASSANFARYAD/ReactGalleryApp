import React, { useEffect, useState } from "react";
import { UNSPLASH_ACCESS_KEY } from "./config/constants";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import noImage from "./assets/img/No image.png";
import BlogDetail from "./pages/BlogDetail";

const App = () => {
  const [search, setSearch] = useState("Crypto");
  const [blogList, setBlogList] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState("");

  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, [nextPage]);

  const fetchBlogs = () => {
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${UNSPLASH_ACCESS_KEY}&q=${search}`;

    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res);
        setBlogList(res.data.results);
        setNextPage(res.data.nextPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = () => {
    setSelectedBlog(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchBlogs();
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="container my-5">
      {selectedBlog ? (
        <BlogDetail blog={selectedBlog} onReset={handleReset} />
      ) : (
        <>
          <p className="sub-heading">Search for your favorite blogs</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Blogs"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <Row>
            {blogList.map((blog, index) => (
              <Col md={4} key={index} className="mb-3 pb-3">
                <Card>
                  <Card.Img
                    variant="top"
                    src={blog.image_url || noImage}
                    onError={(e) => {
                      e.target.src = noImage; // Set the path to your custom error image
                    }}
                    style={{ height: "200px" }}
                  />
                  <Card.Body style={{ height: "300px", overflowY: "scroll" }}>
                    <Row>
                      <Col md={12}>
                        <h6>
                          Published: <span>{blog.pubDate}</span>
                        </h6>
                      </Col>
                    </Row>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{blog.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleBlogClick(blog)}
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col md={12} className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => handlePagination(nextPage)}
              >
                Next
              </button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default App;
