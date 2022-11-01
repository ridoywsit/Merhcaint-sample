function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        hlneue: ['Helvetica Neue', 'sans-serif'],
      },
      colors: {
        'merchaint-teal-800': withOpacity('--merchaint-teal-800'),
        'merchaint-teal-700': withOpacity('--merchaint-teal-700'),
        'merchaint-teal-base': withOpacity('--merchaint-teal-base'),
        'merchaint-teal-200': withOpacity('--merchaint-teal-200'),
        'merchaint-teal-100': withOpacity('--merchaint-teal-100'),

        'merchaint-green-800': withOpacity('--merchaint-green-800'),
        'merchaint-green-700': withOpacity('--merchaint-green-700'),
        'merchaint-green-base': withOpacity('--merchaint-green-base'),
        'merchaint-green-200': withOpacity('--merchaint-green-200'),
        'merchaint-green-100': withOpacity('--merchaint-green-100'),

        'merchaint-red-800': withOpacity('--merchaint-red-800'),
        'merchaint-red-700': withOpacity('--merchaint-red-700'),
        'merchaint-red-base': withOpacity('--merchaint-red-base'),
        'merchaint-red-200': withOpacity('--merchaint-red-200'),
        'merchaint-red-100': withOpacity('--merchaint-red-100'),

        'merchaint-grey-800': withOpacity('--merchaint-grey-800'),
        'merchaint-grey-700': withOpacity('--merchaint-grey-700'),
        'merchaint-grey-base': withOpacity('--merchaint-grey-base'),
        'merchaint-grey-200': withOpacity('--merchaint-grey-200'),
        'merchaint-grey-100': withOpacity('--merchaint-grey-100'),

        'merchaint-blue-800': withOpacity('--merchaint-blue-800'),
        'merchaint-blue-700': withOpacity('--merchaint-blue-700'),
        'merchaint-blue-base': withOpacity('--merchaint-blue-base'),
        'merchaint-blue-200': withOpacity('--merchaint-blue-200'),
        'merchaint-blue-100': withOpacity('--merchaint-blue-100'),

        'merchaint-lemon-800': withOpacity('--merchaint-lemon-800'),
        'merchaint-lemon-700': withOpacity('--merchaint-lemon-700'),
        'merchaint-lemon-base': withOpacity('--merchaint-lemon-base'),
        'merchaint-lemon-200': withOpacity('--merchaint-lemon-200'),
        'merchaint-lemon-100': withOpacity('--merchaint-lemon-100'),

        'merchaint-purple-800': withOpacity('--merchaint-purple-800'),
        'merchaint-purple-700': withOpacity('--merchaint-purple-700'),
        'merchaint-purple-base': withOpacity('--merchaint-purple-base'),
        'merchaint-purple-200': withOpacity('--merchaint-purple-200'),
        'merchaint-purple-100': withOpacity('--merchaint-purple-100'),

        'merchaint-text-black-800': withOpacity('--merchaint-text-black-800'),
        'merchaint-text-dark-grey': withOpacity('--merchaint-text-dark-grey'),
        'merchaint-text-medium-grey': withOpacity(
          '--merchaint-text-medium-grey',
        ),
        'merchaint-text-light-grey': withOpacity('--merchaint-text-light-grey'),
        'merchaint-text-white': withOpacity('--merchaint-text-white'),
        'merchaint-text-off-white': withOpacity('--merchaint-text-off-white'),
      },
      spacing: {
        4.5: '1.125rem',
        6.5: '1.625rem',
        112: '28rem',
      },
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        15: 'repeat(15, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
