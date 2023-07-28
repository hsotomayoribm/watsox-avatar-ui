import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

const Markdown = ({ data }) => {
  const { text, cardId } = data;
  return (
    <div data-sm-content={cardId} className="card">
      <div className="card-body">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

Markdown.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Markdown;
