import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const AiscreenSearchBar = ({searchQuery,setSearchQuery}) => {
  

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="good morning"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default AiscreenSearchBar;