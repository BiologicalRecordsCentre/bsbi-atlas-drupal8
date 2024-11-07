<?php

namespace Drupal\bsbi_atlas\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Block for navigation of main BSBI Atlas page content.
 * (Not used.)
 *
 * @Block(
 *   id = "atlas_content_navigation",
 *   admin_label = @Translation("Atlas navigation block"),
 *   category = @Translation("BSBI Atlas"),
 * )
 */
class AtlasContentNavigation extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<div class="bsbi-atlas-navigation"></div>',
    ];
  }

}