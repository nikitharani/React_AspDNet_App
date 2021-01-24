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
                LastName: event.target.LastName.value,
                Email: event.target.Email.value,
                Mobile: parseInt(event.target.Mobile.value),
                Telephone: parseInt(event.target.Telephone.value),
                Address: event.target.Street.value + ", \n" + event.target.City.value + ", \n" + event.target.Country.value + ", \n" + event.target.Zip.value,
                DateOfStart: event.target.StartDate.value
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
                                    <Form.Group controlId="Email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="Email" required
                                            placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group controlId="Mobile">
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control type="tel" name="Mobile" required
                                            placeholder="Mobile" />
                                    </Form.Group>
                                    <Form.Group controlId="Telephone">
                                        <Form.Label>Telephone</Form.Label>
                                        <Form.Control type="tel" name="Telephone" 
                                            placeholder="Telephone" />
                                    </Form.Group>
                                    <Form.Group controlId="Street">
                                        <Form.Label>Street</Form.Label>
                                        <Form.Control type="street" name="Street" required
                                            placeholder="Street" />
                                    </Form.Group>
                                    <Form.Group controlId="City">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="city" name="City" required
                                            placeholder="City" />
                                    </Form.Group>
                                    <Form.Group controlId="Country">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="country" name="Country" required
                                            placeholder="Country" />
                                    </Form.Group>
                                    <Form.Group controlId="Zip">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control type="zip" name="Zip" required
                                            placeholder="Zip" />
                                    </Form.Group>
                                    <Form.Group controlId="StartDate">
                                        <Form.Label>Date can start</Form.Label>
                                        <Form.Control type="date" name="StartDate" required
                                            data-date-format="DD/MM/YYYY"/>
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
