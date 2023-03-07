<?php

namespace Drupal\bsbi_atlas\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Standalone Taxon Selection Block for the BSBI Atlas.
 * Unlike the taxon selection block for the main atlas page, this
 * one does not have the additional controls.
 *
 * @Block(
 *   id = "atlas_taxon_selection_standalone",
 *   admin_label = @Translation("Standalone atlas taxon selection block"),
 *   category = @Translation("BSBI Atlas"),
 * )
 */
class AtlasTaxonSelectorStandalone extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $config = \Drupal::config('bsbi_atlas.settings');

    return [
      '#type' => 'markup',
      '#markup' => '<div class="bsbi-atlas-taxon-selector bsbi-atlas-taxon-selector-standalone"></div>',
      '#attached' => array(
        'library' =>  array(
          'bsbi_atlas/bsbiatlastaxsel',
        ),
        'drupalSettings' => array(
          'bsbi_atlas' => array(
            'dataRoot' => $config->get('data.root'),
          ),
        ),
      ),
    ];
  }

}
