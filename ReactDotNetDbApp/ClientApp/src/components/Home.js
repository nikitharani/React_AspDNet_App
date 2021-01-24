import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>ReactJs CRUD with Asp.Net Web Application!</h1>
        <p>Welcome to the single-page application, built in Asp.Net with reactJs.</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a>/React-bootstrap for layout and styling</li>
        </ul>
            <p> This Application demonstrates sample CRUD (create, read, update & delete) operations on database. The <strong>Applicants Data</strong> section provides the details of the applicants applied for the jobs in a company. </p>
       </div>
    );
  }
}
