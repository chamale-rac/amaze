import Pill from '@components/Pill'

export default {
  title: 'Inputs/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {},
}

export const SelectingSkin3Options = {
  args: {
    header: 'Skins',
    options: ['Default', 'Dark', 'Light'],
    variable: 'Default',
    setFunction: (value) => console.log(value),
  },
}

export const MultipleOptionsVariableNonDefault = {
  args: {
    header: 'Skins',
    options: ['Default', 'Dark', 'Light', 'Custom', 'Custom2', 'Custom3'],
    variable: '',
    setFunction: (value) => console.log(value),
  },
}
