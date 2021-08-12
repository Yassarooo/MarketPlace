import React, { Component } from "react";
import { Link } from "react-router-dom";
import ipfs from "./ipfs";
import { toast } from "react-toastify";

class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    imgipfshash: "",
    fileipfshash: "",
    imgbuffer: null,
    filebuffer: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  captureImage = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file.type.match("image/*")) {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        this.setState({
          imgbuffer: Buffer(reader.result),
        });
      };
    } else {
      toast.error("you can only select image for the product");
    }
  };

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        filebuffer: Buffer(reader.result),
      });
    };
  };

  onSubmit = async (event) => {
    event.preventDefault();
    if (
      this.state.name.length > 20 &&
      (this.state.price.toString() > 999999) &
        (this.state.description.length > 120)
    ) {
      toast.error("please enter correct info");
    } else {
      toast.info("Uploading Image...");
      ipfs.files.add(this.state.imgbuffer, (error, result) => {
        if (error) {
          toast.error(error);
          return;
        }
        this.setState({ imgipfsHash: result[0].hash });
        toast.success("Image Uploaded Successfully");
        console.log("image ipfshash:", this.state.imgipfsHash.toString());

        toast.info("Uploading File...");
        ipfs.files.add(this.state.filebuffer, (error, result) => {
          if (error) {
            toast.error(error);
            return;
          }
          this.setState({ fileipfsHash: result[0].hash });
          toast.success("File Uploaded Successfully");
          console.log("File ipfsHash", this.state.fileipfsHash.toString());
          console.log("naaaaaaaaaaame :", this.state.name);
          this.props.createProduct(
            this.state.name,
            this.state.description,
            window.web3.utils.toWei(this.state.price.toString(), "Ether"),
            this.state.imgipfsHash.toString(),
            this.state.fileipfsHash.toString()
          );
        });
      });
    }
  };

  render() {
    return (
      <div className="container">
        <fieldset disabled={this.props.loading}>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center mt-4">Sell a Product</h1>
              <p className="lead text-center">
                Let's get some information about your Product
              </p>
              <form className="needs-validation" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Ex:(Idm Source Code, Photoshop Subscription...)"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                  <div className="invalid-feedback">Name is required.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    rows="3"
                    required
                  />
                  <div className="invalid-feedback">
                    Description is required.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Price *</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                    placeholder="Product Price in Ethereum"
                    required
                  />
                  <div className="invalid-feedback">Price is required.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="file">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control-file"
                    id="file"
                    onChange={this.captureImage}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="file">File</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="file"
                    onChange={this.captureFile}
                  />
                </div>
                <small className="d-block pb-3">* = required fields</small>
                <small className="d-block pb-3">
                  Uploading the same file multiple times will result in the same
                  file with the same hash being uploaded.
                </small>
                <div className="mb-3">
                  <Link to="/" className="btn btn-secondary mr-2">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
              {this.props.successmessage != "" ? (
                <div className="alert alert-info mt-5">
                  {this.props.successmessage}
                </div>
              ) : null}
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
}
export default AddProduct;
