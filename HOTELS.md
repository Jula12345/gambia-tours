# Adding recommended accommodation

The public hotel collection is in hotels.html. Each property has its own static detail page, so its descriptions, rates and metadata are visible to search engines without JavaScript.

To add a property:

1. Create an assets/hotels/property-name directory with optimized images and an optional MP4.
2. Copy lalas-complex-brufut.html to a new property page. Replace the property name, location, amenities, rate table, images, canonical URL, social metadata and LodgingBusiness structured data with the supplied facts.
3. Add a stay-card to the stay-list in hotels.html and add the property to that page's ItemList structured data.
4. Add its URL to sitemap.xml.
5. Keep the enquiry form's data-source="hotel-enquiry". Change the hidden tour field to the accommodation name. Apartment preferences are included in the notes sent to the admin inbox and email.

Video loading is handled by hotel-page.js. Keep preload="none", put the file path in data-video-src, and omit src and source elements. The file is assigned only when the visitor presses play.

The images are supplied by the property. Keep illustrations labelled and publish only confirmed amenities. Prices are per apartment and must be confirmed with the property before a booking is accepted.
