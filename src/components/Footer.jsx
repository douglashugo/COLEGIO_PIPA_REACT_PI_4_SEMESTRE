import React, { useState } from 'react';
import { FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { CgMail } from 'react-icons/cg';
import styles from './Footer.module.css';

const Footer = () => {

    return (

        <footer className={styles["footer-distributed"]}>
            <div className={styles["footer-left"]}>
                <p className={styles["footer-company-name"]}> Copyrigth &copy; 2023 <strong> Colégio Pipa </strong>
                    All rigths reserved</p>
            </div>

            <div className={styles["footer-right"]}>
                <p className={styles["footer-company-about"]}>
                    <br />Construindo futuros brilhantes através da Exploração! 💙
                </p>

                <div className={styles["footer-icons"]}>
                    <a href="https://www.instagram.com/colegiopipa"><i className={styles["icon-instagram"]}><FaInstagram /></i>
                    </a>
                    <a href="#"><i className={styles["icon-gmail"]}><CgMail /></i></a>
                </div>
            </div>
        </footer>

    );
};

export default Footer;