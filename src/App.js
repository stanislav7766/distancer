import React from 'react';
import Main from './Main';
import entries from '~/config/stores';
import {ContextCompose} from '~/componets/context-compose';

const App = () => {
  return <ContextCompose Child={<Main />} wrappers={entries} />;
};

export default App;
