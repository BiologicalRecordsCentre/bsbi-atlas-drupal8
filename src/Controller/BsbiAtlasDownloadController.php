<?php

namespace Drupal\bsbi_atlas\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Defines BsbiAtlasDownloadController class.
 */
class BsbiAtlasDownloadController extends ControllerBase {

  /**
   * Display the markup.
   *
   * @return array
   *   Return markup array.
   */
  public function content($identifier = null) {

    // Settings.
    $config = $this->config('bsbi_atlas.settings');

    return [
      '#type' => 'markup',
      '#markup' => '<div id="bsbi-atlas-download"></div>',
      '#attached' => array(
        'library' =>  array(
          'bsbi_atlas/bsbiatlas',
        ),
        'drupalSettings' => array(
          'bsbi_atlas' => array(
            'dataRoot' => $config->get('data.root'),
            'dataBsbidb' => $config->get('data.bsbidb'),
            'dataImagesurl' => $config->get('data.imagesurl'),
            'identifier' => $identifier,
          ),
        ),
      ),
    ];
  }
}