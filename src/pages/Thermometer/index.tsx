import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(Draggable);

const Thermometer = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const draggerRef = useRef<SVGGElement | null>(null);
    const dragTipRef = useRef<SVGPathElement | null>(null);
    const labelRef = useRef<SVGTextElement | null>(null);
    const liquidRefs = useRef<SVGUseElement[]>([]);
    const followerRef = useRef<SVGCircleElement | null>(null);

    useEffect(() => {
        if (
            !svgRef.current ||
            !draggerRef.current ||
            !dragTipRef.current ||
            !labelRef.current ||
            liquidRefs.current.length === 0 ||
            !followerRef.current
        ) {
            return;
        }

        const liquid = liquidRefs.current;
        const dragger = draggerRef.current;
        const dragTip = dragTipRef.current;
        const label = labelRef.current;
        const follower = followerRef.current;

        const minDragY = -380;
        const step = Math.abs(minDragY / 100);
        let followerVY = 0;
        let liquidId = 0;

        gsap.set(svgRef.current, { visibility: 'visible' });
        gsap.set(dragTip, { transformOrigin: '20% 50%' });

        const tl = gsap.timeline();
        tl.to(liquid, {
            x: '-=200',
            ease: 'linear',
            repeat: -1,
            duration: 0.7,
            stagger: 0.9,
        });
        tl.time(100);

        const onUpdate = () => {
            liquidId = Math.abs(
                Math.round((gsap.getProperty(dragger, 'y') as number) / step)
            );
            label.textContent = liquidId + '°';
            gsap.to(liquid, {
                y: (gsap.getProperty(dragger, 'y') as number) * 1.12,
                ease: 'elastic.out(1,0.4)',
                duration: 1.3,
            });
        };

        Draggable.create(dragger, {
            type: 'y',
            bounds: { minY: minDragY, maxY: 0 },
            onDrag: onUpdate,
            throwProps: true,
            throwResistance: 2300,
            onThrowUpdate: onUpdate,
            overshootTolerance: 0,
        });

        gsap.to(follower, {
            y: '+=0',
            repeat: -1,
            duration: 1,
            modifiers: {
                y: () => {
                    followerVY +=
                        ((gsap.getProperty(dragger, 'y') as number) -
                            (gsap.getProperty(follower, 'y') as number)) *
                        0.23;
                    followerVY *= 0.69;
                    return (
                        (gsap.getProperty(follower, 'y') as number) + followerVY
                    );
                },
            },
        });

        gsap.to(dragTip, {
            rotation: '+=0',
            repeat: -1,
            duration: 1,
            modifiers: {
                rotation: (rotation) => {
                    return (Number(rotation) || 0) - followerVY;
                },
            },
        });

        gsap.to(label, {
            y: '+=0',
            repeat: -1,
            duration: 1,
            modifiers: {
                y: (y) => Number(y) - followerVY * 0.5,
            },
        });

        gsap.to(dragger, {
            y: minDragY / 2,
            onUpdate: onUpdate,
            ease: 'expo.inOut',
            duration: 1.4,
        });
    }, []);

    return (
        <div className="bg-beige flex h-screen w-screen items-center justify-center overflow-hidden">
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 600"
                className="h-full w-full"
            >
                <defs>
                    <linearGradient
                        id="liquidGrad"
                        x1="557"
                        y1="150"
                        x2="557"
                        y2="546"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stopColor="#FF0909" />
                        <stop offset="0.2" stopColor="#F3481A" />
                        <stop offset="0.5" stopColor="#FABA2C" />
                        <stop offset="1" stopColor="#00BCF2" />
                    </linearGradient>
                    <rect
                        id="tube"
                        x="357"
                        y="150"
                        width="86"
                        height="400"
                        rx="43"
                        ry="43"
                    />
                    <clipPath id="liquidMask">
                        <use xlinkHref="#tube" />
                    </clipPath>
                    <clipPath id="tubeMask">
                        <use xlinkHref="#tube" />
                    </clipPath>
                    <path
                        id="liquid"
                        d="M757,552v490H357V552c50,0,50,20,100,20s50-20,100-20,50,20,100,20S707,552,757,552Z"
                    />
                    <mask id="gradMask">
                        <use
                            ref={(el) => {
                                if (el) liquidRefs.current[0] = el;
                            }}
                            xlinkHref="#liquid"
                            fill="#FCEFD6"
                        />
                        <use
                            ref={(el) => {
                                if (el) liquidRefs.current[1] = el;
                            }}
                            xlinkHref="#liquid"
                            fill="#EEE"
                            opacity="0.7"
                        />
                    </mask>
                </defs>

                <g transform="translate(0, -40)">
                    <use xlinkHref="#tube" fill="#C8D9D3" opacity="0.61" />
                    <g ref={draggerRef} className="cursor-pointer">
                        <circle cx="294" cy="540" r="36" fill="#3A3335" />
                        <path
                            ref={dragTipRef}
                            d="M315.5,556.76,299.24,540.5l16.26-16.26,36.26,16.26Z"
                            fill="#3A3335"
                        />
                        <text
                            ref={labelRef}
                            x="294"
                            y="551"
                            fill="#FFFCF9"
                            fontSize="1.8em"
                            fontFamily="sans-serif"
                            textAnchor="middle"
                            letterSpacing="1.2px"
                        >
                            100
                        </text>
                    </g>
                    <g mask="url(#gradMask)">
                        <use xlinkHref="#tube" fill="url(#liquidGrad)" />
                    </g>
                    <line
                        x1="371"
                        y1="200"
                        x2="371"
                        y2="443"
                        fill="none"
                        stroke="#FFF"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="8"
                        opacity="0.21"
                        strokeDasharray="153 30"
                        strokeDashoffset="-20"
                    />
                    <g
                        fill="none"
                        stroke="#FCEFD6"
                        strokeWidth="3"
                        strokeLinecap="round"
                    >
                        {[196, 234, 273, 311, 350, 388, 426, 465, 503].map(
                            (y) => (
                                <line key={y} x1="358" y1={y} x2="370" y2={y} />
                            )
                        )}
                    </g>
                    <circle
                        ref={followerRef}
                        cx="400"
                        cy="540"
                        r="0"
                        fill="#62B6CB"
                        stroke="#FCEFD6"
                    />
                </g>
            </svg>
        </div>
    );
};
export default Thermometer;
