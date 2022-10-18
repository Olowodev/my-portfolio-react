import styles from './About.module.css'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger)

const About = ({cursor, setScreen}) => {

    const about = useRef()
useEffect(()=>{
    console.log(about.current.scrollHeight)

}, [])
    // useEffect(() => {
    //     ScrollTrigger.create({
    //         start: 'top top',
    //         end: 'bottom top',
    //         onToggle: self => self.isActive && setScreen(1)
    //     })
    // }, [])
    
//     const onMouseEnter = () => {
//         cursor.current.style.width = '60px';
//         cursor.current.style.height = '60px';
//         cursor.current.style.marginLeft = '-14px';
//         cursor.current.style.marginTop = '-14px';
// }

// const onMouseLeave = () => {
//     cursor.current.style.width = '35px';
//     cursor.current.style.height = '35px';
//     cursor.current.style.marginLeft = '0px';
//     cursor.current.style.marginTop = '0px';
// }

useEffect(()=> {
    
    let ctx = gsap.context(() => {
    gsap.timeline(
      {
        scrollTrigger: {
          trigger: '#about',
          markers: true,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: true,
          onToggle: self => self.isActive && setScreen(1)
        }
      }
    )
    .to('#svg', {
      strokeDashoffset: 0,
      duration: 13
    })
    .to('#text', {
      y: -100,
      opacity: 0,
      duration: 5
    })
    .to('#svg', {
      opacity: 0,
      duration: 5
    })
    .to('#story', {
      y: -700,
      duration: 20
    })
    
})

return () => ctx.revert();
  }, [setScreen])

  useEffect(()=> {
    const changeColorToWhite = (p) => {
      gsap.to(p, {color: 'white'})
    }
    const changeColorToGrey = (p) => {
      gsap.to(p, {color: 'rgba(255, 255, 255, 0.2)'})
    }
    window.addEventListener('scroll', ()=> {
     const div = gsap.getProperty('#story', 'y')
    let ps = gsap.utils.toArray('#p')
      ps.forEach((p, i) => {
        if (div < (-355 - (75 * i))) {
          changeColorToWhite(p)
        } else if (div === 0) {
          changeColorToGrey(p)
        }
      })
      
  })
})


    return (
        <section data-scroll-section id='about' ref={about} className={styles.about}>
            <div className={styles.aboutContainer}>
            {/*<Spline scene="https://prod.spline.design/xJt-o69YUXzq3zur/scene.splinecode" />*/}
                {/*<div className={styles.aboutBox}></div>*/}
                <svg className={styles.aboutBox} width="450" height="450" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect id='svg' x="4" y="4" width="442" height="442" stroke="black" rx="15" strokeWidth="8"/>
                </svg>

                <h1 id='text'>
                    <span>WHO </span> 
                    <span>AM </span> 
                    <span>I?</span>
                </h1>

                <div className={styles.story} id='story'>
                    <p id='p'>I AM ME</p>
                    <p id='p'>TAKE AM LIKE THAT</p>
                    <p id='p'>NO STRESS ME</p>
                    <p id='p'>SHA BRING JOB</p>
                    <p id='p'>E MU SE WA</p>
                </div>
            </div>
        </section>
    );
}

export default About;