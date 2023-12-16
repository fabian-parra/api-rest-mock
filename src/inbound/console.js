import {pipe, not, isNull} from 'api-rest-mock/utils/functional'

const OPTIONS = [
  {name: 'help', flag: 'h', assignable: false},
  {name: 'config', flag: 'c', default: 'api-config.json', assignable: true},
  {name: 'port', flag: 'p', default: 8883, assignable: true},
  {name: 'host', flag: 'h', default: '0.0.0.0', assignable: true}
]

const IS_FLAG = /^-[a-zA-Z]+$/

const getFlags = (argv) => OPTIONS
  .map((option) => {
    const [keyFlag] = argv
      .filter(arg => IS_FLAG.test(arg))
      .filter(flag => flag.indexOf(option.flag) !== -1)

    if(!keyFlag) return option.default !== undefined ? {[option.name]: option.default} : null 
    
    const valueFlag = option.assignable ? argv.at(argv.indexOf(keyFlag) + 1) : true
    return {[option.name]: valueFlag}
  })
const removeNull = array => array.filter(not(isNull))
const transformToObject = array => array.reduce((accum, opt) => ({...accum, ...opt}), {})

export const getInputs = () => {
  const [...argv] = process.argv.slice(2)
  return pipe(
    getFlags,
    removeNull,
    transformToObject
  )(argv)
}
