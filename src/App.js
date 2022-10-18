import './App.css';
import {useState, useRef, useEffect} from 'react'
import Layout from './components/Layout/Layout'
import Me from './components/Me/Me'
import About from './components/About/About'
import Work from './components/Work/Work'
import Contact from './components/Contact/Contact'
import gsap from 'gsap';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'



function App() {
  const [screen, setScreen] = useState(0)
  const [state, setState] = useState({x: 0})
  const containerRef = useRef(null)
  // const [cursorX, setCursorX] = useState()
  // const [cursorY, setCursorY] = useState()
  const cursor = useRef(null)
  gsap.registerPlugin(ScrollTrigger)

  const mouse = (e) => {
    cursor.current.style.left=`${e.clientX - 16}px`
    cursor.current.style.top=`${e.clientY - 16}px`
  }

  useEffect(() =>{
    window.addEventListener('mousemove', mouse)
  }, [])

  

  useEffect(()=> {
    ScrollTrigger.normalizeScroll(true)
    ScrollTrigger.normalizeScroll({
      type: "touch,wheel,pointer", // now the page will be drag-scrollable on desktop because "pointer" is in the list
      momentum: self => Math.min(3, self.velocityY / 1000) // dynamically control the duration of the momentum when flick-scrolling
    });
    ScrollTrigger.create( {
        trigger: '#me',
        start: 'top top',
        onToggle: self => self.isActive && setScreen(0)
      })
    
  }, [])

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
    });


    const tl = gsap.timeline(
      {
          scrollTrigger: {
            trigger: '#work',
            start: 'center center',
            end: '+=100%',
            pin: true,
            anticipatePin: 1,
            scrub: true,
            onToggle: self => self.isActive && setScreen(2)
          },
          defaults: {ease: 'none'}
        }
  );
  tl.to(state, {
    x: -2.5,
  })

  ScrollTrigger.create( {
      trigger: '#contact',
      start: self => self.previous().end,
      onToggle: self => self.isActive && setScreen(3)
    }
  )
    
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
    <div className="App">
      {/* <LocomotiveScrollProvider 
        options={
          {
            smooth: true
          }
        }
        watch={
          []
        }
        containerRef={containerRef}
      > */}
        <main data-scroll-container ref={containerRef}>
          <div ref={cursor} className='cursor' style={{}}></div>
          
          <Layout cursor={cursor} screen={screen}>
            <Me setScreen={setScreen} cursor={cursor} />
            <About setScreen={setScreen} cursor={cursor} /> 
            <Work state={state} setScreen={setScreen} cursor={cursor} />
            <Contact cursor={cursor} setScreen={setScreen} />
          </Layout>
        </main>
      {/* </LocomotiveScrollProvider> */}
    </div>
  );
}

export default App;
