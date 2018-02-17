import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import postField from './post_field';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post',
    error: 'Enter a title'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this post',
    error: 'You should provide at least one tag'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents',
    error: 'Empty content not allowed'
  }
};

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  renderFields() {
    const flds = _.map(['title', 'categories', 'content'], field => {
      return (
        <Field
          key={field}
          label={FIELDS[field].label}
          typeprop={FIELDS[field].type}
          component={postField}
          name={field}
        />
      );
    });
    console.log(flds);
    return flds;
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    console.log(postField);
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>{this.renderFields()}</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger" style={{marginLeft: 20}}>
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  _.map(['title', 'categories', 'content'], val => {
    if (!values[val]) errors[val] = FIELDS[val].error;
  });

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, { createPost })(PostsNew));
