/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.teal.200'),
              '&:hover': {
                color: theme('colors.teal.300'),
              },
            },
            strong: {
              color: theme('colors.emerald.100'),
            },
            code: {
              color: theme('colors.teal.400'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.teal.200'),
              '&:hover': {
                color: theme('colors.teal.300'),
              },
            },
          },
          strong: {
            color: theme('colors.emerald.100'),
          },
          code: {
            color: theme('colors.teal.400'),
          },
        },
      }),
      colors: {
        background: "#121212",
        text: "#e0e0e0",
        accent: "#F4D9D0",
        customGreen: '#cef2db',
      },
       boxShadow: {
        pink: '0 0 3px rgb(249 168 212)',
        amber: '0 0 3px rgb(224, 183, 20)',
        rose: '0 0 3px rgb(224 09 72)',
        emerald: '0 0 3px  rgb(52 211 153)',
        orange: '0 0 3px  rgb(194 65 12)',
        purple: '0 0 3px  rgb(147 51 234)',
        teal: '0 0 3px rgb(45 212 191)',
      },
       scale: {
        '80': '0.8',
      },
      borderWidth: {
        '3': '3px',
      },
      borderStyle: {
        outset: 'outset',
      },
      screens: {
        'xs': '324px', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        gba: ['gba', 'sans-serif'], 
        pix: ['pix', 'sans-serif'],
        pixel: ['pixel', 'sans-serif'],
        kiwi: ['kiwi', 'sans-serif'],
        pixround: ['pixround', 'sans-serif'],
        // pubpixel: ['pubpixel', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        chakra: ['Chakra Petch', 'sans-serif'],
        gotic: ['DotGothic16', 'sans-serif'],
        major: ['Major Mono Display', 'sans-serif'],
        orbi: ['Orbitron', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        sourceCode: ['Source Code Pro', 'monospace'], 
      },
      animation: {
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'shake': 'shake 1s ease-in-out infinite',
        'fade-in': 'fadeIn 1.5s ease-out infinite forwards',
        'move-up': 'moveUp 2s ease-in-out infinite',
        fadeOut: 'fadeOut 1.5s ease-out infinite',
        zoomin: 'zoom-in 1s ease-in-out 0.25s 1',
        zoomout: 'zoom-out 1s ease-in-out 0.25s 1',
        tada: 'tada 1s ease-in-out infinite',
        tadaTwo: 'tada 2.77s ease-in-out infinite',
        tadaOne: 'tada 1s ease-in-out 0.25 forwards',
        spinnergrow: 'spinner-grow 1s ease-in-out 0.25s 1',
        placeholderwave: 'placeholder-wave 1s ease-in-out 0.25s 1',
        showUpClock: 'showUpClock 1s ease-in-out 0.25s 1',
        dropin: 'dropIn  0.5s ease-in-out 0.25s 1',
        dropout: 'drop-out 0.5s ease-in-out 0.25s 1',
        flyIn: 'flyIn 0.6s ease-in-out 0.25s 1',
        flyout: 'flyout 0.6s ease-in-out 0.25s 1',
        flyoutup: 'fly-out-up 0.6s ease-in-out 0.25s 1',
        flyoutdown: 'fly-out-down 0.6s ease-in-out 0.25s 1',
        jiggle: 'jiggle 0.6s ease-in-out 0.25s 1',
        flash: 'flash 0.6s ease-in-out infinite',
        flash1: 'flash 1s ease-in-out 3 forwards',
        flashSlow: 'flash 1s ease-in-out infinite',
        glowTeal: 'glowTeal 1.6s ease-in-out forwards',
        glowPink: 'glowPink 3s ease-in-out forwards',
        glowPurple: 'glowPurple 1.6s ease-in-out forwards',
        glowAmber: 'glowAmber 0.3s ease-in-out infinite',
        glowOrange: 'glowOrange 1.6s ease-in-out forwards',
        glowRose: 'glowRose 3.3s ease-in infinite',
        glowEme: 'glowEme 1.6s ease-in-out infinite',
        zoomIn: 'zoomin 1s ease-out 0.25s 1',
        zoomOut: 'zoomout 1s ease-out 0.25s 1',
        flipx: 'flipx 1.5s ease-out infinite',
        flippy: 'flippy 1.5s ease-out infinite',
        flipyup: 'flipyup 1s ease 0.25s 1',
        flippydown: 'flippy-down 1s ease 0.25s 1',
        pulseright: 'pulse-right 1s ease-in-out infinite',
        showUpTada: 'showUpTada 1.5s ease-in-out 1', 
        rotateDisk: 'rotateDisk 3s linear infinite',
        glowText: 'glowText 1.5s ease-in-out infinite alternate',
        glowText1: 'glowText1 1.5s ease-in-out infinite alternate',
        glowText2: 'glowText2 1.5s ease-in-out infinite alternate',
        fadeOutScale: 'fadeOutScale 0.5s ease-out forwards',
        disappear: 'disappear 1.5s ease-out forwards',
        reduceAndFade: 'reduceAndFade 0.1s ease-out forwards',
        colorCycle: 'colorCycle 2.5s infinite',
        colorFast: 'colorCycle 0.8s infinite',
        colorSlow: 'colorCycle 6s infinite',
        blinkAndBounce: 'blinkAndBounce 4s ease-in-out infinite',
        blinkAndBounce1: 'blinkAndBounce 4s ease-in-out forwards',
        glowColorCycle: 'glowColorCycle 5s ease-in-out infinite',
        glowShadowCycle: 'glowShadowCycle 5s ease-in-out infinite',
        glowGreenShadowCycle: 'glowGreenShadowCycle 5s infinite',
        borderGlow: 'borderGlow 1.5s ease-in-out infinite alternate',
        borderGlow1: 'borderGlow1 1.5s ease-in-out infinite alternate',
        glowBoxCycle: 'glowBoxCycle 0.5s ease-in-out infinite',
        tvflickerRose: 'tvflicker-rose 3s infinite',
        tvflickerMixed: 'tvflicker-mixed 3s infinite',
        fastBlink: 'fastBlink 0.35s infinite',
      },
      keyframes: {
        
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        tada: {
          "0%": { transform: "scale(1)" },
          "10%": { transform: "scale(1.1)" },
          "20%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.1)" },
          "40%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "60%": { transform: "scale(1)" },
          "70%": { transform: "scale(1.1)" },
          "80%": { transform: "scale(1)" },
          "90%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        flipx: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(180deg)' },
        },
        flipy: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        glowTeal: {
          '0%': { boxShadow: '0 0 5px #fff' },
          '50%': { boxShadow: '0 0 10px #fff, 0 0 15px rgb(45 212 191)' },
          '100%': { boxShadow: '0 0 5px #fff' },
        },
        glowPink: {
          '0%': { boxShadow: '0 0 5px #fff' },
          '50%': { boxShadow: '0 0 10px #fff, 0 0 15px rgb(249 168 212)' },
          '100%': { boxShadow: '0 0 5px #fff' },
        },
        glowPurple: {
          '0%': { boxShadow: '0 0 5px #fff' },
          '50%': { boxShadow: '0 0 10px #fff, 0 0 15px rgb(147 51 234)' },
          '100%': { boxShadow: '0 0 5px #fff' },
        },
        glowAmber: {
          '0%': { boxShadow: '0 0 5px #fff' },
          '50%': { boxShadow: '0 0 10px #fff, 0 0 15px rgb(245 158 11)' },
          '100%': { boxShadow: '0 0 5px #fff' },
        },
        glowOrange: {
          '0%': { boxShadow: '0 0 5px #fff' },
          '50%': { boxShadow: '0 0 10px #fff, 0 0 15px rgb(194 65 12)'},
          '100%': { boxShadow: '0 0 5px #fff' },
        },
        glowEme: {
          '0%': { boxShadow: '0 0 5px #fff' },
          '50%': { boxShadow: '0 0 10px #fff, 0 0 15px rgb(52 211 153)' },
          '100%': { boxShadow: '0 0 5px #fff' },
        },
        glowRose: {
          '0%': { boxShadow: '0 0 5px #fff' },
          '50%': { boxShadow: '0 0 10px #fff, 0 0 15px rgb(225 29 72)' },
          '100%': { boxShadow: '0 0 5px #fff' },
        },
        zoomin: {
          '0%, 1%': { transform: 'scale(0), opacity(0)' },
          '100%': { transform: 'scale(1), opacity(1)' },
        },
        jiggle: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-5px)' },
          '100%': { transform: 'translateX(0)' },
        },
        flash: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        flyIn: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
        flyout: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-100%)', opacity: 0 },
        },
        spinnergrow: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '50%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0)', opacity: 1 },
        },
        placeholderwave: {
        '0%': { backgroundPosition: '-200px 0' },
        '100%': { backgroundPosition: '200px 0' },
      },
      dropIn: {
        '0%': { transform: 'translateY(-100%)', opacity: 0 },
        '100%': { transform: 'translateY(0)', opacity: 1 },
      },
      showUpClock: {
        '0%': { transform: 'scale(0)', opacity: 0 },
        '100%': { transform: 'scale(1)', opacity: 1 },
      },
      spinnerGrow: {
        '0%': { transform: 'scale(0)', opacity: 1 },
        '50%': { transform: 'scale(1)', opacity: 1 },
        '100%': { transform: 'scale(0)', opacity: 1 },
      },
     
      showUpTada: {
        '60%': { transform: 'scale(0.9)' }, 
        '70%': { transform: 'scale(1.1)' },
        '80%': { transform: 'scale(1)' },
        '90%': { transform: 'scale(1.1)' },
        '100%': { transform: 'scale(1)' },
      },
      rotateDisk: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      glowText: {
        '0%': { textShadow: '0 0 5px #000, 0 0 10px #FF69B4, 0 0 15px #000' },
        '100%': { textShadow: '0 0 10px #000, 0 0 15px #4B0082, 0 0 30px #00CED1' },
        },
      borderGlow: {
        '0%': { boxShadow: '0 0 1px #000, 0 0 6px #FF69B4, 0 0 12px #000' },
        '100%': { boxShadow: '0 0 12px #000, 0 0 15px #4B0082, 0 0 30px #00CED1' },
        },
      borderGlow1: {
        '0%': { boxShadow: '0 0 1px #000, 0 0 3px #FF69B4, 0 0 6px #ea3376' },
        '100%': { boxShadow: '0 0 10px #10B981, 0 0 13px #4B0082, 0 0 18px #ae60e1' },
        },
      glowText1: {
        '0%': { textShadow: '0 0 1px #000, 0 0 3px #FF69B4, 0 0 6px #ea3376' },
        '100%': { textShadow: '0 0 10px ##10B981, 0 0 13px #4B0082, 0 0 18px #ae60e1' },
        },
        glowText2: {
        '0%': { textShadow: '0 0 1px #00CED1, 0 0 3px rgb(52 211 153), 0 0 6px #00CED1' },
        '100%': { textShadow: '0 0 10px ##00CED1, 0 0 13px rgb(52 211 153), 0 0 18px #10B981' },
      },
      fadeOutScale: {
        '0%': { opacity: 1, transform: 'scale(1)' },
        '100%': { opacity: 0, transform: 'scale(0.9)' },
      },  
      reduceAndFade: {
        '0%': { transform: 'scale(1)', opacity: 1 },
        '60%': { transform: 'scale(0.9)', opacity: 0.8 },
        '80%': { transform: 'scale(0.6)', opacity: 0.4 },
        '100%': { transform: 'scale(0.3)', opacity: 0 },
      },
      colorCycle: {
        '0%': { color: '#f472b6' }, 
        '5%': { color: '#db85c7' }, 
        '16%': { color: '#c084fc' },
        '33%': { color: '#22d3ee' },
        '50%': { color: '#14b8a6' },
        '66%': { color: '#19ff4b' }, 
        '83%': { color: '#facc15' }, 
        '93%': { color: '#a855f7' }, 
        '100%': { color: '#f472b6' }, 
      },
      blinkAndBounce: {
        '0%, 20%, 40%': { opacity: '1', transform: 'scale(1)' },
        '10%, 30%': { opacity: '0' },
        '50%': { transform: 'scale(1.2)' },
        '70%': { transform: 'scale(0.95)' },
        '80%': { transform: 'scale(1.05)' },
        '90%, 100%': { opacity: '1', transform: 'scale(1)' }, // Pausa hasta el final del ciclo
      },
      glowColorCycle: {
        '0%': {
          textShadow: '0 0 5px #000, 0 0 10px #f472b6, 0 0 15px #000',
          color: '#f472b6',
        },
        '12.5%': {
          textShadow: '0 0 5px #000, 0 0 10px #db85c7, 0 0 15px #4B0082',
          color: '#db85c7',
        },
        '25%': {
          textShadow: '0 0 10px #000, 0 0 15px #c084fc, 0 0 20px #22d3ee',
          color: '#c084fc',
        },
        '37.5%': {
          textShadow: '0 0 10px #000, 0 0 15px #22d3ee, 0 0 25px #14b8a6',
          color: '#22d3ee',
        },
        '50%': {
          textShadow: '0 0 15px #000, 0 0 20px #14b8a6, 0 0 30px #19ff4b',
          color: '#14b8a6',
        },
        '62.5%': {
          textShadow: '0 0 15px #000, 0 0 20px #19ff4b, 0 0 30px #facc15',
          color: '#19ff4b',
        },
        '75%': {
          textShadow: '0 0 15px #000, 0 0 20px #facc15, 0 0 30px #a855f7',
          color: '#facc15',
        },
        '87.5%': {
          textShadow: '0 0 15px #000, 0 0 20px #a855f7, 0 0 30px #f472b6',
          color: '#a855f7',
        },
        '100%': {
          textShadow: '0 0 5px #000, 0 0 10px #f472b6, 0 0 15px #000',
          color: '#f472b6',
        },
        },
      glowBoxCycle: {
        '0%': {
          boxShadow: '0 0 5px #000, 0 0 10px #f472b6, 0 0 15px #000',
          backgroundColor: '#f472b6',
        },
        '12.5%': {
          boxShadow: '0 0 5px #000, 0 0 10px #db85c7, 0 0 15px #4B0082',
          backgroundColor: '#db85c7',
        },
        '25%': {
          boxShadow: '0 0 10px #000, 0 0 15px #c084fc, 0 0 20px #22d3ee',
          backgroundColor: '#c084fc',
        },
        '37.5%': {
          boxShadow: '0 0 10px #000, 0 0 15px #22d3ee, 0 0 25px #14b8a6',
          backgroundColor: '#22d3ee',
        },
        '50%': {
          boxShadow: '0 0 15px #000, 0 0 20px #14b8a6, 0 0 30px #19ff4b',
          backgroundColor: '#14b8a6',
        },
        '62.5%': {
          boxShadow: '0 0 15px #000, 0 0 20px #19ff4b, 0 0 30px #facc15',
          backgroundColor: '#19ff4b',
        },
        '75%': {
          boxShadow: '0 0 15px #000, 0 0 20px #facc15, 0 0 30px #a855f7',
          backgroundColor: '#facc15',
        },
        '87.5%': {
          boxShadow: '0 0 15px #000, 0 0 20px #a855f7, 0 0 30px #f472b6',
          backgroundColor: '#a855f7',
        },
        '100%': {
          boxShadow: '0 0 5px #000, 0 0 10px #f472b6, 0 0 15px #000',
          backgroundColor: '#f472b6',
        },
      },

        glowShadowCycle: {
          '0%': {
            textShadow: '0 0 5px #000, 0 0 10px #f472b6, 0 0 15px #000',
          },
          '12.5%': {
            textShadow: '0 0 5px #000, 0 0 10px #db85c7, 0 0 15px #4B0082',
          },
          '25%': {
            textShadow: '0 0 10px #000, 0 0 15px #c084fc, 0 0 20px #22d3ee',
          },
          '37.5%': {
            textShadow: '0 0 10px #000, 0 0 15px #22d3ee, 0 0 25px #14b8a6',
          },
          '50%': {
            textShadow: '0 0 15px #000, 0 0 20px #14b8a6, 0 0 30px #19ff4b',
          },
          '62.5%': {
            textShadow: '0 0 15px #000, 0 0 20px #19ff4b, 0 0 30px #facc15',
          },
          '75%': {
            textShadow: '0 0 15px #000, 0 0 20px #facc15, 0 0 30px #a855f7',
          },
          '87.5%': {
            textShadow: '0 0 15px #000, 0 0 20px #a855f7, 0 0 30px #f472b6',
          },
          '100%': {
            textShadow: '0 0 5px #000, 0 0 10px #f472b6, 0 0 15px #000',
          },
        },
        glowGreenShadowCycle: {
          '0%': {
            color: '#cef2db',
            textShadow: '0 0 5px #f472b6, 0 0 10px #db85c7, 0 0 15px #c084fc',
          },
          '16.6%': {
            color: '#cef2db',
            textShadow: '0 0 5px #22d3ee, 0 0 10px #14b8a6, 0 0 15px #19ff4b',
          },
          '33.3%': {
            color: '#cef2db',
            textShadow: '0 0 5px #facc15, 0 0 10px #a855f7, 0 0 15px #f472b6',
          },
          '50%': {
            color: '#cef2db',
            textShadow: '0 0 5px #db85c7, 0 0 10px #c084fc, 0 0 15px #22d3ee',
          },
          '66.6%': {
            color: '#cef2db',
            textShadow: '0 0 5px #14b8a6, 0 0 10px #19ff4b, 0 0 15px #facc15',
          },
          '83.3%': {
            color: '#cef2db',
            textShadow: '0 0 5px #a855f7, 0 0 10px #f472b6, 0 0 15px #db85c7',
          },
          '100%': {
            color: '#cef2db',
            textShadow: '0 0 5px #f472b6, 0 0 10px #db85c7, 0 0 15px #c084fc',
          },
        },
        'tvflicker-rose': {
              '0%': { boxShadow: '0 0 40px 0 rgba(249, 168, 212, 0.3)' }, 
            '20%': { boxShadow: '0 0 30px 0 rgba(244, 114, 182, 0.5)' }, 
            '40%': { boxShadow: '0 0 25px 0 rgba(196, 35, 113, 0.5)' },  
            '60%': { boxShadow: '0 0 20px 0 rgba(244, 114, 182, 0.7)' }, 
            '80%': { boxShadow: '0 0 35px 0 rgba(249, 168, 212, 0.5)' },
            '100%': { boxShadow: '0 0 45px 0 rgba(244, 114, 182, 0.4)' },
        },
         'tvflicker-mixed': {
          '0%': { boxShadow: '0 0 90px 0 rgba(23, 146, 106, 0.4)' },
          '10%': { boxShadow: '0 0 70px 0 rgba(249, 168, 212, 0.3)' },
          '20%': { boxShadow: '0 0 70px 0 rgba(23, 146, 106, 0.5)' },
          '30%': { boxShadow: '0 0 50px 0 rgba(244, 114, 182, 0.5)' },
          '40%': { boxShadow: '0 0 60px 0 rgba(23, 146, 106, 0.6)' },
          '50%': { boxShadow: '0 0 40px 0 rgba(196, 35, 113, 0.5)' },
          '60%': { boxShadow: '0 0 40px 0 rgba(23, 146, 106, 0.7)' },
          '70%': { boxShadow: '0 0 20px 0 rgba(244, 114, 182, 0.7)' },
          '80%': { boxShadow: '0 0 80px 0 rgba(23, 146, 106, 0.5)' },
          '90%': { boxShadow: '0 0 60px 0 rgba(249, 168, 212, 0.5)' },
          '100%': { boxShadow: '0 0 100px 0 rgba(244, 114, 182, 0.4)' },
        },
          fastBlink: {
           '0%': { boxShadow: 'none', backgroundColor: '#333' },
          '50%': { boxShadow: '0 0 1.5px 0.5px rgba(255, 255, 0, 0.8)', backgroundColor: '#FFD700' },
          '100%': { boxShadow: 'none', backgroundColor: '#333' },
        },
      },
      
    },
  },
  purge: false,
  plugins: [
     require('@tailwindcss/typography')
  ],
}