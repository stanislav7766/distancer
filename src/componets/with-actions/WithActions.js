import React from 'react';

const withActions = mapDispatchToProps => WrappedComponent => props => (
  <WrappedComponent {...mapDispatchToProps} {...props} />
);

export default withActions;
