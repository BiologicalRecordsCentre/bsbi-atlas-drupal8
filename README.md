### BSBI Atlas Drupal module
This Drupal module implements the BSBI Plant Atlas 2020 (https://plantatlas2020.org/), providing all the major GUI elements to drive the website. The module provides some Drupal plugin elements - mostly blocks, but most of the GUI elements are built using Javascript and the jQuery framework. The code in this module was written with a single use-case in mind. None of the code was structured in a generalised way to be useful in other websites. But developers of other websites who are curious about how the Plant Atlas was created may find it useful to examine the code here.

#### Dependencies
The mapping and charting elements of the Plant Atlas are provided by the BRC Atlas and Charts Javascripts libraries. In contrast to the general interface code for the Plant Atlas, these libraries *were* designed to be useful in a whole range of projects, so people wishing to implement mapping or charting elements similar to those on the Plant Atlas, will probably find it more useful to examine the repos and the example use cases for those libraries:
- https://github.com/BiologicalRecordsCentre/brc-atlas
- https://github.com/BiologicalRecordsCentre/brc-charts

The BSBI Plant Atlas 2020 uses the Bootstrap 3 library to create number of GUI elements. This library is not packaged in the module as it is assumed that the website will use the a Bootstrap 3 theme.

The taxon selector is provided by the BSBI Taxon Picker Javascript library: https://github.com/BSBI/Taxonpicker. A compiled distribution of this code is supplied with the BSBI Atlas Drupal module.

The BSBI Plant Atlas 2020 is driven by BSBI data extracted from the BSBI's database as static CSV files for this project. They are not included in this repository.

The image gallery on BSBI Plant Atlas 2020 is provided by the LightGallery opensource library https://www.lightgalleryjs.com/ which is packaged with the module. The images themselves are hosted on a BSBI server.
