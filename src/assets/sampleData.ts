// Mock API responses for different event endpoints

export const mockPastEvents = {
  message: "Past events fetched successfully",
  data: [
    {
      id: 101,
      name: "Hackathon 2025",
      about: "A 36-hour coding marathon where students collaborated to build innovative solutions for healthcare challenges. Sponsored by Microsoft and Google.",
      date: "2025-05-10",
      venue: "Engineering Block, 3rd Floor",
      event_type: "Technical",
      event_category: "Team",
      min_no_member: 3,
      max_no_member: 5,
      club_name: "Developer Student Club",
      status: "past"
    },
    {
      id: 102,
      name: "Rhythm Night",
      about: "Annual music competition showcasing talent across various genres including classical, rock, pop, and fusion performances.",
      date: "2025-05-05",
      venue: "College Amphitheater",
      event_type: "Cultural",
      event_category: "Solo",
      min_no_member: 1,
      max_no_member: 1,
      club_name: "Music Society",
      status: "past"
    },
    {
      id: 103,
      name: "Research Symposium",
      about: "Platform for students to present their research papers and innovations to faculty and industry experts.",
      date: "2025-04-28",
      venue: "Central Conference Hall",
      event_type: "Academic",
      event_category: "Team",
      min_no_member: 1,
      max_no_member: 3,
      club_name: "Research Club",
      status: "past"
    },
    {
      id: 104,
      name: "Inter-Department Cricket Tournament",
      about: "Annual cricket tournament between different departments of the college.",
      date: "2025-04-15",
      venue: "College Sports Ground",
      event_type: "Sports",
      event_category: "Team",
      min_no_member: 11,
      max_no_member: 15,
      club_name: "Sports Committee",
      status: "past"
    },
    {
      id: 105,
      name: "UI/UX Workshop",
      about: "Hands-on workshop on modern user interface design principles and user experience best practices.",
      date: "2025-04-02",
      venue: "Design Studio",
      event_type: "Technical",
      event_category: "Solo",
      min_no_member: 1,
      max_no_member: 1,
      club_name: "Design Club",
      status: "past"
    }
  ]
};

export const mockOngoingEvents = {
  message: "Ongoing events fetched successfully",
  data: [
    {
      id: 201,
      name: "Tech Fest 2025",
      about: "Annual technology festival featuring competitions, workshops, and exhibitions from all engineering departments.",
      date: "2025-06-13",
      venue: "College Campus",
      event_type: "Technical",
      event_category: "Group",
      min_no_member: 1,
      max_no_member: 10,
      club_name: "Technical Council",
      status: "ongoing"
    },
    {
      id: 202,
      name: "Leadership Summit",
      about: "One-day conference with industry leaders sharing insights on leadership, innovation, and career growth.",
      date: "2025-06-13",
      venue: "Main Auditorium",
      event_type: "Professional",
      event_category: "Solo",
      min_no_member: 1,
      max_no_member: 1,
      club_name: "Career Development Cell",
      status: "ongoing"
    },
    {
      id: 203,
      name: "Art Exhibition",
      about: "Showcase of student artwork across various mediums including painting, sculpture, and digital art.",
      date: "2025-06-13",
      venue: "Art Gallery",
      event_type: "Cultural",
      event_category: "Solo",
      min_no_member: 1,
      max_no_member: 1,
      club_name: "Fine Arts Society",
      status: "ongoing"
    }
  ]
};

export const mockUpcomingEvents = {
  message: "Upcoming events fetched successfully",
  data: [
    {
      id: 301,
      name: "Code Carnival",
      about: "A 24-hour coding competition focusing on algorithmic problem solving and competitive programming.",
      date: "2025-06-20",
      venue: "Computer Science Building",
      event_type: "Technical",
      event_category: "Team",
      min_no_member: 2,
      max_no_member: 3,
      club_name: "Coding Club",
      status: "upcoming"
    },
    {
      id: 302,
      name: "Cultural Festival",
      about: "Week-long celebration showcasing diverse cultural performances, food stalls, and art exhibitions.",
      date: "2025-06-25",
      venue: "College Grounds",
      event_type: "Cultural",
      event_category: "Group",
      min_no_member: 5,
      max_no_member: 20,
      club_name: "Cultural Committee",
      status: "upcoming"
    },
    {
      id: 303,
      name: "Startup Pitch Competition",
      about: "Platform for student entrepreneurs to pitch their business ideas to investors and mentors.",
      date: "2025-07-05",
      venue: "Business School Auditorium",
      event_type: "Entrepreneurship",
      event_category: "Team",
      min_no_member: 1,
      max_no_member: 4,
      club_name: "E-Cell",
      status: "upcoming"
    },
    {
      id: 304,
      name: "Robotics Challenge",
      about: "Competition for designing and programming robots to complete specific tasks and challenges.",
      date: "2025-07-12",
      venue: "Robotics Lab",
      event_type: "Technical",
      event_category: "Team",
      min_no_member: 3,
      max_no_member: 5,
      club_name: "Robotics Club",
      status: "upcoming"
    },
    {
      id: 305,
      name: "Environmental Awareness Drive",
      about: "Campus-wide initiative to promote sustainability practices and environmental conservation.",
      date: "2025-07-20",
      venue: "Multiple Locations",
      event_type: "Social",
      event_category: "Group",
      min_no_member: 1,
      max_no_member: 50,
      club_name: "Environment Club",
      status: "upcoming"
    },
    {
      id: 306,
      name: "Dance Competition",
      about: "Annual dance competition featuring various styles including classical, contemporary, and street dance.",
      date: "2025-08-10",
      venue: "Open Air Theater",
      event_type: "Cultural",
      event_category: "Solo",
      min_no_member: 1,
      max_no_member: 1,
      club_name: "Dance Club",
      status: "upcoming"
    },
    {
      id: 307,
      name: "Blockchain Workshop",
      about: "Hands-on technical workshop covering blockchain fundamentals and decentralized application development.",
      date: "2025-08-15",
      venue: "Innovation Lab",
      event_type: "Technical",
      event_category: "Solo",
      min_no_member: 1,
      max_no_member: 1,
      club_name: "Blockchain Society",
      status: "upcoming"
    }
  ]
};

// Unified object for easier imports
export const mockEventData = {
  past: mockPastEvents,
  ongoing: mockOngoingEvents,
  upcoming: mockUpcomingEvents
};

// Event poster images by event ID
export const mockEventPosters = {
  // Past events
  101: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop",  // Hackathon
  102: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=500&fit=crop",  // Rhythm Night
  103: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=500&fit=crop",  // Research Symposium
  104: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop",  // Cricket Tournament
  105: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop",  // UI/UX Workshop

  // Ongoing events
  201: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop",  // Tech Fest
  202: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",  // Leadership Summit
  203: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=500&fit=crop",  // Art Exhibition

  // Upcoming events
  301: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop",  // Code Carnival
  302: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",  // Cultural Festival
  303: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=500&fit=crop",  // Startup Pitch
  304: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",  // Robotics Challenge
  305: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop",  // Environmental Drive
  306: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=500&fit=crop",  // Dance Competition
  307: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=500&fit=crop",  // Blockchain Workshop
};

/**
 * Mock function to simulate the event poster endpoint
 * @param id Event ID to fetch poster for
 * @returns Mock response object with status, content type and data
 */
export const getMockEventPoster = (id: number) => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mockEventPosters[id]) {
        resolve({
          status: 200,
          contentType: "image/jpeg",
          data: mockEventPosters[id]
        });
      } else {
        resolve({
          status: 404,
          contentType: "application/json",
          data: {
            message: "No poster available for this event"
          }
        });
      }
    }, 300); // 300ms delay to simulate network
  });
};

export default mockEventData;