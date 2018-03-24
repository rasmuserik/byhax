import React from 'react'
import { bindActionCreators } from 'redux'
import { withRedux } from '../client/store'

const Counter = (props) => <h1>Hello</h1>

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default withRedux(mapStateToProps, mapDispatchToProps)(Counter)
