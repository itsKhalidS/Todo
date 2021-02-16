import React from 'react';
import { Helmet } from 'react-helmet';

const MetaComponent = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='title' content={title} />
      {description && <meta name='description' content={description} />}
      {keywords && <meta name='keywords' content={keywords} />}
    </Helmet>
  );
};
export default MetaComponent;
