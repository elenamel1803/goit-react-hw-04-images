import { Component } from 'react';
import { SearchbarHeader, Form, Button, InputText } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleValueChange = ({ target }) => {
    this.setState({
      searchValue: target.value.toLowerCase().split(' ').join(' '),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchValue);
    // this.setState({ value: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit" />
          <InputText
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleValueChange}
          />
        </Form>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;
