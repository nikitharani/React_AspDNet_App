import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
//import { DatePicker, DatePickerInput } from 'rc-datepicker';

import { AddApplicant } from './AddApplicant';
import { EditApplicant } from './EditApplicant';


export class ApplicantsData extends Component {

    //static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {applicantsData: [], loading: true, addModalShow: false, editModalShow: false};
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
            fetch("api/employee/"+empid, {
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
    render() {
        //added new line
        const { editsno, editId, editFirstName, editLastName } = this.state;      

        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        let applicantsData = this.state.applicantsData;

        let tablecontents = (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                    </tr>
                </thead>
                <tbody>
                    {applicantsData.map(applicantData =>
                        <tr key={applicantData.sno}>
                            <td>{applicantData.sno}</td>
                            <td>{applicantData.firstName}</td>
                            <td>{applicantData.lastName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
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

                                    <Button className="mr-2" variant="danger"
                                        onClick={() => this.deleteApplicant(applicantData.id)}>
                                            Delete
                                    </Button> 

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
                <h1 id="tabelLabel" >Applicants Data</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {/*<button type="button" >All Employee</button>
                 <Button variant='primary'
                    onClick={() => this.setState({ addModalShow: true })}>
                    Add Employee</Button>*/}

                {contents}
                
                {/*Add Employee Button*/}
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Employee</Button>

                    <AddApplicant show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        );
    }

    async populateApplicantsData() {
        const response = await fetch('api/employee');
        const data = await response.json();
        this.setState({ applicantsData: data, loading: false });
    }

    // sorting function for date
    //onSortChange = () => {
    //    /*
    //    assuming your data is something like
    //    [
    //      {accountname:'foo', negotiatedcontractvalue:'bar'},
    //      {accountname:'monkey', negotiatedcontractvalue:'spank'},
    //      {accountname:'chicken', negotiatedcontractvalue:'dance'},
    //    ]
    //    */
    //    const data = this.state.data;
    //    data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    //    this.setState({ data })
    //}
}