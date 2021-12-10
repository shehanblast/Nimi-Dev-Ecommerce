import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";
import jsPDF from "jspdf";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import { ExportToCsv } from 'export-to-csv';
// import * as jsPDF from "jspdf";
import 'jspdf-autotable'

//Common
import Footer from "../Common/footer/footer"
import Header from "../Common/Header/header"

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}

class EmpViewStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            store: [],
            num : 0,
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5001/store/')
            .then(response => {
                this.setState({ store: response.data });
                console.log(response);
            })

    }

    navigateEditStore(e, Id) {
        window.location = `/editStore/${Id}`
        console.log(Id);
    }

    deletePaper(id){
        axios.delete(`http://localhost:5001/store/${id}`)
            .then(response => {
                this.setState({ paper: response.data });
                SubmissionAlert1()
            })
        window.location = `/empViewStore`
    }

    navigateCreateStore(e) {
        window.location = `/createStore`
    }

    ExportCSV = () => {
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            filename :'equinox all Store Items report',
            title: 'All Store items Details CSV ',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: false,
            headers: [ 'Item Name','Description','Amount', 'QTY'],
        };

        const data = this.state.store.map(elt=> [elt.itemName, elt.itemDescription,elt.itemAmount, elt.itemQTY]);
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
    }

    ExportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(25);


        const title = "Nimi-dev Ecommerce Store Items Details Report";
        const headers = [['Item Name','Description','Amount', 'QTY']];

        const data = this.state.store.map(elt=> [elt.itemName, elt.itemDescription,elt.itemAmount, elt.itemQTY]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.setFont('helvetica')
        doc.setTextColor(0, 0, 255)
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("equinox all Store Items report.pdf")
    }


    render() {
        return (
            <>
                <Header/>
                    <div>
                        <br/>
                        <div className="container emp">
                            <div className="alert btn-dark" role="alert">
                                <h2>Store Details</h2>
                            </div>
                            <table className="table table-hover">
                                <thead className="thead-dark">
                                <tr className="table-dark" style={{textAlign:"center"}}>
                                    <th scope="col">ID</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">QTY</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.store.length > 0 && this.state.store.map((item, index) => (
                                    <tr style={{textAlign:"center"}}>
                                        <th scope="row">{++this.state.num}</th>
                                        <td><img  src={item.itemImage} style={{width:"80px",height:"80px"}} alt="Card image cap"/></td>
                                        <td>{item.itemName}</td>
                                        <td>{item.itemDescription}</td>
                                        <td>{item.itemAmount}</td>
                                        <td>{item.itemQTY}</td>
                                        <td >
                                            <button className="btn btn-warning"  onClick={e => this.navigateEditStore(e,item._id)}> <i className="fas fa-edit">&nbsp;</i>Edit</button>
                                            &nbsp;
                                            <button className="btn btn-danger" onClick={e => this.deletePaper(item._id)}><i className="fas fa-times">&nbsp;</i>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col-md-6">
                                    <button className="btn btn-success" onClick={e => this.navigateCreateStore()}>Add new Item</button>
                                </div>
                                <div className="col-md-6">
                                    <div align="right">
                                        <UncontrolledDropdown>
                                            <DropdownToggle style={{color: 'white', backgroundColor: "blue", width:"280px"}}
                                                            className="btn btn-lg">
                                                <i className="fa fa-download"></i>&nbsp;Generate Report&nbsp;
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem onClick={this.ExportPDF}>
                                                    PDF File
                                                </DropdownItem>
                                                <DropdownItem divider/>
                                                <DropdownItem onClick={this.ExportCSV}>
                                                    CSV File
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer/>
            </>
        )
    }
}

export default EmpViewStore;

