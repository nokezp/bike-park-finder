export const eventsSeedData = [
  {
    title: "Mountain Bike Championship 2024",
    date: new Date("2024-07-15"),
    startTime: "09:00",
    endTime: "17:00",
    location: "Whistler Mountain",
    category: "CHAMPIONSHIP",
    price: 75.00,
    imageUrl: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5",
    description: "Join us for the most prestigious mountain biking championship of the year. Compete against top riders from around the world in various categories including downhill, cross-country, and enduro races.",
    capacity: 200,
    registrationEndDate: new Date("2024-07-01"),
    availableTickets: 200,
    attendeeCount: 0,
    featured: true,
    organizer: {
      name: "Global Mountain Biking Association",
      description: "Leading organization in professional mountain biking events",
      imageUrl: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f"
    },
    schedule: [
      {
        time: "09:00",
        title: "Registration & Check-in",
        description: "Collect your race number and timing chip"
      },
      {
        time: "10:00",
        title: "Downhill Qualifications",
        description: "Qualifying rounds for the downhill competition"
      },
      {
        time: "13:00",
        title: "Cross-country Finals",
        description: "Final race for cross-country category"
      },
      {
        time: "15:00",
        title: "Awards Ceremony",
        description: "Presentation of medals and prizes"
      }
    ],
    venue: {
      name: "Whistler Mountain Bike Park",
      address: "4545 Blackcomb Way, Whistler, BC V8E 0X9, Canada",
      mapImageUrl: "https://images.unsplash.com/photo-1582540730843-e2d81fc82be2"
    }
  },
  {
    title: "Beginner's Mountain Biking Workshop",
    date: new Date("2024-06-01"),
    startTime: "10:00",
    endTime: "16:00",
    location: "Blue Mountain Trails",
    category: "WORKSHOP",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0",
    description: "Perfect for newcomers to mountain biking! Learn essential skills, safety techniques, and basic maintenance from experienced instructors.",
    capacity: 30,
    registrationEndDate: new Date("2024-05-25"),
    availableTickets: 30,
    attendeeCount: 0,
    featured: false,
    organizer: {
      name: "MTB Learning Center",
      description: "Dedicated to teaching mountain biking skills to riders of all levels",
      imageUrl: "https://images.unsplash.com/photo-1571188654248-7a89213915f7"
    },
    schedule: [
      {
        time: "10:00",
        title: "Introduction & Safety Briefing",
        description: "Overview of mountain biking basics and safety protocols"
      },
      {
        time: "11:00",
        title: "Bike Setup & Maintenance",
        description: "Learn how to properly set up your bike and basic maintenance"
      },
      {
        time: "13:00",
        title: "Trail Skills Practice",
        description: "Hands-on practice of basic trail riding techniques"
      },
      {
        time: "15:00",
        title: "Group Trail Ride",
        description: "Guided beginner-friendly trail ride"
      }
    ],
    venue: {
      name: "Blue Mountain Bike Center",
      address: "123 Trail Way, Boulder, CO 80302",
      mapImageUrl: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5"
    }
  },
  {
    title: "Summer Bike Festival 2024",
    date: new Date("2024-08-10"),
    startTime: "11:00",
    endTime: "22:00",
    location: "Riverside Park",
    category: "FESTIVAL",
    price: 25.00,
    imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
    description: "A celebration of all things cycling! Join us for a day of bike demos, competitions, live music, food trucks, and family-friendly activities.",
    capacity: 500,
    registrationEndDate: new Date("2024-08-09"),
    availableTickets: 500,
    attendeeCount: 0,
    featured: true,
    organizer: {
      name: "City Cycling Club",
      description: "Your local community of cycling enthusiasts",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    },
    schedule: [
      {
        time: "11:00",
        title: "Festival Opening",
        description: "Opening ceremony and vendor booth setup"
      },
      {
        time: "12:00",
        title: "Bike Demo Sessions",
        description: "Test ride the latest mountain bikes from top brands"
      },
      {
        time: "15:00",
        title: "Skills Competition",
        description: "Show off your tricks and compete for prizes"
      },
      {
        time: "19:00",
        title: "Evening Concert",
        description: "Live music and entertainment"
      }
    ],
    venue: {
      name: "Riverside Event Grounds",
      address: "789 River Road, Portland, OR 97201",
      mapImageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    }
  },
  {
    title: "Sunday Morning Group Ride",
    date: new Date("2024-05-19"),
    startTime: "07:00",
    endTime: "10:00",
    location: "Forest Trail Network",
    category: "GROUP_RIDE",
    price: 0.00,
    imageUrl: "https://images.unsplash.com/photo-1571188654248-7a89213915f7",
    description: "Join our weekly group ride through scenic forest trails. All skill levels welcome! We'll have separate groups for beginners, intermediate, and advanced riders.",
    capacity: 50,
    registrationEndDate: new Date("2024-05-18"),
    availableTickets: 50,
    attendeeCount: 0,
    featured: false,
    organizer: {
      name: "Local Trail Riders",
      description: "Community-driven mountain biking group",
      imageUrl: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0"
    },
    schedule: [
      {
        time: "07:00",
        title: "Meet & Greet",
        description: "Group assembly and route briefing"
      },
      {
        time: "07:15",
        title: "Group Division",
        description: "Split into skill-level groups"
      },
      {
        time: "07:30",
        title: "Trail Ride",
        description: "Group ride through forest trails"
      },
      {
        time: "09:30",
        title: "Social Gathering",
        description: "Coffee and snacks at the trailhead"
      }
    ],
    venue: {
      name: "Forest Trail Network",
      address: "456 Forest Path, Seattle, WA 98101",
      mapImageUrl: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f"
    }
  },
  {
    title: "Enduro Series Final 2024",
    date: new Date("2024-09-20"),
    startTime: "08:00",
    endTime: "18:00",
    location: "Moab Desert",
    category: "CHAMPIONSHIP",
    price: 120.00,
    imageUrl: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5",
    description: "The final round of the 2024 Enduro Series. Race through the iconic red rock trails of Moab in this challenging multi-stage event.",
    capacity: 150,
    registrationEndDate: new Date("2024-09-10"),
    availableTickets: 150,
    attendeeCount: 0,
    featured: true,
    organizer: {
      name: "Enduro Racing Association",
      description: "Premier organization for enduro mountain biking events",
      imageUrl: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f"
    },
    schedule: [
      {
        time: "08:00",
        title: "Rider Check-in",
        description: "Registration and equipment check"
      },
      {
        time: "09:30",
        title: "Stage 1",
        description: "Porcupine Rim Trail"
      },
      {
        time: "11:30",
        title: "Stage 2",
        description: "Slickrock Trail"
      },
      {
        time: "14:00",
        title: "Stage 3",
        description: "Captain Ahab Trail"
      }
    ],
    venue: {
      name: "Moab Bike Park",
      address: "1234 Red Rock Road, Moab, UT 84532",
      mapImageUrl: "https://images.unsplash.com/photo-1582540730843-e2d81fc82be2"
    }
  },
  {
    title: "Advanced Trail Building Workshop",
    date: new Date("2024-07-05"),
    startTime: "09:00",
    endTime: "16:00",
    location: "Bentonville Trails",
    category: "WORKSHOP",
    price: 85.00,
    imageUrl: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0",
    description: "Learn advanced trail building techniques from professional trail builders. Topics include sustainable trail design, machine operation, and maintenance.",
    capacity: 25,
    registrationEndDate: new Date("2024-06-30"),
    availableTickets: 25,
    attendeeCount: 0,
    featured: false,
    organizer: {
      name: "Trail Building Institute",
      description: "Professional trail building education and certification",
      imageUrl: "https://images.unsplash.com/photo-1571188654248-7a89213915f7"
    },
    schedule: [
      {
        time: "09:00",
        title: "Trail Design Theory",
        description: "Principles of sustainable trail design"
      },
      {
        time: "11:00",
        title: "Machine Operation",
        description: "Hands-on mini excavator training"
      },
      {
        time: "13:00",
        title: "Trail Building Practice",
        description: "Building a new trail section"
      },
      {
        time: "15:00",
        title: "Maintenance Techniques",
        description: "Trail maintenance and repair methods"
      }
    ],
    venue: {
      name: "Bentonville Trail Center",
      address: "567 Trail Building Way, Bentonville, AR 72712",
      mapImageUrl: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5"
    }
  },
  {
    title: "Women's MTB Skills Clinic",
    date: new Date("2024-06-15"),
    startTime: "10:00",
    endTime: "15:00",
    location: "Sedona Trails",
    category: "WORKSHOP",
    price: 65.00,
    imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
    description: "A women-only mountain biking clinic focused on building confidence and advanced riding skills in a supportive environment.",
    capacity: 20,
    registrationEndDate: new Date("2024-06-10"),
    availableTickets: 20,
    attendeeCount: 0,
    featured: true,
    organizer: {
      name: "Women's MTB Collective",
      description: "Empowering women in mountain biking",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    },
    schedule: [
      {
        time: "10:00",
        title: "Welcome & Introductions",
        description: "Meet your instructors and fellow riders"
      },
      {
        time: "11:00",
        title: "Skills Assessment",
        description: "Individual skill evaluation"
      },
      {
        time: "12:30",
        title: "Group Training",
        description: "Technical skills practice"
      },
      {
        time: "14:00",
        title: "Trail Practice",
        description: "Apply skills on the trail"
      }
    ],
    venue: {
      name: "Sedona Mountain Bike Academy",
      address: "890 Red Rock Drive, Sedona, AZ 86336",
      mapImageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    }
  },
  {
    title: "Night Ride Series - Full Moon Edition",
    date: new Date("2024-08-19"),
    startTime: "20:00",
    endTime: "23:00",
    location: "Pisgah National Forest",
    category: "GROUP_RIDE",
    price: 15.00,
    imageUrl: "https://images.unsplash.com/photo-1571188654248-7a89213915f7",
    description: "Experience the thrill of night riding under a full moon! Join us for a guided night ride through the Pisgah trails with proper lighting provided.",
    capacity: 40,
    registrationEndDate: new Date("2024-08-18"),
    availableTickets: 40,
    attendeeCount: 0,
    featured: false,
    organizer: {
      name: "Pisgah Night Riders",
      description: "Specialized night riding group",
      imageUrl: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0"
    },
    schedule: [
      {
        time: "20:00",
        title: "Light Check",
        description: "Equipment inspection and safety briefing"
      },
      {
        time: "20:30",
        title: "Group Formation",
        description: "Split into pace groups"
      },
      {
        time: "21:00",
        title: "Night Trail Ride",
        description: "Guided ride through moonlit trails"
      },
      {
        time: "22:30",
        title: "Post-Ride Gathering",
        description: "Refreshments and social time"
      }
    ],
    venue: {
      name: "Pisgah Ranger Station",
      address: "1600 Pisgah Forest Highway, Brevard, NC 28712",
      mapImageUrl: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f"
    }
  },
  {
    title: "Downhill Racing Championship",
    date: new Date("2024-09-05"),
    startTime: "08:00",
    endTime: "17:00",
    location: "Mammoth Mountain",
    category: "CHAMPIONSHIP",
    price: 150.00,
    imageUrl: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5",
    description: "The ultimate downhill racing event featuring the world's fastest riders competing on Mammoth's legendary terrain.",
    capacity: 300,
    registrationEndDate: new Date("2024-08-25"),
    availableTickets: 300,
    attendeeCount: 0,
    featured: true,
    organizer: {
      name: "Downhill Racing Federation",
      description: "Professional downhill racing organization",
      imageUrl: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f"
    },
    schedule: [
      {
        time: "08:00",
        title: "Practice Runs",
        description: "Course familiarization"
      },
      {
        time: "11:00",
        title: "Qualifying",
        description: "Timed qualifying runs"
      },
      {
        time: "14:00",
        title: "Finals",
        description: "Championship runs"
      },
      {
        time: "16:00",
        title: "Awards",
        description: "Podium ceremony"
      }
    ],
    venue: {
      name: "Mammoth Mountain Bike Park",
      address: "10001 Minaret Road, Mammoth Lakes, CA 93546",
      mapImageUrl: "https://images.unsplash.com/photo-1582540730843-e2d81fc82be2"
    }
  },
  {
    title: "Kids MTB Camp",
    date: new Date("2024-07-22"),
    startTime: "09:00",
    endTime: "15:00",
    location: "Park City",
    category: "WORKSHOP",
    price: 95.00,
    imageUrl: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0",
    description: "A week-long mountain biking camp for kids aged 8-14. Learn riding skills, trail etiquette, and bike maintenance in a fun, safe environment.",
    capacity: 30,
    registrationEndDate: new Date("2024-07-15"),
    availableTickets: 30,
    attendeeCount: 0,
    featured: false,
    organizer: {
      name: "Kids on Bikes",
      description: "Youth mountain biking education",
      imageUrl: "https://images.unsplash.com/photo-1571188654248-7a89213915f7"
    },
    schedule: [
      {
        time: "09:00",
        title: "Morning Skills",
        description: "Basic riding techniques"
      },
      {
        time: "10:30",
        title: "Trail Practice",
        description: "Guided trail riding"
      },
      {
        time: "12:00",
        title: "Lunch & Games",
        description: "Break and fun activities"
      },
      {
        time: "13:30",
        title: "Bike Maintenance",
        description: "Basic bike care workshop"
      }
    ],
    venue: {
      name: "Park City Youth Center",
      address: "1234 Main Street, Park City, UT 84060",
      mapImageUrl: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5"
    }
  },
  {
    title: "Mountain Bike Film Festival",
    date: new Date("2024-08-25"),
    startTime: "18:00",
    endTime: "23:00",
    location: "Boulder Theater",
    category: "FESTIVAL",
    price: 35.00,
    imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
    description: "Celebrate mountain biking culture with the best films from around the world. Featuring premieres, filmmaker Q&As, and after-party.",
    capacity: 400,
    registrationEndDate: new Date("2024-08-24"),
    availableTickets: 400,
    attendeeCount: 0,
    featured: true,
    organizer: {
      name: "MTB Film Collective",
      description: "Mountain biking film festival organization",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    },
    schedule: [
      {
        time: "18:00",
        title: "Doors Open",
        description: "Vendor booths and social hour"
      },
      {
        time: "19:00",
        title: "Film Screening",
        description: "Feature films and shorts"
      },
      {
        time: "21:30",
        title: "Q&A Session",
        description: "Meet the filmmakers"
      },
      {
        time: "22:00",
        title: "After Party",
        description: "Social gathering with refreshments"
      }
    ],
    venue: {
      name: "Boulder Theater",
      address: "2032 14th Street, Boulder, CO 80302",
      mapImageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    }
  },
  {
    title: "Trail Maintenance Day",
    date: new Date("2024-06-08"),
    startTime: "08:00",
    endTime: "14:00",
    location: "Tahoe National Forest",
    category: "GROUP_RIDE",
    price: 0.00,
    imageUrl: "https://images.unsplash.com/photo-1571188654248-7a89213915f7",
    description: "Join us for a day of trail maintenance and improvement. Help keep our trails in great condition while learning proper maintenance techniques.",
    capacity: 50,
    registrationEndDate: new Date("2024-06-07"),
    availableTickets: 50,
    attendeeCount: 0,
    featured: false,
    organizer: {
      name: "Tahoe Trail Keepers",
      description: "Trail maintenance and advocacy group",
      imageUrl: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0"
    },
    schedule: [
      {
        time: "08:00",
        title: "Safety Briefing",
        description: "Tool safety and work assignments"
      },
      {
        time: "09:00",
        title: "Trail Work",
        description: "Maintenance and improvements"
      },
      {
        time: "12:00",
        title: "Lunch Break",
        description: "Provided lunch and refreshments"
      },
      {
        time: "13:00",
        title: "Continued Work",
        description: "Complete maintenance tasks"
      }
    ],
    venue: {
      name: "Tahoe National Forest",
      address: "631 Coyote Street, Nevada City, CA 95959",
      mapImageUrl: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f"
    }
  },
  {
    title: "Mountain Bike Photography Workshop",
    date: new Date("2024-07-10"),
    startTime: "09:00",
    endTime: "16:00",
    location: "Moab Desert",
    category: "WORKSHOP",
    price: 120.00,
    imageUrl: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0",
    description: "Learn how to capture stunning mountain biking action shots. Professional photographers will teach you techniques for both action and landscape photography.",
    capacity: 20,
    registrationEndDate: new Date("2024-07-05"),
    availableTickets: 20,
    attendeeCount: 0,
    featured: false,
    organizer: {
      name: "MTB Photo Academy",
      description: "Professional mountain biking photography education",
      imageUrl: "https://images.unsplash.com/photo-1571188654248-7a89213915f7"
    },
    schedule: [
      {
        time: "09:00",
        title: "Camera Basics",
        description: "Equipment and settings overview"
      },
      {
        time: "11:00",
        title: "Action Photography",
        description: "Capturing movement and action"
      },
      {
        time: "13:00",
        title: "Location Scouting",
        description: "Finding the perfect spots"
      },
      {
        time: "14:30",
        title: "Practical Session",
        description: "Hands-on photography practice"
      }
    ],
    venue: {
      name: "Moab Photo Center",
      address: "567 Red Rock Road, Moab, UT 84532",
      mapImageUrl: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5"
    }
  },
  {
    title: "Mountain Bike Expo 2024",
    date: new Date("2024-10-15"),
    startTime: "10:00",
    endTime: "18:00",
    location: "Salt Lake City",
    category: "FESTIVAL",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
    description: "The largest mountain biking expo in the region. Featuring new product launches, demos, workshops, and industry experts.",
    capacity: 1000,
    registrationEndDate: new Date("2024-10-14"),
    availableTickets: 1000,
    attendeeCount: 0,
    featured: true,
    organizer: {
      name: "MTB Industry Association",
      description: "Mountain biking industry trade organization",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    },
    schedule: [
      {
        time: "10:00",
        title: "Expo Opening",
        description: "Vendor booths and product displays"
      },
      {
        time: "12:00",
        title: "Product Demos",
        description: "Latest bike and gear demonstrations"
      },
      {
        time: "14:00",
        title: "Industry Panel",
        description: "Future of mountain biking discussion"
      },
      {
        time: "16:00",
        title: "Networking Reception",
        description: "Industry networking event"
      }
    ],
    venue: {
      name: "Salt Palace Convention Center",
      address: "100 South West Temple, Salt Lake City, UT 84101",
      mapImageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    }
  },
  {
    title: "STATERA Bikes Festival 2025",
    date: new Date("2025-04-12"),
    startTime: "09:00",
    endTime: "01:00",
    location: "STATERA Bikes, Gengenbach",
    category: "FESTIVAL",
    price: 0.00,
    imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
    description: "Der Saisonstart wird wild! Testbikes, Touren & Party! Alle renommierten Hersteller sind mit ihren neuesten Testbikes vor Ort – die kostenlos auf Herz und Nieren getestet werden können. Freu dich auf guided Touren durch die schöne Natur des Schwarzwaldes, bei denen auch Einsteiger*innen und Profi-Biker*innen auf ihre Kosten kommen. Neben den Trails erwarten euch zahlreiche Stände, Specials wie der Airbag, eine spektakuläre Trial Show und ein Kinderparcours. Für den Hunger zwischendurch sorgt regionales Catering, und zum krönenden Abschluss feiern wir mit DJ Slona (No Mango) im Festzelt!",
    capacity: 1000,
    registrationEndDate: new Date("2025-04-11"),
    availableTickets: 1000,
    attendeeCount: 0,
    featured: true,
    organizer: {
      name: "STATERA Bikes",
      description: "Bikeshop aus dem Schwarzwald",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    },
    schedule: [
      {
        time: "09:00",
        title: "Shop & Stände Opening",
        description: "Opening of vendor booths and shop"
      },
      {
        time: "09:45",
        title: "E-MTB Guided Tour",
        description: "First guided E-MTB tour"
      },
      {
        time: "10:00",
        title: "Rennrad Guided Tour",
        description: "First guided road bike tour"
      },
      {
        time: "10:15",
        title: "Light E-MTB Tour",
        description: "First guided light E-MTB tour"
      },
      {
        time: "10:30",
        title: "Santa Cruz MTB Tour",
        description: "First guided MTB tour with Jasper Jauch"
      },
      {
        time: "10:45",
        title: "Gravel Tour",
        description: "First guided gravel tour"
      },
      {
        time: "15:30",
        title: "Santa Cruz MTB Tour",
        description: "Second guided MTB tour with Jasper Jauch"
      },
      {
        time: "15:45",
        title: "Gravel Tour",
        description: "Second guided gravel tour"
      },
      {
        time: "16:00",
        title: "Rennrad Tour",
        description: "Second guided road bike tour"
      },
      {
        time: "16:15",
        title: "Light E-MTB Tour",
        description: "Second guided light E-MTB tour"
      },
      {
        time: "16:30",
        title: "E-MTB Tour",
        description: "Second guided E-MTB tour"
      },
      {
        time: "19:00",
        title: "Party Start",
        description: "DJ Slona (No Mango) im Festzelt"
      }
    ],
    venue: {
      name: "STATERA Bikes",
      address: "Eugen-Klaussner-Strasse 18, 77723 Gengenbach, Deutschland",
      mapImageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    },
    features: [
      "Kostenlose Testbikes von Santa Cruz, Cervélo, Mondraker, BMC, Focus, Kalkhoff, Desiknio, Haibike, Ghost, Lapierre",
      "Expo Area mit Fox, Northwave, Pinion, Paul Lange, Smith, Sram, STATERA Wear",
      "Special Guest: Santa Cruz Ambassador Jasper Jauch",
      "Airbag, Trialshow, Hüpfburg, Kinderparcours, Maunal Contest, Bunnyhop Stange, Tischkicker, Bierpong",
      "Festival SALE & gratis Grill beim Kauf eines Kalkhoff Modells",
      "Gratis Fahrradträger beim Kauf von zwei Kalkhoff Modellen",
      "Regionales Catering mit Kaffee & Snacks, Bier & Drinks, BBQ, Burger, Cocktails, Eis"
    ],
    requirements: [
      "Helmpflicht beim Testen der Bikes und bei den geführten Touren",
      "Eigener Helm, Pedale (falls Klickpedale) und Protektoren mitbringen",
      "Personalausweis als Pfand für Testbikes",
      "Haftungsausschluss unterschreiben",
      "Für unter 18-jährige: Erlaubnis der Eltern erforderlich"
    ]
  }
];
