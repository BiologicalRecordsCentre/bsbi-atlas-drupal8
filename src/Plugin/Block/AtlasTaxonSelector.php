<?php

namespace Drupal\bsbi_atlas\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Taxon Selection Block for the BSBI Atlas.
 *
 * @Block(
 *   id = "atlas_taxon_selection",
 *   admin_label = @Translation("Atlas taxon selection block"),
 *   category = @Translation("BSBI Atlas"),
 * )
 */
class AtlasTaxonSelector extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $species = '<div class="bsbi-atlas-taxon-selector"></div>';
    $mapcontrols = '<div class="bsbi-atlas-map-controls"></div>';
    $trendcontrols = '<div class="bsbi-atlas-trend-controls"></div>';
    $phenologycontrols = '<div class="bsbi-atlas-phenology-controls"></div>';
    $altlatcontrols = '<div class="bsbi-atlas-altlat-controls"></div>';
    return [
      '#markup' => $species . $mapcontrols . $trendcontrols . $phenologycontrols . $altlatcontrols,
    ];
  }

}