export const eventsSeedData = [
  {
    title: "Mountain Bike Championship 2024",
    date: "2024-07-15",
    startTime: "09:00",
    endTime: "17:00",
    location: "Whistler Mountain",
    category: "CHAMPIONSHIP",
    price: 75.00,
    imageUrl: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5",
    description: "Join us for the most prestigious mountain biking championship of the year. Compete against top riders from around the world in various categories including downhill, cross-country, and enduro races.",
    capacity: 200,
    registrationEndDate: "2024-07-01",
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
    date: "2024-06-01",
    startTime: "10:00",
    endTime: "16:00",
    location: "Blue Mountain Trails",
    category: "WORKSHOP",
    price: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0",
    description: "Perfect for newcomers to mountain biking! Learn essential skills, safety techniques, and basic maintenance from experienced instructors.",
    capacity: 30,
    registrationEndDate: "2024-05-25",
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
    date: "2024-08-10",
    startTime: "11:00",
    endTime: "22:00",
    location: "Riverside Park",
    category: "FESTIVAL",
    price: 25.00,
    imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
    description: "A celebration of all things cycling! Join us for a day of bike demos, competitions, live music, food trucks, and family-friendly activities.",
    capacity: 500,
    registrationEndDate: "2024-08-09",
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
    date: "2024-05-19",
    startTime: "07:00",
    endTime: "10:00",
    location: "Forest Trail Network",
    category: "GROUP_RIDE",
    price: 0.00,
    imageUrl: "https://images.unsplash.com/photo-1571188654248-7a89213915f7",
    description: "Join our weekly group ride through scenic forest trails. All skill levels welcome! We'll have separate groups for beginners, intermediate, and advanced riders.",
    capacity: 50,
    registrationEndDate: "2024-05-18",
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
  }
];
