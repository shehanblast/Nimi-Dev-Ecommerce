import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2"
import {Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import '../../Employee/createStore.css'
import {Link} from "react-router-dom";
import Footer from "../../Common/footer/footer";
import Header from "../../Common/Header/header";

const initialState = {

    Email: '',
    cd: '',
    EXP: '',
    sc:'',
    tot:0,

    id:'',
    touched: {
        Email: false,
        cd: false,
        EXP: false,
        sc:false,
    }


}

const SubmissionAlert = () => {

    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Item added successfully!',
        showConfirmButton: false,
        timer: 3000
    });

}

const SubmissionFail = (message) => {

    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })

}

class CartPayment extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = initialState;

    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

        validate =(Email,cd,EXP,sc)=> {
        const errors = {
            Email: '',
            cd: '',
            EXP: '',
            sc:''
        };
        // if (this.state.touched.Email && Email.length < 3)
        //     errors.Email = 'Invalid Item Name';
        if (this.state.touched.cd && cd.length != 12)
            errors.cd = 'Invalid Credit card number';
        if (this.state.touched.sc && sc.length != 3)
            errors.sc = 'Invalid Security Code';

        const reg1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.state.touched.Email && !reg1.test(Email))
            errors.Email = 'Email should contain a abc@gmail.com';
        return errors;
    }

    componentDidMount() {
        this.setState({
                tot: this.props.match.params.id
        });

        console.log(this.state.tot);
    }

    //check

    navigateStore() {
        window.location = `/empViewStore`
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }



    onSubmit(e) {
        e.preventDefault();
        if (this.state.cd.length != 12 || this.state.sc.length != 3 || this.state.Email.split('').filter(x => x === '@').length !== 1) {

            this.validate(this.state.cd,this.state.sc,this.state.Email);
            SubmissionFail();
        }
         else{
            SubmissionAlert();
        }

    }

    render() {
        const errors=this.validate(this.state.Email,this.state.cd,this.state.EXP,this.state.sc);
        return (
            <>
            <Header/>

            <div>
                <Form className="store_wrapper" onSubmit={this.onSubmit}>
                    <h2 className="store_title">Payment Details</h2>
                    <FormGroup>
                        <Label htmlFor="Email" className="form-label">Email</Label>
                        <div>
                            <Input
                                type="text"
                                className="form-control"
                                id="Email"
                                name="Email"
                                placeholder="Email"
                                value={this.state.Email}
                                onChange={this.onChange}
                                valid={errors.Email === ''}
                                invalid={errors.Email !== ''}
                                onBlur={this.handleBlur('Email')}
                            />
                            <FormFeedback>{errors.Email}</FormFeedback>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="Amount" className="form-label">Amount</label>
                        <div>
                            <Input
                                type="number"
                                className="form-control"
                                id="Amount"
                                name="Amount"
                                value={this.state.tot}
                            />
                        </div>
                    </FormGroup>
                    <Form className="store_wrapper">

                        <FormGroup>
                            <label htmlFor="cd" className="form-label">Credit Card</label>
                            <div>
                                <Input
                                    type="number"
                                    className="form-control"
                                    id="cd"
                                    name="cd"
                                    placeholder="Credit Card"
                                    pattern="[0-9]*"
                                    inputmode="numeric"
                                    value={this.state.cd}
                                    onChange={this.onChange}
                                    valid={errors.cd === ''}
                                    invalid={errors.cd !== ''}
                                    onBlur={this.handleBlur('cd')}
                                />
                                <FormFeedback>{errors.cd}</FormFeedback>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <input
                                type="date"
                                className="form-control"
                                id="EXP"
                                name="EXP"
                                placeholder="20"
                                value={this.state.EXP}
                                onChange={this.onChange}
                                valid={errors.EXP === ''}
                                invalid={errors.EXP !== ''}
                                onBlur={this.handleBlur('EXP')}
                            />
                            <FormFeedback>{errors.EXP}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <div>
                                <Input
                                    type="number"
                                    className="form-control"
                                    id="sc"
                                    name="sc"
                                    placeholder="Security Code"
                                    pattern="[0-9]*"
                                    inputmode="numeric"
                                    value={this.state.sc}
                                    onChange={this.onChange}
                                    valid={errors.sc === ''}
                                    invalid={errors.sc !== ''}
                                    onBlur={this.handleBlur('sc')}
                                />
                                <FormFeedback>{errors.sc}</FormFeedback>
                            </div>
                        </FormGroup>

                    </Form>
                    <button type="submit"  className="store_button btn btn-primary">Pay</button>

                </Form>

            </div>
                <Footer/>
            </>
        );


    }
}
export default CartPayment;
