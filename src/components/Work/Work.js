import styles from './Work.module.css'
import {Canvas, extend, useFrame, useLoader} from "@react-three/fiber"
import { Color, Texture, TextureLoader, Vector3 } from 'three';
import { shaderMaterial } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import slideVertex from "../../shaders/slideVertex.vert"
import slideFragment from "../../shaders/slideFragment.frag"
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'
import { workSlideShow } from '../../data';

gsap.registerPlugin(ScrollTrigger)



const SlideShaderMaterial = shaderMaterial(
    { uTime: 0, uHover: 0, uColor: new Color(1, 0.2, 1), uTexture: new Texture(), uMouse: new Vector3(), uPosition: new Vector3() },
    slideVertex,
    slideFragment
)

extend({SlideShaderMaterial})

const Picture = ({cover, index, setScreen}) => {
    const ref = useRef()
    const meshRef = useRef()
    const ref2 = useRef()
    const [state, setState] = useState({x: 0})
    //  useEffect(() => {
    //      const stuff = ref2.current
    //      console.log(stuff)
    //  }, [state])
    const onHover = (value) => {
        ref.current.uHover = value
    }
    const mouse = (e) => {
        ref.current.uMouse = e.point
    }
    useEffect(() => {
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
      }, [state, setScreen])
    useFrame(({clock}) => (ref.current.uTime = clock.getElapsedTime()))
    useFrame(() => (
        // eslint-disable-next-line no-sequences
        meshRef.current.position.x = (0.5 * index + 1) + state.x, 
        ref.current.uPosition = meshRef.current.position

    ))
   const [image] = useLoader(TextureLoader, [cover])
    return (
        <>
            <mesh onPointerEnter={()=> onHover(1)} onPointerLeave={() => onHover(0)} onPointerMove={(e) => mouse(e)} ref={meshRef}>
                <planeBufferGeometry ref={ref2} args={[0.4, 0.4, 16, 16]} />
                <slideShaderMaterial  ref={ref} uTexture={image}/>
                {/*<meshBasicMaterial />*/}
            </mesh>
        </>
    )
}
const Work = ({cursor, setScreen}) => {

    // useEffect(() => {
    //     ScrollTrigger.create({
    //         start: 'top top',
    //         end: 'bottom top',
    //         onToggle: self => self.isActive && console.log(2)
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
    return (
        <section id='work' data-scroll-section className={styles.work}>
            <div className={styles.workContainer}>
                <div>
                <h1>WORK</h1>
                </div>
            </div>
            
            {/* <Canvas style={{position: 'absolute', left: 0, top: 0, zIndex: 2}} camera={{fov: 8, position: [0, 0, 5]}} >
                
                <Suspense fallback={null}>
                    {workSlideShow.map((slide, index) => (
                        <Picture setScreen={setScreen} key={slide.id} index={index} {...slide} />
                    ))}
                </Suspense>
            </Canvas> */}
            
            <div className={styles.absoluteCircle1}></div>
            <div className={styles.absoluteCircle2}></div>
        </section>
    );
}

export default Work;