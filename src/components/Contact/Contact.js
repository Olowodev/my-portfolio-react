import React from 'react'
import { FaGithub, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import styles from './Contact.module.css'
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = ({cursor, setScreen}) => {
    
  return (
    <section id='contact' className={styles.contact} data-scroll-section>
        <div className={styles.contactContainer}>
            <div className={styles.contactHeader}>
                <p>NEED MY SERVICES?</p>
                <p>LET&apos;S TALK</p>
            </div>
            <div className={styles.contactButtonContainer}>
                <div className={styles.contactButton}>
                    <p>Discuss Your Project</p>
                </div>
            </div>
            <div className={styles.socials}>
                <div>
                    <FaTwitter />
                </div>
                <div>
                    <FaInstagram />
                </div>
                <div>
                    <FaWhatsapp />
                </div>
                <div>
                    <FaGithub />
                </div>
            </div>
            <div className={styles.credit}>
                <p>&#169;2022 Adebayo olowofoyeku, All Rights Reserved.</p>
            </div>
        </div>
    </section>
  )
}

export default Contact