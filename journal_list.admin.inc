<?php

/**
 * @file
 * Admin page callbacks for the ares module.
 */

/**
 * Form builder; Generate a form to configure journal list locations.
 *
 * @ingroup forms
 * @see journal_list_form_location_submit()
 */
function journal_list_form_location(&$form_state) {

  $form['journal_list_locations'] = array('#type' => 'textfield',
    '#title' => t('Voyager location codes'),
    '#default_value' => variable_get('journal_list_locations', ''),
    '#required' => TRUE,
  );
  $form['submit'] = array('#type' => 'submit', '#value' => t('Save'));

  return $form;
}


/**
 * Process journal_list_form_location form submissions.
 */
function journal_list_form_location_submit($form, &$form_state) {
  variable_set('journal_list_locations', $form_state['values']['journal_list_locations']);
  drupal_set_message(t('The Voyager location codes have been updated.'));
  $form_state['redirect'] = 'admin/settings/journal_list';
}

