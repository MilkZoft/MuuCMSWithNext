import { forEach } from '@shared/utils/object';

export function attrs(props) {
  const newProps = {};

  forEach(props, prop => {
    if (prop) {
      newProps[prop] = props[prop];
    }
  });

  return newProps;
}

export function cx(...classes) {
  return classes.join(' ');
}

export function getInputChanged(e) {
  const { target: { name } } = e;
  const value = e.target.value || '';
  const newState = {};

  newState[name] = value;

  if (name) {
    return newState;
  }

  return false;
}
