import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddApplicant } from './AddApplicant';
import { EditApplicant } from './EditApplicant';
import './applicationData.css';


export class ApplicantsData extends Component {


    constructor(props) {
        super(props);
        this.state = { applicantsData: [], loading: true, addModalShow: false, editModalShow: false, currentSort: 'default' };
    }

    componentDidMount() {
        this.populateApplicantsData();
    }
    componentDidUpdate() {
        this.populateApplicantsData();
    }
    //Delete
    deleteApplicant(empid) {
        if (window.confirm('Are you sure?')) {
            fetch("api/employee/" + empid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then((result) => {
                    alert(result);
                },
                    (error) => {
                        alert('Failed');
                    })
        }
    }

    // sort the date 
    // method called every time the sort button is clicked
    // it will change the currentSort value to the next one
    onSortChange = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        this.setState({
            currentSort: nextSort
        });
    };

    render() {
        const { editsno, editId, editFirstName, editLastName } = this.state;
        const { currentSort } = this.state;

        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        let applicantsData = this.state.applicantsData;

        //keyboard actions for date sort
        const sortTypes = {
            up: {
                class: 'sort-up',
                fn: (a, b) => a.dateOfStart.localeCompare(b.dateOfStart)
            },
            down: {
                class: 'sort-down',
                fn: (a, b) => b.dateOfStart.localeCompare(a.dateOfStart)
            },
            default: {
                class: 'sort',
                fn: (a, b) => a
            }
        };

        let tablecontents = (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead >
                    <tr >
                        <th>Sno</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Address</th>


                        <th>Start Date
                            <button className='ml-2' onClick={this.onSortChange}>
                                <i className={`fas fa-${sortTypes[currentSort].class} `} />
                            </button>
                        </th>
                        <th>Edit/Delete</th>


                    </tr>
                </thead>
                <tbody  >
                    {[...applicantsData].sort(sortTypes[currentSort].fn).map(applicantData =>
                        <tr key={applicantData.sno}>
                            <td>{applicantData.sno}</td>
                            <td>{applicantData.firstName}</td>
                            <td>{applicantData.lastName}</td>
                            <td>{applicantData.email}</td>
                            <td>{applicantData.mobile}</td>
                            <td>{applicantData.address}</td>
                            <td>{applicantData.dateOfStart}</td>
                            <td>
                                <ButtonToolbar>
                                    <div className="mr-2" >
                                        <Button className="mr-2 pr-4 pl-3" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                editsno: applicantData.sno,
                                                editId: applicantData.id,
                                                editFirstName: applicantData.firstName,
                                                editLastName: applicantData.lastName
                                            })}>
                                            Edit
                                    </Button>

                                        <EditApplicant show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            editsno={editsno}
                                            editid={editId}
                                            editFirstName={editFirstName}
                                            editLastName={editLastName}
                                        />
                                        <Button className="mr-2 mt-1" variant="danger"
                                            onClick={() => this.deleteApplicant(applicantData.id)}>
                                            Delete
                                    </Button>
                                    </div>

                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : tablecontents;


        //execution starts here
        return (
            <div>
                <div className="d-flex justify-content-between">
                    <h1 id="tabelLabel">Applicants Data</h1>
                    <ButtonToolbar>
                        <Button variant='primary'
                            onClick={() => this.setState({ addModalShow: true })}>
                            Add Applicant</Button>

                        <AddApplicant show={this.state.addModalShow}
                            onHide={addModalClose} />
                    </ButtonToolbar>
                </div>
                <p>Total Number of Applicants : {applicantsData.length}</p>
                {/*Add Applicant Button*/}
                {contents}

            </div>
        );
    }

    async populateApplicantsData() {
        const response = await fetch('api/employee');
        const data = await response.json();
        this.setState({ applicantsData: data, loading: false });
    }


}