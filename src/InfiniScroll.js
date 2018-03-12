import React from 'react';
//import Immutable from 'immutable';
import _ from 'lodash';

class InfiniItem extends React.Component{
  render() {
    return <div ref="root" style={{height: Math.abs(this.props.i)}}>
      hi {this.props.i}
    </div>
  }
  componentDidUpdate() {
    this.props.hasHeight(this.refs.root.offsetHeight);
  }
  componentDidMount() {
    this.props.hasHeight(this.refs.root.offsetHeight);
  }
}
export default class InfiniScroll extends React.Component {

  constructor() {
    super();
    this.scrollHandler = e => this.handleScroll(e);
    this.start = 0;
    this.state = {
      scroll: 0,
      heights: {},
      start: -10,
      end : 40
    }
  }

  render() {
    this.start = this.state.start;
    return <div style={{background: 'red', height: '100%'}}>{
      _.range(this.state.start, this.state.end).map(i => <InfiniItem i={i} hasHeight={
        h => {
          if(h !== this.state.heights[i]) {
            const heights = Object.assign({}, this.state.heights, {[i]: h});
            this.setState({heights});
          }
        }
      }/>)
    }
    Hello</div>
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }
  componentWillUpdate() {
    const scrollY = window.scrollY;
    let sum = 0;
    let i;
    for(i = this.start; 
      typeof this.state.heights[i] === 'number' && sum < scrollY; ++i) {
      sum += this.state.heights[i];
    }
    i--;
    sum -= this.state.heights[i];
    i += (scrollY - sum) / this.state.heights[i];
    this.scrollPos = i;
  }
  componentDidUpdate() {
    let scrollY = 0
    let i;
    for(i = this.start; i < this.scrollPos; ++i) {
      if(!isNaN(this.state.heights[i])) {
        scrollY += this.state.heights[i];
      }
    }
    if(!isNaN(this.state.heights[i])) {
    scrollY += this.state.heights[i] * (this.scrollPos - i);
      }
    console.log('here', this.state, scrollY, i);
    //window.scrollTo(0,scrollY);
    if(scrollY < 1000) {
      //this.setState({start: this.state.start - 10});
    }
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  handleScroll(event) {
    this.setState({ scroll: window.scrollY});
  }
}
