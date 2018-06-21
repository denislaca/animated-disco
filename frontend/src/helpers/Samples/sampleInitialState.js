// sample initial state for given component
export const setInitialState = () => ({
  sampleState: undefined, // insert initial value
  sampleFunction: () => undefined, // insert initial function - you will probably need to import it first
  /*
    you can also chain api requests but it's not recomended
    since it's not a great idea to have async functions dispatching directly into redux state
  */
})
