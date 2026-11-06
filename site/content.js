/* =====================================================================
   CONCEPTS WEBSITE — CONTENT FILE
   ---------------------------------------------------------------------
   Change photos, videos, reviews and contact details here.
   You do not need to touch index.html for everyday updates.

   HOW TO ADD A PHOTO
   1. Copy the photo into the "img" folder (JPG, about 1600px wide is ideal).
   2. Add a line to the "projects" list below, e.g.
        { img: "img/my-new-kitchen.jpg", title: "Kitchen in Feroke", category: "Kitchens", detail: "Acrylic shutters · quartz top" },
   3. Save, then upload the whole website folder again (see HOW-TO-UPDATE.md).

   HOW TO CHANGE A VIDEO
   Put the new .mp4 in the "media" folder and change the file name below.
   Keep videos short (under 40 seconds) and under 8 MB so the page stays fast.
   ===================================================================== */

window.SITE = {

  contact: {
    whatsapp: "919544355406",              // country code + number, no + or spaces
    phoneDisplay: "+91 95443 55406",
    phoneLink: "+919544355406",
    email: "info@conceptscalicut.com",
    address: "St Patrick Church Building, Francis Road, near Kozhikode Railway Station, Kozhikode, Kerala 673002",
    hours: [
      ["Monday – Saturday", "9:30 am – 7:30 pm"],
      ["Sunday", "Closed"]
    ],
    googleProfile: "https://maps.google.com/?cid=17657175578454374676",
    reviewLink: "https://search.google.com/local/writereview?placeid=ChIJpfdfdWhZpjsRFLl5CqPjCvU",   // "Write a review" button
    directions: "https://www.google.com/maps/dir/?api=1&destination=11.242428,75.7844475",
    mapEmbedQuery: "Concepts Interiors & Home Decor, Chalappuram, Kozhikode",
    instagram: "https://www.instagram.com/conceptscalicut",
    facebook: "https://www.facebook.com/conceptscalicut",
    whatsappChannel: "https://whatsapp.com/channel/0029Vagc6QdAYlUFE0jaHE2u"   // WhatsApp Channel for updates
  },

  /* Home page film. "chapters" are the labels under the video; "at" is the second each one starts. */
  heroVideo: {
    src: "media/hero-bedroom.mp4",          // finished bedroom walkthrough (vertical). Computers show it in a framed panel, phones full screen.
    srcFallback: "media/hero-bedroom.mp4",
    poster: "img/hero-bedroom-poster.jpg",
    chapters: [
      { at: 0, label: "Finished Bedroom", note: "Designed & Built by Concepts", label_ml: "പൂർത്തിയായ ബെഡ്റൂം", note_ml: "Concepts ഡിസൈൻ ചെയ്ത് നിർമ്മിച്ചത്" }
    ]
  },

  workshopVideo: { src: "media/team-wallpaper.mp4", poster: "img/team-wallpaper-poster.jpg" },   // our team installing a wallpaper mural on site

  google: { rating: 4.9, count: 104 },

  /* Reviews copied word for word from our Google Business Profile. */
  reviews: [
    { name: "Sarita Deepak", stars: 5, text: "Concepts Enterprises is truly a one-stop answer for a broad spectrum of design services and products from lighting to interior design and decor items, to sourcing the latest innovations. The success of this brand derives mainly from the dedication of the owner to sincerely serve his clientele, oftentimes going above and beyond call to fulfil client requirements and satisfaction while paying attention to the minutest detail. Wishing him a worthy trajectory!" },
    { name: "Muhammed Razin", stars: 5, text: "Extremely satisfied with the outstanding service and premium materials. My bedroom looks fantastic with the new bed frame." },
    { name: "ROSHNA Ks", stars: 5, text: "Good work.we made all the communication through phone ,even the wallpaper selection.Everything was soo comfortable and feasible till the finish.Thank you so much team concepts" },
    { name: "Chris Collinson", stars: 5, text: "I’ve had two occasions to be pleased with the service that Manzoor from Concepts provides. He is reliable, sells at competitive prices, is friendly and knows his products well." },
    { name: "javad hassan mp", stars: 5, text: "I had come across to concept via my friend, they contribute a great job to my home renovation & I appreciate their commitment and the quality👍" },
    { name: "Azza Ayman", stars: 5, text: "We thoroughly enjoy the multitude of products that we purchased from here. They are of really high quality and the designs are modern and highly fashionable. Loved it!" },
    { name: "Muhammed Fadhil", stars: 5, text: "Highly recommended; customer friendly atmosphere;very good quality of wallpaper collection available.good set of lighting solutions" },
    { name: "Athira Krishna", stars: 5, text: "Great collection of artifacts for home decor. They provided a really good customer care meeting all our needs and demands." },
    { name: "Jamsheed Ummer", stars: 5, text: "Good products , good quality, concepts is giving the products with the good discount. Also sales team will help us to reduce our cost. I am recommending to go thru concepts" }
  ],

  /* Project gallery. category must match one of: Bedrooms, Kitchens, Living, Bathrooms, Commercial, Green & outdoor, 3D design */
  projects: [
    { img: "img/bedroom-teak.jpg",        title: "Master Bedroom with Teak Headboard Wall", category: "Bedrooms",        detail: "Teak-Finish Panelling · Arched Mirror · Wall Sconces" },
    { img: "img/kitchen-gloss.jpg",       title: "High-Gloss Modular Kitchen",              category: "Kitchens",        detail: "Glass Shelving · Under-Cabinet LED · Tall Pantry" },
    { img: "img/salon-cemx.jpg",          title: "CEMX Salon",                              category: "Commercial",      detail: "Arched Mirror Stations · Grid Partition · Portrait Art" },
    { img: "img/bedroom-wood.jpg",        title: "Bedroom with Wood-Panelled TV Wall",      category: "Bedrooms",        detail: "Wood Veneer · Arched Niche · Cove Ceiling" },
    { img: "img/courtyard-waterwall.jpg", title: "Skylit Courtyard with Water Wall",        category: "Green & outdoor", detail: "3D Concept · Stone Water Wall · Cane Seating" },
    { img: "img/tv-unit.jpg",             title: "TV Wall with Stone-Look Cladding",        category: "Living",          detail: "Stone-Look Panel · Arched Shelves · Profile Lights" },
    { img: "img/shower-niche.jpg",        title: "Walk-in Shower with Lit Niches",          category: "Bathrooms",       detail: "Large-Format Tiles · Black Frame Glass · LED Niche" },
    { img: "img/staircase.jpg",           title: "Staircase with Storage and Wash Area",    category: "Living",          detail: "Floating Treads · Under-Stair Cabinets · Pebble Mirror" },
    { img: "img/kitchen-cemx.jpg",        title: "Open Kitchen with Breakfast Counter",     category: "Kitchens",        detail: "Handle-Less Shutters · Timber Counter" },
    { img: "img/bedroom-arch.jpg",        title: "Bedroom with Arched Dresser Mirror",      category: "Bedrooms",        detail: "LED Cove · Arched Mirror · Dresser" },
    { img: "img/office-greenwall.jpg",    title: "Office with Vertical Garden",             category: "Commercial",      detail: "Green Wall · Glass Partitions · Linear Lights" },
    { img: "img/living-render.jpg",       title: "Double-Height Living Room",               category: "3D design",       detail: "3D Render · Louvred Windows · Indoor Planters" },
    { img: "img/vanity-mirror.jpg",       title: "Vanity with Pebble LED Mirror",           category: "Bathrooms",       detail: "Backlit Mirror · Vessel Basin · Black Granite" },
    { img: "img/bedroom-fluted.jpg",      title: "Guest Bedroom with Fluted Wall",          category: "Bedrooms",        detail: "Fluted Panels · Warm Wall Lights" },
    { img: "img/courtyard-lounge.jpg",    title: "Courtyard Lounge",                        category: "Green & outdoor", detail: "3D Concept · Vertical Louvres · Timber Deck" },
    { img: "img/living-dining.jpg",       title: "Living and Dining with Grid Partition",   category: "Living",          detail: "Metal Grid Divider · Timber Ceiling Band" },
    { img: "img/salon-mirrors.jpg",       title: "Salon with Backlit Mirrors",              category: "Commercial",      detail: "LED Mirrors · Timber Flooring · Display Shelves" },
    { img: "img/utility.jpg",             title: "Work Area and Utility",                   category: "Kitchens",        detail: "Washer Bay · Black Granite · Tall Units" },
    { img: "img/elevation.jpg",           title: "Contemporary House Elevation",            category: "3D design",       detail: "3D Render · Stone Cladding · Glass Railings" },
    { img: "img/shower-glass.jpg",        title: "Bathroom with Glass Partition",           category: "Bathrooms",       detail: "Black Frame Glass · Lit Niche · Wall-Hung Vanity" },
    { img: "img/balcony-suite.jpg",       title: "Bedroom Opening onto a Balcony",          category: "Bedrooms",        detail: "Sliding Glazing · Deck · Lounge Chairs" },
    { img: "img/greenwall-outdoor.jpg",   title: "Outdoor Vertical Garden",                 category: "Green & outdoor", detail: "Artificial Foliage · Steel Frame" },
    { img: "img/bar-counter.jpg",         title: "Bar Counter with Pendant Lights",         category: "Living",          detail: "Pendant Lights · Bar Stools · Display Unit" },
    { img: "img/bedroom-cove.jpg",        title: "Calm Bedroom with Profile Lighting",      category: "Bedrooms",        detail: "Cove Lighting · Upholstered Bed" },
    { img: "img/kitchen-render.jpg",      title: "Sage Modular Kitchen",                    category: "3D design",       detail: "3D Render · Sage Shutters · Glass Uppers" },
    { img: "img/corridor.jpg",            title: "Corridor with Timber Doors",              category: "Living",          detail: "Veneer Doors · Picture Lights" },
    { img: "img/terrace-garden.jpg",      title: "Terrace Garden with Pergola",             category: "Green & outdoor", detail: "3D Concept · Glass Pergola · Stepping Stones" }
  ],

  /* Showroom products. The *_ml fields are the Malayalam version. */
  products: [
    { img: "img/wallpaper-tropical.jpg", pos: "center 30%", group: "Wallpapers",        title: "Customised & catalogue wallpapers", text: "Printed to your wall size or chosen from catalogues, with professional installation.",
      group_ml: "വാൾപേപ്പർ", title_ml: "കസ്റ്റമൈസ്ഡ് & കാറ്റലോഗ് വാൾപേപ്പറുകൾ", text_ml: "ചുമരിന്റെ അളവിൽ പ്രിന്റ് ചെയ്തതോ കാറ്റലോഗിൽ നിന്ന് തിരഞ്ഞെടുത്തതോ; പ്രൊഫഷണൽ ഇൻസ്റ്റലേഷനോടെ." },
    { img: "img/mirror-oval.jpg",        group: "Lighting",          title: "LED mirrors",                  text: "Oval, round and custom shapes with backlight, touch switch and anti-fog options.",
      group_ml: "ലൈറ്റിംഗ്", title_ml: "LED മിററുകൾ", text_ml: "ബാക്ക്‌ലൈറ്റ്, ടച്ച് സ്വിച്ച്, ആന്റി-ഫോഗ് ഓപ്ഷനുകളോടെ ഓവൽ, റൗണ്ട്, കസ്റ്റം ഷേപ്പുകൾ." },
    { img: "img/lvt-poster.jpg", pos: "center 92%", group: "Flooring", title: "LVT flooring",               text: "Wood-look vinyl planks that go over existing tiles, quiet and warm underfoot.",
      group_ml: "ഫ്ലോറിംഗ്", title_ml: "LVT ഫ്ലോറിംഗ്", text_ml: "പഴയ ടൈലുകൾക്ക് മുകളിൽ ഇടാവുന്ന, തടിയുടെ ഭംഗിയുള്ള വിനൈൽ പ്ലാങ്കുകൾ; ശബ്ദം കുറവ്, കാലിന് ഊഷ്മളത." },
    { img: "img/vases-black.jpg",        group: "Decor accessories", title: "Vases & table decor",          text: "Textured ceramic vases, planters and table pieces in black, white and gold.",
      group_ml: "ഡെക്കർ ആക്സസറീസ്", title_ml: "വാസുകളും ടേബിൾ ഡെക്കറും", text_ml: "കറുപ്പ്, വെളുപ്പ്, ഗോൾഡ് നിറങ്ങളിൽ ടെക്സ്ചർഡ് സെറാമിക് വാസുകൾ, പ്ലാന്ററുകൾ, ടേബിൾ പീസുകൾ." },
    { img: "img/frames.jpg",             group: "Wall decor",        title: "Memories collection frames",   text: "Gallery-wall frame sets for your own photos or our black-and-white prints.",
      group_ml: "വാൾ ഡെക്കർ", title_ml: "മെമ്മറീസ് കളക്ഷൻ ഫ്രെയിമുകൾ", text_ml: "നിങ്ങളുടെ ഫോട്ടോകൾക്കോ ഞങ്ങളുടെ ബ്ലാക്ക് & വൈറ്റ് പ്രിന്റുകൾക്കോ ഗാലറി-വാൾ ഫ്രെയിം സെറ്റുകൾ." },
    { img: "img/calligraphy-gold.jpg",   group: "Wall art",          title: "Calligraphy wall art",         text: "Arabic calligraphy pieces in gold and black, made to the size of your wall.",
      group_ml: "വാൾ ആർട്ട്", title_ml: "കാലിഗ്രഫി വാൾ ആർട്ട്", text_ml: "ചുമരിന്റെ വലിപ്പത്തിനനുസരിച്ച്, ഗോൾഡിലും കറുപ്പിലും അറബിക് കാലിഗ്രഫി." },
    { img: "img/greenwall-outdoor.jpg",  group: "Greenery",          title: "Artificial vertical gardens",  text: "Low-maintenance green walls for balconies, offices, courtyards and boundary walls.",
      group_ml: "ഗ്രീനറി", title_ml: "ആർട്ടിഫിഷ്യൽ വെർട്ടിക്കൽ ഗാർഡൻ", text_ml: "ബാൽക്കണി, ഓഫീസ്, നടുമുറ്റം, മതിൽ എന്നിവയ്ക്ക് പരിപാലനം കുറഞ്ഞ ഗ്രീൻ വാളുകൾ." },
    { img: "img/curtain-poster.jpg",     group: "Soft furnishing",   title: "Curtains & blinds",            text: "Made-to-measure curtains, sheers and blinds, stitched and fitted by our team.",
      group_ml: "സോഫ്റ്റ് ഫർണിഷിംഗ്", title_ml: "കർട്ടനുകളും ബ്ലൈൻഡുകളും", text_ml: "അളവിനനുസരിച്ച് ഞങ്ങളുടെ ടീം തയ്ച്ച് ഫിറ്റ് ചെയ്യുന്ന കർട്ടനുകൾ, ഷിയറുകൾ, ബ്ലൈൻഡുകൾ." }
  ],

  /* FEATURED PRODUCT on the home page. Change this to a new arrival, an offer, or any product you want to push.
     badge examples: "Featured", "New arrival", "Special offer". Only mention a discount if it is real and current. */
  featured: {
    badge: "Featured", badge_ml: "ഫീച്ചർഡ്",
    title: "LED Mirrors", title_ml: "LED മിററുകൾ",
    text: "Backlit mirrors that light the face evenly and lift the whole bathroom. Choose oval, round or a custom shape made to fit your vanity.",
    text_ml: "മുഖത്ത് ഒരുപോലെ വെളിച്ചം നൽകുകയും ബാത്ത്റൂമിന്റെ ഭംഗി കൂട്ടുകയും ചെയ്യുന്ന ബാക്ക്‌ലിറ്റ് മിററുകൾ. ഓവൽ, റൗണ്ട്, അല്ലെങ്കിൽ നിങ്ങളുടെ വാനിറ്റിക്ക് യോജിച്ച കസ്റ്റം ഷേപ്പ്.",
    highlights: ["Oval, Round & Custom Shapes", "Backlight with Touch Switch", "Anti-Fog Option"],
    highlights_ml: ["ഓവൽ, റൗണ്ട്, കസ്റ്റം ഷേപ്പുകൾ", "ടച്ച് സ്വിച്ചുള്ള ബാക്ക്‌ലൈറ്റ്", "ആന്റി-ഫോഗ് ഓപ്ഷൻ"],
    img: "img/mirror-oval.jpg", img2: "img/vanity-mirror.jpg",
    group: "mirrors"
  },

  /* PRODUCT CATALOGUE. Two collections, each made of groups. Add a group by copying one { ... } block.
     img is optional: groups without a photo show a styled title card until you add one. */
  /* PRODUCT CATALOGUE (from our WhatsApp catalogue). Collections > groups > products.
     Each product: name, text, img (optional). Add a product by copying one { ... } line inside "products". */
  catalog: [
    {
      "id": "interior",
      "name": "Interior Products",
      "name_ml": "ഇന്റീരിയർ ഉൽപ്പന്നങ്ങൾ",
      "intro": "Materials and fittings that shape a room: walls, ceilings, windows, floors, mirrors and furniture, supplied and installed by our team.",
      "intro_ml": "മുറിയുടെ രൂപം നിർണ്ണയിക്കുന്ന മെറ്റീരിയലുകളും ഫിറ്റിംഗുകളും: ചുമരുകൾ, ജനലുകൾ, തറ, മിററുകൾ. ഞങ്ങളുടെ ടീം സപ്ലൈ ചെയ്ത് ഇൻസ്റ്റാൾ ചെയ്യുന്നു.",
      "cover": "img/tv-unit.jpg",
      "groups": [
        {
          "id": "wall-coverings",
          "name": "Wall Coverings",
          "name_ml": "വാൾ കവറിംഗ്",
          "img": "img/wallpaper-tropical.jpg",
          "pos": "center 30%",
          "text": "Catalogue and customised wallpapers, wall textures and wall panels, installed by our team.",
          "text_ml": "കാറ്റലോഗ്, കസ്റ്റമൈസ്ഡ് വാൾപേപ്പറുകൾ, വാൾ ടെക്സ്ചറുകൾ, വാൾ പാനലുകൾ; ഞങ്ങളുടെ ടീം ഇൻസ്റ്റാൾ ചെയ്യുന്നു.",
          "items": [
            "Wallpapers",
            "Customised Wallpapers",
            "Tropical Wallpapers",
            "Liquid Wall Coverings",
            "3D PVC Wall Panels",
            "Texture Wall Coating",
            "Wall Mouldings"
          ],
          "products": [
            {
              "name": "Wallpapers",
              "text": "Non-woven, PVC, vinyl and 3D wallpapers from leading brands, supplied and installed by our technicians.",
              "img": "img/products/wallpapers.jpg",
              "gallery": [
                "img/products/g/wallpapers-2.jpg",
                "img/products/g/wallpapers-3.jpg",
                "img/products/g/wallpapers-4.jpg",
                "img/products/g/wallpapers-5.jpg",
                "img/products/g/wallpapers-6.jpg",
                "img/products/g/wallpapers-7.jpg"
              ]
            },
            {
              "name": "Customised Wallpapers",
              "text": "Any design printed to your wall size, with seamless installation by our team.",
              "img": "img/products/customised-wallpapers.jpg",
              "gallery": [
                "img/products/g/customised-wallpapers-1.jpg",
                "img/products/g/customised-wallpapers-2.jpg"
              ]
            },
            {
              "name": "Tropical Wallpapers",
              "text": "Greenery and landscape patterns that bring a calm, natural feel to bedrooms and living rooms.",
              "img": "img/products/tropical-wallpapers.jpg",
              "gallery": [
                "img/products/g/tropical-wallpapers-2.jpg",
                "img/products/g/tropical-wallpapers-3.jpg",
                "img/products/g/tropical-wallpapers-4.jpg"
              ]
            },
            {
              "name": "Liquid Wall Coverings",
              "text": "Textured, customisable wall coverings in a wide range of colours.",
              "img": "img/products/liquid-wall-coverings.jpg",
              "gallery": [
                "img/products/g/liquid-wall-coverings-2.jpg",
                "img/products/g/liquid-wall-coverings-3.jpg",
                "img/products/g/liquid-wall-coverings-4.jpg",
                "img/products/g/liquid-wall-coverings-5.jpg",
                "img/products/g/liquid-wall-coverings-6.jpg",
                "img/products/g/liquid-wall-coverings-7.jpg",
                "img/products/g/liquid-wall-coverings-8.jpg"
              ]
            },
            {
              "name": "3D PVC Wall Panels",
              "text": "Waterproof 50 × 50 cm uPVC panels in matt and metallic finishes. Quick to install.",
              "img": "img/products/3d-pvc-wall-panels.jpg",
              "gallery": [
                "img/products/g/3d-pvc-wall-panels-2.jpg",
                "img/products/g/3d-pvc-wall-panels-3.jpg",
                "img/products/g/3d-pvc-wall-panels-4.jpg",
                "img/products/g/3d-pvc-wall-panels-5.jpg",
                "img/products/g/3d-pvc-wall-panels-6.jpg",
                "img/products/g/3d-pvc-wall-panels-7.jpg",
                "img/products/g/3d-pvc-wall-panels-8.jpg"
              ]
            },
            {
              "name": "Texture Wall Coating",
              "text": "Cement-texture finishes for interior and exterior walls.",
              "img": "img/products/texture-wall-coating.jpg",
              "gallery": [
                "img/products/g/texture-wall-coating-2.jpg",
                "img/products/g/texture-wall-coating-3.jpg",
                "img/products/g/texture-wall-coating-4.jpg",
                "img/products/g/texture-wall-coating-5.jpg",
                "img/products/g/texture-wall-coating-6.jpg",
                "img/products/g/texture-wall-coating-7.jpg",
                "img/products/g/texture-wall-coating-8.jpg"
              ]
            },
            {
              "name": "Wall Mouldings",
              "text": "Paintable French mouldings in white and gold profiles for classic panelled walls.",
              "img": "img/products/wall-mouldings.jpg",
              "gallery": [
                "img/products/g/wall-mouldings-2.jpg",
                "img/products/g/wall-mouldings-4.jpg",
                "img/products/g/wall-mouldings-5.jpg",
                "img/products/g/wall-mouldings-6.jpg"
              ]
            }
          ]
        },
        {
          "id": "louvers",
          "name": "Louvers & Wall Panels",
          "name_ml": "ലൂവറും വാൾ പാനലും",
          "img": "img/products/louvers-wpc-wall-panels.jpg",
          "text": "PVC, WPC, charcoal and flexible louvers for feature walls, TV walls, ceilings and partitions, supplied and installed by our team.",
          "text_ml": "ഫീച്ചർ വാൾ, ടിവി വാൾ, സീലിംഗ്, പാർട്ടീഷൻ എന്നിവയ്ക്കായി PVC, WPC, ചാർക്കോൾ, ഫ്ലെക്സിബിൾ ലൂവറുകൾ; ഞങ്ങളുടെ ടീം സപ്ലൈ ചെയ്ത് ഇൻസ്റ്റാൾ ചെയ്യുന്നു.",
          "items": [
            "WPC Louvers",
            "PVC Louvers",
            "Charcoal Louvers",
            "Flexible Louvers"
          ],
          "products": [
            {
              "name": "WPC Louvers",
              "img": "img/products/louvers-wpc-wall-panels.jpg",
              "text": "Wood-plastic composite louvers, 9.5 ft long and 6 inches wide, in wood, stone and metallic finishes.",
              "details": [
                "Rigid and durable, with a realistic wood-grain look",
                "Suited to feature walls, TV walls and partitions",
                "Many colours and textures to choose from in our showroom"
              ],
              "gallery": [
                "img/products/g/wpc-louvers-2.jpg",
                "img/products/g/wpc-louvers-3.jpg",
                "img/products/g/wpc-louvers-4.jpg",
                "img/products/g/wpc-louvers-5.jpg"
              ]
            },
            {
              "name": "PVC Louvers",
              "text": "Lightweight, water-resistant PVC louvers. A practical choice for feature walls, kitchens and budget-friendly makeovers.",
              "details": [
                "Water-resistant and easy to clean",
                "Light, so quick to install",
                "Wide range of colours and wood finishes"
              ],
              "img": "img/products/g/pvc-louvers-w1.jpg",
              "gallery": [
                "img/products/g/pvc-louvers-w2.jpg",
                "img/products/g/pvc-louvers-w3.jpg",
                "img/products/g/pvc-louvers-w4.jpg",
                "img/products/g/pvc-louvers-w5.jpg"
              ]
            },
            {
              "name": "Charcoal Louvers",
              "text": "Charcoal (bamboo-charcoal composite) louvers and panels with a smooth, premium finish in wood, marble and fabric textures.",
              "details": [
                "Premium look for living rooms, bedrooms and offices",
                "Available as louvers and flat panels",
                "See textures and finishes in our showroom"
              ],
              "img": "img/products/g/charcoal-louvers-w1.jpg",
              "gallery": [
                "img/products/g/charcoal-louvers-w2.jpg",
                "img/products/g/charcoal-louvers-w3.jpg"
              ]
            },
            {
              "name": "Flexible Louvers",
              "text": "Bendable louvers that wrap around curved walls, columns, arches and rounded counters.",
              "details": [
                "Follows curves where rigid panels cannot",
                "Ideal for columns, reception counters and arches",
                "Matching finishes with our straight louvers"
              ],
              "img": "img/products/g/flexible-louvers-w1.jpg",
              "gallery": [
                "img/products/g/flexible-louvers-w2.jpg",
                "img/products/g/flexible-louvers-w3.jpg",
                "img/products/g/flexible-louvers-w4.jpg"
              ]
            }
          ]
        },
        {
          "id": "ceilings",
          "name": "False Ceilings",
          "name_ml": "ഫാൾസ് സീലിംഗ്",
          "img": "img/products/false-ceiling-panels.jpg",
          "text": "Heat-resistant ceiling panels, wood-pattern ceiling boards and gypsum false ceilings with integrated lighting.",
          "text_ml": "ചൂട് പ്രതിരോധിക്കുന്ന സീലിംഗ് പാനലുകൾ, വുഡ്-പാറ്റേൺ ബോർഡുകൾ, ലൈറ്റിംഗോടുകൂടിയ ജിപ്സം ഫാൾസ് സീലിംഗ്.",
          "products": [
            {
              "name": "False Ceiling Panels",
              "text": "Water-resistant ceiling panels that install quickly and are easy to maintain.",
              "img": "img/products/false-ceiling-panels.jpg",
              "gallery": [
                "img/products/g/false-ceiling-panels-2.jpg",
                "img/products/g/false-ceiling-panels-3.jpg",
                "img/products/g/false-ceiling-panels-4.jpg"
              ]
            },
            {
              "name": "Heat-Resistant Ceiling Panels",
              "text": "Heat-resistant (Heatout) ceiling panels with a natural wood pattern, a popular choice under roofs and sheet ceilings to keep rooms more comfortable.",
              "img": "img/products/wood-pattern-ceiling-boards.jpg",
              "details": [
                "Heat-resistant panels for false ceilings",
                "Natural wood-grain finish",
                "Quick installation and easy maintenance",
                "Water-resistant"
              ],
              "gallery": [
                "img/products/g/heat-resistant-ceiling-panels-2.jpg",
                "img/products/g/heat-resistant-ceiling-panels-3.jpg",
                "img/products/g/heat-resistant-ceiling-panels-4.jpg",
                "img/products/g/heat-resistant-ceiling-panels-5.jpg",
                "img/products/g/heat-resistant-ceiling-panels-6.jpg",
                "img/products/g/heat-resistant-ceiling-panels-7.jpg",
                "img/products/g/heat-resistant-ceiling-panels-8.jpg"
              ]
            },
            {
              "name": "Gypsum False Ceilings",
              "text": "Designed and built by our team, with cove lighting and profiles to suit the room.",
              "img": "img/products/gypsum-false-ceilings.jpg",
              "gallery": [
                "img/products/g/gypsum-false-ceilings-1.jpg",
                "img/products/g/gypsum-false-ceilings-2.jpg",
                "img/products/g/gypsum-false-ceilings-3.jpg",
                "img/products/g/gypsum-false-ceilings-4.jpg",
                "img/products/g/gypsum-false-ceilings-5.jpg",
                "img/products/g/gypsum-false-ceilings-6.jpg",
                "img/products/g/gypsum-false-ceilings-7.jpg",
                "img/products/g/gypsum-false-ceilings-8.jpg"
              ]
            }
          ],
          "items": [
            "False Ceiling Panels",
            "Heat-Resistant Ceiling Panels",
            "Gypsum False Ceilings"
          ]
        },
        {
          "id": "curtains",
          "name": "Curtains & Blinds",
          "name_ml": "കർട്ടനും ബ്ലൈൻഡും",
          "img": "img/curtain-poster.jpg",
          "text": "Made-to-measure curtains and blinds, stitched and fitted by our team, plus outdoor blinds and insect nets.",
          "text_ml": "അളവിനനുസരിച്ച് തയ്ച്ച് ഫിറ്റ് ചെയ്യുന്ന കർട്ടനുകൾ, ഷിയറുകൾ, ബ്ലൈൻഡുകൾ.",
          "items": [
            "Fabric Curtains",
            "Window Blinds",
            "Roman Blinds",
            "Zebra Blinds",
            "PVC Outdoor Blinds",
            "Mosquito & Safety Nets"
          ],
          "products": [
            {
              "name": "Fabric Curtains",
              "text": "M-track, eyelet and ripple curtains in a wide fabric range, stitched and installed to measure.",
              "img": "img/products/fabric-curtains.jpg",
              "gallery": [
                "img/products/g/fabric-curtains-2.jpg",
                "img/products/g/fabric-curtains-3.jpg",
                "img/products/g/fabric-curtains-4.jpg",
                "img/products/g/fabric-curtains-5.jpg",
                "img/products/g/fabric-curtains-6.jpg",
                "img/products/g/fabric-curtains-7.jpg",
                "img/products/g/fabric-curtains-8.jpg"
              ]
            },
            {
              "name": "Window Blinds",
              "text": "Zebra, roman, roller, venetian and vertical blinds for homes and offices.",
              "img": "img/products/window-blinds.jpg",
              "gallery": [
                "img/products/g/window-blinds-2.jpg",
                "img/products/g/window-blinds-3.jpg",
                "img/products/g/window-blinds-4.jpg",
                "img/products/g/window-blinds-5.jpg",
                "img/products/g/window-blinds-6.jpg",
                "img/products/g/window-blinds-7.jpg",
                "img/products/g/window-blinds-8.jpg"
              ]
            },
            {
              "name": "Roman Blinds",
              "text": "Soft fabric blinds that fold neatly when raised.",
              "img": "img/products/roman-blinds.jpg",
              "gallery": [
                "img/products/g/roman-blinds-2.jpg",
                "img/products/g/roman-blinds-3.jpg",
                "img/products/g/roman-blinds-4.jpg",
                "img/products/g/roman-blinds-5.jpg",
                "img/products/g/roman-blinds-6.jpg"
              ]
            },
            {
              "name": "Zebra Blinds",
              "text": "Economical, stylish dual-layer blinds in many colours. Our most popular choice.",
              "img": "img/products/zebra-blinds.jpg",
              "gallery": [
                "img/products/g/zebra-blinds-2.jpg",
                "img/products/g/zebra-blinds-3.jpg",
                "img/products/g/zebra-blinds-4.jpg",
                "img/products/g/zebra-blinds-5.jpg",
                "img/products/g/zebra-blinds-6.jpg"
              ]
            },
            {
              "name": "PVC Outdoor Blinds",
              "text": "Weather-resistant blinds for balconies, sit-outs and verandas.",
              "img": "img/products/pvc-outdoor-blinds.jpg",
              "gallery": [
                "img/products/g/pvc-outdoor-blinds-3.jpg"
              ]
            },
            {
              "name": "Mosquito & Safety Nets",
              "text": "Insect nets for doors and windows, including sliding-door types, plus safety nets.",
              "img": "img/products/mosquito-safety-nets.jpg",
              "gallery": [
                "img/products/g/mosquito-safety-nets-2.jpg",
                "img/products/g/mosquito-safety-nets-3.jpg",
                "img/products/g/mosquito-safety-nets-4.jpg",
                "img/products/g/mosquito-safety-nets-5.jpg",
                "img/products/g/mosquito-safety-nets-6.jpg"
              ]
            }
          ]
        },
        {
          "id": "flooring",
          "name": "Flooring",
          "name_ml": "ഫ്ലോറിംഗ്",
          "img": "img/lvt-poster.jpg",
          "pos": "center 92%",
          "text": "Premium vinyl flooring tiles and carpet flooring for homes, offices and hotels.",
          "text_ml": "നിരപ്പായ പഴയ ടൈലുകൾക്ക് മുകളിൽ ഇടാവുന്ന, തടിയുടെ ഭംഗിയുള്ള LVT പ്ലാങ്കുകൾ. മറ്റ് ഫ്ലോറിംഗ് ഓപ്ഷനുകളെക്കുറിച്ചും ചോദിക്കാം.",
          "items": [
            "Premium Vinyl Flooring",
            "Carpet Flooring"
          ],
          "products": [
            {
              "name": "Premium Vinyl Flooring",
              "text": "Vinyl flooring tiles in 1.5 mm and 2.0 mm thickness with natural wood looks.",
              "img": "img/products/premium-vinyl-flooring.jpg",
              "gallery": [
                "img/products/g/premium-vinyl-flooring-2.jpg",
                "img/products/g/premium-vinyl-flooring-6.jpg"
              ]
            },
            {
              "name": "Carpet Flooring",
              "text": "Carpet tiles and rolls for offices, hotels and bedrooms.",
              "img": "img/products/carpet-flooring.jpg",
              "gallery": [
                "img/products/g/carpet-flooring-2.jpg",
                "img/products/g/carpet-flooring-3.jpg"
              ]
            }
          ]
        },
        {
          "id": "mirrors",
          "name": "Mirrors",
          "name_ml": "മിററുകൾ",
          "img": "img/mirror-oval.jpg",
          "text": "From everyday plain mirrors to statement LED, decor, framed and pedestal mirrors.",
          "text_ml": "സാധാരണ മിററുകൾ മുതൽ LED, ഡെക്കർ, ഫ്രെയിം, പെഡസ്റ്റൽ മിററുകൾ വരെ.",
          "items": [
            "LED Mirrors",
            "Customised Frame Mirrors",
            "Wooden Frame Mirrors",
            "Pedestal Mirrors",
            "Plain Mirrors",
            "Asymmetric Mirrors",
            "Decor Mirrors"
          ],
          "products": [
            {
              "name": "LED Mirrors",
              "text": "Backlit mirrors made to your size and shape, with touch switch and anti-fog options.",
              "img": "img/products/led-mirrors.jpg",
              "gallery": [
                "img/products/g/led-mirrors-2.jpg",
                "img/products/g/led-mirrors-4.jpg",
                "img/products/g/led-mirrors-5.jpg",
                "img/products/g/led-mirrors-6.jpg",
                "img/products/g/led-mirrors-7.jpg",
                "img/products/g/led-mirrors-8.jpg"
              ]
            },
            {
              "name": "Customised Frame Mirrors",
              "text": "Statement wall-mounted mirrors with metal or wood frames, made to order.",
              "img": "img/products/customised-frame-mirrors.jpg",
              "gallery": [
                "img/products/g/customised-frame-mirrors-2.jpg",
                "img/products/g/customised-frame-mirrors-3.jpg",
                "img/products/g/customised-frame-mirrors-4.jpg",
                "img/products/g/customised-frame-mirrors-5.jpg",
                "img/products/g/customised-frame-mirrors-6.jpg",
                "img/products/g/customised-frame-mirrors-7.jpg",
                "img/products/g/customised-frame-mirrors-8.jpg"
              ]
            },
            {
              "name": "Wooden Frame Mirrors",
              "text": "Mirrors framed in natural wood for a warm, organic look.",
              "img": "img/products/wooden-frame-mirrors.jpg",
              "gallery": [
                "img/products/g/wooden-frame-mirrors-2.jpg",
                "img/products/g/wooden-frame-mirrors-3.jpg",
                "img/products/g/wooden-frame-mirrors-4.jpg",
                "img/products/g/wooden-frame-mirrors-5.jpg",
                "img/products/g/wooden-frame-mirrors-6.jpg",
                "img/products/g/wooden-frame-mirrors-7.jpg",
                "img/products/g/wooden-frame-mirrors-8.jpg"
              ]
            },
            {
              "name": "Pedestal Mirrors",
              "text": "Free-standing full-length mirrors in the size of your choice.",
              "img": "img/products/pedestal-mirrors.jpg",
              "gallery": [
                "img/products/g/pedestal-mirrors-2.jpg",
                "img/products/g/pedestal-mirrors-3.jpg",
                "img/products/g/pedestal-mirrors-4.jpg"
              ]
            },
            {
              "name": "Plain Mirrors",
              "text": "Bevelled and polished mirrors with hook or stud fixing.",
              "img": "img/products/plain-mirrors.jpg",
              "gallery": [
                "img/products/g/plain-mirrors-2.jpg",
                "img/products/g/plain-mirrors-3.jpg"
              ]
            },
            {
              "name": "Asymmetric Mirrors",
              "text": "Mirrors in unconventional, free-form shapes that add character to a wall.",
              "img": "img/products/asymmetric-mirrors.jpg",
              "gallery": [
                "img/products/g/asymmetric-mirrors-2.jpg",
                "img/products/g/asymmetric-mirrors-3.jpg",
                "img/products/g/asymmetric-mirrors-4.jpg",
                "img/products/g/asymmetric-mirrors-5.jpg"
              ]
            },
            {
              "name": "Decor Mirrors",
              "text": "Sun, sunflower and starburst decor mirrors, plus self-adhesive mirror shapes, to make a wall the centrepiece of a room.",
              "details": [
                "Sun, sunflower and starburst designs",
                "Gold, silver and black frames",
                "Self-adhesive mirror shapes, customisable to your design"
              ],
              "gallery": [
                "img/products/g/decor-mirrors-w4.jpg",
                "img/products/g/decor-mirrors-w6.jpg",
                "img/products/g/decor-mirrors-1.jpg",
                "img/products/g/decor-mirrors-2.jpg"
              ],
              "img": "img/products/g/decor-mirrors-w5.jpg"
            }
          ]
        },
        {
          "id": "furniture",
          "name": "Customised Furniture",
          "name_ml": "കസ്റ്റമൈസ്ഡ് ഫർണിച്ചർ",
          "img": "img/products/sofas-chairs.jpg",
          "text": "Sofas, dressing units and bedroom furniture made to your design.",
          "text_ml": "നിങ്ങളുടെ ഡിസൈനിൽ നിർമ്മിക്കുന്ന സോഫകൾ, ഡ്രസ്സിംഗ് യൂണിറ്റുകൾ, ബെഡ്റൂം ഫർണിച്ചർ.",
          "products": [
            {
              "name": "Sofas & Chairs",
              "text": "Quality sofas and chairs made to order in your design and upholstery.",
              "img": "img/products/sofas-chairs.jpg",
              "gallery": [
                "img/products/g/sofas-chairs-2.jpg",
                "img/products/g/sofas-chairs-3.jpg",
                "img/products/g/sofas-chairs-4.jpg",
                "img/products/g/sofas-chairs-5.jpg",
                "img/products/g/sofas-chairs-6.jpg",
                "img/products/g/sofas-chairs-8.jpg"
              ]
            },
            {
              "name": "Dressing Units",
              "text": "Custom dressing units with mirrors, lighting and storage.",
              "img": "img/products/dressing-units.jpg",
              "gallery": [
                "img/products/g/dressing-units-2.jpg",
                "img/products/g/dressing-units-3.jpg",
                "img/products/g/dressing-units-4.jpg",
                "img/products/g/dressing-units-5.jpg",
                "img/products/g/dressing-units-6.jpg",
                "img/products/g/dressing-units-7.jpg",
                "img/products/g/dressing-units-8.jpg"
              ]
            },
            {
              "name": "Bedroom Furniture",
              "text": "Beds, wardrobes and storage built to suit each client.",
              "img": "img/products/bedroom-furniture.jpg",
              "gallery": [
                "img/products/g/bedroom-furniture-1.jpg",
                "img/products/g/bedroom-furniture-2.jpg",
                "img/products/g/bedroom-furniture-3.jpg",
                "img/products/g/bedroom-furniture-4.jpg",
                "img/products/g/bedroom-furniture-5.jpg"
              ]
            }
          ],
          "items": [
            "Sofas & Chairs",
            "Dressing Units",
            "Bedroom Furniture"
          ]
        },
        {
          "id": "water-purifiers",
          "name": "Water Purifiers",
          "name_ml": "വാട്ടർ പ്യൂരിഫയറുകൾ",
          "text": "Indoor and large outdoor water purifiers, supplied and installed by our team.",
          "text_ml": "വീടുകൾക്കും വലിയ ഇടങ്ങൾക്കും വാട്ടർ പ്യൂരിഫയറുകൾ; ഞങ്ങളുടെ ടീം സപ്ലൈ ചെയ്ത് ഇൻസ്റ്റാൾ ചെയ്യുന്നു.",
          "items": [
            "Water Purifiers"
          ],
          "products": [
            {
              "name": "Water Purifiers",
              "text": "Indoor and large-scale outdoor water purifiers from Aquaguard (Eureka Forbes), AO Smith and VIRON."
            }
          ]
        }
      ]
    },
    {
      "id": "decor",
      "name": "Decor Products",
      "name_ml": "ഡെക്കർ ഉൽപ്പന്നങ്ങൾ",
      "intro": "Finishing pieces that give a home its character: curios, wall art, clocks, calligraphy, plants, pots and frames.",
      "intro_ml": "വീടിന് വ്യക്തിത്വം നൽകുന്ന ഫിനിഷിംഗ് പീസുകൾ: ക്യൂരിയോകൾ, വാൾ ആർട്ട്, ചെടികൾ, ചട്ടികൾ, ഫ്രെയിമുകൾ.",
      "cover": "img/vases-black.jpg",
      "groups": [
        {
          "id": "curios",
          "name": "Curios",
          "name_ml": "ക്യൂരിയോകൾ",
          "img": "img/vases-black.jpg",
          "text": "Textured ceramic vases, table pieces and showpieces in black, white and gold.",
          "text_ml": "കറുപ്പ്, വെളുപ്പ്, ഗോൾഡ് നിറങ്ങളിൽ ടെക്സ്ചർഡ് സെറാമിക് വാസുകൾ, ടേബിൾ പീസുകൾ, ഷോപീസുകൾ.",
          "items": [
            "Curios & Vases",
            "Flowers & Vases",
            "Aquariums"
          ],
          "products": [
            {
              "name": "Curios & Vases",
              "text": "Vases and curios for shelves, consoles and coffee tables, including our stone-finish vases.",
              "img": "img/products/curios-vases.jpg",
              "gallery": [
                "img/products/g/curios-vases-2.jpg"
              ]
            },
            {
              "name": "Flowers & Vases",
              "text": "Tall decor vases with artificial flower arrangements.",
              "img": "img/products/flowers-vases.jpg",
              "gallery": [
                "img/products/g/flowers-vases-2.jpg",
                "img/products/g/flowers-vases-3.jpg",
                "img/products/g/flowers-vases-4.jpg",
                "img/products/g/flowers-vases-5.jpg"
              ]
            },
            {
              "name": "Aquariums",
              "text": "Aquariums for homes, offices and clinics. Ask us for sizes and options."
            }
          ]
        },
        {
          "id": "wall-decor",
          "name": "Wall Decor",
          "name_ml": "വാൾ ഡെക്കർ",
          "img": "img/calligraphy-black.jpg",
          "text": "Metal wall art and accent pieces that become the focus of a room.",
          "text_ml": "മുറിയുടെ ശ്രദ്ധാകേന്ദ്രമാകുന്ന മെറ്റൽ വാൾ ആർട്ടും ആക്സന്റ് പീസുകളും.",
          "items": [
            "Metal Wall Art",
            "Wooden Name Plates"
          ],
          "products": [
            {
              "name": "Metal Wall Art",
              "text": "Metal wall decorations with mirror accents. Customisation available.",
              "img": "img/products/metal-wall-art.jpg",
              "gallery": [
                "img/products/g/metal-wall-art-2.jpg",
                "img/products/g/metal-wall-art-4.jpg",
                "img/products/g/metal-wall-art-5.jpg",
                "img/products/g/metal-wall-art-6.jpg",
                "img/products/g/metal-wall-art-7.jpg",
                "img/products/g/metal-wall-art-8.jpg"
              ]
            },
            {
              "name": "Wooden Name Plates",
              "text": "Wooden name plates for homes and offices, made to your name and design."
            }
          ]
        },
        {
          "id": "clocks",
          "name": "Clocks",
          "name_ml": "ക്ലോക്കുകൾ",
          "img": "img/products/vintage-clocks.jpg",
          "text": "Wooden, metal and vintage wall clocks.",
          "text_ml": "മരം, മെറ്റൽ, വിന്റേജ് വാൾ ക്ലോക്കുകൾ.",
          "products": [
            {
              "name": "Wooden Wall Clocks",
              "text": "Natural wood-slice wall clocks, each piece unique.",
              "img": "img/products/wooden-wall-clocks.jpg",
              "gallery": [
                "img/products/g/wooden-wall-clocks-2.jpg",
                "img/products/g/wooden-wall-clocks-3.jpg"
              ]
            },
            {
              "name": "Metal Wall Clocks",
              "text": "Iron clocks in powder-coated finishes, in sizes from 12 inches upwards.",
              "img": "img/products/metal-wall-clocks.jpg",
              "gallery": [
                "img/products/g/metal-wall-clocks-2.jpg",
                "img/products/g/metal-wall-clocks-3.jpg",
                "img/products/g/metal-wall-clocks-4.jpg",
                "img/products/g/metal-wall-clocks-5.jpg",
                "img/products/g/metal-wall-clocks-6.jpg",
                "img/products/g/metal-wall-clocks-7.jpg",
                "img/products/g/metal-wall-clocks-8.jpg"
              ]
            },
            {
              "name": "Vintage Clocks",
              "text": "Two-sided station-style clocks with a nostalgic feel.",
              "img": "img/products/vintage-clocks.jpg",
              "gallery": [
                "img/products/g/vintage-clocks-2.jpg",
                "img/products/g/vintage-clocks-3.jpg",
                "img/products/g/vintage-clocks-4.jpg",
                "img/products/g/vintage-clocks-5.jpg"
              ]
            }
          ],
          "items": [
            "Wooden Wall Clocks",
            "Metal Wall Clocks",
            "Vintage Clocks"
          ]
        },
        {
          "id": "calligraphy",
          "name": "Calligraphy",
          "name_ml": "കാലിഗ്രഫി",
          "img": "img/calligraphy-gold.jpg",
          "text": "Arabic calligraphy wall art in gold and black, made to the size of your wall.",
          "text_ml": "ചുമരിന്റെ വലിപ്പത്തിനനുസരിച്ച്, ഗോൾഡിലും കറുപ്പിലും അറബിക് കാലിഗ്രഫി വാൾ ആർട്ട്.",
          "items": [
            "Wall Art Calligraphy",
            "Calligraphy Frames"
          ],
          "products": [
            {
              "name": "Wall Art Calligraphy",
              "text": "Calligraphy wall hangings in metal or wood, customised in design and finish.",
              "img": "img/products/wall-art-calligraphy.jpg",
              "gallery": [
                "img/products/g/wall-art-calligraphy-2.jpg",
                "img/products/g/wall-art-calligraphy-3.jpg",
                "img/products/g/wall-art-calligraphy-5.jpg",
                "img/products/g/wall-art-calligraphy-6.jpg",
                "img/products/g/wall-art-calligraphy-8.jpg"
              ]
            },
            {
              "name": "Calligraphy Frames",
              "text": "Hand-made and printed calligraphy art, framed.",
              "img": "img/products/calligraphy-frames.jpg",
              "gallery": [
                "img/products/g/calligraphy-frames-2.jpg",
                "img/products/g/calligraphy-frames-3.jpg",
                "img/products/g/calligraphy-frames-4.jpg",
                "img/products/g/calligraphy-frames-5.jpg"
              ]
            }
          ]
        },
        {
          "id": "plants",
          "name": "Plants & Green Walls",
          "name_ml": "ചെടികളും ഗ്രീൻ വാളുകളും",
          "img": "img/greenwall-outdoor.jpg",
          "text": "Artificial plants and vertical gardens that stay green through monsoon and summer.",
          "text_ml": "മഴയിലും വേനലിലും പച്ചപ്പ് നിലനിൽക്കുന്ന ആർട്ടിഫിഷ്യൽ ചെടികളും വെർട്ടിക്കൽ ഗാർഡനുകളും.",
          "items": [
            "Artificial Indoor Plants",
            "Artificial Green Walls",
            "Bonsai & Miniature Plants",
            "Artificial Trees",
            "Landscaping"
          ],
          "products": [
            {
              "name": "Artificial Indoor Plants",
              "text": "Real-look plants, creepers and hanging plants. Zero maintenance and long life.",
              "img": "img/products/artificial-indoor-plants.jpg",
              "gallery": [
                "img/products/g/artificial-indoor-plants-2.jpg",
                "img/products/g/artificial-indoor-plants-3.jpg",
                "img/products/g/artificial-indoor-plants-4.jpg",
                "img/products/g/artificial-indoor-plants-5.jpg",
                "img/products/g/artificial-indoor-plants-6.jpg",
                "img/products/g/artificial-indoor-plants-7.jpg",
                "img/products/g/artificial-indoor-plants-8.jpg"
              ]
            },
            {
              "name": "Artificial Green Walls",
              "text": "Leafy, floral and moss panels and mats for vertical gardens.",
              "img": "img/products/artificial-green-walls.jpg",
              "gallery": [
                "img/products/g/artificial-green-walls-2.jpg",
                "img/products/g/artificial-green-walls-3.jpg",
                "img/products/g/artificial-green-walls-4.jpg",
                "img/products/g/artificial-green-walls-5.jpg",
                "img/products/g/artificial-green-walls-6.jpg",
                "img/products/g/artificial-green-walls-7.jpg",
                "img/products/g/artificial-green-walls-8.jpg"
              ]
            },
            {
              "name": "Bonsai & Miniature Plants",
              "text": "Original-looking miniature plants for shelves and tables.",
              "img": "img/products/bonsai-miniature-plants.jpg",
              "gallery": [
                "img/products/g/bonsai-miniature-plants-2.jpg"
              ]
            },
            {
              "name": "Artificial Trees",
              "text": "Tall real-look plants and trees in various sizes.",
              "img": "img/products/artificial-trees.jpg",
              "gallery": [
                "img/products/g/artificial-trees-2.jpg",
                "img/products/g/artificial-trees-3.jpg",
                "img/products/g/artificial-trees-4.jpg",
                "img/products/g/artificial-trees-6.jpg",
                "img/products/g/artificial-trees-7.jpg",
                "img/products/g/artificial-trees-8.jpg"
              ]
            },
            {
              "name": "Landscaping",
              "text": "Landscaping for homes and commercial spaces. Ask us for ideas and a site visit."
            }
          ]
        },
        {
          "id": "pots",
          "name": "Pots & Planters",
          "name_ml": "ചട്ടികളും പ്ലാന്ററുകളും",
          "img": "img/vase-white.jpg",
          "text": "Planters and pots in textured and geometric finishes for indoor greenery.",
          "text_ml": "ഇൻഡോർ ചെടികൾക്കായി ടെക്സ്ചർഡ്, ജ്യോമെട്രിക് ഫിനിഷുകളിലുള്ള ചട്ടികളും പ്ലാന്ററുകളും.",
          "items": [
            "Fibre Pots",
            "Mini Pots & Planter Curios",
            "Ceramic Planter Pots"
          ],
          "products": [
            {
              "name": "Fibre Pots",
              "text": "Stylish fibre pots in many sizes and patterns.",
              "img": "img/products/fibre-pots.jpg",
              "gallery": [
                "img/products/g/fibre-pots-2.jpg",
                "img/products/g/fibre-pots-3.jpg",
                "img/products/g/fibre-pots-4.jpg",
                "img/products/g/fibre-pots-5.jpg",
                "img/products/g/fibre-pots-6.jpg"
              ]
            },
            {
              "name": "Mini Pots & Planter Curios",
              "text": "Small metal and ceramic pots to use as planters or curios.",
              "img": "img/products/mini-pots-planter-curios.jpg",
              "gallery": [
                "img/products/g/mini-pots-planter-curios-3.jpg"
              ]
            },
            {
              "name": "Ceramic Planter Pots",
              "text": "Ceramic pots in a range of sizes, shapes and patterns.",
              "img": "img/products/ceramic-planter-pots.jpg",
              "gallery": [
                "img/products/g/ceramic-planter-pots-2.jpg",
                "img/products/g/ceramic-planter-pots-3.jpg",
                "img/products/g/ceramic-planter-pots-4.jpg",
                "img/products/g/ceramic-planter-pots-5.jpg"
              ]
            }
          ]
        },
        {
          "id": "frames",
          "name": "Picture Frames",
          "name_ml": "ഫോട്ടോ ഫ്രെയിമുകൾ",
          "img": "img/frames.jpg",
          "text": "Framed art prints, photo frames and gallery-wall sets.",
          "text_ml": "നിങ്ങളുടെ ഫോട്ടോകൾക്കായി ഗാലറി-വാൾ ഫ്രെയിം സെറ്റുകൾ; ഞങ്ങളുടെ മെമ്മറീസ് കളക്ഷൻ ഉൾപ്പെടെ.",
          "items": [
            "Picture Frames & Wall Art"
          ],
          "products": [
            {
              "name": "Picture Frames & Wall Art",
              "text": "Framed art prints and photo frames for gallery walls.",
              "img": "img/products/picture-frames-wall-art.jpg",
              "gallery": [
                "img/products/g/picture-frames-wall-art-2.jpg",
                "img/products/g/picture-frames-wall-art-4.jpg",
                "img/products/g/picture-frames-wall-art-5.jpg",
                "img/products/g/picture-frames-wall-art-6.jpg",
                "img/products/g/picture-frames-wall-art-7.jpg",
                "img/products/g/picture-frames-wall-art-8.jpg"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "lighting-solutions",
      "name": "Lighting Solutions",
      "name_ml": "ലൈറ്റിംഗ് സൊല്യൂഷൻസ്",
      "intro": "LED lights, fancy lights and lamps for homes, offices, shops and restaurants, chosen and installed by our team.",
      "intro_ml": "വീടുകൾക്കും ഓഫീസുകൾക്കും കടകൾക്കും റെസ്റ്റോറന്റുകൾക്കും LED ലൈറ്റുകൾ, ഫാൻസി ലൈറ്റുകൾ, ലാമ്പുകൾ; ഞങ്ങളുടെ ടീം തിരഞ്ഞെടുത്ത് ഇൻസ്റ്റാൾ ചെയ്യുന്നു.",
      "cover": "img/products/designer-lighting.jpg",
      "groups": [
        {
          "id": "led-lights",
          "name": "LED Lights",
          "name_ml": "LED ലൈറ്റുകൾ",
          "img": "img/products/designer-lighting.jpg",
          "text": "Energy-efficient LED lighting for homes, offices, shops and restaurants, indoors and outdoors.",
          "text_ml": "വീടുകൾക്കും ഓഫീസുകൾക്കും കടകൾക്കും റെസ്റ്റോറന്റുകൾക്കും അകത്തും പുറത്തും LED ലൈറ്റിംഗ്.",
          "products": [
            {
              "name": "LED Wall Lights",
              "text": "Up-down and decorative LED wall lights for interiors, facades and gardens.",
              "img": "img/products/led-lights.jpg",
              "gallery": [
                "img/products/g/led-wall-lights-2.jpg",
                "img/products/g/led-wall-lights-3.jpg",
                "img/products/g/led-wall-lights-4.jpg",
                "img/products/g/led-wall-lights-5.jpg",
                "img/products/g/led-wall-lights-6.jpg"
              ]
            },
            {
              "name": "Profile & Cove Lighting",
              "text": "LED profile, cove and corridor lighting, designed and installed by our team.",
              "img": "img/products/designer-lighting.jpg",
              "gallery": [
                "img/products/g/profile-cove-lighting-2.jpg",
                "img/products/g/profile-cove-lighting-3.jpg",
                "img/products/g/profile-cove-lighting-4.jpg",
                "img/products/g/profile-cove-lighting-5.jpg",
                "img/products/g/profile-cove-lighting-6.jpg"
              ]
            },
            {
              "name": "Indoor & Outdoor LED Fittings",
              "text": "Spotlights, downlights, panel lights and outdoor fittings for every space.",
              "img": "img/products/g/indoor-outdoor-led-fittings-w1.jpg",
              "gallery": [
                "img/products/g/indoor-outdoor-led-fittings-w2.jpg",
                "img/products/g/indoor-outdoor-led-fittings-w3.jpg",
                "img/products/g/indoor-outdoor-led-fittings-w4.jpg",
                "img/products/g/indoor-outdoor-led-fittings-w5.jpg",
                "img/products/g/indoor-outdoor-led-fittings-w6.jpg"
              ]
            }
          ],
          "items": [
            "LED Wall Lights",
            "Profile & Cove Lighting",
            "Indoor & Outdoor LED Fittings"
          ]
        },
        {
          "id": "fancy-lights",
          "name": "Fancy Lights & Lamps",
          "name_ml": "ഫാൻസി ലൈറ്റുകളും ലാമ്പുകളും",
          "img": "img/products/table-lamps-in-natural-wood.jpg",
          "text": "Decorative lighting that sets the mood: pendants, hanging sets, floor lamps and table lamps.",
          "text_ml": "മൂഡ് ഒരുക്കുന്ന ഡെക്കറേറ്റീവ് ലൈറ്റിംഗ്: പെൻഡന്റുകൾ, ഹാംഗിംഗ് സെറ്റുകൾ, ഫ്ലോർ ലാമ്പുകൾ, ടേബിൾ ലാമ്പുകൾ.",
          "products": [
            {
              "name": "Fancy Pendant & Hanging Lights",
              "text": "Pendant lights, hanging sets and chandeliers for living, dining and restaurant spaces.",
              "img": "img/products/g/fancy-pendant-hanging-lights-w1.jpg",
              "gallery": [
                "img/products/g/fancy-pendant-hanging-lights-w2.jpg",
                "img/products/g/fancy-pendant-hanging-lights-w3.jpg",
                "img/products/g/fancy-pendant-hanging-lights-w4.jpg",
                "img/products/g/fancy-pendant-hanging-lights-w5.jpg",
                "img/products/g/fancy-pendant-hanging-lights-w6.jpg"
              ]
            },
            {
              "name": "Pedestal Lamps",
              "text": "Floor lamps with turned wooden stands and fabric shades.",
              "img": "img/products/pedestal-lamps.jpg",
              "gallery": [
                "img/products/g/pedestal-lamps-2.jpg",
                "img/products/g/pedestal-lamps-3.jpg",
                "img/products/g/pedestal-lamps-4.jpg",
                "img/products/g/pedestal-lamps-5.jpg",
                "img/products/g/pedestal-lamps-6.jpg",
                "img/products/g/pedestal-lamps-7.jpg",
                "img/products/g/pedestal-lamps-8.jpg"
              ]
            },
            {
              "name": "Table Lamps in Natural Wood",
              "text": "Table and floor lamps with natural driftwood bases and fabric shades.",
              "img": "img/products/table-lamps-in-natural-wood.jpg",
              "gallery": [
                "img/products/g/table-lamps-in-natural-wood-2.jpg",
                "img/products/g/table-lamps-in-natural-wood-3.jpg",
                "img/products/g/table-lamps-in-natural-wood-4.jpg",
                "img/products/g/table-lamps-in-natural-wood-5.jpg",
                "img/products/g/table-lamps-in-natural-wood-6.jpg",
                "img/products/g/table-lamps-in-natural-wood-7.jpg"
              ]
            }
          ],
          "items": [
            "Fancy Pendant & Hanging Lights",
            "Pedestal Lamps",
            "Table Lamps in Natural Wood"
          ]
        }
      ]
    }
  ],

  /* Google Analytics 4. Paste your Measurement ID (looks like G-XXXXXXXXXX) between the quotes.
     Leave empty to switch analytics off. It only runs on your real website, not in previews. */
  analytics: {
    ga4: "G-CZVJSLGE3H"
  },

  /* Chat assistant.
     Leave "endpoint" empty to use the built-in answers below (free, no setup).
     To switch on full AI answers, paste the address of your chat worker here (see HOW-TO-UPDATE.md). */
  assistant: {
    name: "Concepts Assistant",
    endpoint: ""
  }
};
