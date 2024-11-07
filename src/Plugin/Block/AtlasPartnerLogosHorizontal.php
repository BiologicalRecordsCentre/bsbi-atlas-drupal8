<?php

namespace Drupal\bsbi_atlas\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Url;

/**
 * Provides a Block for Partner logos.
 *
 * @Block(
 *   id = "atlas_partner_logos_horizontal",
 *   admin_label = @Translation("Atlas partner logos (horizontal)"),
 *   category = @Translation("BSBI Atlas"),
 * )
 */
class AtlasPartnerLogosHorizontal extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $bsbi = '/'. \Drupal::service('extension.list.module')->getPath('bsbi_atlas')  . '/images/BSBI-logo.gif';
    $ceh = '/'. \Drupal::service('extension.list.module')->getPath('bsbi_atlas')  . '/images/UKCEH-logo.png';
    $brc = '/'. \Drupal::service('extension.list.module')->getPath('bsbi_atlas')  . '/images/BRC-logo-3.png';

    $html = '<img alt="Botanical Society of Britain & Ireland logo" src="' . $bsbi . '" class="partner-logo-horizontal" />';
    $html .= '<img alt="UK Centre for Ecology & Hydrology logo" src="' . $ceh . '" class="partner-logo-horizontal" />';
    $html .= '<img alt="Biological Records Centre logo" src="' . $brc . '" class="partner-logo-horizontal" />';

    return [
      '#markup' => $html,
    ];
  }

}