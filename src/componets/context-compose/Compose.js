import React from 'react';

const Compose = ({wrappers, Child}) =>
  wrappers.reduceRight((Acc, {Context, value}) => <Context.Provider value={value}>{Acc}</Context.Provider>, Child);

export default Compose;
