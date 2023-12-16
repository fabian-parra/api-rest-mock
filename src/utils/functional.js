export const pipe = (...fns) => value => fns.reduce((accum, fn) => fn(accum), value)
export const isNull = value => value === null
export const not = fn => (...args) => !fn(...args)
