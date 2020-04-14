import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function Link(props) {
  const { label } = props;
  return <RouterLink {...props}>{label}</RouterLink>;
}
