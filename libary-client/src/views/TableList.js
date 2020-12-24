
import React, { useState, useEffect } from "react";
import '../styles.scss';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,

} from "reactstrap";
import axios from 'axios';
import AddModal from "components/AddModal";
import EditModal from "components/EditModal";

function Tables() {
  const [openAdd, setopenAdd] = useState(false)
  const [openEdit, setopenEdit] = useState(false)
  const [data, setData] = useState([]);
  const [selectedBook, setSelectedBook] = useState({})

  const handleAddModal = () => setopenAdd(prev => !prev)

  const handleEditModal = () => setopenEdit(prev => !prev)

  useEffect(() => {
    const getBook = async () => {
      const result = await axios(
        'http://localhost:8080/book',
      );
      setData(result.data);
    }
    getBook();
  }, []);

  if (data.length < 1) {
    return <h2>book empty</h2>
  }

  const addBook = async (book) => {
    const res = await axios.post('http://localhost:8080/book/create', book)
    const newBook = res.data;
    setData([...data, { ...newBook }])
    setopenAdd(false)
  }

  const editBook = async (id, book) => {
    const res = await axios.patch('http://localhost:8080/book/' + id, book)
    const newBook = res.data;
    setData(data.map(item => item._id === id ? { ...newBook } : item))
    setopenEdit(false);
    setSelectedBook({})
  }

  const deleteBook = async (id) => {
    const res = await axios.delete('http://localhost:8080/book/' + id)
    const newBook = res.data;
    setData(data.filter(item => item._id !== id))
    console.log(newBook);
    setopenEdit(false);
    setSelectedBook({})
  }

  const selectBook = (book) => {
    setopenEdit(true);
    setSelectedBook(book)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="header-table">
                <CardTitle tag="h4">Books</CardTitle>
                <Button onClick={handleAddModal} variant="success">Add book</Button>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>description</th>
                      <th>price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(book => (
                      <tr className="item-book" key={book._id} onClick={() => selectBook(book)}>
                        <td>{book.name}</td>
                        <td>{book.description}</td>
                        <td>{book.price}đ</td>
                      </tr>
                    ))}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <AddModal isOpen={openAdd} handleAddModal={handleAddModal} addBook={addBook} />
        <EditModal isOpen={openEdit} handleEditModal={handleEditModal} book={selectedBook} editBook={editBook} deleteBook={deleteBook} />
      </div>
    </>
  );
}

export default Tables;
