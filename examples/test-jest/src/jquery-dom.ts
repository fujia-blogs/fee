import $ from 'jquery';

export const addDivToBody = () => {
  $('body').append('<div id="root" />');
};
