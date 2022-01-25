    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline()
    let bool = false
    const toggle = document.querySelector('.menu')
    toggle.addEventListener('click', function(){
        if(bool == false){
            gsap.to('.bar1',{duration:.2,width:'45px',height:'6px',top:'45%',rotate:'45deg'})
            gsap.to('.bar3',{duration:.2,width:'45px',height:'6px',top:'45%',rotate:'-45deg'})
            gsap.to('.bar2',{duration:.2,opacity:0})

            tl.to('.scroller',{duration:.5,opacity:0,display:'none'})
            tl.to('.dialog',{duration:.5,opacity:1})
            tl.to('li',{duration:.1,opacity:1,y:10,stagger:.1})
            bool = true;
        }else{
            tl.to('li',{duration:.1,opacity:0,y:-10,stagger:.1})
            tl.to('.dialog',{duration:.5,opacity:0})
            tl.to('.scroller',{duration:.5,opacity:1,display:'block'})
            gsap.to('.bar1',{duration:.2,width:'37px',height:'5px',top:'25%',rotate:'0deg'})
            gsap.to('.bar3',{duration:.2,width:'37px',height:'5px',top:'65%',rotate:'0deg'})
            gsap.to('.bar2',{duration:.2,opacity:1})
            bool = false
        }
    })

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".scroller"),
    smooth: true,
    // multiplier: 2,
    smoothMobile: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".scroller", {
    scrollTop(value) {
        return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
        };
    },

    pinType: document.querySelector(".scroller").style.transform
        ? "transform"
        : "fixed"
    });

    gsap.from('.intro-text',1,{
        opacity:0,y:'100px',stagger:.1
    })
    

    gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });

    var images = gsap.utils.toArray(".panel:not(.purple)");

    images.forEach((image, i) => {
    var tl = gsap.timeline({
        scrollTrigger: {
        trigger: "section.black",
        scroller: ".scroller",

        start: () => "top -" + window.innerHeight * i,

        end: () => "+=" + window.innerHeight,
        scrub: true,
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
        // markers: true,
        id:'image'
        }
    });

    tl.fromTo(
        image,
        {
        height: () => {
            return "100%";
        }
        },
        {
        height: () => {
            return "0%";
        },
        ease: "none"
        }
    );
    });

    ScrollTrigger.create({
    trigger: "section.black",
    scroller: ".scroller",
    // markers: true,
    // id:'warp',

    /*---*/
    pin: ".p-wrap",

    start: () => "top top",
    end: () => "+=" + images.length * window.innerHeight,
    invalidateOnRefresh: true
    });

    gsap.to('.hero-img',{
        width:'100%',
        height:'100%',
        scrollTrigger:{
            trigger:'.hero',
            start:'top top',
            end:'bottom top',
            scroller: ".scroller",
            pin:true,
            // markers:true,
            scrub:true,
        }
    })
    let pinWrap = document.querySelector(".white");
    let pinWrapWidth = pinWrap.offsetWidth;
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;
    gsap.to('.white',{
        x:-horizontalScrollLength,
        scrollTrigger:{
            trigger:'.white',
            start:'top top',
            end: pinWrapWidth * 2,
            scroller: ".scroller",
            pin:true,
            // markers:true,
            scrub:true,

        }
    })

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();