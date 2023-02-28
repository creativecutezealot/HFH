import { Fragment } from 'react';
import Checkboxfield from '@components/Inputs/Checkboxfield';
import { titleCase } from 'title-case';
import useAuth from '@contexts/AuthContext';
import classNames from 'classnames';
import Textfield from '@components/Inputs/Textfield';

export default function SearchFormElements(props) {
  const suppressEnterKey = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Fragment>
      <div className="text-search">
        <input
          type="search"
          className="no-label"
          value={props.searchTerm}
          onChange={props.onSearchChange}
          placeholder="Search..."
          onKeyDown={suppressEnterKey}
        />
        {/* <input type="submit" value="Search" onClick={props.onSearch} /> */}
      </div>
      <h3>Filters</h3>
      <div className="filters">
        <ul>
          {props.filterOptions.map((item) => {
            if (item.value) {
              return (
                <li key={item.key}>
                  <Checkboxfield
                    inputOnChange={props.onFilterChange}
                    label={titleCase(item.value.toLowerCase())}
                    inputValue={item.key}
                    inputChecked={props.filterSelection.includes(item.key)}
                    labelClassName={'status-' + item.key.toLowerCase()}
                  />
                </li>
              );
            }
          })}
          {props.additionalFilters.map((item, index) => {
            return <li key={'additional-' + index}>{item}</li>;
          })}
        </ul>
      </div>
    </Fragment>
  );
}

SearchFormElements.defaultProps = {
  // searchTerm: '',
  // onSearchChange: () => { },
  // onSearch: () => { },
  filterOptions: [],
  onFilterChange: () => { },
  filterSelection: [],
  additionalFilters: [],
  firstNameValue: '',
  firstNameOnChange: () => {},
  lastNameValue: '',
  lastNameOnChange: () => {},
  confirmationNumberValue: '',
  confirmationNumberOnChange: () => {},
};
