import Multiplier from '@components/Multiplier'

export default {
  title: 'Details/Multiplier',
  component: Multiplier,
  tags: ['autodocs'],
  argTypes: {},
}

export const Standard = {
  args: {
    randomizer: 'abcdefg',
    cte: 10,
    scale: 0.27,
    min: 5,
    max: 10,
  },
}

export const Experimental = {
  args: {
    randomizer: 'abnsaeqwww',
    cte: 10,
    scale: 0.2,
    min: 4,
    max: 20,
  },
}
