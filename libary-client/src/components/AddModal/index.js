import React, { useState } from 'react'
import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Modal,

} from "reactstrap";

import axios from 'axios'

function AddModal({
  isOpen: open,
  handleAddModal,
  addBook
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("")

  const addNewBook = (e) => {
    e.preventDefault();
    const book = {
      name: name,
      description: description,
      price: price
    }
    addBook(book);
    setName('');
    setDescription('');
    setPrice('')
  }
  return (
    <Modal isOpen={open} toggle={handleAddModal}>
      <Card className="box-add-box">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Add Book
            </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={handleAddModal}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>

        <CardBody>
          <form onSubmit={addNewBook}>
            <FormGroup
              className={name === "" ? "has-danger" : "has-success"}
            >
              <Label for="exampleEmail">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
            </FormGroup>
            <FormGroup
              className={description === "" ? "has-danger" : "has-success"}
            >
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup
              className={price === "" ? "has-danger" : "has-success"}
            >
              <Label for="price">Price</Label>
              <Input
                type="munber"
                name="price"
                id="price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>

            <Button color="primary" disabled={name === '' || description === '' || price === ''} type="submit">
              Submit
                </Button>
          </form>
        </CardBody>
      </Card>

    </Modal>
  )
}

export default AddModal
