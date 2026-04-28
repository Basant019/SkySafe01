/**
 * SkySafe Destination Intelligence Database
 * Real places, real attractions — no fake data.
 * Organized by city → category → time slot
 */

const DESTINATIONS = {

  // ──────────────────────────────────────────────────────
  //  MOUNTAINS / HILL STATIONS
  // ──────────────────────────────────────────────────────

  dehradun: {
    name: 'Dehradun',
    state: 'Uttarakhand',
    categories: ['mountains', 'family', 'nature', 'spiritual'],
    description: 'Gateway to Garhwal Himalayas, blending colonial charm with mountain beauty.',
    bestMonths: 'March–June, September–November',
    language: 'Hindi, Garhwali',
    currency: 'INR',
    nearbyAirport: 'Jolly Grant Airport (DED)',
    places: {
      morning: [
        { name: "Robber's Cave (Guchhupani)", type: 'nature', duration: '2 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: false, desc: 'A natural cave formed by a river flowing through limestone rocks. Perfect morning visit before crowds arrive.', weatherSafe: ['Clear','Clouds'], category: ['adventure','nature','family'] },
        { name: 'Forest Research Institute (FRI)', type: 'museum', duration: '2.5 hrs', cost: { low: 40, medium: 40, high: 40 }, indoor: true, desc: 'Iconic colonial-era institute with magnificent architecture, set in 450 acres of forest. Six natural history museums inside.', weatherSafe: 'all', category: ['history','family','nature'] },
        { name: 'Tapkeshwar Temple', type: 'spiritual', duration: '1 hr', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Ancient Shiva temple nestled inside a cave with a natural spring dripping over the Shivling. Sacred and scenic.', weatherSafe: 'all', category: ['spiritual','family'] },
        { name: 'Mindrolling Monastery', type: 'spiritual', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: true, desc: 'One of the largest Buddhist monasteries in India with a 185-ft Great Stupa. Peaceful morning walks possible.', weatherSafe: 'all', category: ['spiritual','family','history'] },
      ],
      afternoon: [
        { name: 'Sahastradhara (Thousand-Fold Spring)', type: 'nature', duration: '2.5 hrs', cost: { low: 50, medium: 200, high: 400 }, indoor: false, desc: 'Natural sulphur springs and waterfalls. Cable car ride available. Popular family destination with ropeway thrills.', weatherSafe: ['Clear','Clouds'], category: ['family','nature','adventure'] },
        { name: 'Lacchiwala Nature Park', type: 'nature', duration: '2 hrs', cost: { low: 30, medium: 30, high: 30 }, indoor: false, desc: 'Riverside picnic spot among sal forests, with shallow water streams and natural pools. Great for families.', weatherSafe: ['Clear','Clouds'], category: ['family','nature'] },
        { name: 'Malsi Deer Park', type: 'wildlife', duration: '1.5 hrs', cost: { low: 20, medium: 20, high: 20 }, indoor: false, desc: 'Mini zoo and deer park at the foothills of Shivalik range. Children love interacting with deer.', weatherSafe: ['Clear','Clouds'], category: ['family','wildlife'] },
        { name: 'Paltan Bazaar', type: 'shopping', duration: '2 hrs', cost: { low: 500, medium: 1500, high: 3000 }, indoor: true, desc: 'Main market of Dehradun. Famous for basmati rice, local handicrafts, woolens, and Dehraduni lychees.', weatherSafe: 'all', category: ['food','family','shopping'] },
      ],
      evening: [
        { name: 'Clock Tower (Ghanta Ghar)', type: 'monument', duration: '1 hr', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Historic six-faced clock tower, the heart of Dehradun city. Great for an evening stroll and people-watching.', weatherSafe: ['Clear','Clouds'], category: ['history','family'] },
        { name: 'Survey of India Museum', type: 'museum', duration: '1.5 hrs', cost: { low: 20, medium: 20, high: 20 }, indoor: true, desc: 'India\'s oldest map-making institution. Fascinating display of geographical surveys and colonial era maps.', weatherSafe: 'all', category: ['history','education'] },
        { name: 'Rajpur Road Food Street', type: 'food', duration: '2 hrs', cost: { low: 200, medium: 500, high: 1200 }, indoor: false, desc: 'Vibrant dining strip with cafes, bakeries and restaurants. Try Momo Junction, Ellora Bakery, and local chain Great Indian Cafe.', weatherSafe: ['Clear','Clouds'], category: ['food','family'] },
      ],
      indoor: [
        { name: 'Wai Wai City (Food Court)', type: 'food', duration: '1.5 hrs', cost: { low: 300, medium: 600, high: 1000 }, indoor: true, desc: 'Massive food court popular with families. Wide variety of cuisines under one roof.', weatherSafe: 'all', category: ['food','family'] },
        { name: 'Pacific Mall Dehradun', type: 'shopping', duration: '2 hrs', cost: { low: 200, medium: 1000, high: 3000 }, indoor: true, desc: 'Main air-conditioned shopping mall with multiplex cinema. Perfect rain/heat refuge.', weatherSafe: 'all', category: ['shopping','family'] },
      ]
    },
    food: ['Kumaoni Thali', 'Kafuli (greens curry)', 'Til ke Laddoo', 'Jhangora Kheer', 'Aloo Gutke', 'Bhaang ki Chutney'],
    localTransport: ['Vikram (shared auto)', 'City Bus', 'Ola/Uber', 'Tempo Traveller for outskirts'],
    hotels: {
      low: [{ name: 'Hotel Madhuban', area: 'Rajpur Road', price: 800 }, { name: 'Zostel Dehradun', area: 'Rajpur Road', price: 400 }],
      medium: [{ name: 'Lemon Tree Hotel Dehradun', area: 'Rajpur Road', price: 2800 }, { name: 'Hotel Presidents', area: 'Astley Hall', price: 1800 }],
      high: [{ name: 'Welcomhotel by ITC', area: 'Rajpur Road', price: 7000 }, { name: 'Hyatt Regency Dehradun', area: 'Mussoorie Road', price: 9500 }]
    }
  },

  manali: {
    name: 'Manali',
    state: 'Himachal Pradesh',
    categories: ['mountains', 'adventure', 'nature', 'honeymoon'],
    description: 'Himalayan resort town with snow-capped peaks, adventure sports and ancient temples.',
    bestMonths: 'October–June (Snow: Dec–Feb), Adventure: May–Oct',
    nearbyAirport: 'Bhuntar Airport (KUU)',
    places: {
      morning: [
        { name: 'Hadimba Devi Temple', type: 'spiritual', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Ancient wooden temple dedicated to Hadimba, surrounded by cedar forest. Built in 1553 AD.', weatherSafe: 'all', category: ['spiritual','nature','family'] },
        { name: 'Solang Valley', type: 'adventure', duration: '4 hrs', cost: { low: 500, medium: 1500, high: 4000 }, indoor: false, desc: 'Adventure hub with skiing, zorbing, paragliding and snowmobile rides. Amazing mountain views.', weatherSafe: ['Clear','Clouds','Snow'], category: ['adventure','nature'] },
        { name: 'Rohtang Pass', type: 'nature', duration: '6 hrs', cost: { low: 600, medium: 1200, high: 2500 }, indoor: false, desc: 'High mountain pass at 3,978m with dramatic snowfields. Permit required. Supreme views of Lahaul-Spiti.', weatherSafe: ['Clear','Clouds'], category: ['adventure','nature','mountains'] },
      ],
      afternoon: [
        { name: 'Old Manali Village', type: 'nature', duration: '2 hrs', cost: { low: 0, medium: 500, high: 1500 }, indoor: false, desc: 'Charming old village with quaint cafes, apple orchards, and traditional Himachali culture.', weatherSafe: ['Clear','Clouds'], category: ['food','nature','culture'] },
        { name: 'Kullu River Rafting (Beas)', type: 'adventure', duration: '3 hrs', cost: { low: 800, medium: 1200, high: 2000 }, indoor: false, desc: 'White water rafting on River Beas — Grade III-IV rapids. Thrilling and safe with licensed operators.', weatherSafe: ['Clear','Clouds'], category: ['adventure'] },
        { name: 'Naggar Castle', type: 'monument', duration: '2 hrs', cost: { low: 30, medium: 30, high: 30 }, indoor: false, desc: '15th century castle built by Raja Sidh Singh. Now a heritage hotel with museum. Scenic valley views.', weatherSafe: 'all', category: ['history','nature'] },
      ],
      evening: [
        { name: 'Mall Road Manali', type: 'shopping', duration: '2 hrs', cost: { low: 300, medium: 1000, high: 3000 }, indoor: false, desc: 'Main promenade lined with shops selling woolens, trekking gear, Kullu shawls and local handicrafts.', weatherSafe: ['Clear','Clouds'], category: ['shopping','food'] },
        { name: 'Vashisht Temple & Hot Springs', type: 'spiritual', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 50 }, indoor: false, desc: 'Ancient temple by hot sulphur springs. The natural hot spring baths (separate for men/women) are rejuvenating.', weatherSafe: 'all', category: ['spiritual','wellness'] },
      ],
      indoor: [
        { name: 'Himalayan Folk Art Museum', type: 'museum', duration: '1.5 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: true, desc: 'Collection of Himalayan art, costumes and instruments. Good rain alternative.', weatherSafe: 'all', category: ['history','culture'] },
        { name: 'Café 1947 / Dylan\'s Cafe', type: 'food', duration: '1.5 hrs', cost: { low: 300, medium: 600, high: 1200 }, indoor: true, desc: 'Cozy cafes in Old Manali. Perfect for chai, momos and apple cake during rain or cold.', weatherSafe: 'all', category: ['food'] },
      ]
    },
    food: ['Sidu (Himachali bread)', 'Chana Madra', 'Aktori (buckwheat pancake)', 'Trout fish', 'Kullu apple products', 'Tibetan Thukpa'],
    hotels: {
      low: [{ name: 'Zostel Manali', area: 'Old Manali', price: 500 }, { name: 'Hotel Snow Palace', area: 'Mall Road', price: 900 }],
      medium: [{ name: 'The Himalayan', area: 'Hadimba Road', price: 3500 }, { name: 'Hotel Blossom', area: 'Mall Road', price: 2200 }],
      high: [{ name: 'Span Resort & Spa', area: 'Kullu-Manali Highway', price: 8000 }, { name: 'Solang Valley Resort', area: 'Solang', price: 6500 }]
    }
  },

  shimla: {
    name: 'Shimla',
    state: 'Himachal Pradesh',
    categories: ['mountains', 'history', 'family', 'honeymoon'],
    description: 'Former British summer capital with colonial architecture and panoramic Himalayan views.',
    bestMonths: 'March–June, September–November, December–February (snow)',
    nearbyAirport: 'Shimla Airport (SLV)',
    places: {
      morning: [
        { name: 'The Ridge', type: 'nature', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Large open space in the heart of Shimla with panoramic Himalayan views. Colonial buildings surround it.', weatherSafe: ['Clear','Clouds'], category: ['nature','family','history'] },
        { name: 'Jakhu Temple & Jakhu Hill', type: 'spiritual', duration: '2.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Ancient Hanuman temple at 2455m — highest point of Shimla. Trek or take ropeway. Monkeys everywhere!', weatherSafe: ['Clear','Clouds'], category: ['spiritual','adventure','nature'] },
        { name: 'Kufri Fun World', type: 'adventure', duration: '3 hrs', cost: { low: 800, medium: 1500, high: 2500 }, indoor: false, desc: 'Adventure park with yak rides, horse rides, zorbing and skiing in winter. 16km from Shimla.', weatherSafe: ['Clear','Clouds','Snow'], category: ['adventure','family'] },
      ],
      afternoon: [
        { name: 'Mall Road Shimla', type: 'shopping', duration: '2 hrs', cost: { low: 300, medium: 1000, high: 3000 }, indoor: false, desc: 'Car-free promenade with British-era buildings, shops, cafes and ice cream parlours. Lively all day.', weatherSafe: ['Clear','Clouds'], category: ['shopping','food','family'] },
        { name: 'Viceregal Lodge (Rashtrapati Niwas)', type: 'monument', duration: '2 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: false, desc: 'Gothic Tudor-style building, former British Viceroy\'s residence. Surrounded by botanical gardens.', weatherSafe: 'all', category: ['history','nature'] },
        { name: 'Toy Train to Kalka (Heritage)', type: 'activity', duration: '5 hrs', cost: { low: 200, medium: 400, high: 800 }, indoor: true, desc: 'UNESCO Heritage narrow-gauge railway through 102 tunnels and colonial-era stations. Iconic journey.', weatherSafe: 'all', category: ['family','history','adventure'] },
      ],
      evening: [
        { name: 'Scandal Point', type: 'nature', duration: '1 hr', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Historic meeting point on the Ridge associated with a famous colonial-era scandal. Great sunset views.', weatherSafe: ['Clear','Clouds'], category: ['history','nature'] },
        { name: 'Lakkar Bazaar', type: 'shopping', duration: '1.5 hrs', cost: { low: 200, medium: 600, high: 1500 }, indoor: false, desc: 'Famous for wooden handicrafts, toys and walking sticks. Best budget shopping in Shimla.', weatherSafe: ['Clear','Clouds'], category: ['shopping'] },
      ],
      indoor: [
        { name: 'Himachal State Museum', type: 'museum', duration: '2 hrs', cost: { low: 10, medium: 10, high: 10 }, indoor: true, desc: 'Showcases Himachali prehistory, textiles, paintings and sculptures. Great rainy day option.', weatherSafe: 'all', category: ['history','culture'] },
        { name: 'Indian Coffee House', type: 'food', duration: '1 hr', cost: { low: 150, medium: 150, high: 150 }, indoor: true, desc: 'Historic coffee house since British era — great coffee, toast and history under one roof.', weatherSafe: 'all', category: ['food','history'] },
      ]
    },
    food: ['Siddu', 'Bhey (lotus stem curry)', 'Chha Gosht', 'Babru (black lentil kachori)', 'Himalayan cheese', 'Rhododendron juice'],
    hotels: {
      low: [{ name: 'Hotel White', area: 'Cart Road', price: 700 }, { name: 'YMCA Shimla', area: 'The Ridge', price: 600 }],
      medium: [{ name: 'Hotel Willow Banks', area: 'Chaura Maidan', price: 2500 }, { name: 'Shri Krishna guest House', area: 'Cart Road', price: 1500 }],
      high: [{ name: 'Wildflower Hall', area: 'Mashobra', price: 15000 }, { name: 'Oberoi Cecil', area: 'Chaura Maidan', price: 12000 }]
    }
  },

  mussoorie: {
    name: 'Mussoorie',
    state: 'Uttarakhand',
    categories: ['mountains', 'nature', 'honeymoon', 'family'],
    description: 'Queen of Hills — Victorian hill station perched at 2,000m above sea level.',
    bestMonths: 'April–June, September–November',
    nearbyAirport: 'Jolly Grant Airport Dehradun (DED)',
    places: {
      morning: [
        { name: 'Kempty Falls', type: 'nature', duration: '2.5 hrs', cost: { low: 50, medium: 200, high: 400 }, indoor: false, desc: 'Famous waterfall 15km from Mussoorie. Best visited before noon. Cable car available.', weatherSafe: ['Clear','Clouds'], category: ['nature','family','adventure'] },
        { name: 'Gun Hill (Cable Car)', type: 'nature', duration: '2 hrs', cost: { low: 200, medium: 200, high: 200 }, indoor: false, desc: 'Second highest peak in Mussoorie reached by ropeway. 360° Himalayan panorama on clear days.', weatherSafe: ['Clear'], category: ['nature','adventure','family'] },
        { name: 'Lal Tibba Viewpoint', type: 'nature', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Highest peak in Mussoorie with views of Badrinath and Kedarnath peaks on clear days.', weatherSafe: ['Clear'], category: ['nature','mountains'] },
      ],
      afternoon: [
        { name: 'Mall Road Mussoorie', type: 'shopping', duration: '2 hrs', cost: { low: 300, medium: 1000, high: 3000 }, indoor: false, desc: 'Colonial-era promenade with horse riding, shops and cafes. Beautiful walking street.', weatherSafe: ['Clear','Clouds'], category: ['shopping','family','food'] },
        { name: 'Company Garden', type: 'nature', duration: '1.5 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: false, desc: 'Botanical garden with colorful flowers, boating and mini train ride. Family favorite.', weatherSafe: ['Clear','Clouds'], category: ['family','nature'] },
        { name: 'Camel\'s Back Road', type: 'nature', duration: '2 hrs', cost: { low: 0, medium: 200, high: 500 }, indoor: false, desc: '3km scenic road named for its camel-hump shaped rock. Best for horse riding and sunset.', weatherSafe: ['Clear','Clouds'], category: ['nature','adventure'] },
      ],
      evening: [
        { name: 'Kulri Bazaar', type: 'shopping', duration: '2 hrs', cost: { low: 200, medium: 800, high: 2000 }, indoor: false, desc: 'Busy market with Tibetan shops, local foods, and woolen clothes. Evening atmosphere is lively.', weatherSafe: ['Clear','Clouds'], category: ['shopping','food'] },
        { name: 'Landour Bazaar (Old Mussoorie)', type: 'nature', duration: '2 hrs', cost: { low: 100, medium: 300, high: 600 }, indoor: false, desc: 'Quiet, charming military town above Mussoorie. Landour Bakehouse is legendary. Ruskin Bond\'s home.', weatherSafe: ['Clear','Clouds'], category: ['food','culture','nature'] },
      ],
      indoor: [
        { name: 'Mussoorie Heritage Centre', type: 'museum', duration: '1.5 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: true, desc: 'History of Mussoorie — British era, Char Dham connection and hill culture displays.', weatherSafe: 'all', category: ['history'] },
      ]
    },
    food: ['Maggi at Char Dukan', 'Landour Bakehouse baked goods', 'Tibetan Momos', 'Pahadi chai', 'Keema Paratha'],
    hotels: {
      low: [{ name: 'Hotel Padmini Nivas', area: 'Cart Road', price: 800 }, { name: 'Hotel Valley View', area: 'Library', price: 1000 }],
      medium: [{ name: 'Hotel Brentwood', area: 'Mall Road', price: 2500 }, { name: 'Kasturica Hotel', area: 'Mall Road', price: 2000 }],
      high: [{ name: 'The Windermere Hotel', area: 'Mall Road', price: 7000 }, { name: 'JW Marriott Mussoorie', area: 'Happy Valley', price: 12000 }]
    }
  },

  // ──────────────────────────────────────────────────────
  //  BEACHES
  // ──────────────────────────────────────────────────────

  goa: {
    name: 'Goa',
    state: 'Goa',
    categories: ['beaches', 'food', 'adventure', 'nightlife', 'family'],
    description: 'India\'s party capital with pristine beaches, Portuguese heritage, and vibrant nightlife.',
    bestMonths: 'November–February',
    nearbyAirport: 'Dabolim / Mopa Airport (GOI)',
    places: {
      morning: [
        { name: 'Palolem Beach', type: 'beach', duration: '3 hrs', cost: { low: 0, medium: 500, high: 2000 }, indoor: false, desc: 'Crescent-shaped beach in South Goa. Calmer and cleaner than North Goa beaches. Perfect morning swim.', weatherSafe: ['Clear','Clouds'], category: ['beaches','family','nature'] },
        { name: 'Dudhsagar Waterfalls', type: 'nature', duration: '5 hrs', cost: { low: 800, medium: 1500, high: 2500 }, indoor: false, desc: 'India\'s 5th highest waterfall in Mollem National Park. Jeep safari + swimming. Best visited morning.', weatherSafe: ['Clear','Clouds'], category: ['adventure','nature','wildlife'] },
        { name: 'Spice Plantation Tour', type: 'activity', duration: '3 hrs', cost: { low: 600, medium: 600, high: 600 }, indoor: false, desc: 'Trekking through cardamom, pepper, and vanilla plantations with traditional Goan lunch included.', weatherSafe: ['Clear','Clouds'], category: ['nature','food','family'] },
        { name: 'Chapora Fort', type: 'monument', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Historic fort famous as a Dil Chahta Hai shooting location. Panoramic views of Vagator and Anjuna beaches.', weatherSafe: ['Clear','Clouds'], category: ['history','beaches'] },
      ],
      afternoon: [
        { name: 'Baga Beach', type: 'beach', duration: '3 hrs', cost: { low: 0, medium: 1500, high: 5000 }, indoor: false, desc: 'Most popular North Goa beach. Water sports hub — parasailing, banana boat, jet skiing.', weatherSafe: ['Clear','Clouds'], category: ['beaches','adventure','nightlife'] },
        { name: 'Fort Aguada', type: 'monument', duration: '1.5 hrs', cost: { low: 100, medium: 100, high: 100 }, indoor: false, desc: '17th century Portuguese fort with a lighthouse. Built by Portuguese to protect from Dutch and Marathas.', weatherSafe: 'all', category: ['history','beaches'] },
        { name: 'Anjuna Flea Market', type: 'shopping', duration: '2.5 hrs', cost: { low: 500, medium: 2000, high: 8000 }, indoor: false, desc: 'Famous Wednesday flea market with Kashmiri handicrafts, jewelry, clothes and souvenirs. Bargain hard.', weatherSafe: ['Clear','Clouds'], category: ['shopping','beaches'] },
      ],
      evening: [
        { name: 'Calangute Beach Sunset', type: 'beach', duration: '2 hrs', cost: { low: 0, medium: 500, high: 2000 }, indoor: false, desc: 'Queen of Goa beaches. Massive beach best for golden sunsets, shack dining and evening strolls.', weatherSafe: ['Clear','Clouds'], category: ['beaches','food'] },
        { name: 'Old Goa Churches (Basilica of Bom Jesus)', type: 'monument', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: true, desc: 'UNESCO World Heritage church housing St. Francis Xavier\'s remains. Portuguese Baroque architecture.', weatherSafe: 'all', category: ['history','spiritual'] },
        { name: 'Shacks on Arambol Beach', type: 'food', duration: '3 hrs', cost: { low: 400, medium: 1000, high: 3000 }, indoor: false, desc: 'Northernmost Goa beach with hippie culture, drum circles, sunsets and fresh seafood shacks.', weatherSafe: ['Clear','Clouds'], category: ['beaches','food','nightlife'] },
      ],
      indoor: [
        { name: 'Goa State Museum', type: 'museum', duration: '2 hrs', cost: { low: 10, medium: 10, high: 10 }, indoor: true, desc: 'Art, sculpture, coins and natural history of Goa. Perfect rainy day alternative.', weatherSafe: 'all', category: ['history'] },
        { name: 'Casino Goa', type: 'activity', duration: '3 hrs', cost: { low: 500, medium: 2000, high: 10000 }, indoor: true, desc: 'Floating casino on Mandovi river. Dinner, live music and gaming. Need to be 21+.', weatherSafe: 'all', category: ['nightlife'] },
      ]
    },
    food: ['Fish Curry Rice', 'Prawn Balchão', 'Bebinca (layered dessert)', 'Goan Pork Vindaloo', 'Solkadhi', 'Cashew Feni', 'Masala Crab'],
    hotels: {
      low: [{ name: 'Pousada Tauma', area: 'Calangute', price: 800 }, { name: 'Casa Sea Shell', area: 'Panjim', price: 1200 }],
      medium: [{ name: 'Lemon Tree Amarante', area: 'Candolim', price: 4000 }, { name: 'Club Mahindra Varca', area: 'South Goa', price: 5000 }],
      high: [{ name: 'Taj Exotica Goa', area: 'Benaulim', price: 18000 }, { name: 'W Goa', area: 'Vagator', price: 22000 }]
    }
  },

  // ──────────────────────────────────────────────────────
  //  SPIRITUAL
  // ──────────────────────────────────────────────────────

  varanasi: {
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    categories: ['spiritual', 'history', 'culture'],
    description: 'One of world\'s oldest living cities and Hinduism\'s holiest. Experience the eternal cycle of life on the Ganges.',
    bestMonths: 'October–March',
    nearbyAirport: 'Lal Bahadur Shastri Airport (VNS)',
    places: {
      morning: [
        { name: 'Dashashwamedh Ghat (Morning Boat Ride)', type: 'spiritual', duration: '2 hrs', cost: { low: 200, medium: 400, high: 800 }, indoor: false, desc: 'Watch sunrise over the sacred Ganges from a traditional wooden boat. Most magical experience in Varanasi.', weatherSafe: 'all', category: ['spiritual','culture'] },
        { name: 'Kashi Vishwanath Temple', type: 'spiritual', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: true, desc: 'One of Hinduism\'s 12 Jyotirlingas. The golden temple is the holiest Shiva shrine. Built in 1780 by Rani Ahilyabai.', weatherSafe: 'all', category: ['spiritual'] },
        { name: 'Manikarnika Ghat', type: 'spiritual', duration: '1 hr', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Sacred cremation ghat burning for 3500 years without interruption. Profound spiritual experience.', weatherSafe: 'all', category: ['spiritual','culture'] },
      ],
      afternoon: [
        { name: 'Sarnath Archaeological Site', type: 'monument', duration: '3 hrs', cost: { low: 25, medium: 25, high: 25 }, indoor: false, desc: 'Where Buddha gave his first sermon. Dhamek Stupa, Ashoka Pillar and museum. 10km from Varanasi.', weatherSafe: 'all', category: ['history','spiritual','buddhism'] },
        { name: 'Vishwanath Gali (Narrow Lanes)', type: 'activity', duration: '2 hrs', cost: { low: 200, medium: 500, high: 1000 }, indoor: false, desc: 'Navigate ancient lanes selling silk saris, murti, chai and street food. Guided walk recommended.', weatherSafe: ['Clear','Clouds'], category: ['culture','shopping','food'] },
        { name: 'Banaras Hindu University Campus', type: 'monument', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Asia\'s largest residential university campus. New Vishwanath Temple inside is stunning.', weatherSafe: ['Clear','Clouds'], category: ['history','spiritual'] },
      ],
      evening: [
        { name: 'Ganga Aarti at Dashashwamedh Ghat', type: 'spiritual', duration: '1.5 hrs', cost: { low: 0, medium: 100, high: 500 }, indoor: false, desc: 'Spectacular fire aarti ceremony with brass lamps, conch shells and chanting. Absolutely unmissable.', weatherSafe: 'all', category: ['spiritual','culture'] },
        { name: 'Assi Ghat Evening', type: 'spiritual', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Quieter alternative to main ghats. Sadhus, musicians, and small evening aarti. More authentic.', weatherSafe: 'all', category: ['spiritual','culture'] },
      ],
      indoor: [
        { name: 'Sarnath Museum', type: 'museum', duration: '1.5 hrs', cost: { low: 5, medium: 5, high: 5 }, indoor: true, desc: 'Houses India\'s finest Buddhist sculptures and the original Ashoka National Emblem capital.', weatherSafe: 'all', category: ['history','buddhism'] },
        { name: 'Silk Weaving Workshop', type: 'activity', duration: '2 hrs', cost: { low: 0, medium: 200, high: 500 }, indoor: true, desc: 'Watch ancient Banarasi silk weaving on handlooms. Buy directly from weavers for best prices.', weatherSafe: 'all', category: ['culture','shopping'] },
      ]
    },
    food: ['Banarasi Paan', 'Kachori Sabzi (Kachori Gali)', 'Tamatar Chaat', 'Lassi at Shivala', 'Malaiyyo (winter only)', 'Baati Chokha'],
    hotels: {
      low: [{ name: 'Stops Hostel', area: 'Assi Ghat', price: 400 }, { name: 'Hotel Alka', area: 'Meer Ghat', price: 800 }],
      medium: [{ name: 'BrijRama Palace', area: 'Darbhanga Ghat', price: 4000 }, { name: 'Hotel Ganges View', area: 'Assi Ghat', price: 2500 }],
      high: [{ name: 'Taj Hotel and Convention Centre', area: 'Nadesar Palace', price: 12000 }, { name: 'Ramada Plaza', area: 'Cantonment', price: 6000 }]
    }
  },

  rishikesh: {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    categories: ['spiritual', 'adventure', 'yoga', 'nature'],
    description: 'Yoga Capital of the World on the banks of Ganga — gateway to Char Dham and thrilling adventure sports.',
    bestMonths: 'September–June',
    nearbyAirport: 'Jolly Grant Airport Dehradun (DED)',
    places: {
      morning: [
        { name: 'Laxman Jhula & Ram Jhula', type: 'spiritual', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Iconic iron suspension bridges over Ganga, surrounded by temples and ashrams. Walk across for spiritual vibes.', weatherSafe: 'all', category: ['spiritual','adventure'] },
        { name: 'River Rafting on Ganges (16km/26km)', type: 'adventure', duration: '4 hrs', cost: { low: 800, medium: 1500, high: 2500 }, indoor: false, desc: 'World-class whitewater rafting through Grade III-IV rapids. Best in morning when river is calmer.', weatherSafe: ['Clear','Clouds'], category: ['adventure'] },
        { name: 'Triveni Ghat Morning Aarti', type: 'spiritual', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Three rivers confluence — Ganga, Yamuna, Saraswati. Morning aarti with locals is deeply spiritual.', weatherSafe: 'all', category: ['spiritual'] },
      ],
      afternoon: [
        { name: 'Neelkanth Mahadev Temple', type: 'spiritual', duration: '3 hrs', cost: { low: 0, medium: 200, high: 500 }, indoor: false, desc: 'Important Shiva temple 32km in jungle. Where Shiva consumed poison (neelkanth). Trekking path available.', weatherSafe: ['Clear','Clouds'], category: ['spiritual','adventure','nature'] },
        { name: 'Bungee Jumping at Mohan Chatti', type: 'adventure', duration: '3 hrs', cost: { low: 3500, medium: 3500, high: 3500 }, indoor: false, desc: 'India\'s highest natural platform bungee jump at 83m. Also flying fox and giant swing available.', weatherSafe: ['Clear'], category: ['adventure'] },
        { name: 'Beatles Ashram (Chaurasi Kutia)', type: 'monument', duration: '2 hrs', cost: { low: 150, medium: 150, high: 150 }, indoor: false, desc: 'Maharishi Mahesh Yogi\'s ashram where Beatles stayed in 1968. Now atmospheric abandoned ruins + street art.', weatherSafe: ['Clear','Clouds'], category: ['history','culture','spiritual'] },
      ],
      evening: [
        { name: 'Parmarth Niketan Ganga Aarti', type: 'spiritual', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'India\'s grandest Ganga aarti — thousands of diyas floating on Ganga at sunset. Simply divine.', weatherSafe: 'all', category: ['spiritual'] },
        { name: 'Yoga/Meditation Session', type: 'wellness', duration: '2 hrs', cost: { low: 300, medium: 500, high: 1500 }, indoor: true, desc: 'Evening yoga class at one of 100+ certified ashrams. Book Yoga Niketan, Anand Prakash, or Parmarth.', weatherSafe: 'all', category: ['spiritual','wellness'] },
      ],
      indoor: [
        { name: 'Ayurvedic Massage Center', type: 'wellness', duration: '1.5 hrs', cost: { low: 500, medium: 1200, high: 3000 }, indoor: true, desc: 'Traditional Kerala Ayurvedic massage. Many certified centers around Laxman Jhula. Perfect for rain days.', weatherSafe: 'all', category: ['wellness','spiritual'] },
      ]
    },
    food: ['Satvik Thali (ashram food)', 'Chole Bhature', 'Lassi', 'Aloo Paratha', 'German Bakery treats', 'Chilla (savory crepe)'],
    hotels: {
      low: [{ name: 'Bunk Rishikesh Hostel', area: 'Laxman Jhula', price: 350 }, { name: 'Zostel Rishikesh', area: 'Tapovan', price: 450 }],
      medium: [{ name: 'Atali Ganga Camp', area: 'Byasi', price: 3500 }, { name: 'Shiv Shakti Deluxe', area: 'Ram Jhula', price: 1800 }],
      high: [{ name: 'Taj Rishikesh Resort & Spa', area: 'Rishikesh', price: 15000 }, { name: 'Veda5 Wellness', area: 'Shivpuri', price: 8000 }]
    }
  },

  // ──────────────────────────────────────────────────────
  //  HISTORICAL
  // ──────────────────────────────────────────────────────

  agra: {
    name: 'Agra',
    state: 'Uttar Pradesh',
    categories: ['historical', 'family', 'culture'],
    description: 'Home of the Taj Mahal, Agra Fort and Fatehpur Sikri — Mughal Empire\'s greatest legacy.',
    bestMonths: 'October–March',
    nearbyAirport: 'Pandit Deen Dayal Upadhyay Airport (AGR)',
    places: {
      morning: [
        { name: 'Taj Mahal (Sunrise Visit)', type: 'monument', duration: '3 hrs', cost: { low: 250, medium: 250, high: 250 }, indoor: false, desc: 'UNESCO wonder — a marble mausoleum built by Shah Jahan for Mumtaz Mahal. Sunrise is the most magical time. Carry ID.', weatherSafe: 'all', category: ['historical','family'] },
        { name: 'Mehtab Bagh (Taj Rear Vista)', type: 'nature', duration: '1.5 hrs', cost: { low: 200, medium: 200, high: 200 }, indoor: false, desc: 'Mughal garden directly behind Taj with the best Taj reflection in river pool. Moonlight view point.', weatherSafe: ['Clear','Clouds'], category: ['historical','nature'] },
      ],
      afternoon: [
        { name: 'Agra Fort (Lal Kila)', type: 'monument', duration: '2.5 hrs', cost: { low: 300, medium: 300, high: 300 }, indoor: false, desc: 'UNESCO Heritage 16th century Mughal fort — Akbar, Jahangir and Shah Jahan all lived here. Massive and fascinating.', weatherSafe: 'all', category: ['historical','family'] },
        { name: 'Fatehpur Sikri', type: 'monument', duration: '3 hrs', cost: { low: 300, medium: 300, high: 300 }, indoor: false, desc: 'Akbar\'s abandoned Mughal capital (1571). Perfectly preserved — Panch Mahal, Jodha Bai\'s palace, Buland Darwaza.', weatherSafe: ['Clear','Clouds'], category: ['historical','culture'] },
        { name: 'Itimad-ud-Daula (Baby Taj)', type: 'monument', duration: '2 hrs', cost: { low: 110, medium: 110, high: 110 }, indoor: false, desc: 'First Mughal structure made entirely of marble (1628). Considered prototype for Taj. Less crowded.', weatherSafe: 'all', category: ['historical'] },
      ],
      evening: [
        { name: 'Kinari Bazaar', type: 'shopping', duration: '2 hrs', cost: { low: 300, medium: 1000, high: 3000 }, indoor: false, desc: 'Historic market near Jama Masjid. Famous for marble inlay work, leather goods and Mughlai sweets.', weatherSafe: ['Clear','Clouds'], category: ['shopping','culture'] },
        { name: 'Taj Nature Walk / Moonlight Viewing', type: 'nature', duration: '2 hrs', cost: { low: 50, medium: 50, high: 800 }, indoor: false, desc: 'Evening nature walk near Taj. Full moon night Taj viewings (5 nights a month) are extraordinary.', weatherSafe: ['Clear','Clouds'], category: ['historical','nature'] },
      ],
      indoor: [
        { name: 'Agra Museum (Taj Museum)', type: 'museum', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: true, desc: 'Collection of Mughal relics, coins and photographs inside the Taj complex. Free with Taj ticket.', weatherSafe: 'all', category: ['historical'] },
        { name: 'Marble Inlay Workshop', type: 'activity', duration: '1.5 hrs', cost: { low: 0, medium: 500, high: 2000 }, indoor: true, desc: 'Watch artisans create pietra dura marble inlay — same technique used in Taj Mahal.', weatherSafe: 'all', category: ['culture','shopping'] },
      ]
    },
    food: ['Petha (candy)', 'Dalmoth', 'Bedai Kachori', 'Mughlai Biryani', 'Jalebi Fafda', 'Mughal-style Nihari'],
    hotels: {
      low: [{ name: 'Hotel Kamal', area: 'Taj Ganj', price: 700 }, { name: 'Hotel Saniya Palace', area: 'Taj Ganj', price: 900 }],
      medium: [{ name: 'Trident Agra', area: 'Fatehabad Road', price: 5000 }, { name: 'The Coral Tree', area: 'Civil Lines', price: 3000 }],
      high: [{ name: 'The Oberoi Amarvilas', area: 'Taj East Gate', price: 35000 }, { name: 'ITC Mughal', area: 'Fatehabad Road', price: 15000 }]
    }
  },

  jaipur: {
    name: 'Jaipur',
    state: 'Rajasthan',
    categories: ['historical', 'family', 'culture', 'food', 'shopping'],
    description: 'The Pink City — royal palaces, majestic forts, vibrant bazaars and authentic Rajasthani culture.',
    bestMonths: 'October–March',
    nearbyAirport: 'Jaipur International Airport (JAI)',
    places: {
      morning: [
        { name: 'Amer Fort (Amber Fort)', type: 'monument', duration: '3 hrs', cost: { low: 100, medium: 100, high: 100 }, indoor: false, desc: 'Magnificent 16th century Rajput fort with Sheesh Mahal (Hall of Mirrors). Elephant ride available at base.', weatherSafe: 'all', category: ['historical','family','adventure'] },
        { name: 'Jal Mahal (Water Palace)', type: 'monument', duration: '1 hr', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Palace floating in Man Sagar Lake. Entry inside not permitted but exterior viewing from road is stunning.', weatherSafe: 'all', category: ['historical','nature'] },
        { name: 'Hawa Mahal (Palace of Winds)', type: 'monument', duration: '1.5 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: false, desc: 'Iconic 5-story honeycombed facade with 953 windows. Built so royal women could observe street life unseen.', weatherSafe: 'all', category: ['historical','family'] },
      ],
      afternoon: [
        { name: 'City Palace & Museum', type: 'monument', duration: '2.5 hrs', cost: { low: 300, medium: 300, high: 300 }, indoor: false, desc: 'Royal palace complex with Mubarak Mahal, Chandra Mahal (can see exterior) and world-class museum.', weatherSafe: 'all', category: ['historical','culture'] },
        { name: 'Jantar Mantar Observatory', type: 'monument', duration: '1.5 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: false, desc: 'UNESCO site — world\'s largest stone sundial (accurate to 2 seconds). 19 astronomical instruments.', weatherSafe: 'all', category: ['historical','education'] },
        { name: 'Nahargarh Fort', type: 'monument', duration: '2 hrs', cost: { low: 50, medium: 50, high: 200 }, indoor: false, desc: 'Hilltop fort overlooks entire Jaipur. Used as movie set for Rang De Basanti. Sunset views incredible.', weatherSafe: ['Clear','Clouds'], category: ['historical','adventure'] },
      ],
      evening: [
        { name: 'Johari Bazaar & Bapu Bazaar', type: 'shopping', duration: '2.5 hrs', cost: { low: 500, medium: 2000, high: 10000 }, indoor: false, desc: 'Jaipur\'s gem markets. Johari = jewelry, Bapu = textiles/handicrafts. Blue pottery unique to Jaipur.', weatherSafe: ['Clear','Clouds'], category: ['shopping','culture'] },
        { name: 'Chokhi Dhani Ethnic Village', type: 'activity', duration: '4 hrs', cost: { low: 800, medium: 1200, high: 2000 }, indoor: false, desc: 'Rajasthani cultural village experience — folk dances, camel rides, puppet show + traditional dinner.', weatherSafe: ['Clear','Clouds'], category: ['culture','food','family'] },
      ],
      indoor: [
        { name: 'Albert Hall Museum', type: 'museum', duration: '2 hrs', cost: { low: 40, medium: 40, high: 40 }, indoor: true, desc: 'Oldest museum in Rajasthan with Egyptian mummy, carpets and Rajput artifacts.', weatherSafe: 'all', category: ['historical'] },
        { name: 'Anokhi Museum of Hand Printing', type: 'museum', duration: '1.5 hrs', cost: { low: 100, medium: 100, high: 100 }, indoor: true, desc: 'Fascinating museum dedicated to block printing tradition. Workshop available.', weatherSafe: 'all', category: ['culture','shopping'] },
      ]
    },
    food: ['Dal Baati Churma', 'Laal Maas', 'Ghevar', 'Kachori at Rawat Mishtan Bhandar', 'Pyaaz Kachori', 'Rajasthani Thali'],
    hotels: {
      low: [{ name: 'Zostel Jaipur', area: 'Malviya Nagar', price: 400 }, { name: 'Hotel Pearl Palace', area: 'Hathroi Fort', price: 800 }],
      medium: [{ name: 'Samode Haveli', area: 'Old City', price: 5000 }, { name: 'Hotel Arya Niwas', area: 'Sansar Chandra Road', price: 2500 }],
      high: [{ name: 'Rambagh Palace (Taj)', area: 'Bhawani Singh Road', price: 30000 }, { name: 'Jai Mahal Palace', area: 'Jacob Road', price: 12000 }]
    }
  },

  // ──────────────────────────────────────────────────────
  //  WILDLIFE
  // ──────────────────────────────────────────────────────

  ranthambore: {
    name: 'Ranthambore',
    state: 'Rajasthan',
    categories: ['wildlife', 'nature', 'adventure'],
    description: 'India\'s most famous tiger reserve with historic fort ruins and diverse wildlife.',
    bestMonths: 'October–June (Best Tiger Sightings: November–April)',
    nearbyAirport: 'Jaipur International Airport (JAI) — 180km',
    places: {
      morning: [
        { name: 'Ranthambore Tiger Reserve Safari (Zone 1-5)', type: 'wildlife', duration: '4 hrs', cost: { low: 1500, medium: 2500, high: 4000 }, indoor: false, desc: 'Jeep or canter safari through the reserve. Zones 2,3 have highest tiger sighting probability. Book 90 days in advance.', weatherSafe: ['Clear','Clouds'], category: ['wildlife','adventure'] },
        { name: 'Ranthambore Fort', type: 'monument', duration: '2.5 hrs', cost: { low: 25, medium: 25, high: 25 }, indoor: false, desc: 'UNESCO site — 10th century fort inside the tiger reserve. Ganesh temple at top is visited by tigers too!', weatherSafe: 'all', category: ['historical','wildlife'] },
      ],
      afternoon: [
        { name: 'Padam Talao Lake', type: 'nature', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Largest lake in reserve. Crocodiles, leopards and tigers come here to drink. Excellent bird watching too.', weatherSafe: ['Clear','Clouds'], category: ['wildlife','nature'] },
        { name: 'Surwal Lake (Bird Watching)', type: 'nature', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Flamingoes, migratory birds and painted storks. 10km from reserve. Best birding October–March.', weatherSafe: ['Clear','Clouds'], category: ['wildlife','nature'] },
      ],
      evening: [
        { name: 'Jungle Book Open Theater', type: 'activity', duration: '2 hrs', cost: { low: 200, medium: 400, high: 800 }, indoor: false, desc: 'Cultural show on tiger conservation and tribal life near Sawai Madhopur.', weatherSafe: 'all', category: ['culture','wildlife'] },
        { name: 'Sawai Madhopur Local Market', type: 'shopping', duration: '1.5 hrs', cost: { low: 200, medium: 600, high: 1500 }, indoor: false, desc: 'Local market for Rajasthani handicrafts, tiger art prints and tribal jewelry.', weatherSafe: ['Clear','Clouds'], category: ['shopping'] },
      ],
      indoor: [
        { name: 'Ranthambore School of Art', type: 'activity', duration: '2 hrs', cost: { low: 500, medium: 1000, high: 2000 }, indoor: true, desc: 'Wildlife paintings on silk and canvas. Watch artists, buy original local wildlife art.', weatherSafe: 'all', category: ['culture'] },
      ]
    },
    food: ['Dal Baati Churma', 'Rajasthani Thali', 'Ker Sangri', 'Ghevar', 'Safri (local tea)'],
    hotels: {
      low: [{ name: 'RTDC Vinayak', area: 'Ranthambore Road', price: 1200 }, { name: 'Hotel Aravali', area: 'Sawai Madhopur', price: 800 }],
      medium: [{ name: 'Ranthambore Regency', area: 'Ranthambore Road', price: 4000 }, { name: 'The Tigress Resort', area: 'Sherpur', price: 3500 }],
      high: [{ name: 'Oberoi Vanyavilas', area: 'Ranthambore Road', price: 40000 }, { name: 'Aman-i-Khás', area: 'Sherpur-Khiljipur', price: 50000 }]
    }
  },

  // ──────────────────────────────────────────────────────
  //  MORE CITIES
  // ──────────────────────────────────────────────────────

  kerala: {
    name: 'Alleppey (Alappuzha)',
    state: 'Kerala',
    categories: ['nature', 'beaches', 'family', 'spiritual'],
    description: 'Venice of the East — Kerala backwaters, houseboat cruises, beaches and coconut lagoons.',
    bestMonths: 'September–February',
    nearbyAirport: 'Cochin International Airport (COK)',
    places: {
      morning: [
        { name: 'Backwater Houseboat Cruise', type: 'activity', duration: '8 hrs', cost: { low: 5000, medium: 8000, high: 15000 }, indoor: true, desc: 'Overnight or daycruise on traditional rice boat through Kerala backwaters. Village life, canals, churches.', weatherSafe: 'all', category: ['nature','family','beaches'] },
        { name: 'Alappuzha Beach', type: 'beach', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Long sandy beach with the iconic pier and lighthouse. Good for morning walks and sunrise.', weatherSafe: ['Clear','Clouds'], category: ['beaches','nature'] },
      ],
      afternoon: [
        { name: 'Kuttanad Paddy Fields', type: 'nature', duration: '2.5 hrs', cost: { low: 200, medium: 400, high: 800 }, indoor: false, desc: 'World\'s only below-sea-level paddy cultivation. Stunning green fields below water level.', weatherSafe: ['Clear','Clouds'], category: ['nature','culture'] },
        { name: 'Pathiramanal Island', type: 'nature', duration: '2 hrs', cost: { low: 100, medium: 100, high: 100 }, indoor: false, desc: 'Bird sanctuary island in Vembanad Lake accessible by boat. 70+ rare bird species.', weatherSafe: ['Clear','Clouds'], category: ['wildlife','nature'] },
      ],
      evening: [
        { name: 'Nehru Trophy Snake Boat Race Site', type: 'activity', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Punnamada Lake where famous boat race occurs every August. Country boats visible year-round.', weatherSafe: ['Clear','Clouds'], category: ['culture','nature'] },
        { name: 'St. Andrew\'s Basilica (Arthunkal)', type: 'spiritual', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: true, desc: '16th-century Portuguese church. Major pilgrimage site. Serene and impressive architecture.', weatherSafe: 'all', category: ['spiritual','historical'] },
      ],
      indoor: [
        { name: 'Kerala Kalamandalam Cultural Show', type: 'activity', duration: '2 hrs', cost: { low: 300, medium: 500, high: 1000 }, indoor: true, desc: 'Kathakali and Mohiniyattam dance performances. Makeup demonstration is fascinating.', weatherSafe: 'all', category: ['culture'] },
      ]
    },
    food: ['Karimeen Pollichathu (Pearl Spot Fish)', 'Kerala Appam & Stew', 'Puttu Kadala', 'Prawn Moilee', 'Kerala Halwa', 'Coconut toddy'],
    hotels: {
      low: [{ name: 'Government Rest House', area: 'Alleppey Beach', price: 600 }, { name: 'Johnson\'s Hotel', area: 'Mullackal', price: 900 }],
      medium: [{ name: 'Pagoda Resort', area: 'Alleppey Beach', price: 3500 }, { name: 'Kayaloram Lake Resort', area: 'Punnamada', price: 4000 }],
      high: [{ name: 'Marari Beach Resort (CGH Earth)', area: 'Mararikulam', price: 12000 }, { name: 'Coconut Lagoon (CGH Earth)', area: 'Kumarakom', price: 15000 }]
    }
  },

  ooty: {
    name: 'Ooty (Udhagamandalam)',
    state: 'Tamil Nadu',
    categories: ['mountains', 'nature', 'family', 'honeymoon'],
    description: 'Queen of Nilgiris — tea gardens, botanical gardens and the heritage Nilgiri Mountain Railway.',
    bestMonths: 'March–June, September–November',
    nearbyAirport: 'Coimbatore International Airport (CJB)',
    places: {
      morning: [
        { name: 'Nilgiri Mountain Railway (Toy Train)', type: 'activity', duration: '5 hrs', cost: { low: 30, medium: 200, high: 700 }, indoor: true, desc: 'UNESCO Heritage steam railway from Mettupalayam to Ooty through 16 tunnels and 208 curves. Must-do.', weatherSafe: 'all', category: ['family','nature','history'] },
        { name: 'Government Botanical Garden', type: 'nature', duration: '2 hrs', cost: { low: 30, medium: 30, high: 30 }, indoor: false, desc: '55-acre garden with 650+ plant species, including a 20-million-year-old tree fossil. Flower shows in May.', weatherSafe: ['Clear','Clouds'], category: ['nature','family'] },
        { name: 'Doddabetta Peak', type: 'nature', duration: '2.5 hrs', cost: { low: 0, medium: 100, high: 300 }, indoor: false, desc: 'Highest peak in Nilgiris at 2,637m. Telescope house for panoramic views on clear days.', weatherSafe: ['Clear'], category: ['nature','adventure','mountains'] },
      ],
      afternoon: [
        { name: 'Ooty Lake Boating', type: 'activity', duration: '2 hrs', cost: { low: 100, medium: 100, high: 100 }, indoor: false, desc: 'Artificial lake made in 1824 by John Sullivan. Paddle boats, rowboats and motor boats available.', weatherSafe: ['Clear','Clouds'], category: ['family','nature'] },
        { name: 'Tea Factory & Museum (Chamraj Tea)', type: 'activity', duration: '1.5 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: true, desc: 'See how Nilgiri tea is processed. Free tea tasting. Buy directly from factory.', weatherSafe: 'all', category: ['culture','food','nature'] },
        { name: 'Avalanche Lake', type: 'nature', duration: '3 hrs', cost: { low: 200, medium: 400, high: 800 }, indoor: false, desc: 'Remote high-altitude lake 24km  from Ooty, accessible by jeep. Stunning trout-fishing lake.', weatherSafe: ['Clear'], category: ['adventure','nature'] },
      ],
      evening: [
        { name: 'Charing Cross & Spencer\'s Road', type: 'shopping', duration: '2 hrs', cost: { low: 300, medium: 1000, high: 3000 }, indoor: false, desc: 'Main market. Buy Nilgiri tea, homemade chocolates, eucalyptus oil and woolens.', weatherSafe: ['Clear','Clouds'], category: ['shopping','food'] },
        { name: 'Thread Garden', type: 'activity', duration: '1.5 hrs', cost: { low: 30, medium: 30, high: 30 }, indoor: true, desc: 'Unique garden entirely made from thread. Each flower took 2 years to create. Guinness record holder.', weatherSafe: 'all', category: ['culture','family'] },
      ],
      indoor: [
        { name: 'Wax World Museum', type: 'museum', duration: '1.5 hrs', cost: { low: 150, medium: 150, high: 150 }, indoor: true, desc: 'Wax figures of famous Indians and world leaders. Good rainy day activity for families.', weatherSafe: 'all', category: ['family'] },
      ]
    },
    food: ['Varkey (sweet bread)', 'Nilgiri Tea (with cookies)', 'Ooty Homemade Chocolates', 'Biryani at Chandan', 'Coconut Rice', 'Mutton Stew'],
    hotels: {
      low: [{ name: 'Hotel Sanjay', area: 'Charing Cross', price: 600 }, { name: 'TTDC Hotel Tamil Nadu', area: 'Ooty', price: 900 }],
      medium: [{ name: 'Savoy Hotel', area: 'Sylks Road', price: 4000 }, { name: 'Monarch Hotel', area: 'Charing Cross', price: 2500 }],
      high: [{ name: 'Fortune Sullivan Court', area: 'Ettines Road', price: 7000 }, { name: 'The Willow Hill', area: 'Havelock Road', price: 8000 }]
    }
  },

  // Delhi and Mumbai
  delhi: {
    name: 'New Delhi',
    state: 'Delhi',
    categories: ['historical', 'food', 'family', 'culture', 'shopping'],
    description: 'India\'s capital — 3,000 years of history with Mughal monuments, British heritage, and street food heaven.',
    bestMonths: 'October–March',
    nearbyAirport: 'Indira Gandhi International Airport (DEL)',
    places: {
      morning: [
        { name: 'Red Fort (Lal Qila)', type: 'monument', duration: '2.5 hrs', cost: { low: 35, medium: 35, high: 35 }, indoor: false, desc: 'UNESCO World Heritage 17th-century Mughal fortress — symbol of India\'s independence. Son et lumière show at night.', weatherSafe: 'all', category: ['historical','family'] },
        { name: 'Qutub Minar Complex', type: 'monument', duration: '2 hrs', cost: { low: 35, medium: 35, high: 35 }, indoor: false, desc: 'UNESCO site — world\'s tallest brick minaret (72.5m). Iron Pillar that hasn\'t rusted in 1600 years.', weatherSafe: 'all', category: ['historical','nature'] },
        { name: 'Humayun\'s Tomb', type: 'monument', duration: '2 hrs', cost: { low: 35, medium: 35, high: 35 }, indoor: false, desc: 'UNESCO World Heritage — prototype for Taj Mahal. Mughal garden tomb, peaceful and beautiful.', weatherSafe: 'all', category: ['historical'] },
      ],
      afternoon: [
        { name: 'Lotus Temple (Bahá\'í House of Worship)', type: 'spiritual', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: true, desc: 'Stunning lotus-shaped structure. Open to all religions. Serene meditation space.', weatherSafe: 'all', category: ['spiritual','family'] },
        { name: 'National Museum of India', type: 'museum', duration: '2.5 hrs', cost: { low: 20, medium: 20, high: 20 }, indoor: true, desc: 'India\'s largest museum — 200,000 artifacts from Indus Valley Civilization to modern times.', weatherSafe: 'all', category: ['historical','culture'] },
        { name: 'Akshardham Temple', type: 'spiritual', duration: '3 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'World\'s largest Hindu temple (Guinness record). Musical fountain show at night. No bags/phones inside.', weatherSafe: 'all', category: ['spiritual','family'] },
      ],
      evening: [
        { name: 'Chandni Chowk Food Walk', type: 'food', duration: '2.5 hrs', cost: { low: 300, medium: 700, high: 1500 }, indoor: false, desc: 'Asia\'s oldest market — Paranthe Wali Gali, Jalebi stalls, Daryaganj biryani. Best evening food walk in India.', weatherSafe: ['Clear','Clouds'], category: ['food','culture','historical'] },
        { name: 'Lodhi Garden', type: 'nature', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Mughal-era tombs surrounded by lush park. Very popular evening spot with Delhiites. Peaceful retreat.', weatherSafe: ['Clear','Clouds'], category: ['historical','nature'] },
        { name: 'Dilli Haat (INA)', type: 'shopping', duration: '2 hrs', cost: { low: 20, medium: 500, high: 3000 }, indoor: false, desc: 'Open-air crafts bazaar with permanent stalls from all Indian states. Authentic handicrafts and food.', weatherSafe: ['Clear','Clouds'], category: ['shopping','food','culture'] },
      ],
      indoor: [
        { name: 'South Delhi Malls (Select Citywalk)', type: 'shopping', duration: '3 hrs', cost: { low: 300, medium: 1500, high: 8000 }, indoor: true, desc: 'Premier mall in Saket with international and Indian brands. Air-conditioned escape from heat or rain.', weatherSafe: 'all', category: ['shopping','food'] },
        { name: 'National Rail Museum', type: 'museum', duration: '2 hrs', cost: { low: 100, medium: 100, high: 100 }, indoor: false, desc: 'Collection of 100+ locomotives and rail cars including Fairy Queen (1855). Mini toy train ride.', weatherSafe: ['Clear','Clouds'], category: ['family','historical'] },
      ]
    },
    food: ['Chole Bhature', 'Paranthe Wali Gali', 'Delhi Wala Butter Chicken', 'Golgappe at Chandni Chowk', 'Kebabs at Karim\'s', 'Daulat ki Chaat'],
    hotels: {
      low: [{ name: 'Zostel Delhi', area: 'Paharganj', price: 400 }, { name: 'Hotel Blue', area: 'Paharganj', price: 700 }],
      medium: [{ name: 'The Hans Hotel', area: 'Connaught Place', price: 4000 }, { name: 'Hotel Jivitesh', area: 'Karol Bagh', price: 2000 }],
      high: [{ name: 'The Imperial Hotel', area: 'Janpath', price: 20000 }, { name: 'Roseate House', area: 'Aerocity', price: 10000 }]
    }
  },

  mumbai: {
    name: 'Mumbai',
    state: 'Maharashtra',
    categories: ['food', 'family', 'culture', 'historical', 'beaches'],
    description: 'City of Dreams — Bollywood, colonial heritage, street food, sea-facing promenades and infinite energy.',
    bestMonths: 'October–February',
    nearbyAirport: 'Chhatrapati Shivaji Maharaj International Airport (BOM)',
    places: {
      morning: [
        { name: 'Gateway of India', type: 'monument', duration: '1.5 hrs', cost: { low: 0, medium: 100, high: 300 }, indoor: false, desc: '1924 basalt arch on Mumbai harbour. Take ferry to Elephanta Caves from here. Symbol of Mumbai.', weatherSafe: 'all', category: ['historical','family'] },
        { name: 'Elephanta Caves', type: 'monument', duration: '4 hrs', cost: { low: 100, medium: 100, high: 100 }, indoor: false, desc: 'UNESCO Heritage 5th-7th century rock-cut Shiva temples on island. 1-hour ferry from Gateway. Magnificent.', weatherSafe: ['Clear','Clouds'], category: ['historical','spiritual'] },
        { name: 'Sanjay Gandhi National Park (Borivali)', type: 'wildlife', duration: '3 hrs', cost: { low: 48, medium: 100, high: 300 }, indoor: false, desc: 'India\'s most visited national park in middle of city. Safari for leopards, Kanheri Caves inside.', weatherSafe: ['Clear','Clouds'], category: ['wildlife','nature','historical'] },
      ],
      afternoon: [
        { name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)', type: 'monument', duration: '1 hr', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'UNESCO Heritage Victorian Gothic railway station (1887). India\'s busiest station is also an architectural wonder.', weatherSafe: 'all', category: ['historical','family'] },
        { name: 'Dhobi Ghat', type: 'activity', duration: '1 hr', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'World\'s largest open-air laundry. 800+ washermen washing the city\'s clothes. Unique Mumbai experience.', weatherSafe: ['Clear','Clouds'], category: ['culture'] },
        { name: 'Siddhivinayak Temple', type: 'spiritual', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: true, desc: 'Most visited Hindu temple in Mumbai. Ganapati temple visited by Bollywood stars and millions of devotees.', weatherSafe: 'all', category: ['spiritual'] },
      ],
      evening: [
        { name: 'Marine Drive (Queen\'s Necklace)', type: 'nature', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: '3.6km seaside promenade best at sunset. The lights form a necklace at night. The heart of Mumbai.', weatherSafe: ['Clear','Clouds'], category: ['nature','family','beaches'] },
        { name: 'Juhu Beach', type: 'beach', duration: '2 hrs', cost: { low: 100, medium: 300, high: 800 }, indoor: false, desc: 'Famous beach with Mumbai\'s iconic street food — Pav Bhaji, Bhel Puri, Vada Pav at stalls.', weatherSafe: ['Clear','Clouds'], category: ['beaches','food'] },
        { name: 'Colaba Causeway Market', type: 'shopping', duration: '2 hrs', cost: { low: 300, medium: 1000, high: 5000 }, indoor: false, desc: 'Street market for antiques, handicrafts, clothes and curiosities near Gateway. Best bargain shopping.', weatherSafe: ['Clear','Clouds'], category: ['shopping'] },
      ],
      indoor: [
        { name: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya', type: 'museum', duration: '2 hrs', cost: { low: 85, medium: 85, high: 85 }, indoor: true, desc: 'Mumbai\'s premier museum in a British Indo-Saracenic building. Art, archaeology, and natural history.', weatherSafe: 'all', category: ['historical','culture'] },
        { name: 'Phoenix Palladium Mall', type: 'shopping', duration: '2 hrs', cost: { low: 300, medium: 1500, high: 8000 }, indoor: true, desc: 'Premium mall in Lower Parel. Perfect air-conditioned escape during monsoon or summer heat.', weatherSafe: 'all', category: ['shopping','food'] },
      ]
    },
    food: ['Vada Pav', 'Pav Bhaji', 'Bombay Duck Fish', 'Bhel Puri at Chowpatty', 'Irani Chai at Britannia', 'Kebabs at Mohammad Ali Road'],
    hotels: {
      low: [{ name: 'Zostel Mumbai', area: 'Bandra', price: 450 }, { name: 'Hotel Suba Palace', area: 'Colaba', price: 1000 }],
      medium: [{ name: 'Hotel Residency', area: 'Fort', price: 4000 }, { name: 'ITC Maratha', area: 'Andheri', price: 8000 }],
      high: [{ name: 'The Taj Mahal Palace Hotel', area: 'Colaba', price: 25000 }, { name: 'Oberoi Mumbai', area: 'Nariman Point', price: 20000 }]
    }
  },

  coorg: {
    name: 'Coorg (Kodagu)',
    state: 'Karnataka',
    categories: ['nature', 'mountains', 'adventure', 'family'],
    description: 'Scotland of India — misty coffee hills, waterfalls, wildlife and Kodava warrior culture.',
    bestMonths: 'October–March (Avoid July-August heavy monsoon)',
    nearbyAirport: 'Mangalore Airport (IXE) or Mysore Airport',
    places: {
      morning: [
        { name: 'Abbey Falls', type: 'nature', duration: '2 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: false, desc: '70ft waterfall surrounded by coffee estates and spice plantations. Best flow Oct-Feb. Walking trail through forest.', weatherSafe: ['Clear','Clouds'], category: ['nature','adventure'] },
        { name: 'Nagarhole National Park Safari', type: 'wildlife', duration: '4 hrs', cost: { low: 900, medium: 1500, high: 2500 }, indoor: false, desc: 'Project Tiger reserve with elephant, leopard, gaur and wild dogs. Morning safari best for tiger sightings.', weatherSafe: ['Clear','Clouds'], category: ['wildlife','adventure'] },
        { name: 'Talacauvery (Source of River Cauvery)', type: 'spiritual', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Sacred origin of River Cauvery at 1,276m. Ancient Brahmagiri peak alongside. Deeply spiritual and scenic.', weatherSafe: 'all', category: ['spiritual','nature'] },
      ],
      afternoon: [
        { name: 'Coffee Estate Tour', type: 'activity', duration: '2.5 hrs', cost: { low: 300, medium: 600, high: 1500 }, indoor: false, desc: 'Walk through Arabica and Robusta coffee estates. Learn processing, picking and roasting. Buy fresh estate coffee.', weatherSafe: ['Clear','Clouds'], category: ['nature','food','culture'] },
        { name: 'Raja Seat Viewpoint', type: 'nature', duration: '1.5 hrs', cost: { low: 10, medium: 10, high: 10 }, indoor: false, desc: 'Garden viewpoint where Kodava kings watched sunsets. Evening mist rolling over valleys is magical.', weatherSafe: ['Clear','Clouds'], category: ['nature','family'] },
        { name: 'Iruppu Waterfalls (Brahmagiri)', type: 'nature', duration: '3 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: false, desc: 'Steps leading to a waterfall sacred to Shiva. Trek through forest. Refreshing plunge pool.', weatherSafe: ['Clear','Clouds'], category: ['adventure','spiritual','nature'] },
      ],
      evening: [
        { name: 'Madikeri Town & Fort', type: 'monument', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Small but charming hill fort. St. Mark\'s church inside is colonial. Town has good local cafes.', weatherSafe: 'all', category: ['historical','culture'] },
        { name: 'Local Kodava Restaurant', type: 'food', duration: '1.5 hrs', cost: { low: 300, medium: 600, high: 1200 }, indoor: true, desc: 'Try authentic Kodava cuisine. Pandi Curry (pork), Kadambuttu (rice dumplings), Kachampuli dishes.', weatherSafe: 'all', category: ['food','culture'] },
      ],
      indoor: [
        { name: 'Coorg Cardamom Forest Spa', type: 'wellness', duration: '2 hrs', cost: { low: 1000, medium: 2000, high: 4000 }, indoor: true, desc: 'Coffee and cardamom scrub massages. Luxury spas inside most resorts. Perfect for rainy days.', weatherSafe: 'all', category: ['wellness'] },
      ]
    },
    food: ['Pandi Curry (Kodava pork)', 'Kadambuttu (rice dumplings)', 'Kachampuli dishes', 'Akki Roti', 'Coorg Coffee', 'Bamboo Shoot Curry'],
    hotels: {
      low: [{ name: 'Hotel Cauvery', area: 'Madikeri', price: 800 }, { name: 'Green Hills Estate', area: 'Kakkabe', price: 1200 }],
      medium: [{ name: 'Coorg Cliffs', area: 'Madikeri', price: 4000 }, { name: 'Honey Valley Estate', area: 'Kakkabe', price: 3500 }],
      high: [{ name: 'Evolve Back Coorg (Orange County)', area: 'Siddapura', price: 25000 }, { name: 'Taj Madikeri Resort', area: 'Galibeedu', price: 18000 }]
    }
  },

  kolkata: {
    name: 'Kolkata',
    state: 'West Bengal',
    categories: ['historical', 'culture', 'food', 'spiritual'],
    description: 'City of Joy — colonial grandeur, vibrant arts, intellectual culture and legendary street food.',
    bestMonths: 'October–March',
    nearbyAirport: 'Netaji Subhas Chandra Bose International Airport (CCU)',
    places: {
      morning: [
        { name: 'Victoria Memorial', type: 'monument', duration: '2 hrs', cost: { low: 30, medium: 30, high: 30 }, indoor: true, desc: 'Grand British-era marble museum built in 1921 for Queen Victoria. 25 galleries of colonial history and art.', weatherSafe: 'all', category: ['historical','family'] },
        { name: 'Dakshineswar Kali Temple', type: 'spiritual', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Famous Kali temple on Hooghly River where Sri Ramakrishna was a priest. Grand 9-temple complex.', weatherSafe: 'all', category: ['spiritual'] },
        { name: 'Howrah Bridge (Rabindra Setu)', type: 'monument', duration: '1 hr', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Iconic 705m cantilever bridge built without nuts/bolts. 100,000 vehicles daily. Symbol of Kolkata.', weatherSafe: ['Clear','Clouds'], category: ['historical','family'] },
      ],
      afternoon: [
        { name: 'Indian Museum', type: 'museum', duration: '2.5 hrs', cost: { low: 20, medium: 20, high: 20 }, indoor: true, desc: 'India\'s oldest and largest museum (1814). Egypt mummy, Gandharan sculptures and colonial artifacts.', weatherSafe: 'all', category: ['historical','culture'] },
        { name: 'Kumartuli (Potter\'s Locality)', type: 'activity', duration: '2 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Neighborhood where clay idols for Durga Puja are crafted by hand all year. Incredible workmanship.', weatherSafe: ['Clear','Clouds'], category: ['culture','art'] },
        { name: 'College Street (Boi Para)', type: 'shopping', duration: '2 hrs', cost: { low: 200, medium: 800, high: 2000 }, indoor: false, desc: 'Largest second-hand book market in Asia. Coffee House intellectual cafe alongside. Kolkata\'s intellectual hub.', weatherSafe: ['Clear','Clouds'], category: ['culture','shopping'] },
      ],
      evening: [
        { name: 'Park Street Food & Nightlife', type: 'food', duration: '3 hrs', cost: { low: 400, medium: 1000, high: 3000 }, indoor: false, desc: 'Kolkata\'s most vibrant street. Peter Cat (Chelo Kebab), Flury\'s bakery, Mocambo restaurant. Evening magic.', weatherSafe: ['Clear','Clouds'], category: ['food','nightlife','culture'] },
        { name: 'Princep Ghat Evening', type: 'nature', duration: '1.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Colonial-era ghat on Hooghly with gorgeous sunset views and boat rides.', weatherSafe: ['Clear','Clouds'], category: ['historical','nature'] },
      ],
      indoor: [
        { name: 'Science City Kolkata', type: 'activity', duration: '3 hrs', cost: { low: 60, medium: 60, high: 60 }, indoor: true, desc: 'South Asia\'s largest science centre with space theatre, evolution park and butterfly enclosure. Kids love it.', weatherSafe: 'all', category: ['family','education'] },
        { name: 'Birla Planetarium', type: 'activity', duration: '2 hrs', cost: { low: 50, medium: 50, high: 50 }, indoor: true, desc: 'Asia\'s second largest planetarium with sky shows in multiple languages.', weatherSafe: 'all', category: ['family','education'] },
      ]
    },
    food: ['Kosha Mangsho', 'Ilish Bhapa (Hilsa fish curry)', 'Kathi Roll (Nizam\'s)', 'Mishti Doi', 'Rasgulla (original)', 'Puchka (Kolkata pani puri)'],
    hotels: {
      low: [{ name: 'Hotel Lytton', area: 'Sudder Street', price: 800 }, { name: 'Backpacker\'s Inn', area: 'Taltala', price: 400 }],
      medium: [{ name: 'The Astor Hotel', area: 'Shakespeare Sarani', price: 4000 }, { name: 'Sunflower Guest House', area: 'Outram Street', price: 2000 }],
      high: [{ name: 'The Oberoi Grand', area: 'Chowringhee', price: 15000 }, { name: 'ITC Royal Bengal', area: 'Salt Lake', price: 12000 }]
    }
  },

  mysore: {
    name: 'Mysore (Mysuru)',
    state: 'Karnataka',
    categories: ['historical', 'family', 'culture', 'spiritual'],
    description: 'City of Palaces — opulent royal heritage, sandalwood, silk, and the grandeur of Dasara festival.',
    bestMonths: 'October–March (Best: October for Dasara)',
    nearbyAirport: 'Mysore Airport (MYQ) or Bangalore (BLR) — 150km',
    places: {
      morning: [
        { name: 'Mysore Palace (Amba Vilas)', type: 'monument', duration: '2.5 hrs', cost: { low: 70, medium: 70, high: 70 }, indoor: false, desc: 'Indo-Saracenic royal palace of Wadiyar kings. 3rd most visited place in India after Taj and Tirupati. Illuminated Sun/Holidays.', weatherSafe: 'all', category: ['historical','family'] },
        { name: 'Chamundeshwari Temple (Chamundi Hill)', type: 'spiritual', duration: '2.5 hrs', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: 'Temple atop Chamundi Hill with 1014 stairs. Massive Nandi bull statue on the way. Panoramic Mysore view.', weatherSafe: 'all', category: ['spiritual','adventure'] },
      ],
      afternoon: [
        { name: 'Brindavan Gardens', type: 'nature', duration: '2.5 hrs', cost: { low: 55, medium: 55, high: 55 }, indoor: false, desc: 'Terraced garden below KRS Dam with musical fountain show at night. Bollywood film shooting location.', weatherSafe: ['Clear','Clouds'], category: ['nature','family'] },
        { name: 'Jaganmohan Palace (Art Gallery)', type: 'museum', duration: '1.5 hrs', cost: { low: 40, medium: 40, high: 40 }, indoor: true, desc: 'Former royal palace now gallery with Ravi Varma paintings, royal artifacts and musical instruments.', weatherSafe: 'all', category: ['historical','culture'] },
        { name: 'Ranganathittu Bird Sanctuary', type: 'wildlife', duration: '2.5 hrs', cost: { low: 200, medium: 200, high: 200 }, indoor: false, desc: 'Boat ride through island sanctuary with thousands of painted storks, cranes, ibis and crocodiles.', weatherSafe: ['Clear','Clouds'], category: ['wildlife','nature'] },
      ],
      evening: [
        { name: 'Devaraja Market', type: 'shopping', duration: '2 hrs', cost: { low: 300, medium: 1000, high: 3000 }, indoor: false, desc: 'Colorful market selling Mysore Pak sweets, silk sarees, jasmine garlands and sandalwood items.', weatherSafe: ['Clear','Clouds'], category: ['shopping','food','culture'] },
        { name: 'Mysore Palace Light Show', type: 'activity', duration: '1 hr', cost: { low: 0, medium: 0, high: 0 }, indoor: false, desc: '97,000 light bulbs illuminate the palace on Sundays and holidays. Absolutely spectacular.', weatherSafe: ['Clear','Clouds'], category: ['historical','family'] },
      ],
      indoor: [
        { name: 'Mysore Silk Factory (KSIC)', type: 'activity', duration: '1.5 hrs', cost: { low: 0, medium: 500, high: 5000 }, indoor: true, desc: 'Watch the weaving of famous Mysore silk sarees. Buy directly from government factory.', weatherSafe: 'all', category: ['culture','shopping'] },
      ]
    },
    food: ['Mysore Pak (sweet)', 'Bisi Bele Bath', 'Mysore Dosa', 'Maddur Vada', 'Obbattu (Holige)', 'Set Dosa'],
    hotels: {
      low: [{ name: 'Hotel Dasaprakash', area: 'Gandhi Square', price: 800 }, { name: 'KSTDC Mayura Hotel', area: 'Mysore', price: 1000 }],
      medium: [{ name: 'Green Hotel', area: 'Chittaranjan Palace', price: 3500 }, { name: 'The Windflower Resort', area: 'Mysore', price: 5000 }],
      high: [{ name: 'Lalitha Mahal Palace Hotel', area: 'T Narasipur Road', price: 10000 }, { name: 'Royal Orchid Metropole', area: 'Jhansi Lakshmi Bai Rd', price: 7000 }]
    }
  }
};

/**
 * Get destination data by city name (fuzzy match)
 */
function getDestination(cityName) {
  const key = cityName.toLowerCase().replace(/[^a-z]/g, '');
  
  // Direct match
  if (DESTINATIONS[key]) return DESTINATIONS[key];
  
  // Fuzzy match — check if city name contains one of our keys or vice versa
  for (const [k, v] of Object.entries(DESTINATIONS)) {
    if (key.includes(k) || k.includes(key)) return v;
    if (v.name.toLowerCase().replace(/[^a-z]/g, '').includes(key)) return v;
    if (key.includes(v.name.toLowerCase().replace(/[^a-z]/g, ''))) return v;
  }
  
  return null;
}

/**
 * Get real places for a destination, filtered by:
 * - category (mountains/beaches/spiritual/adventure/wildlife/historical/food/family)
 * - weather (avoid outdoor places in bad weather)
 * - budget (low/medium/high)
 * - time slot (morning/afternoon/evening)
 */
function getFilteredPlaces(destData, category, weather, budget, timeSlot) {
  if (!destData || !destData.places) return [];
  
  const isGoodWeather = ['Clear', 'Clouds'].includes(weather);
  const isBadWeather = ['Rain', 'Drizzle', 'Thunderstorm', 'Storm'].includes(weather);
  const isSnow = weather === 'Snow';
  
  let places = destData.places[timeSlot] || [];
  
  // Add indoor places if bad weather
  if (isBadWeather) {
    const indoorPlaces = (destData.places.indoor || []).filter(p => p.indoor);
    places = [...places.filter(p => p.indoor), ...indoorPlaces];
  }
  
  // Filter by category preference
  if (category && category !== 'general') {
    const catPlaces = places.filter(p => 
      (p.category || []).some(c => c.includes(category) || category.includes(c))
    );
    if (catPlaces.length >= 1) places = catPlaces;
  }
  
  // Filter out outdoor places in thunderstorm
  if (weather === 'Thunderstorm') {
    places = places.filter(p => p.indoor || p.weatherSafe === 'all');
  }
  
  return places;
}

/**
 * Format cost estimate based on budget level
 */
function getCostEstimate(place, budget, people) {
  const costObj = place.cost || { low: 100, medium: 200, high: 500 };
  const baseCost = costObj[budget] || costObj.medium || 200;
  const total = baseCost * people;
  return {
    perPerson: baseCost,
    total,
    formatted: `₹${total.toLocaleString('en-IN')} (₹${baseCost}/person)`
  };
}

/**
 * Get a list of all supported city names for suggestion
 */
function getSupportedCities() {
  return Object.values(DESTINATIONS).map(d => d.name);
}

module.exports = {
  DESTINATIONS,
  getDestination,
  getFilteredPlaces,
  getCostEstimate,
  getSupportedCities
};
