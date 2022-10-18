import './App.css';
import {useState, useRef, useEffect} from 'react'
import Layout from './components/Layout/Layout'
import Me from './components/Me/Me'
import About from './components/About/About'
import Work from './components/Work/Work'
import Contact from './components/Contact/Contact'
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'



function App() {
  const [screen, setScreen] = useState(0)
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

  return (
    <div className="App">
      <div ref={cursor} className='cursor' style={{}}></div>
      
      <Layout cursor={cursor} screen={screen}>
        <Me setScreen={setScreen} cursor={cursor} />
        <About setScreen={setScreen} cursor={cursor} /> 
        <Work setScreen={setScreen} cursor={cursor} />
        <Contact cursor={cursor} setScreen={setScreen} />
      </Layout>
    </div>
  );
}

export default App;
