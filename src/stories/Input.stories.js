import Input from '@components/Input'

export default {
  title: 'Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
}

export const AsSeconds0to60 = {
  args: {
    header: 'Seconds',
    min: 0,
    max: 60,
    setFunction: (value) => console.log(value),
    variable: 61,
  },
}

export const AsMiliSeconds60to1000 = {
  args: {
    header: 'miliseconds',
    min: 60,
    max: 1000,
    setFunction: (value) => console.log(value),
    variable: 20,
  },
}
