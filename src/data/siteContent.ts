export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  timeline: string;
  image: string;
  alt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Estate';
  location: string;
  area: string;
  year: string;
  duration: string;
  structuralSystem: string;
  summary: string;
  highlights: string[];
  image: string;
  alt: string;
}

export interface TransformationItem {
  id: string;
  title: string;
  location: string;
  area: string;
  summary: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  mode: 'dual' | 'vertical-split';
  alignBottomCrop?: boolean;
}

export interface PillarItem {
  number: string;
  title: string;
  metric: string;
  description: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  duration: string;
  description: string;
  milestone: string;
  progress: number;
  image: string;
  alt: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  project: string;
}

export const ABOUT_IMAGE = '/assets/aistudio/39830873a17434387ff4baf6695c3434_1b922ff1.jpg';
export const ABOUT_SECONDARY_IMAGE = '/assets/aistudio/bc4010c5fb850322e13c23ffdb40f307_36742da1.jpg';

export const COMPANY_STATS = [
  { value: 24, suffix: '+', label: 'Years Experience' },
  { value: 186, suffix: '', label: 'Projects Delivered' },
  { value: 98.6, suffix: '%', decimals: 1, label: 'On-Time Handover' },
  { value: 14.2, suffix: 'M', decimals: 1, label: 'Sq. Ft. Constructed' },
];

export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'veranda-estate',
    title: 'Monolith Courtyard Villa',
    location: 'Modern Concrete & Glass Build',
    area: '6,200 sq. ft.',
    summary:
      'Full exterior transformation from plastered concrete superstructure and scaffolding to crisp white stucco and bronze louvers.',
    beforeSrc: '/assets/aistudio/0026406e52043643246760b4a9ac3216_0b6af43c.jpg',
    afterSrc: '/assets/aistudio/0026406e52043643246760b4a9ac3216_0b6af43c.jpg',
    beforeAlt: 'Plastered concrete house shell with exterior scaffolding',
    afterAlt: 'Completed white and charcoal modern house with glass terraces',
    mode: 'vertical-split',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Construction',
    summary: 'Custom multi-storey residences built with RCC framing, brickwork, and stone facades.',
    deliverables: [
      'Geotechnical foundation & RCC framing',
      'Precision brick masonry & plastering',
      'Architectural glazing & warm wood soffits',
    ],
    timeline: '12–18 Months',
    image: '/assets/aistudio/380b557260c4532366ca05bf5a7a667b_ec98332d.jpg',
    alt: 'Completed modern three-storey luxury residence with glass balconies and warm architectural lighting',
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Construction',
    summary: 'Modern corporate headquarters and retail pavilions built to LEED Gold standards.',
    deliverables: [
      'Pre-stressed structural steel & glass',
      'Smart MEP & building automation',
      'Phased safety & commissioning',
    ],
    timeline: '14–24 Months',
    image: '/src/assets/images/service_commercial_modern_1795602684545.jpg',
    alt: 'Sculptural white concrete and cedar commercial headquarters with courtyard reflection pond',
  },
  {
    id: 'architectural-design',
    number: '03',
    title: 'Structural & Masonry',
    summary: 'Reinforced concrete columns, cantilevered slabs, and engineered clay brick walls.',
    deliverables: [
      'Reinforced concrete column & beam grid',
      'Cantilevered balcony slab engineering',
      'Multi-storey load-bearing precision',
    ],
    timeline: '4–8 Months Core',
    image: '/assets/aistudio/161b6a876ded9ef092757482f03d22de_abf6f8df.jpg',
    alt: 'Multi-storey brick masonry, concrete louvers, and cement plastering construction site',
  },
  {
    id: 'interior-design',
    number: '04',
    title: 'Interior Design',
    summary: 'Bespoke interiors uniting honed travertine, oak millwork, and warm lighting.',
    deliverables: [
      'Custom cabinetry & stonework',
      'Architectural lighting & acoustics',
      'Turnkey FF&E curation',
    ],
    timeline: '12–20 Weeks',
    image: '/src/assets/images/service_interior_1795600407875.jpg',
    alt: 'Double-height luxury living space with travertine fireplace and bespoke furnishings',
  },
  {
    id: 'renovation',
    number: '05',
    title: 'Facade & Renovation',
    summary: 'Timber-slat cladding, stone elevation upgrades, and structural transformations.',
    deliverables: [
      'Natural wood & stone elevation cladding',
      'Full scaffolding & plaster restoration',
      'Contemporary glass balcony upgrades',
    ],
    timeline: '6–12 Months',
    image: '/assets/aistudio/83dac654787cead7dd992c02497dd551_d1a91cec.jpg',
    alt: 'Modern grey stucco facade finishing, dark fascia pergola, tall glazing, and paver driveway',
  },
  {
    id: 'turnkey',
    number: '06',
    title: 'Turnkey Projects',
    summary: 'Single-contract delivery from land survey and design to final key handover.',
    deliverables: [
      'Fixed-milestone open-book contract',
      'Dedicated principal engineer',
      'Complete landscaping & handover',
    ],
    timeline: 'End-to-End',
    image: '/src/assets/images/service_turnkey_1795600408787.jpg',
    alt: 'Complete luxury modern estate with infinity pool, travertine terrace, and pergolas',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'horizon-residence',
    title: 'The Horizon Residence',
    category: 'Residential',
    location: 'Private Commission',
    area: '5,400 sq. ft.',
    year: '2025',
    duration: '14 Months',
    structuralSystem: 'Reinforced concrete frame & clay brick masonry',
    summary:
      'Three-storey luxury home featuring cantilevered terrace pergolas, dark architectural fins, and warm travertine perimeter lighting.',
    highlights: [
      'Double-cantilevered upper balcony and roof pergola',
      'Custom stone boundary wall with integrated uplighting',
      'Floor-to-ceiling sliding glass and cedar soffits',
    ],
    image: '/assets/aistudio/380b557260c4532366ca05bf5a7a667b_ec98332d.jpg',
    alt: 'The Horizon Residence completed three-storey luxury house at dusk',
  },
  {
    id: 'meridian-atrium',
    title: 'Meridian Atrium Square',
    category: 'Commercial',
    location: 'Zurich, Switzerland',
    area: '48,000 sq. ft.',
    year: '2025',
    duration: '20 Months',
    structuralSystem: 'Composite steel frame & bronze curtain wall',
    summary:
      'Five-storey corporate headquarters organized around a landscaped courtyard with geothermal climate control.',
    highlights: [
      'LEED Gold envelope · 42% lower HVAC load',
      'Bronze-anodized acoustic facade',
      'Granite terrace and courtyard canopy',
    ],
    image: '/src/assets/images/project_2_commercial_1795600408657.jpg',
    alt: 'Meridian Atrium Square modern bronze and glass commercial building with courtyard trees',
  },
  {
    id: 'crestview-estate',
    title: 'Crestview Modern Estate',
    category: 'Estate',
    location: 'Lake Oswego, OR',
    area: '7,600 sq. ft.',
    year: '2025',
    duration: '17 Months',
    structuralSystem: 'Post-tensioned concrete cantilevers & structural steel',
    summary:
      'Two-storey architectural estate uniting white stucco planes, vertical cedar louvers, frameless glass balconies, and a travertine courtyard.',
    highlights: [
      'Cantilevered dual-wing upper terrace slabs',
      'Custom vertical cedar privacy louver screens',
      'Travertine arrival court and landscaped pool lawn',
    ],
    image: '/src/assets/images/project_3_modern_estate_1795602684638.jpg',
    alt: 'Crestview Modern Estate two-storey white and charcoal luxury house with wood louvers and glass balconies',
  },
];

export const WHY_CHOOSE_PILLARS: PillarItem[] = [
  {
    number: '01',
    title: 'Structural Quality',
    metric: '42-Point Audits',
    description: 'Third-party engineering sign-off on every pour, rebar tie, and finish.',
  },
  {
    number: '02',
    title: 'Full Transparency',
    metric: 'Open-Book Ledger',
    description: 'Real-time visibility into procurement costs and weekly site progress.',
  },
  {
    number: '03',
    title: 'Senior Engineers',
    metric: '18+ Yr Tenure',
    description: 'Led directly by chartered structural engineers and master builders.',
  },
  {
    number: '04',
    title: 'Timely Delivery',
    metric: '98.6% On-Time',
    description: 'Disciplined critical-path scheduling with contractual handover dates.',
  },
  {
    number: '05',
    title: 'Certified Materials',
    metric: 'ISO Sourced',
    description: 'Quarry-direct stone, sustainably harvested timber, and low-carbon concrete.',
  },
];

export const CONSTRUCTION_PROCESS: ProcessStage[] = [
  {
    step: '01',
    title: 'Planning',
    duration: 'Weeks 1–4',
    description: 'Geotechnical survey, zoning clearance, and guaranteed budget baseline.',
    milestone: 'Site Staked & Soil Verified',
    progress: 16,
    image: '/src/assets/images/hero_stage_1_land_1795600434607.jpg',
    alt: 'Surveyed empty construction plot marked with corner boundary stakes',
  },
  {
    step: '02',
    title: 'Design',
    duration: 'Weeks 5–14',
    description: 'Architectural massing, 3D BIM coordination, and stamped permits.',
    milestone: 'Stamped Blueprints & Permits',
    progress: 33,
    image: '/src/assets/images/service_arch_design_1795600406290.jpg',
    alt: 'Architectural scale model and stamped CAD elevation drawings',
  },
  {
    step: '03',
    title: 'Foundation',
    duration: 'Months 4–6',
    description: 'Excavation, steel rebar placement, and lab-tested concrete slabs.',
    milestone: 'Reinforced Footings Cured',
    progress: 50,
    image: '/src/assets/images/hero_stage_2_foundation_1795600436409.jpg',
    alt: 'Excavated foundation trenches with timber formwork and tied steel rebar',
  },
  {
    step: '04',
    title: 'Structure',
    duration: 'Months 7–11',
    description: 'Concrete columns, upper floors, masonry walls, and roof framing.',
    milestone: 'Superstructure Topped Out',
    progress: 68,
    image: '/assets/aistudio/161b6a876ded9ef092757482f03d22de_abf6f8df.jpg',
    alt: 'Multi-storey brick masonry, concrete columns, and scaffolding construction',
  },
  {
    step: '05',
    title: 'Finishing',
    duration: 'Months 12–15',
    description: 'Glazing, exterior stucco, architectural fascia, and paver driveway.',
    milestone: 'Facade Cladding & Glazing Sealed',
    progress: 85,
    image: '/assets/aistudio/83dac654787cead7dd992c02497dd551_d1a91cec.jpg',
    alt: 'Modern two-storey exterior stucco painting, glazing, and paver driveway installation',
  },
  {
    step: '06',
    title: 'Handover',
    duration: 'Month 16',
    description: '200-point final inspection, digital twin manual, and 10-year warranty.',
    milestone: 'Keys & 10-Year Structural Warranty',
    progress: 100,
    image: '/assets/aistudio/380b557260c4532366ca05bf5a7a667b_ec98332d.jpg',
    alt: 'Completed three-storey modern luxury residence illuminated at dusk',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Summit delivered our residence three weeks ahead of schedule with zero cost surprises and exemplary structural precision.',
    name: 'Henrik Lindqvist',
    role: 'Managing Partner',
    organization: 'Nordic Capital Advisors',
    project: 'The Horizon Residence',
  },
  {
    id: 't2',
    quote:
      'Watching the concrete frame and brick walls transform into our finished three-storey home was seamless. Every facade joint aligns to the millimeter.',
    name: 'Claire Beaumont-Vance',
    role: 'Principal Curator',
    organization: 'Vance Foundation',
    project: 'Crestview Modern Estate',
  },
  {
    id: 't3',
    quote:
      'We rarely encounter a builder with this level of site cleanliness and scheduling rigor. Our headquarters passed inspection on the first review.',
    name: 'Dr. Tobias Keller',
    role: 'Director of Real Estate',
    organization: 'Helvetia Commercial Group',
    project: 'Meridian Atrium Square',
  },
];
