import React from 'react';
import '~/config/papyrus';
import '~/config/stores';
import Main from './Main';
import {ContextCompose} from '~/componets/context-compose';

const App = () => {
  return <ContextCompose Child={<Main />} wrappers={[]} />;
};

export default App;
