import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';


gsap.registerPlugin(ScrollTrigger)



const Layout = ({children, screen, cursor}) => {
    
    const onMouseEnter = () => {
        cursor.current.style.width = '60px';
        cursor.current.style.height = '60px';
        cursor.current.style.marginLeft = '-14px';
        cursor.current.style.marginTop = '-14px';
}

const onMouseLeave = () => {
    cursor.current.style.width = '35px';
    cursor.current.style.height = '35px';
    cursor.current.style.marginLeft = '0px';
    cursor.current.style.marginTop = '0px';
}
    return (
        <div>
                <div className='leftFixed'>
                <div className='icons'>
                    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className='icon'>
                        <a href='https://www.instagram.com/olowoo_a/' rel='noreferrer' target='_blank' ><FaInstagram onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} size={21} /></a>
                    </div>
                    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className='icon'>
                        <a href='https://www.linkedin.com/in/adebayo-olowofoyeku-0930a3230/' rel='noreferrer' target='_blank' ><FaLinkedinIn size={21} /></a>
                    </div>
                    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className='icon'>
                        <a href='https://twitter.com/olowoo_a' rel='noreferrer' target='_blank' ><FaTwitter size={21} /></a>
                    </div>
                    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className='icon'>
                        <a href='https://github.com/Olowodev' rel='noreferrer' target='_blank' ><FaGithub size={21} /></a>
                    </div>
                </div> 
                <div className='vLine'></div>
                </div>
                    {children}
                <div className='middleFixed'>
                <div className={`dot ${screen === 0 ? 'active' : null}`}></div>
                <div className={`dot ${screen === 1 ? 'active' : null}`}></div>
                <div className={`dot ${screen === 2 ? 'active' : null}`}></div>
                <div className={`dot ${screen === 3 ? 'active' : null}`}></div>
                {/* <div className={`dot ${screen == 4 ? 'active' : null}`}></div> */}
                </div>
                <div className='rightFixed'>
                <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className='rightFixedText'>
                    <a href='/'>adebayoolowofoyeku@gmail.com</a>
                </div>
                <div className='vLine'></div>
                </div>
        </div>
    );
}

export default Layout;