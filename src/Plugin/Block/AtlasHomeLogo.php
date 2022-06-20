<?php

namespace Drupal\bsbi_atlas\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a Block for BSBI home logo.
 *
 * @Block(
 *   id = "atlas_home_logo",
 *   admin_label = @Translation("Atlas home logo"),
 *   category = @Translation("BSBI Atlas"),
 * )
 */
class AtlasHomeLogo extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $logo = drupal_get_path('module', 'bsbi_atlas') . '/images/BSBI-logo.gif';
    $html = '<p><a href="home"><img src="' . $logo . '" /><a></p>';
    $html .= '<p>&nbsp;</p>';
    
    return [
      '#markup' => $html,
    ];
  }

}