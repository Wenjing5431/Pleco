import "../css/AnnotList.css";
import React from "react";
import SearchedAnnotList from "./SearchAnnots";
import NetworkMap from "./NetworkMap";
import MapFilter from "./Filter";
import { connect } from "react-redux";
import { fetchAnnots } from "../actions";
import { fetchSearchedAnnots } from "../actions";

class AnnotList extends React.Component {
  constructor(props) {
    super(props);
    this.renderTag = this.renderTag.bind(this);
    this.state = {
      selectedTerm: "",
      isOpen: false,
      backMap: false,
      time: "",
      limit: 50
    };
  }

  componentDidMount() {
    const { username } = this.props.location.state;
    this.props.fetchAnnots(username);
  }

  renderTag() {
    var a = [];
    const b = this.props.annots;
    for (var i = 0; i < b.length; i++) {
      a.push(b[i].tags);
    }
    var flat = [];
    for (var j = 0; j < a.length; j++) {
      flat = flat.concat(a[j]);
    }

    var uniqueTags = flat.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    });

    var tagCounts = [];
    for (var k = 0; k < flat.length; k++) {
      var tagElement = flat[k];
      tagCounts[tagElement] = tagCounts[tagElement]
        ? tagCounts[tagElement] + 1
        : 1;
    }

    const tagArray = [];
    for (var n = 0; n < uniqueTags.length; n++) {
      tagArray.push({
        text: uniqueTags[n],
        count: tagCounts[uniqueTags[n]]
      });
    }

    return tagArray.map(tag => {
      return (
        <div className="ui horizontal list" key={tag.text}>
          <p
            className="item tag-item"
            onClick={() => this.onClickTag(tag.text)}
          >
            {tag.text} &nbsp; {tag.count}
          </p>
        </div>
      );
    });
  }

  onSearchSubmit = term => {
    this.props.fetchSearchedAnnots(term, this.state.limit);
    this.setState({
      selectedTerm: term,
      backMap: false
    });
  };

  onClickTag = tag => {
    this.props.fetchSearchedAnnots(tag, this.state.limit);
    this.setState({
      selectedTerm: tag,
      backMap: false
    });
  };

  handleTime = time => {
    this.setState({
      time: time
    });
  };

  handleLimit = limit => {
    this.props.fetchSearchedAnnots(this.state.selectedTerm, Number(limit));
  };

  render() {
    const data = this.props.searchedAnnots;
    const Pagedata = this.props.pageAnnots;

    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <SearchedAnnotList onSubmit={this.onSearchSubmit} />
          <div className="tag-list">
            <div className="list-container">{this.renderTag()}</div>
          </div>
        </div>

        <NetworkMap
          searchedAnnots={{ data, Pagedata }}
          passTag={this.state.selectedTerm}
          backMap={this.state.backMap}
          handleTime={this.state.time}
        />

        <MapFilter
          checkTag={this.state.selectedTerm}
          onSelectTime={this.handleTime}
          onSelectLimit={this.handleLimit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    annots: state.annots,
    searchedAnnots: state.searchedAnnots,
    pageAnnots: state.pageAnnots
  };
};

export default connect(mapStateToProps, { fetchAnnots, fetchSearchedAnnots })(
  AnnotList
);
