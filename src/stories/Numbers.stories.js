import Numbers from '@components/Numbers'

export default {
  title: 'Inputs/Numbers',
  component: Numbers,
  tags: ['autodocs'],
  argTypes: {},
}

export const Standard = {
  args: {
    header: 'Seconds',
    min: 4,
    max: 10,
    setFunction: (value) => console.log(value),
    variable: 4,
  },
}

export const TestScrollY = {
  args: {
    header: 'Seconds',
    min: 0,
    max: 60,
    setFunction: (value) => console.log(value),
    variable: 61,
  },
}
