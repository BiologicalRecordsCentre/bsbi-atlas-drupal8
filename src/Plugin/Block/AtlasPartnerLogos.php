<?php

namespace Drupal\bsbi_atlas\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Url;

/**
 * Provides a Block for Partner logos.
 *
 * @Block(
 *   id = "atlas_partner_logos",
 *   admin_label = @Translation("Atlas partner logos"),
 *   category = @Translation("BSBI Atlas"),
 * )
 */
class AtlasPartnerLogos extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $base_path = Url::fromRoute('<front>', [], ['absolute' => TRUE])->toString();

    $bsbi = $base_path . drupal_get_path('module', 'bsbi_atlas') . '/images/BSBI-logo.gif';
    $ceh = $base_path . drupal_get_path('module', 'bsbi_atlas') . '/images/UKCEH-logo.png';
    $brc = $base_path . drupal_get_path('module', 'bsbi_atlas') . '/images/BRC-logo.png';

    $html = '<p><img src="' . $bsbi . '" class="partner-logo" /></p>';
    $html .= '<p><img src="' . $ceh . '" class="partner-logo" /></p>';
    $html .= '<p><img src="' . $brc . '" class="partner-logo" /></p>';

    return [
      '#markup' => $html,
    ];
  }

}