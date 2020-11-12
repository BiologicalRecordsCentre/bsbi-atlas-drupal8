<?php

namespace Drupal\bsbi_atlas\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Defines BsbiAtlasController class.
 */
class BsbiAtlasController extends ControllerBase {

  /**
   * Display the markup.
   *
   * @return array
   *   Return markup array.
   */
  public function content($identifier = null) {

    // Settings.
    $config = $this->config('bsbi_atlas.settings');

    if($config->get('gui.tabs') === 0) {
      $guiTabs = true;
    }
    else {
      $guiTabs = false;
    }

    return [
      '#type' => 'markup',
      '#markup' => '<div id="bsbi-atlas-gui"></div>',
      '#attached' => array(
        'library' =>  array(
          'bsbi_atlas/bsbiatlas',
        ),
        'drupalSettings' => array(
          'bsbi_atlas' => array(
            'useTabs' => $guiTabs,
            'dataRoot' => $config->get('data.root'),
            'identifier' => $identifier,
          ),
        ),
      ),
    ];
  }
}