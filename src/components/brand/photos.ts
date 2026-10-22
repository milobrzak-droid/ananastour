/**
 * Stock travel photos used by the design (Unsplash, free licence) until the
 * client sends her own. TODO(client): replace with Aljona's photos.
 */
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const PHOTOS = {
  heroBeach: u("1519046904884-53103b34b206", 2000),
  sunsetBeach: u("1507525428034-b723cf961d3e"),
  aerialWave: u("1505142468610-359e7d316be0", 1000),
  traveller: u("1527631746610-bca00a040d60", 1000),
  balloons: u("1530789253388-582c481c54b0", 1000),
  planeWing: u("1436491865332-7a61a109cc05", 800),
  diving: u("1544551763-46a013bb70d5", 800),
  island: u("1559128010-7c1ad6e1b6a5", 800),
  maldivesVillas: u("1573843981267-be1999ff37cd", 1000),
  lakeBoat: u("1476514525535-07fb3b4ae5f1", 1200),
  travelMap: u("1488646953014-85cb44e25828", 1000),
  seaSpray: u("1500375592092-40eb2168fd21", 1600),
  carDriver: u("1449965408869-eaa3f722e40d", 1000),
  airportGate: u("1464037866556-6812c9d1c72e", 1000),
  vanRoad: u("1469854523086-cc02fe5d8800", 1000),
  lakeTurquoise: u("1501785888041-af3ef285b470", 1000),
  airportLounge: u("1530521954074-e64f6810b32d", 1000),
  helpingHands: u("1544027993-37dbfe43562a", 1000),
  resortPool: u("1520250497591-112f2f40a3f4", 1000),
  resortDeck: u("1566073771259-6a8506099945", 1000),
} as const;

/**
 * Aljona's portrait for small avatars next to Telegram CTAs. Plain path (not
 * imported from src/content/ananas-photos.ts) so client components stay light;
 * keep in sync with ananasPhotos.aljona.portrait.
 */
export const ALJONA_AVATAR = "/img/ananas/aljona-portrait.jpg";
