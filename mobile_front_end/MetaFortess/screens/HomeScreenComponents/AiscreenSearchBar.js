import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const AiscreenSearchBar = ({searchQuery,setSearchQuery}) => {
  

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default AiscreenSearchBar;