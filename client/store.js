import React from 'react'
import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TICK":
      return Object.assign({}, state, { lastUpdate: action.ts, light: !!action.light })
    case "ADD":
      return Object.assign({}, state, {
        count: state.count + 1
      })
    default: return state
  }
}


// MIDDLEWARE
const middleware = ({ getState, dispatch }) => next => action => {
  return next(action);
}


const composeWithDevTools = self.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const initStore = (initialState = initialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(middleware)))
}


const isServer = typeof document === 'undefined';

// TODO: simplify withRedux: ÷initStore ÷initialState
const getOrCreateStore = (initStore, initialState) => isServer 
    ? initStore(initialState)
    : self.__NEXT_REDUX_STORE__ || (self.__NEXT_REDUX_STORE__ =initStore(initialState));
export const withRedux = (...args) => (Component) => {
  const [...connectArgs] = args

  const ComponentWithRedux = (props = {}) => {
    const { store, initialProps, initialState } = props
    const ConnectedComponent = connect.apply(null, args)(Component)
    return React.createElement(
      Provider,
      { store: store && store.dispatch ? store : getOrCreateStore(initStore, initialState) },
      React.createElement(ConnectedComponent, initialProps)
    )
  }

  ComponentWithRedux.getInitialProps = async (props = {}) => {
    const isServer = checkServer()
    const store = getOrCreateStore(initStore)
    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps({ ...props, isServer, store })
      : {}
    return {
      store,
      initialState: store.getState(),
      initialProps
    }
  }
  return ComponentWithRedux
}
