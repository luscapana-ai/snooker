import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ronnie O\'Sullivan Signature Series Cue',
    price: 450.00,
    category: 'cue',
    sport: 'snooker',
    description: 'Hand-spliced ebony butt with ash shaft. Perfectly balanced for break-building.',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Aramith Tournament Champion Ball Set',
    price: 220.00,
    category: 'balls',
    sport: 'snooker',
    description: 'The industry standard for professional play. High durability and perfect consistency.',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    rating: 5.0
  },
  {
    id: '3',
    name: 'Predator Revo 12.4mm Shaft',
    price: 529.00,
    category: 'cue',
    sport: 'pool',
    description: 'Carbon fiber composite shaft providing low deflection and high accuracy.',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    rating: 4.8
  },
  {
    id: '4',
    name: 'Brunswick Gold Crown VI Table',
    price: 8500.00,
    category: 'table',
    sport: 'pool',
    description: 'The legendary table found in pool halls worldwide. Mahogany finish with drop pockets.',
    imageUrl: 'https://picsum.photos/600/400?random=4',
    rating: 5.0
  },
  {
    id: '5',
    name: 'Master Chalk (Box of 12)',
    price: 12.99,
    category: 'accessory',
    sport: 'both',
    description: 'The most popular chalk on the market. Green color to match standard cloth.',
    imageUrl: 'https://picsum.photos/400/400?random=5',
    rating: 4.5
  },
  {
    id: '6',
    name: 'Riley Aristocrat Tournament Table',
    price: 12000.00,
    category: 'table',
    sport: 'snooker',
    description: 'As seen in the World Championships. Steel block cushions and premium slate.',
    imageUrl: 'https://picsum.photos/600/400?random=6',
    rating: 5.0
  },
  {
    id: '7',
    name: 'Peradon Leather Cue Case',
    price: 150.00,
    category: 'accessory',
    sport: 'both',
    description: 'Genuine leather case for 3/4 jointed cues. Offers superior protection.',
    imageUrl: 'https://picsum.photos/400/400?random=7',
    rating: 4.7
  },
  {
    id: '8',
    name: 'Extension Bridge Stick',
    price: 45.00,
    category: 'accessory',
    sport: 'snooker',
    description: 'Telescopic rest for those hard-to-reach shots across the table.',
    imageUrl: 'https://picsum.photos/400/400?random=8',
    rating: 4.2
  }
];

export const SHOT_GUIDES = [
  {
    title: "Stun Shot",
    description: "Stopping the cue ball dead on impact",
    prompt: "Explain the technique for a Stun Shot. Where do I strike the cue ball, how hard, and what is the physics behind the stop?"
  },
  {
    title: "Screw / Draw",
    description: "Spinning the white ball backwards",
    prompt: "How do I play a deep screw shot (draw shot)? Give me tips on cue action, bridging, and striking point for maximum reaction."
  },
  {
    title: "Top Spin / Follow",
    description: "Driving the cue ball forward",
    prompt: "When should I use Top Spin (Follow) and how does it affect the potting angle and cue ball path after contact?"
  },
  {
    title: "Side Spin (English)",
    description: "Altering the angle off cushions",
    prompt: "Explain the physics of Side Spin (English). How does it throw the object ball (throw effect) and change the rebound angle?"
  },
  {
    title: "The Swerve",
    description: "Curving around an obstacle",
    prompt: "How do I execute a Swerve shot to curve around an interfering ball? Explain cue elevation and speed."
  },
  {
    title: "Jump Shot",
    description: "Getting air (Pool specific)",
    prompt: "How do I play a legal Jump Shot in pool? Explain the elevation, stroke, and rules regarding scooping."
  }
];

export const SITUATION_GUIDES = [
  {
    title: "The Break Off",
    description: "Starting the frame tactically",
    prompt: "What is the best strategy for the break-off shot in Snooker vs 9-Ball Pool? How do I ensure safety?"
  },
  {
    title: "Escaping Snookers",
    description: "Kicking off one or two rails",
    prompt: "Teach me the systems for escaping snookers. How do I calculate angles for a one-cushion or two-cushion escape?"
  },
  {
    title: "Break Building",
    description: "Planning 3 shots ahead",
    prompt: "What are the key principles of break building in Snooker? How do I maintain position on the black?"
  },
  {
    title: "Safety Exchange",
    description: "Putting your opponent in trouble",
    prompt: "Explain the concept of a 'Safety Exchange'. What constitutes a 'containing safety' vs an 'attacking safety'?"
  },
  {
    title: "The Plant / Combo",
    description: "Potting ball A via ball B",
    prompt: "How do I calculate a plant (combination shot)? What determines if the balls are 'on' and how does the line of aim work?"
  }
];

export const DRILLS = [
  {
    id: 'line-up',
    title: 'The Line Up',
    difficulty: 'Intermediate',
    description: 'Place all 15 reds in a line down the center of the table. Clear them up with colors.',
    goal: 'Clearance',
    type: 'snooker'
  },
  {
    id: 'colors-spots',
    title: 'Colors Off The Spot',
    difficulty: 'Beginner',
    description: 'Pot the colors in sequence (Yellow to Black) from their spots. Respot after each pot.',
    goal: '27 Points',
    type: 'snooker'
  },
  {
    id: 'l-drill',
    title: 'The L Drill',
    difficulty: 'Advanced',
    description: 'Place balls in an L shape around the pocket. Pot them in specific order maintaining position.',
    goal: 'No misses',
    type: 'pool'
  },
  {
    id: 'long-potting',
    title: 'Long Blue to Baulk',
    difficulty: 'Advanced',
    description: 'Place blue on spot, cue ball in D. Pot blue, bring cue ball back to baulk.',
    goal: '10 in a row',
    type: 'snooker'
  },
  {
    id: 'safety-thin',
    title: 'Thin Safety',
    difficulty: 'Intermediate',
    description: 'Place object ball near cushion. Clip it thin to bring cue ball back to safety.',
    goal: 'Consistent length',
    type: 'both'
  }
];
