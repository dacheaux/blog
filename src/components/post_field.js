import React from 'react';

export default values => {
  console.log('POST_FIELD', values);
  const { meta: { touched, error }, typeprop } = values;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  return (
    <div className={className}>
      <label>{values.label}</label>
      <values.typeprop className="form-control" {...values.input} type={typeprop} />
      <div className="text-help">{touched ? error : ''}</div>
    </div>
  );
};
