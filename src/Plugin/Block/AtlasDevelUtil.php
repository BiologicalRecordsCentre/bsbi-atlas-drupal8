<?php

namespace Drupal\bsbi_atlas\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Block for development utilities for the BSBI Atlas.
 *
 * @Block(
 *   id = "atlas_devel_util",
 *   admin_label = @Translation("Atlas development block"),
 *   category = @Translation("BSBI Atlas"),
 * )
 */
class AtlasDevelUtil extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<div id="bsbi-atlas-development"></div><hr>',
    ];
  }

}