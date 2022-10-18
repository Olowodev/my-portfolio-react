import { useEffect, useRef } from "react";
import { useLocomotiveScroll, LocomotiveScrollProvider } from "react-locomotive-scroll";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {gsap} from 'gsap'
import { useRouter } from 'next/router';


gsap.registerPlugin(ScrollTrigger)

const ScrollTriggerProxy = () => {
    const {scroll} = useLocomotiveScroll();

    useEffect(() => {
        if (scroll) {
            const element = scroll?.el
            scroll.on('scroll', () => { 
                ScrollTrigger.update()
            })
            ScrollTrigger.scrollerProxy(element, {
                scrollTop(value) {
                    return arguments.length
                    ? scroll.scrollTo(value, 0, 0)
                    : scroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                    };
                },
                pinType: element.style.transform ? "transform" : "fixed"
            }
        )
      }
    
      return () => {
        const lsUpdate = () => {
          if (scroll) {
            scroll.update();
          }
        }
    
        ScrollTrigger.addEventListener('refresh', lsUpdate)
        ScrollTrigger.refresh();
      }
    }, [scroll]);

    return null;
    
}


const MainLayout = ({children}) => {
    const { asPath } = useRouter()
  const containerRef = useRef(null)
  const {scroll} = useLocomotiveScroll();

  console.log(scroll)
    return (
        <>
        <LocomotiveScrollProvider
                options={{
                    smooth: true,
                    multiplier: 1,
                    class: 'is-reveal',
                    tablet: {smooth: true},
                    mobile: {smooth: true}
                }}
                watch={
                    []
                }
                location={asPath}
                onLocationChange={(scroll)=> scroll.scrollTo(0, { duration: 0, disableLerp: true})}
                containerRef={containerRef}
            >
                <ScrollTriggerProxy />
                <main data-scroll-container ref={containerRef} >
                    {children}
                </main>
            </LocomotiveScrollProvider>
        </>
    );
}

export default MainLayout;