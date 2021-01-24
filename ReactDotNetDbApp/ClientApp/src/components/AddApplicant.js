import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddApplicant extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("api/employee", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: event.target.FirstName.value,
                LastName: event.target.LastName.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }
    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    {/*<Form.Group controlId="Sno">
                                        <Form.Label>Sno</Form.Label>
                                        <Form.Control type="text" name="Sno" required
                                            placeholder="Sno" />
                                    </Form.Group>*/}
                                    <Form.Group controlId="FirstName">
                                        <Form.Label>FirstName</Form.Label>
                                        <Form.Control type="text" name="FirstName" required
                                            placeholder="FirstName" />
                                    </Form.Group>
                                    <Form.Group controlId="LastName">
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control type="text" name="LastName" required
                                            placeholder="LastName" />
                                    </Form.Group>
                                    <Form.Group controlId="StartDate">
                                        <Form.Label>Date can start</Form.Label>
                                        <Form.Control type="date" name="StartDate" required
                                            placeholder="StartDate" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Employee
                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }
}
