import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import './nav.css'
import axios from "axios";
import {
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarToggler,
    Collapse,
    NavbarBrand,
} from 'reactstrap';
import Avatar from 'react-avatar';
import {Button} from "react-bootstrap";

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            image: '',
            firstname: '',
            lastname: '',
            position: '',
            isLoggedIn:false,
            id:''
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logoutOnClick = e => {
        localStorage.removeItem('token');
        localStorage.removeItem('userPosition');
        this.setState({
            isLoggedIn: false,
            user: ''
        })

        window.location.replace('/login')
    }



    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({
                user: null
            });
            return;
        }
        this.setState({
            token: token
        })
        axios({
            method: 'get',
            url: 'http://localhost:5001/users/',
            headers: {
                Authorization: token
            },
            data: {}
        }).then(res => {
            this.setState({
                image: res.data.imageUrl,
                firstname: res.data.firstName,
                lastname: res.data.lastName,
                position: res.data.position,
                id:res.data._id,
                isLoggedIn:true
            })
        }).catch(err => {
            console.log(err.message);
        });
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <NavbarBrand href="/">
                    {/*<img*/}
                    {/*    alt=""*/}
                    {/*    src={logo}*/}
                    {/*    width="100"*/}
                    {/*    height="30"*/}
                    {/*/>{' '}*/}
                    {/*&nbsp;*/}
                </NavbarBrand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {localStorage.getItem('userPosition') !== "employee" &&
                        localStorage.getItem('userPosition') !== "user" ||
                            localStorage.getItem('userPosition') === " "  ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page"
                                       href="/viewStore">Home</a>
                                </li>
                            </ul>
                            :
                            null
                        }
                        {localStorage.getItem('userPosition') === "employee" ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page"
                                       href="/empViewStore">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/createStore">Add Item</a>
                                </li>
                            </ul>
                            :
                            null
                        }
                        {localStorage.getItem('userPosition') === "user" ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page"
                                       href="/viewStore">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#">Cart</a>
                                </li>
                            </ul>
                            :
                            null
                        }
                    </Nav>
                    {localStorage.getItem('userPosition') === "employee" ||
                    localStorage.getItem('userPosition') === "user" ?
                        <Nav className="ml-auto">
                            <UncontrolledDropdown nav>
                                <DropdownToggle nav caret style={{color: 'white'}}>
                                    {this.state.firstname+ " " +this.state.lastname}
                                    <Avatar style={{marginLeft: '20px'}} size="25" round={true}
                                            name={this.state.firstname+ " " +this.state.lastname}
                                            src={this.state.image}/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.logoutOnClick}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        :
                        null
                    }
                    {
                    localStorage.getItem('userPosition') !== "employee" &&
                    localStorage.getItem('userPosition') !== "user" ||
                    localStorage.getItem('userPosition') === " " ?
                        <Nav className="btn pull-right">
                            <a href="/login"><Button className="button "
                                                     variant="outline-primary">Login</Button></a>
                            &nbsp;
                            &nbsp;
                            <a href="/register"><Button className="button"
                                                        variant="outline-primary">Register</Button></a>
                        </Nav>
                        :
                        null
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;