import { Road, Complaint } from '../types';

export const MOCK_TICKETS: Complaint[] = [
  {
    id: 'comp-101',
    roadId: 'road-4',
    roadName: 'M.G. Road (Central Market Segment)',
    subject: 'Large Potholes near Metro Station Exit B',
    description: 'There are three deep consecutive potholes near exit B. Two two-wheelers have nearly slipped in the dark. Requires urgent asphalt patching.',
    category: 'Pothole',
    authority: 'Municipal Corporation (City Zone)',
    status: 'In Progress',
    date: '2026-05-20',
    imageUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=400',
    citizenName: 'Arjun Mehta',
    referenceId: 'RW-2026-00481',
    likes: 24,
    gmpCoordinate: { lat: 12.9745, lng: 77.61 }
  },
  {
    id: 'comp-102',
    roadId: 'road-5',
    roadName: 'Kasturba Marg',
    subject: 'Flooding and Waterlogging during Evening Showers',
    description: 'Drains along the pedestrian stretch are completely clogged with construction debris, causing water to pool up to 6 inches, making pedestrian crossing impossible.',
    category: 'Waterlogging',
    authority: 'Municipal Corporation (Urban Drainage)',
    status: 'Pending',
    date: '2026-05-25',
    citizenName: 'Sophia Sen',
    referenceId: 'RW-2026-00512',
    likes: 18,
    gmpCoordinate: { lat: 12.974, lng: 77.595 }
  },
  {
    id: 'comp-103',
    roadId: 'road-1',
    roadName: 'National Highway 48 (NH-48 Bypass)',
    subject: 'Damaged Guard Rails at Curve Landmark Km 14',
    description: 'The metal guard rail on the left shoulder is completely crushed from a minor transport truck collision last week. High risk of off-road vehicle falls.',
    category: 'Damaged Road',
    authority: 'National Highways Authority of India (NHAI)',
    status: 'Resolved',
    date: '2026-05-10',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400',
    citizenName: 'Ramesh Gowda',
    referenceId: 'RW-2026-00329',
    likes: 7,
    gmpCoordinate: { lat: 13.085, lng: 77.50 }
  },
  {
    id: 'comp-104',
    roadId: 'road-3',
    roadName: 'Outer Ring Road (ORR) Service Lane',
    subject: 'Five consecutive street lights non-functioning',
    description: 'The stretch between the tech park entry and the main flyover is pitch black after 7 PM. Very unsafe for women walking home from evening shifts.',
    category: 'Broken Street Lights',
    authority: 'Public Works Department (PWD-Electrical)',
    status: 'In Progress',
    date: '2026-05-18',
    citizenName: 'Priya Nair',
    referenceId: 'RW-2026-00445',
    likes: 31,
    gmpCoordinate: { lat: 12.955, lng: 77.695 }
  },
  {
    id: 'comp-105',
    roadId: 'road-7',
    roadName: 'Whitefield Inner Ring Bypass',
    subject: 'Complete road surface deterioration & stone loose particles',
    description: 'Top layer of asphalt has fully eroded, leaving gravel scattered everywhere. Motorists are slipping, and dust pollution is causing breathing issues for local shops.',
    category: 'Damaged Road',
    authority: 'Municipal Corporation (East Zone Division)',
    status: 'Under Review',
    date: '2026-05-24',
    citizenName: 'Devendra Patil',
    referenceId: 'RW-2026-00499',
    likes: 15,
    gmpCoordinate: { lat: 12.960, lng: 77.735 }
  }
];

export const MOCK_ROADS: Road[] = [
  {
    id: 'road-1',
    name: 'National Highway 48 (NH-48 Bypass)',
    type: 'NH',
    location: 'North-West Peripheral Expressway Corridor',
    contractor: 'Infratech Projects Ltd.',
    budgetAllocated: 145000000, // 14.5 Crores
    budgetSpent: 122000000,
    authority: 'National Highways Authority of India (NHAI)',
    lastRepairDate: '2025-10-12',
    condition: 'Good',
    lengthKm: 18.2,
    lanes: 6,
    expenses: [
      {
        id: 'exp-1-1',
        category: 'Sub-grade & Earthwork Preparation',
        amount: 32000000,
        percentage: 26.2,
        proofName: 'NHAI-EWD-CERT-2025.pdf',
        description: 'Excavation, grading, and compacting soils for standard expressway foundational support.'
      },
      {
        id: 'exp-1-2',
        category: 'Asphalt Layering & Bituminous Concrete',
        amount: 54000000,
        percentage: 44.3,
        proofName: 'ASPHALT-BATCH-INVOICE-098.pdf',
        description: 'Multi-layer concrete application of Hot Mix Asphalt conforming to IRC:111 guidelines.'
      },
      {
        id: 'exp-1-3',
        category: 'Highway Drainage Systems',
        amount: 18000000,
        percentage: 14.8,
        proofName: 'DRAINAGE-SYSTEM-CIVIL-OK.pdf',
        description: 'Construction of concrete storm drains alongside expressway shoulders to prevent ponding.'
      },
      {
        id: 'exp-1-4',
        category: 'Safety Signage & Crash Barriers',
        amount: 12000000,
        percentage: 9.8,
        proofName: 'W-BEAM-BARRIER-BILL.pdf',
        description: 'Installation of retro-reflective signboards and heavy W-beam metal crash guards.'
      },
      {
        id: 'exp-1-5',
        category: 'Thermoplastic Lane Markings',
        amount: 6000000,
        percentage: 4.9,
        proofName: 'LINE-MARK-INVOICE-442.pdf',
        description: 'High durability retro-reflective thermoplastic yellow and white stripings.'
      }
    ],
    issues: [MOCK_TICKETS[2]],
    coordinates: [
      { x: 10, y: 15 },
      { x: 25, y: 22 },
      { x: 45, y: 28 },
      { x: 70, y: 35 },
      { x: 90, y: 40 }
    ],
    gmpCoordinates: [
      { lat: 13.05, lng: 77.45 },
      { lat: 13.07, lng: 77.49 },
      { lat: 13.09, lng: 77.52 },
      { lat: 13.12, lng: 77.55 }
    ],
    gmpCenter: { lat: 13.085, lng: 77.50 }
  },
  {
    id: 'road-2',
    name: 'State Highway 12 (SH-12 Main)',
    type: 'SH',
    location: 'Southern Arterial Corridor',
    contractor: 'Apex Infrastructure & Sons',
    budgetAllocated: 82000000, // 8.2 Crores
    budgetSpent: 79500000,
    authority: 'State Public Works Department (PWD)',
    lastRepairDate: '2024-04-18',
    condition: 'Fair',
    lengthKm: 12.4,
    lanes: 4,
    expenses: [
      {
        id: 'exp-2-1',
        category: 'Base Stabilization & Leveling',
        amount: 21500000,
        percentage: 27.0,
        proofName: 'PWD-SH12-BASE-STAB.pdf',
        description: 'Treatment of base materials with cement mixes to restore uniform load capability.'
      },
      {
        id: 'exp-2-2',
        category: 'Bituminous Carpet Relaying',
        amount: 41000000,
        percentage: 51.6,
        proofName: 'PWD_CARPET_REBILL_2024.pdf',
        description: 'Application of dense open-graded friction course asphalt for main traffic lanes.'
      },
      {
        id: 'exp-2-3',
        category: 'Culverts and Road Crossing Pipes',
        amount: 11000000,
        percentage: 13.8,
        proofName: 'PIPE-CULVERT-VOUCHERS.pdf',
        description: 'Concrete pipe culvert replacement to ease cross-flow irrigation and rainfall discharge.'
      },
      {
        id: 'exp-2-4',
        category: 'Road Studs & Reflectors (Cats Eyes)',
        amount: 6000000,
        percentage: 7.6,
        proofName: 'CATS-EYE-RECV-SH12.pdf',
        description: 'Installing plastic embedded solar-powered LEDs and glass bead retroreflective lane markers.'
      }
    ],
    issues: [],
    coordinates: [
      { x: 15, y: 80 },
      { x: 35, y: 72 },
      { x: 55, y: 64 },
      { x: 85, y: 56 }
    ],
    gmpCoordinates: [
      { lat: 12.90, lng: 77.52 },
      { lat: 12.92, lng: 77.55 },
      { lat: 12.94, lng: 77.58 },
      { lat: 12.96, lng: 77.62 }
    ],
    gmpCenter: { lat: 12.93, lng: 77.57 }
  },
  {
    id: 'road-3',
    name: 'Outer Ring Road (ORR) Service Lane',
    type: 'SH',
    location: 'Eastern Tech Corridor Zone',
    contractor: 'Navdeep Buildcon Pvt. Ltd.',
    budgetAllocated: 54000000, // 5.4 Crores
    budgetSpent: 51000000,
    authority: 'Public Works Department (PWD)',
    lastRepairDate: '2025-01-05',
    condition: 'Excellent',
    lengthKm: 8.5,
    lanes: 2,
    expenses: [
      {
        id: 'exp-3-1',
        category: 'Milling & Surface Scraping',
        amount: 9000000,
        percentage: 17.6,
        proofName: 'MILLING-SCRAP-REPORT-1.pdf',
        description: 'Scraping and recycling old cracked asphalt layers up to 40mm thickness.'
      },
      {
        id: 'exp-3-2',
        category: 'Micro-surfacing Overlays',
        amount: 28000000,
        percentage: 54.9,
        proofName: 'MICRO-SURFACE-BATCH-CO.pdf',
        description: 'Polymer modified asphalt emulsion overlay for high-tech micro-durability and noise mitigation.'
      },
      {
        id: 'exp-3-3',
        category: 'Utility Sewer Lines Relocation',
        amount: 8500000,
        percentage: 16.7,
        proofName: 'SEWER-RELOC-PWD-APPROVED.pdf',
        description: 'Relocating water supply valves and optical fiber access shafts beneath the road shoulder.'
      },
      {
        id: 'exp-3-4',
        category: 'Street Lamp Replacements',
        amount: 5500000,
        percentage: 10.8,
        proofName: 'SMART-LED-LIGHT-LOG.pdf',
        description: 'Installing energy saving 120W LED fixtures with solar sensors.'
      }
    ],
    issues: [MOCK_TICKETS[3]],
    coordinates: [
      { x: 80, y: 10 },
      { x: 82, y: 40 },
      { x: 85, y: 70 },
      { x: 88, y: 90 }
    ],
    gmpCoordinates: [
      { lat: 12.91, lng: 77.68 },
      { lat: 12.94, lng: 77.69 },
      { lat: 12.97, lng: 77.70 },
      { lat: 13.00, lng: 77.71 }
    ],
    gmpCenter: { lat: 12.955, lng: 77.695 }
  },
  {
    id: 'road-4',
    name: 'M.G. Road (Central Market Segment)',
    type: 'Local',
    location: 'Central Business District',
    contractor: 'Vardhaman Civil Corp',
    budgetAllocated: 32000000, // 3.2 Crores
    budgetSpent: 21000000,
    authority: 'Municipal Corporation (City Zone)',
    lastRepairDate: '2023-11-20',
    condition: 'Poor',
    lengthKm: 3.1,
    lanes: 4,
    expenses: [
      {
        id: 'exp-4-1',
        category: 'Utility Manhole Grading',
        amount: 4500000,
        percentage: 21.4,
        proofName: 'MANHOLE-LEVEL-REPORT.pdf',
        description: 'Re-aligning municipal sewer chamber lids flush with the motor driving surface.'
      },
      {
        id: 'exp-4-2',
        category: 'Cobblestone Pedestrian Sidewalks',
        amount: 11500000,
        percentage: 54.8,
        proofName: 'PEDESTRIAN-PAVEMENT-VARD.pdf',
        description: 'Installing interlocking red granite cobblestone pavements for premium pedestrian shopping comfort.'
      },
      {
        id: 'exp-4-3',
        category: 'Emergency Slurry Repairs',
        amount: 5000000,
        percentage: 23.8,
        proofName: 'MUNICIPAL-SLURRY-RECEIPTS.pdf',
        description: 'Applying temporary cold asphalt filler mix to deep potholes during early monsoon months.'
      }
    ],
    issues: [MOCK_TICKETS[0]],
    coordinates: [
      { x: 30, y: 45 },
      { x: 45, y: 46 },
      { x: 60, y: 48 },
      { x: 75, y: 50 }
    ],
    gmpCoordinates: [
      { lat: 12.973, lng: 77.601 },
      { lat: 12.974, lng: 77.607 },
      { lat: 12.975, lng: 77.613 },
      { lat: 12.976, lng: 77.620 }
    ],
    gmpCenter: { lat: 12.9745, lng: 77.61 }
  },
  {
    id: 'road-5',
    name: 'Kasturba Marg',
    type: 'Local',
    location: 'Central Administrative Area',
    contractor: 'Royal Builders & Engineering',
    budgetAllocated: 24000000, // 2.4 Crores
    budgetSpent: 22800000,
    authority: 'Municipal Corporation (Urban Drainage)',
    lastRepairDate: '2024-08-30',
    condition: 'Poor',
    lengthKm: 2.2,
    lanes: 2,
    expenses: [
      {
        id: 'exp-5-1',
        category: 'Asphalt Patch Repair Work',
        amount: 13200000,
        percentage: 57.9,
        proofName: 'ROLL-MACHINE-RENTAL.pdf',
        description: 'Mill scrape & replace degraded bits from the administrative headquarters junction.'
      },
      {
        id: 'exp-5-2',
        category: 'Stormwater Grid Gratings',
        amount: 9600000,
        percentage: 42.1,
        proofName: 'CAST-IRON-GRATES-INVOICE.pdf',
        description: 'Placing heavy grade cast-iron inlet grids over stormwater catch pits.'
      }
    ],
    issues: [MOCK_TICKETS[1]],
    coordinates: [
      { x: 40, y: 30 },
      { x: 42, y: 50 },
      { x: 44, y: 70 }
    ],
    gmpCoordinates: [
      { lat: 12.970, lng: 77.594 },
      { lat: 12.974, lng: 77.595 },
      { lat: 12.978, lng: 77.596 }
    ],
    gmpCenter: { lat: 12.974, lng: 77.595 }
  },
  {
    id: 'road-6',
    name: 'Sarjapur Main Link Road',
    type: 'SH',
    location: 'South-East Growth Corridor',
    contractor: 'Dynamic Infra Projects',
    budgetAllocated: 68000000, // 6.8 Crores
    budgetSpent: 59000000,
    authority: 'State Public Works Department (PWD)',
    lastRepairDate: '2025-06-15',
    condition: 'Good',
    lengthKm: 9.8,
    lanes: 4,
    expenses: [
      {
        id: 'exp-6-1',
        category: 'Asphalt Concrete Binder Course',
        amount: 38000000,
        percentage: 64.4,
        proofName: 'BITUMINOUS-CONC-APPROVED.pdf',
        description: 'Applying a 50mm compacted asphalt binder course for medium density commercial transport.'
      },
      {
        id: 'exp-6-2',
        category: 'Median Planters & Concrete Kerbs',
        amount: 12000000,
        percentage: 20.3,
        proofName: 'KERBSTONE-PRECAST-SLIPS.pdf',
        description: 'Setting up precast concrete divider stones with plant soil and drainage orifices.'
      },
      {
        id: 'exp-6-3',
        category: 'Rumble Strips & Pedestrian Crossings',
        amount: 9000000,
        percentage: 15.3,
        proofName: 'SPEED-CALM-PAINT-PWD.pdf',
        description: 'Painting high-visibility zebra crossings and thermo plastic speed-breaker speed bumps.'
      }
    ],
    issues: [],
    coordinates: [
      { x: 20, y: 20 },
      { x: 35, y: 35 },
      { x: 50, y: 55 },
      { x: 62, y: 68 }
    ],
    gmpCoordinates: [
      { lat: 12.910, lng: 77.640 },
      { lat: 12.915, lng: 77.655 },
      { lat: 12.920, lng: 77.670 },
      { lat: 12.925, lng: 77.685 }
    ],
    gmpCenter: { lat: 12.9175, lng: 77.6625 }
  },
  {
    id: 'road-7',
    name: 'Whitefield Inner Ring Bypass',
    type: 'Local',
    location: 'Residential IT Sector Bypass',
    contractor: 'BTM Civic Dev Group',
    budgetAllocated: 18000000, // 1.8 Crores
    budgetSpent: 4500000,
    authority: 'Municipal Corporation (East Zone Division)',
    lastRepairDate: '2022-03-14',
    condition: 'Poor',
    lengthKm: 1.8,
    lanes: 2,
    expenses: [
      {
        id: 'exp-7-1',
        category: 'Preliminary Soil Compaction Test',
        amount: 1500000,
        percentage: 33.3,
        proofName: 'SOIL-BEAR-CAPACITY-REP.pdf',
        description: 'Core drilling and heavy sand-replacement density testing to qualify native soil strength.'
      },
      {
        id: 'exp-7-2',
        category: 'Ditch & Water Clearance Trenching',
        amount: 3000000,
        percentage: 66.7,
        proofName: 'EXCAVATOR-EARTH-BILL.pdf',
        description: 'Shallow ditch clearing on both sides of the residential sector lanes to discharge stagnant pools.'
      }
    ],
    issues: [MOCK_TICKETS[4]],
    coordinates: [
      { x: 60, y: 15 },
      { x: 55, y: 30 },
      { x: 50, y: 45 }
    ],
    gmpCoordinates: [
      { lat: 12.965, lng: 77.725 },
      { lat: 12.960, lng: 77.735 },
      { lat: 12.955, lng: 77.745 }
    ],
    gmpCenter: { lat: 12.960, lng: 77.735 }
  }
];

export const MOCK_BOT_REPLIES: { keywords: string[]; answer: string; heading: string }[] = [
  {
    keywords: ['who maintains', 'maintain', 'authority', 'who is responsible', 'who owns'],
    heading: 'Road Authority Ownership',
    answer: `In India, road maintenance responsibilities are divided among public agencies:
1. **National Highways Authority of India (NHAI)** is responsible for NH series roads (e.g., NH-48). High-speed interstate expressways are under NHAI.
2. **State Public Works Department (PWD)** oversees State Highways (SH) and major district roads connecting critical suburbs.
3. **Municipal Corporations (e.g., BBMP, Municipal Zone Admins)** manage local residential and commercial routes, including footpaths, drainage networks, and street lights.

On RoadLens AI, you can click on **"Search Road Details"** or **"Dashboard"** to inspect exactly which public department has been allocated the budget for any specific street.`
  },
  {
    keywords: ['report', 'how to report', 'complain', 'file', 'pothole', 'street light', 'waterlogging'],
    heading: 'Reporting an Issue',
    answer: `Reporting is designed to be simple and auto-routing:
1. Navigate to the **"Report Issues"** tab from the top menu.
2. Select the **Road** with the issue.
3. Fill in the **Subject** and write a brief description of the issue.
4. If you don't know who maintains the road, choose **"I Don't Know Authority"**. Our system automatically analyzes the geospatial coordinates and road classification (NH, SH, or Local) to direct it straight to the correct field officer.
5. You can also upload a photo of the defect or record a voice note, which will transcribe automatically into a written ticket!`
  },
  {
    keywords: ['budget', 'spent', 'allocated', 'money', 'cost', 'expensive', 'transparency'],
    heading: 'Public Budget Transparency',
    answer: `RoadLens AI is built to bring ultimate transparency to public expenditure:
- Each road has a strictly logged **Budget Allocated** (sanctioned amount by the government treasury) and **Budget Spent** (amount claimed and paid to the contractor).
- In **"Search Road Details"**, selecting a road and clicking **"Budget Spent"** reveals a precise itemized receipt. It includes detailed civil sub-projects (like Milling, Asphalt concrete batches, Sewer grid castings) along with PDF receipt metadata and signed proof placeholders.`
  },
  {
    keywords: ['track', 'complaint progress', 'reference', 'status', 'pending', 'resolved', 'progress'],
    heading: 'Tracking Complaint Status',
    answer: `Once you submit an issue, a unique reference ID (e.g., *RW-2026-00481*) is minted.
- You can review live milestone logs under the tracking panels of the **"Report Issues"** page.
- Status classifications are:
  - 📝 **Pending:** Submitted by citizen, awaiting verification.
  - 🔍 **Under Review:** Civil engineers are dispatching inspections.
  - ⚙️ **In Progress:** Materials are allocated and contractors are on-site fixing the defect.
  - ✅ **Resolved:** Verified and completed. Photos of the repair are posted back.`
  },
  {
    keywords: ['how to use', 'help', 'website', 'guide', 'lens', 'roadlens', 'features'],
    heading: 'How to use RoadLens AI',
    answer: `Welcome! Here is a brief user guide:
1. **Dashboard:** Gives you a high-level bird's-eye view. Displays budget distributions, filter buttons (All, NH, SH, Local), and logs local citizen reports.
2. **Search Road Details:** Search any street. Access contractors, last relay dates, detailed budget receipt breakdowns, and the instant **"Raise Issue"** button.
3. **Report Issues:** Submit actual road hazards directly to administrative authorities, and monitor current progress bars.
4. **Map:** Use standard spatial filters to inspect road health scores visually in interactive citizen maps.
5. **AI Bot:** Chat with me to learn about citizen road rights, public procurement limits, and reporting flows!`
  }
];

export const GENERAL_BOT_REPLY = `I am your RoadLens AI Civic Assistant, specialized in road security, public procurement, and municipal tracking. 

Try asking:
- *"Who maintains commercial streets versus highways?"*
- *"How does the smart auto-routing work when I don't know the authority?"*
- *"Where can I view contractors and signed budget proof sheets?"*
- *"Tell me the steps to submit a pothole report."*`;
