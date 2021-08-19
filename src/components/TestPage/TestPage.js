import React, { Component } from "react";
import "./TestPage.css";
import { Row, Col, Pagination, Button } from "react-bootstrap";
import { FaEthereum, FaChevronDown, FaSearch } from "react-icons/fa";

class TestPage extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      productsPerPage: 12,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  searchForProduct = function () {
    console.log("Searching...");
  };

  renderCards(product, index) {
    return product.purchased ? null : (
      <Col md="4" className="pt-3">
        <div className="card h-100 rounded card">
          <div
            className="badge bg-success text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
          >
            {product.owner.toString().substring(0, 8)}
          </div>
          <img
            className="card-img-top centered-and-cropped"
            src={`https://ipfs.io/ipfs/${product.imgipfshash}`}
            alt="..."
          />
          <div className="card-body bg-dark pb-0 mb-0">
            <div className="text-center">
              <h2 href={`/product/${product.id}`}>{product.name}</h2>
              <h3
                className="text-warning"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontWeight: "700",
                  fontSize: "x-large",
                  lineHeight: "50px",
                }}
              >
                <FaEthereum className="text-primary pl-0 pr-2" />
                {window.web3.utils.fromWei(
                  product.price.toString(),
                  "Ether"
                )}{" "}
                Eth
              </h3>
            </div>
          </div>
          <div className="card-footer pb-4 pt-0 border-top-0 bg-dark">
            <div className="text-center ">
              <Button
                className="btn btn-outline-light mt-2 stretched-link"
                name={product.id}
                value={product.price}
                onClick={(event) =>
                  (window.location.href = `/product/${product.id}`)
                }
              >
                More Details
              </Button>
            </div>
          </div>
        </div>
      </Col>
    );
  }

  render() {
    const indexOfLastProduct =
      this.state.currentPage * this.state.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - this.state.productsPerPage;
    const currentProducts = this.props.products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.products.length / this.state.productsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <Pagination.Item
          id={number}
          key={number}
          active={number === this.state.currentPage}
          onClick={this.handleClick}
        >
          {number}
        </Pagination.Item>
      );
    });
    return (
      <div>
        <section className="section-content py-4 px-3">
          <div className="row">
            <aside className="col-md-3">
              <div className="card bg-dark">
                <article className="filter-group">
                  <header className="card-header">
                    <span
                      href="#"
                      data-toggle="collapse"
                      data-target="#collapse_1"
                      aria-expanded="true"
                      className=""
                    >
                      <FaChevronDown className="float-right text-warning"></FaChevronDown>
                      <h6 className="title text-warning">Product type</h6>
                    </span>
                  </header>
                  <div className="filter-content collapse show" id="collapse_1">
                    <div className="card-body">
                      <form className="pb-3">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                          <div className="input-group-append">
                            <Button className="btn btn-warning" type="button">
                              <FaSearch />
                            </Button>
                          </div>
                        </div>
                      </form>

                      <ul className="list-menu text-white">
                        <li>
                          <a href="##">Tech </a>
                        </li>
                        <li>
                          <a href="//">Games</a>
                        </li>
                        <ul>
                          <li>
                            <a href="##">PC Games </a>
                          </li>
                          <li>
                            <a href="##">PS4 Games </a>
                          </li>
                          <li>
                            <a href="##">Xbox Games </a>
                          </li>
                        </ul>
                        <li>
                          <a href="##">Books & PDF </a>
                        </li>
                        <li>
                          <a href="##">Movies </a>
                        </li>
                        <li>
                          <a href="##">Courses </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
                <article className="filter-group">
                  <header className="card-header">
                    <a
                      href="##"
                      data-toggle="collapse"
                      data-target="#collapse_2"
                      aria-expanded="true"
                      className=""
                    >
                      <i className="icon-control fa fa-chevron-down"></i>
                      <h6 className="title text-warning">Categories </h6>
                    </a>
                  </header>
                  <div className="filter-content collapse show" id="collapse_2">
                    <div className="card-body">
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Mercedes
                          <b className="badge badge-pill badge-light float-right">
                            120
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Toyota
                          <b className="badge badge-pill badge-light float-right">
                            15
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Mitsubishi
                          <b className="badge badge-pill badge-light float-right">
                            35
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Nissan
                          <b className="badge badge-pill badge-light float-right">
                            89
                          </b>{" "}
                        </div>
                      </label>
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <div className="custom-control-label">
                          Honda
                          <b className="badge badge-pill badge-light float-right">
                            30
                          </b>{" "}
                        </div>
                      </label>
                    </div>
                  </div>
                </article>
                <article className="filter-group">
                  <header className="card-header">
                    <a
                      href="##"
                      data-toggle="collapse"
                      data-target="#collapse_3"
                      aria-expanded="true"
                      className=""
                    >
                      <i className="icon-control fa fa-chevron-down"></i>
                      <h6 className="title text-warning">Price range </h6>
                    </a>
                  </header>
                  <div className="filter-content collapse show" id="collapse_3">
                    <div className="card-body">
                      <input
                        type="range"
                        className="custom-range"
                        min="0"
                        max="100"
                        name=""
                      />
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="text-warning">Min</label>
                          <input
                            className="form-control"
                            placeholder="0 Eth"
                            type="number"
                          />
                        </div>
                        <div className="form-group text-right col-md-6">
                          <label className="text-warning">Max</label>
                          <input
                            className="form-control"
                            placeholder="1,0000 Eth"
                            type="number"
                          />
                        </div>
                      </div>
                      <Button className="btn btn-block btn-warning">
                        Apply
                      </Button>
                    </div>
                  </div>
                </article>
              </div>
            </aside>
            <main className="col-md-9 pr-4">
              <header className="border-bottom mb-2 pb-3">
                <div className="form-inline">
                  <span className="mr-md-auto">
                    {this.props.products.length.toString()} Items found{" "}
                  </span>
                  <select className="mr-0 form-control bg-dark">
                    <option>Latest items</option>
                    <option>Trending</option>
                    <option>Most Popular</option>
                    <option>Cheapest</option>
                  </select>
                </div>
              </header>

              <Row>{currentProducts.map(this.renderCards, this)}</Row>
              <Pagination id="page-numbers" className="py-4">
                {renderPageNumbers}
              </Pagination>
            </main>
          </div>
        </section>
      </div>
    );
  }
}
export default TestPage;
