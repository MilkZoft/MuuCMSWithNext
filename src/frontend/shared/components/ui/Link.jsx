// Dependencies
import React from 'react';
import { bool, string } from 'prop-types';
import NextLink from 'next/link';

const Link = props => {
  const { to, refresh = false, external = false } = props;
  const linkProps = { ...props };
  const url = to;
  let newRefresh = refresh;

  if (to.indexOf('http') !== -1 || external) {
    newRefresh = true;
  }

  delete linkProps.to;
  delete linkProps.dispatch;
  delete linkProps.currentLanguage;
  delete linkProps.refresh;
  delete linkProps.external;

  if (newRefresh) {
    return <a href={url} {...linkProps} />;
  }

  return (
    <NextLink href={url}><a {...linkProps}>{linkProps.children}</a></NextLink>
  );
};

Link.propTypes = {
  to: string.isRequired,
  refresh: bool,
  external: bool
};

export default Link;
