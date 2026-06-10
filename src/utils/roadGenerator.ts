import { Road, Complaint, RoadType, ExpenseItem, TicketStatus, IssueCategory } from '../types';

// Standard template for itemized expenses to keep it consistent and realistic
const EXPENSE_TEMPLATES: Record<RoadType, Omit<ExpenseItem, 'id'>[]> = {
  NH: [
    {
      category: 'Bituminous Concrete Laying',
      amount: 45000000,
      percentage: 55,
      proofName: 'NHAI-ASPHALT-CONCRETE-BILL.pdf',
      description: 'Laying of 50mm thick Bituminous Concrete grading-1 with hot mix asphalt plants.'
    },
    {
      category: 'Reinforced Safety Barriers',
      amount: 20000000,
      percentage: 25,
      proofName: 'BARRIER-TEST-CERT-2026.pdf',
      description: 'Installing thrie-beam crash barriers and concrete jersey boundaries on curves.'
    },
    {
      category: 'Drainage Culverts & Channels',
      amount: 11000000,
      percentage: 14,
      proofName: 'CULVERT-DRAINAGE-AUDIT.pdf',
      description: 'Construction of reinforced concrete chambers to prevent cross-lane pooling.'
    },
    {
      category: 'Reflective Signage & Markings',
      amount: 5000000,
      percentage: 6,
      proofName: 'THERMO-MARKING-RECEIPT.pdf',
      description: 'Hot-applied thermoplastic lane marking paint with retroreflective glass beads.'
    }
  ],
  SH: [
    {
      category: 'Sub-grade Soil Stabilization',
      amount: 22000000,
      percentage: 27,
      proofName: 'SH-SOIL-COMPACTION-V1.pdf',
      description: 'Chemical lime treatment of high-plasticity clay subgrades to reinforce longevity.'
    },
    {
      category: 'Bituminous Carpet Relaying',
      amount: 41000000,
      percentage: 51,
      proofName: 'SH-RELAY-CONTRACT-APPROVED.pdf',
      description: 'Standard relaying of dense bituminous macadam with modern asphalt pavers.'
    },
    {
      category: 'Culverts and Road Crossing Pipes',
      amount: 11000000,
      percentage: 14,
      proofName: 'CULVERT-STONE-MASONRY.pdf',
      description: 'Replacing aging metal pipes with precast concrete pipe culverts.'
    },
    {
      category: 'Road Studs & Reflectiveness',
      amount: 6000000,
      percentage: 8,
      proofName: 'REFLECTIVE-MARKERS-SH.pdf',
      description: 'Installation of high-quality solar-activated blinking cat eyes.'
    }
  ],
  Local: [
    {
      category: 'Pothole Scraping & Patching',
      amount: 4500000,
      percentage: 30,
      proofName: 'LOCAL-PATCH-BATCH-BILL.pdf',
      description: 'High-speed clean scraping, tack coat spraying, and cold mix asphalt filling.'
    },
    {
      category: 'Concrete Storm Drain Restoration',
      amount: 7500000,
      percentage: 50,
      proofName: 'DRAIN-BRICK-MASONRY.pdf',
      description: 'Fixing ruptured structural masonry of pedestrian gutter paths.'
    },
    {
      category: 'Speed Breakers & Speed Indicators',
      amount: 3000000,
      percentage: 20,
      proofName: 'CALMING-SIGNS-LOCAL.pdf',
      description: 'Molding rubberised speed-calming bumps and retroreflective warning posts.'
    }
  ]
};

// Standard template for citizen tickets to match the generated roads
interface ComplaintTemplate {
  subject: string;
  description: string;
  category: IssueCategory;
  authority: string;
  citizenName: string;
}

const TICKET_TEMPLATES: Record<string, ComplaintTemplate> = {
  pothole: {
    subject: 'Dangerous Potholes on Intersection Curve',
    description: 'There are multiple deep and sharp-edged potholes that are extremely perilous for two-wheelers, especially during sunset hours due to poor visibility.',
    category: 'Pothole',
    authority: 'Municipal Corporation (Road Maintenance Department)',
    citizenName: 'Arjun Mehta'
  },
  waterlogging: {
    subject: 'Pedestrian Crossing Gutter Flood After Shorter Rainfall',
    description: 'The pedestrian storm drains are fully blocked by sand and civil bags. Water pools up to several inches, forcing people to walk dangerously on active vehicular lanes.',
    category: 'Waterlogging',
    authority: 'Municipal Corporation (Urban Drainage)',
    citizenName: 'Sophia Sen'
  },
  damaged: {
    subject: 'Severely Damaged Crash Rails on the Bypass Bend',
    description: 'A recent heavy transport truck scrap collision left a 15-meter length of structural steel crash barrier shredded and hanging. High risk of off-highway roll-overs.',
    category: 'Damaged Road',
    authority: 'National Highways Authority of India (NHAI)',
    citizenName: 'Ramesh Gowda'
  },
  lights: {
    subject: 'Continuous Stretch of Broken/Non-Functional Streetlights',
    description: 'Over 6 consecutive street poles are entirely dark between evening commute hours. Highly unsafe zone for pedestrians and cyclists returning late.',
    category: 'Broken Street Lights',
    authority: 'Public Works Department (PWD-Electrical Division)',
    citizenName: 'Priya Nair'
  },
  signage: {
    subject: 'Complete Absence of Intersection and Curve Warning Signage',
    description: 'There are no signs indicating the sudden sharp left-turn ahead or speed limits. Vehicles regularly misjudge the turn, screeching their brakes.',
    category: 'Lack of Signage',
    authority: 'State Highways Traffic Division',
    citizenName: 'Kiran Gowda'
  }
};

/**
 * Dynamically generates 6 highly realistic intersecting roads and associated synchronized tickets
 * centered around a user's location.
 */
export function generateLocationBasedData(lat: number, lng: number, placeName: string = 'Bengaluru'): { roads: Road[], tickets: Complaint[] } {
  const cleanPlace = placeName.trim() || 'Bengaluru';
  
  // Roads model parameters
  const templates = [
    {
      id: 'road-1',
      name: `National Highway 44 (NH-44 Bypass, ${cleanPlace} Segment)`,
      type: 'NH' as RoadType,
      location: `${cleanPlace} Bypass Corridor`,
      contractor: 'KNR Constructions Ltd.',
      budgetAllocated: 125000000, // 12.5 Cr
      budgetSpent: 118000000,
      authority: 'National Highways Authority of India (NHAI)',
      lastRepairDate: '2025-08-14',
      condition: 'Excellent' as const,
      lengthKm: 14.2,
      lanes: 6,
      relativePoints: [
        { dLat: -0.015, dLng: -0.04 },
        { dLat: -0.012, dLng: -0.02 },
        { dLat: -0.015, dLng: 0.0 },
        { dLat: -0.016, dLng: 0.02 },
        { dLat: -0.015, dLng: 0.04 }
      ],
      centerOffset: { dLat: -0.015, dLng: 0.0 }
    },
    {
      id: 'road-2',
      name: `State Highway 12 (SH-12 Main, ${cleanPlace} Link)`,
      type: 'SH' as RoadType,
      location: `${cleanPlace} Southern District Belt`,
      contractor: 'Apex Infrastructure Group',
      budgetAllocated: 82000000, // 8.2 Cr
      budgetSpent: 79500000,
      authority: 'State Public Works Department (PWD)',
      lastRepairDate: '2024-04-18',
      condition: 'Fair' as const,
      lengthKm: 12.4,
      lanes: 4,
      relativePoints: [
        { dLat: -0.03, dLng: -0.015 },
        { dLat: -0.01, dLng: -0.013 },
        { dLat: 0.01, dLng: -0.016 },
        { dLat: 0.03, dLng: -0.015 }
      ],
      centerOffset: { dLat: 0.0, dLng: -0.015 }
    },
    {
      id: 'road-3',
      name: `${cleanPlace} Outer Ring Road (ORR Segment)`,
      type: 'SH' as RoadType,
      location: `${cleanPlace} East Technology Hub`,
      contractor: 'Navdeep Buildcon Pvt. Ltd.',
      budgetAllocated: 54000000, // 5.4 Cr
      budgetSpent: 51000000,
      authority: 'Public Works Department (PWD)',
      lastRepairDate: '2025-11-05',
      condition: 'Excellent' as const,
      lengthKm: 8.5,
      lanes: 4,
      relativePoints: [
        { dLat: -0.025, dLng: 0.01 },
        { dLat: -0.015, dLng: 0.022 },
        { dLat: 0.0, dLng: 0.025 },
        { dLat: 0.015, dLng: 0.022 },
        { dLat: 0.025, dLng: 0.01 }
      ],
      centerOffset: { dLat: 0.0, dLng: 0.02 }
    },
    {
      id: 'road-4',
      name: `M.G. Road (Central Market Road, ${cleanPlace})`,
      type: 'Local' as RoadType,
      location: `${cleanPlace} Central Market Zone`,
      contractor: 'Venkata Raman & Sons',
      budgetAllocated: 24000000, // 2.4 Cr
      budgetSpent: 21500000,
      authority: `${cleanPlace} Municipal Corporation`,
      lastRepairDate: '2026-01-20',
      condition: 'Good' as const,
      lengthKm: 3.8,
      lanes: 2,
      relativePoints: [
        { dLat: 0.002, dLng: -0.01 },
        { dLat: 0.004, dLng: -0.005 },
        { dLat: 0.005, dLng: 0.005 },
        { dLat: 0.006, dLng: 0.015 }
      ],
      centerOffset: { dLat: 0.005, dLng: 0.005 }
    },
    {
      id: 'road-5',
      name: `Kasturba Marg (${cleanPlace} Town Center)`,
      type: 'Local' as RoadType,
      location: `${cleanPlace} Civil Line District`,
      contractor: 'Megha Engineering Co.',
      budgetAllocated: 18000000, // 1.8 Cr
      budgetSpent: 17200000,
      authority: `${cleanPlace} Municipal Corporation`,
      lastRepairDate: '2025-05-10',
      condition: 'Poor' as const,
      lengthKm: 2.1,
      lanes: 2,
      relativePoints: [
        { dLat: -0.008, dLng: -0.002 },
        { dLat: -0.002, dLng: -0.002 },
        { dLat: 0.004, dLng: -0.002 }
      ],
      centerOffset: { dLat: -0.002, dLng: -0.002 }
    },
    {
      id: 'road-6',
      name: `Railway Station road (${cleanPlace} Junction)`,
      type: 'Local' as RoadType,
      location: `${cleanPlace} Transit Hub`,
      contractor: 'Pragati Infra Projects',
      budgetAllocated: 12000000, // 1.2 Cr
      budgetSpent: 9800000,
      authority: `${cleanPlace} Municipal Corporation`,
      lastRepairDate: '2024-09-12',
      condition: 'Good' as const,
      lengthKm: 1.5,
      lanes: 2,
      relativePoints: [
        { dLat: -0.005, dLng: 0.002 },
        { dLat: -0.005, dLng: 0.01 },
        { dLat: -0.005, dLng: 0.018 }
      ],
      centerOffset: { dLat: -0.005, dLng: 0.01 }
    }
  ];

  const generatedRoads: Road[] = [];
  const generatedTickets: Complaint[] = [];

  // Map coordinate offset limits (Bangalore 12.9716, 77.5946 - or current user location)
  templates.forEach((templ) => {
    const rawGmpCoords = templ.relativePoints.map(p => ({
      lat: Number((lat + p.dLat).toFixed(6)),
      lng: Number((lng + p.dLng).toFixed(6))
    }));

    const rawGmpCenter = {
      lat: Number((lat + templ.centerOffset.dLat).toFixed(6)),
      lng: Number((lng + templ.centerOffset.dLng).toFixed(6))
    };

    // Form itemized expenses based on template
    const formattedExpenses: ExpenseItem[] = EXPENSE_TEMPLATES[templ.type].map((exp, expIdx) => ({
      id: `exp-${templ.id}-${expIdx + 1}`,
      category: exp.category,
      amount: exp.amount,
      percentage: exp.percentage,
      proofName: exp.proofName,
      description: exp.description
    }));

    const roadObj: Road = {
      id: templ.id,
      name: templ.name,
      type: templ.type,
      location: templ.location,
      contractor: templ.contractor,
      budgetAllocated: templ.budgetAllocated,
      budgetSpent: templ.budgetSpent,
      authority: templ.authority,
      lastRepairDate: templ.lastRepairDate,
      condition: templ.condition,
      lengthKm: templ.lengthKm,
      lanes: templ.lanes,
      expenses: formattedExpenses,
      issues: [],
      coordinates: templ.relativePoints.map((p, pIdx) => ({
        x: Math.round(50 + p.dLng * 1000),
        y: Math.round(50 + p.dLat * 1000)
      })),
      gmpCoordinates: rawGmpCoords,
      gmpCenter: rawGmpCenter
    };

    generatedRoads.push(roadObj);
  });

  // Now, place tickets precisely on those roads
  const ticketsTemplatesMap = [
    {
      id: 'comp-101',
      roadId: 'road-4',
      templ: TICKET_TEMPLATES.pothole,
      coordIndex: 1, // index on road-4 gmpCoordinates
      status: 'In Progress' as TicketStatus,
      likes: 24,
      date: '2026-05-20'
    },
    {
      id: 'comp-102',
      roadId: 'road-5',
      templ: TICKET_TEMPLATES.waterlogging,
      coordIndex: 1, // index on road-5
      status: 'Pending' as TicketStatus,
      likes: 18,
      date: '2026-05-25'
    },
    {
      id: 'comp-103',
      roadId: 'road-1',
      templ: TICKET_TEMPLATES.damaged,
      coordIndex: 1, // index on road-1
      status: 'Resolved' as TicketStatus,
      likes: 7,
      date: '2026-05-10'
    },
    {
      id: 'comp-104',
      roadId: 'road-3',
      templ: TICKET_TEMPLATES.lights,
      coordIndex: 3, // index on road-3
      status: 'In Progress' as TicketStatus,
      likes: 31,
      date: '2026-05-18'
    },
    {
      id: 'comp-105',
      roadId: 'road-6',
      templ: TICKET_TEMPLATES.signage,
      coordIndex: 1, // index on road-6
      status: 'Under Review' as TicketStatus,
      likes: 12,
      date: '2026-05-26'
    }
  ];

  ticketsTemplatesMap.forEach((t) => {
    const parentRoad = generatedRoads.find(r => r.id === t.roadId);
    if (parentRoad && parentRoad.gmpCoordinates) {
      const gmpCoordinate = parentRoad.gmpCoordinates[t.coordIndex] || parentRoad.gmpCenter!;
      
      const complaintObj: Complaint = {
        id: t.id,
        roadId: t.roadId,
        roadName: parentRoad.name,
        subject: t.templ.subject,
        description: t.templ.description,
        category: t.templ.category,
        authority: t.templ.authority,
        status: t.status,
        date: t.date,
        citizenName: t.templ.citizenName,
        referenceId: `RW-2026-${String(Math.floor(100 + Math.random() * 900))}`,
        likes: t.likes,
        gmpCoordinate
      };

      generatedTickets.push(complaintObj);
      parentRoad.issues.push(complaintObj);
    }
  });

  return { roads: generatedRoads, tickets: generatedTickets };
}

export const FALLBACK_CITIES: Record<string, { lat: number; lng: number; name: string }> = {
  'vijayawada': { lat: 16.5062, lng: 80.6480, name: 'Vijayawada' },
  'bengaluru': { lat: 12.9716, lng: 77.5946, name: 'Bengaluru' },
  'bangalore': { lat: 12.9716, lng: 77.5946, name: 'Bengaluru' },
  'hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad' },
  'delhi': { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
  'new delhi': { lat: 28.6139, lng: 77.2090, name: 'New Delhi' },
  'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
  'chennai': { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
  'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
  'visakhapatnam': { lat: 17.6868, lng: 83.2185, name: 'Visakhapatnam' },
  'vizag': { lat: 17.6868, lng: 83.2185, name: 'Visakhapatnam' },
  'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune' },
  'ahmedabad': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad' },
  'guntur': { lat: 16.3067, lng: 80.4365, name: 'Guntur' },
  'nellore': { lat: 14.4426, lng: 79.9865, name: 'Nellore' },
  'tirupati': { lat: 13.6288, lng: 79.4192, name: 'Tirupati' }
};

export function getFallbackCoordsAndName(query: string): { lat: number; lng: number; name: string } {
  const norm = query.toLowerCase().trim();
  for (const [key, value] of Object.entries(FALLBACK_CITIES)) {
    if (norm === key || norm.includes(key) || key.includes(norm)) {
      return value;
    }
  }

  // Try to find matching words
  const words = norm.split(/[\s,]+/);
  for (const word of words) {
    if (word.length > 3) {
      for (const [key, value] of Object.entries(FALLBACK_CITIES)) {
        if (key.includes(word) || word.includes(key)) {
          return value;
        }
      }
    }
  }

  // General deterministic fallback hash within safe India coordinates
  let hash = 0;
  for (let i = 0; i < query.length; i++) {
    hash = query.charCodeAt(i) + ((hash << 5) - hash);
  }
  const lat = 15.0 + Math.abs((hash % 110) / 10); // 15.0 to 26.0
  const lng = 75.0 + Math.abs(((hash >> 8) % 90) / 10); // 75.0 to 84.0
  
  const formattedName = query
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  return {
    lat: Number(lat.toFixed(4)),
    lng: Number(lng.toFixed(4)),
    name: formattedName || 'Custom District'
  };
}
