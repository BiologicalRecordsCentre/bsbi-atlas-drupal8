<?php

namespace Drupal\bsbi_atlas\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class BsbiAtlasConfig extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'bsbi_atlas_config';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Form constructor.
    $form = parent::buildForm($form, $form_state);
    // Settings.
    $config = $this->config('bsbi_atlas.settings');

    // GUI Tabs
    $form['atlas_gui_tabs'] = [
      '#type' => 'radios',
      '#title' => $this->t('Use tabs in GUI:'),
      '#default_value' => $config->get('gui.tabs'),
      '#description' => $this->t('Indicate whether or not to use tabs to display different atlas sections.'),
      '#options' => array(t('Use tabs'), t('No tabs')),
    ];

    $form['atlas_data_root'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Root folder for BSBI data:'),
      '#default_value' => $config->get('data.root'),
      '#description' => $this->t('Indicates the location of the root folder for BSBI data.'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('bsbi_atlas.settings');
    $config->set('gui.tabs', $form_state->getValue('atlas_gui_tabs'));
    $config->set('data.root', $form_state->getValue('atlas_data_root'));
    $config->save();
    return parent::submitForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'bsbi_atlas.settings',
    ];
  }

}