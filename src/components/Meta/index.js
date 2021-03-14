import React from 'react';
import MetaTags from 'react-meta-tags';

const MetaComponent = ({ title, description, keywords }) => {
  return (
    <MetaTags>
      <title>{title}</title>
      <meta name='title' content={title} />
      {description && <meta name='description' content={description} />}
      {keywords && <meta name='keywords' content={keywords} />}
    </MetaTags>
  );
};
export default MetaComponent;
