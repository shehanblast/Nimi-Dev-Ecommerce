import React from "react";
import './footer.css'
// import logo from '../../images/logo.png'

function Footer() {
    return(
        <>
            <br/> <br/> <br/>
            <div className="footer">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4 offset-1 col-sm-2">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="/home">Home</a></li>
                                <li><a href="/home">About</a></li>
                                <li><a href="/home">Menu</a></li>
                                <li><a href="/home">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-7 col-sm-5">
                            <h5>Address</h5>
                            <address>
                                58, solaman road,<br />
                                Wakada,<br />
                                Panadura<br />
                                <i className="fa fa-phone fa-lg"></i>: +94 765 537 570<br />
                                <i className="fa fa-fax fa-lg"></i>: +94 765 537 570<br />
                                <i className="fa fa-envelope fa-lg"></i>: <a href="shihanbinuka@gmail.com">
                                shihanbinuka@gmail.com</a>
                            </address>
                        </div>
                        <div className="col-12 col-sm-4 align-self-center">
                            <div className="text-center">
                                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                                <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                                <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                                <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                                <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                                <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                            </div>
                            <br/>
                            <h3>Nimi-Dev Ecommerce</h3>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <p>© Copyright 2021 Binuka</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;
