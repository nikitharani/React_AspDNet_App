
import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditApplicant extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("api/employee", {
            method: 'PUT',
            headers: {
                // 'mode': 'no-cors',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Sno: event.target.Sno.value,
                Id: this.props.editid,
                FirstName: event.target.FirstName.value,
                LastName: event.target.LastName.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
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
                            Edit Applicant Details
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Sno">
                                        <Form.Label>Sno</Form.Label>
                                        <Form.Control type="text" name="Sno" required
                                            disabled
                                            defaultValue={this.props.editsno}
                                            placeholder="Sno" />
                                    </Form.Group>

                                    <Form.Group controlId="FirstName">
                                        <Form.Label>FirstName</Form.Label>
                                        <Form.Control type="text" name="FirstName" required
                                            defaultValue={this.props.editFirstName}
                                            placeholder="FirstName" />
                                    </Form.Group>
                                    <Form.Group controlId="LastName">
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control type="text" name="LastName" required
                                            defaultValue={this.props.editLastName}
                                            placeholder="LastName" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Edit Applicant
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

