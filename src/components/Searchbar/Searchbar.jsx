import { useState } from 'react';
import { SearchbarHeader, Form, Button, InputText } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleValueChange = ({ target }) => {
    setSearchValue(target.value.toLowerCase().split(' ').join(' '));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchValue);
    // this.setState({ value: '' });
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" />
        <InputText
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleValueChange}
        />
      </Form>
    </SearchbarHeader>
  );
};

export default Searchbar;
