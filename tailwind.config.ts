import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: {
    themes: [],
    logs: false
  },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true
    },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite"
      },
      keyframes: {
        sliding: {
          "0%": {
            transform: "translateX(0)"
          },
          "100%": {
            transform: "translateX(-50%)"
          }
        }
      },
      spacing: {
        '60vw': '60vw',
        '4.26vw': '4.26vw',
      },
      inset: {
        'calc-100-72vw': 'calc(100% - 72vw)',
        'calc-100-5.65vw': 'calc(100% - 5.65vw)',
      }
    }
  }
};
