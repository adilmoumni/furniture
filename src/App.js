import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  RefinementList, connectRefinementList,
  Highlight,
  connectHitsPerPage,
} from 'react-instantsearch-dom';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './App.css';

const CustomHitsPerPage = connectHitsPerPage(({ items, refine }) => (
  <Select options={items} onChange={item => refine(item.value)} />
));

const searchClient = algoliasearch('GF9DTO0HM0', 'daf7d7e0cc8a9cdc3f34fbd6e36197d9');

const index = searchClient.initIndex('furniture_records');

index.search('').then(({ hits }) => {
  console.log(hits);
});

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">react-instantsearch-app</a>
          </h1>
          <p className="header-subtitle">
            using{''}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </header>

        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="furniture_records">
            <div className="search-panel">
              <div className="search-panel__filters">

                <RefinementList

                  attribute="category"
                  showMore={true}
                  translations={{
                    showMore: isOpen => {
                      return isOpen ? "Show less" : "Show more";
                    }
                  }}

                  noResults='No results'
                  submitTitle='Submit your search query.'
                  resetTitle='Clear your search query.'
                  placeholder='Search here...'
                />
                <CustomHitsPerPage

                  defaultRefinement={100}
                  items={[
                    { label: '20 hits per page', value: 20 },
                    { label: '40 hits per page', value: 40 },
                    { label: '60 hits per page', value: 60 },
                    { label: '100 hits per page', value: 100 },
                  ]}
                />
              </div>

              <div className="search-panel__results">
                <SearchBox className="searchbox" placeholder="" />
                <Hits hitComponent={Hit} />
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}


function Hit(props) {
  return (
    <article >
      <img src={props.hit.imageUrl} height="100%" width="100%" />

      <h4>
        <Highlight attribute="name" hit={props.hit} />
      </h4>
      <div className="hit-description">
        <Highlight attribute="shortDescription" hit={props.hit} />
      </div>
      <p>
        height :  <Highlight attribute="height" hit={props.hit} />
      </p>
      <p>
        width :  <Highlight attribute="width" hit={props.hit} />
      </p>

      <p >
        price :  <Highlight attribute="price" hit={props.hit} /> <Highlight attribute="currency" hit={props.hit} />
      </p>
      <p>
        sourceSite :  <Highlight attribute="sourceSite" hit={props.hit} />
      </p>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};




export default App;
