import { Stonk, Stonks } from './exports'
let example: Stonk = {
  pathToImage: '',
  selected: false,
  name: '',
  price: 1,
  sellAmount: 1,
  id: 3,
  description: ``,
  amount: 1
}
example = example
const whiteBoardStonk: Stonk = {
  pathToImage: 'http://cdn.ebaumsworld.com/2015/05/14/043327/84584305/tumblr_mm16sq2gsb1rziftho1_1280.jpg',
  selected: false,
  name: 'whiteboard',
  price: 13,
  sellAmount: 1,
  id: 0, // used to not cause ts error for id being undefined
  description: `A free government stonk granted to nice guys; the whiteboard stonk is trashes,
   but a nice start, you could draw on your hand, with squidwards special secretions instead,
   or with a lightbulb with the lemon sauce to make secret codes, honestly the whiteboard was a mistake
   when the old people die so will the stonk.`,
  amount: 1
}
const freeRealEstateStonk: Stonk = {
  pathToImage: 'https://www.outdoorpainter.com/wp-content/uploads/2017/12/1.-SNOW-Handrahan.-Cold-Morning-Warm-Light-12x16.jpg',
  id: 1,
  name: 'FREE REAL ESTATE',
  price: 1015,
  amount: 1,
  sellAmount: 1,
  selected: false,
  description: `If you have unlocked the freeRealEstateStonk, you are a absolute madman,
  go do die for our sakess man. Seriously dude, how do you do this, we dont even know it is likes
  when Fil fixes a bote with just tape wow man.`
}
const cheeseStonk: Stonk = {
  pathToImage: 'https://skinnyms.com/wp-content/uploads/2012/03/Tuna-Casserole-1.jpg',
  id: 2,
  sellAmount: 1,
  name: 'cheese stonk',
  price: 115,
  amount: 1,
  description: `The cheese stonk is like the best stonk, i mean milk is the same but the italian people cant eat it,
   3 million italianos * 10 cheeses a day = 30 million cheeses a day, wowchee. and also fat people eat lots of cheese to help with their water consumption.`,
  selected: false
}
export const stonks: Stonks = [freeRealEstateStonk, whiteBoardStonk, cheeseStonk]
