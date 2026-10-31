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
    address: "St Patrick Church Building, near AKG Flyover, Pushpa Junction, Chalappuram, Kozhikode, Kerala 673002",
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
  catalog: [
    { id: "interior", name: "Interior Products", name_ml: "ഇന്റീരിയർ ഉൽപ്പന്നങ്ങൾ",
      intro: "Materials and fittings that shape a room: walls, windows, floors and mirrors, supplied and installed by our team.",
      intro_ml: "മുറിയുടെ രൂപം നിർണ്ണയിക്കുന്ന മെറ്റീരിയലുകളും ഫിറ്റിംഗുകളും: ചുമരുകൾ, ജനലുകൾ, തറ, മിററുകൾ. ഞങ്ങളുടെ ടീം സപ്ലൈ ചെയ്ത് ഇൻസ്റ്റാൾ ചെയ്യുന്നു.",
      cover: "img/tv-unit.jpg",
      groups: [
        { id: "wall-coverings", name: "Wall Coverings", name_ml: "വാൾ കവറിംഗ്", img: "img/wallpaper-tropical.jpg", pos: "center 30%",
          text: "Catalogue and customised wallpapers, wall textures and wall panels, installed by our team.",
          text_ml: "കാറ്റലോഗ്, കസ്റ്റമൈസ്ഡ് വാൾപേപ്പറുകൾ, വാൾ ടെക്സ്ചറുകൾ, വാൾ പാനലുകൾ; ഞങ്ങളുടെ ടീം ഇൻസ്റ്റാൾ ചെയ്യുന്നു.",
          items: ["Wallpapers", "Customised Wallpapers", "Wall Textures", "Wall Panels"],
          items_ml: ["വാൾപേപ്പർ", "കസ്റ്റമൈസ്ഡ് വാൾപേപ്പർ", "വാൾ ടെക്സ്ചർ", "വാൾ പാനൽ"] },
        { id: "louvers", name: "Louvers", name_ml: "ലൂവറുകൾ", img: "img/courtyard-lounge.jpg",
          text: "Louvers that add rhythm and depth to feature walls, ceilings and partitions.",
          text_ml: "ഫീച്ചർ വാളുകൾക്കും സീലിംഗിനും പാർട്ടീഷനുകൾക്കും ആഴവും ഭംഗിയും നൽകുന്ന ലൂവറുകൾ.",
          items: ["Wall Louvers", "Ceiling Louvers", "Partitions & Screens"],
          items_ml: ["വാൾ ലൂവർ", "സീലിംഗ് ലൂവർ", "പാർട്ടീഷനും സ്ക്രീനും"] },
        { id: "curtains", name: "Curtains & Blinds", name_ml: "കർട്ടനും ബ്ലൈൻഡും", img: "img/curtain-poster.jpg",
          text: "Made-to-measure curtains, sheers and blinds, stitched and fitted by our team.",
          text_ml: "അളവിനനുസരിച്ച് തയ്ച്ച് ഫിറ്റ് ചെയ്യുന്ന കർട്ടനുകൾ, ഷിയറുകൾ, ബ്ലൈൻഡുകൾ.",
          items: ["Curtains", "Sheers", "Blinds"], items_ml: ["കർട്ടൻ", "ഷിയർ", "ബ്ലൈൻഡ്"] },
        { id: "flooring", name: "Flooring", name_ml: "ഫ്ലോറിംഗ്", img: "img/lvt-poster.jpg", pos: "center 92%",
          text: "Wood-look LVT planks that can usually go over level existing tiles. Ask us about other flooring options.",
          text_ml: "നിരപ്പായ പഴയ ടൈലുകൾക്ക് മുകളിൽ ഇടാവുന്ന, തടിയുടെ ഭംഗിയുള്ള LVT പ്ലാങ്കുകൾ. മറ്റ് ഫ്ലോറിംഗ് ഓപ്ഷനുകളെക്കുറിച്ചും ചോദിക്കാം.",
          items: ["LVT Flooring", "More on Request"], items_ml: ["LVT ഫ്ലോറിംഗ്", "മറ്റുള്ളവ ആവശ്യാനുസരണം"] },
        { id: "mirrors", name: "Mirrors", name_ml: "മിററുകൾ", img: "img/mirror-oval.jpg",
          text: "From everyday plain mirrors to statement LED, decor, framed and pedestal mirrors.",
          text_ml: "സാധാരണ മിററുകൾ മുതൽ LED, ഡെക്കർ, ഫ്രെയിം, പെഡസ്റ്റൽ മിററുകൾ വരെ.",
          items: ["Plain Mirrors", "LED Mirrors", "Decor Mirrors", "Frame Mirrors", "Pedestal Mirrors"],
          items_ml: ["പ്ലെയിൻ മിറർ", "LED മിറർ", "ഡെക്കർ മിറർ", "ഫ്രെയിം മിറർ", "പെഡസ്റ്റൽ മിറർ"] }
      ] },
    { id: "decor", name: "Decor Products", name_ml: "ഡെക്കർ ഉൽപ്പന്നങ്ങൾ",
      intro: "Finishing pieces that give a home its character: curios, wall art, plants, pots and frames.",
      intro_ml: "വീടിന് വ്യക്തിത്വം നൽകുന്ന ഫിനിഷിംഗ് പീസുകൾ: ക്യൂരിയോകൾ, വാൾ ആർട്ട്, ചെടികൾ, ചട്ടികൾ, ഫ്രെയിമുകൾ.",
      cover: "img/vases-black.jpg",
      groups: [
        { id: "curios", name: "Curios", name_ml: "ക്യൂരിയോകൾ", img: "img/vases-black.jpg",
          text: "Textured ceramic vases, table pieces and showpieces in black, white and gold.",
          text_ml: "കറുപ്പ്, വെളുപ്പ്, ഗോൾഡ് നിറങ്ങളിൽ ടെക്സ്ചർഡ് സെറാമിക് വാസുകൾ, ടേബിൾ പീസുകൾ, ഷോപീസുകൾ.",
          items: ["Vases", "Table Decor", "Showpieces"], items_ml: ["വാസ്", "ടേബിൾ ഡെക്കർ", "ഷോപീസ്"] },
        { id: "wall-decor", name: "Wall Decor", name_ml: "വാൾ ഡെക്കർ", img: "img/calligraphy-black.jpg",
          text: "Metal wall art and accent pieces that become the focus of a room.",
          text_ml: "മുറിയുടെ ശ്രദ്ധാകേന്ദ്രമാകുന്ന മെറ്റൽ വാൾ ആർട്ടും ആക്സന്റ് പീസുകളും.",
          items: ["Wall Art", "Accent Pieces"], items_ml: ["വാൾ ആർട്ട്", "ആക്സന്റ് പീസുകൾ"] },
        { id: "calligraphy", name: "Calligraphy", name_ml: "കാലിഗ്രഫി", img: "img/calligraphy-gold.jpg",
          text: "Arabic calligraphy wall art in gold and black, made to the size of your wall.",
          text_ml: "ചുമരിന്റെ വലിപ്പത്തിനനുസരിച്ച്, ഗോൾഡിലും കറുപ്പിലും അറബിക് കാലിഗ്രഫി വാൾ ആർട്ട്.",
          items: ["Gold Finish", "Black Finish", "Custom Sizes"], items_ml: ["ഗോൾഡ് ഫിനിഷ്", "ബ്ലാക്ക് ഫിനിഷ്", "കസ്റ്റം സൈസ്"] },
        { id: "plants", name: "Plants & Green Walls", name_ml: "ചെടികളും ഗ്രീൻ വാളുകളും", img: "img/greenwall-outdoor.jpg",
          text: "Artificial plants and vertical gardens that stay green through monsoon and summer.",
          text_ml: "മഴയിലും വേനലിലും പച്ചപ്പ് നിലനിൽക്കുന്ന ആർട്ടിഫിഷ്യൽ ചെടികളും വെർട്ടിക്കൽ ഗാർഡനുകളും.",
          items: ["Artificial Plants", "Vertical Gardens"], items_ml: ["ആർട്ടിഫിഷ്യൽ ചെടികൾ", "വെർട്ടിക്കൽ ഗാർഡൻ"] },
        { id: "pots", name: "Pots & Planters", name_ml: "ചട്ടികളും പ്ലാന്ററുകളും", img: "img/vase-white.jpg",
          text: "Planters and pots in textured and geometric finishes for indoor greenery.",
          text_ml: "ഇൻഡോർ ചെടികൾക്കായി ടെക്സ്ചർഡ്, ജ്യോമെട്രിക് ഫിനിഷുകളിലുള്ള ചട്ടികളും പ്ലാന്ററുകളും.",
          items: ["Planters", "Pots"], items_ml: ["പ്ലാന്റർ", "ചട്ടി"] },
        { id: "frames", name: "Picture Frames", name_ml: "ഫോട്ടോ ഫ്രെയിമുകൾ", img: "img/frames.jpg",
          text: "Gallery-wall frame sets for your own photos, including our Memories collection.",
          text_ml: "നിങ്ങളുടെ ഫോട്ടോകൾക്കായി ഗാലറി-വാൾ ഫ്രെയിം സെറ്റുകൾ; ഞങ്ങളുടെ മെമ്മറീസ് കളക്ഷൻ ഉൾപ്പെടെ.",
          items: ["Gallery Frame Sets", "Memories Collection", "Photo Frames"], items_ml: ["ഗാലറി ഫ്രെയിം സെറ്റ്", "മെമ്മറീസ് കളക്ഷൻ", "ഫോട്ടോ ഫ്രെയിം"] }
      ] }
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
