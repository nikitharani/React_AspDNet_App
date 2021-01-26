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
                Address: event.target.Street.value + ", " + event.target.City.value + ", " + event.target.Country.value + ", " + event.target.Zip.value,
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
                    <Modal.Body style={{ 'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto' }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="FirstName">
                                    <Form.Label>FirstName</Form.Label>
                                    <Form.Control type="text" name="FirstName" required
                                        placeholder="FirstName" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="LastName">
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control type="text" name="LastName" required
                                        placeholder="LastName" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="Email" required
                                    placeholder="Email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="Mobile">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control type="tel" name="Mobile"  required
                                        placeholder="(99)9999-9999" pattern='\d{10}' />

                                </Form.Group>
                                <Form.Group as={Col} controlId="Telephone">
                                    <Form.Label>Telephone</Form.Label>
                                    <Form.Control type="tel" name="Telephone"
                                        placeholder="Telephone" />
                                </Form.Group>
                            </Form.Row>
                            <legend>Address:</legend>

                            <Form.Row>

                                <Form.Group as={Col} controlId="Street">
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control type="street" name="Street" required
                                        placeholder="Street" />
                                </Form.Group>


                                <Form.Group as={Col} controlId="City">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="city" name="City" required
                                        placeholder="City" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="Country">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="country" name="Country" required
                                        placeholder="Country" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="Zip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control type="zip" name="Zip" required
                                        placeholder="Zip" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="StartDate">
                                <Form.Label>Date can start</Form.Label>
                                <Form.Control type="date" name="StartDate" required
                                    data-date-format="DD/MM/YYYY" min="2021-01-27" max="2021-12-31" />
                            </Form.Group>

                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Add Applicant
                        </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }
}
