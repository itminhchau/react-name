import React, { useState, useEffect } from 'react'
import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Modal,

} from "reactstrap";


function EditModal({
  isOpen: open,
  handleEditModal,
  book,
  editBook,
  deleteBook
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('')

  useEffect(() => {
    setName(book.name);
    setDescription(book.description);
    setPrice(book.price)
  }, [book])

  const editItem = (e) => {
    e.preventDefault();
    const editedBook = {
      name: name,
      description: description,
      price: price
    }
    editBook(book._id, editedBook);
  }

  return (
    <Modal isOpen={open} toggle={handleEditModal}>
      <Card className="box-add-box">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Book
            </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={handleEditModal}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>

        <CardBody>
          <form onSubmit={editItem}>
            <FormGroup
              className={name === "" ? "has-danger" : "has-success"}
            >
              <Label for="exampleEmail">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name || ''}
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
                value={description || ''}
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
                value={price || ''}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>

            <Button color="primary" disabled={name === '' || description === '' || price === ''} type="submit">
              Edit
            </Button>

            <Button color="primary" onClick={() => deleteBook(book._id)}>
              Delete
            </Button>
          </form>
        </CardBody>
      </Card>

    </Modal>
  )
}

export default EditModal
