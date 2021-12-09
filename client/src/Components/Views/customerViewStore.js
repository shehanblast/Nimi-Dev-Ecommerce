import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";
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

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Paper Rejected!',
        showConfirmButton: false,
        timer: 3000
    });
}

class CustomerViewStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            store: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5001/store/')
            .then(response => {
                this.setState({ store: response.data });
                console.log(response);
            })

    }

    navigateStoreItem(e, Id) {
        window.location = `/storeItem/${Id}`
        console.log(Id);
    }


    render() {
        return (
            <>
                <Header/>
            <div className="aa">
                <br/>

                <div className="container">

                    <div className="alert alert-primary" role="alert">
                        <h2>Store</h2>
                    </div>

                    <br/><br/>

                    <div className="row">
                        {this.state.store.length > 0 && this.state.store.map((item, index) => (
                            <div className="col-md-3">

                                <div className="card">
                                    <img className="w3-card-4 card-img-top" src={item.itemImage}  alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.itemName}</h5>
                                        <h6 className="card-text">{item.itemDescription}</h6>
                                        <hr/>
                                        <h6 className="card-text">LKR : {item.itemAmount}</h6>
                                        <hr/>
                                        <button className="btn btn-primary" onClick={e => this.navigateStoreItem(e,item._id)}>Add</button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>


                </div>
            </div>
        <Footer/>
    </>

        )
    }
}

export default CustomerViewStore;

