// ─────────────────────────────────────────────────────────────────────────────
// All site content lives here (plus history.js) so copy, photos, events and
// videos can be updated without touching any component code.
// ─────────────────────────────────────────────────────────────────────────────
import {
  BookHeart,
  BookOpen,
  BookOpenText,
  CalendarDays,
  Church,
  Coffee,
  Flame,
  Flower2,
  Footprints,
  Globe2,
  Guitar,
  HandHeart,
  Heart,
  HeartHandshake,
  History,
  House,
  Mail,
  MicVocal,
  MonitorPlay,
  Puzzle,
  Smile,
  Sprout,
  Users,
} from 'lucide-react'

import imgAbout from '../assets/hbc_asset_about.jpg'
import imgBibleStudy from '../assets/hbc_bible_study.jpg'
import imgChildren from '../assets/hbc_children.jpg'
import imgChoir from '../assets/hbc_choir.jpg'
import imgCongregation from '../assets/hbc_congregation.jpg'
import imgMen from '../assets/hbc_men.jpg'
import imgMensFellowship from '../assets/hbc_mens_fellowship.jpg'
import imgMission from '../assets/hbc_mission.jpg'
import imgMothersFellowship from '../assets/hbc_mothers_fellowship.jpg'
import imgMultimedia from '../assets/hbc_multimedia.jpg'
import imgMusicMinistry from '../assets/hbc_music_ministry.jpg'
import imgPastor from '../assets/hbc_pastor.jpg'
import imgPastorWife from '../assets/hbc_pastor_wife.jpg'
import imgPrimaryJuniors from '../assets/hbc_primary_juniors.jpg'
import imgSoulwinning from '../assets/hbc_soulwinning.jpg'
import imgSoulwinningStreet from '../assets/hbc_soulwinning_street.jpg'
import imgStringEnsemble from '../assets/hbc_string_ensemble.jpg'
import imgYouth from '../assets/hbc_youth.jpg'
import imgYouthHead from '../assets/hbc_youth_head.jpg'

// ── Church info ──────────────────────────────────────────────────────────────
export const church = {
  name: 'Harvesters Baptist Church Calamba',
  shortName: 'HBC Calamba',
  // The two lines shown beside the logo in the navbar and footer.
  logoTitle: 'Harvesters Baptist Church',
  logoSubtitle: 'Calamba · Laguna',
  tagline: 'Faith, Family, Friends',
  // 14th anniversary was celebrated in 2026 → founded 2012. Update if needed;
  // "years of ministry" across the site is calculated from this.
  foundedYear: 2012,
  address: 'South Spring Villas, Bucal, Calamba, Laguna',
  phone: '+63 948 442 7365',
  email: 'anjotongol17@gmail.com',
  // What Google Maps searches for (embed + directions). This matches the
  // church's existing Google Maps listing.
  mapQuery: 'Harvesters Baptist Church, South Spring Villas, Calamba, Laguna',
  youtubeUrl: 'https://www.youtube.com/@HBCalamba1152/videos',
  youtubeChannelId: 'UCJlwcqsASMrH3raNWpcv_fQ',
  // Rough total on the YouTube channel (297 in Sep 2026) — bump now and then.
  youtubeVideoCount: 290,
}

export const yearsOfMinistry = new Date().getFullYear() - church.foundedYear

// ── Our Bible ────────────────────────────────────────────────────────────────
// Highlighted on Home and About, and mentioned in the hero, footer, Plan a Visit
// modal and Watch page.
export const bible = {
  version: 'Old King James Version',
  abbreviation: 'KJV',
  text: 'Every preaching, Sunday School lesson, and Bible study at our church uses the Old King James Version. It is the Bible that shapes how we teach, live, and love.',
  usedIn: ['Preaching', 'Sunday School', 'Bible Study', 'Soul Winning'],
  verse: {
    text: 'Thy word is a lamp unto my feet, and a light unto my path.',
    reference: 'Psalm 119:105',
  },
}

// ── Navigation ───────────────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Home', to: '/', icon: House },
  { label: 'About', to: '/about', icon: Church },
  { label: 'History', to: '/history', icon: History },
  { label: 'Ministries', to: '/ministries', icon: HeartHandshake },
  { label: 'Events', to: '/events', icon: CalendarDays },
  { label: 'Watch', to: '/watch', icon: MonitorPlay },
  { label: 'Contact', to: '/contact', icon: Mail },
]

// ── Weekly schedule ──────────────────────────────────────────────────────────
export const serviceTimes = [
  { day: 'Sunday', name: 'Sunday School', time: '9:00 AM', icon: BookOpenText },
  { day: 'Sunday', name: 'Worship Service', time: '10:00 AM', icon: Church },
  { day: 'Wednesday', name: 'Prayer Meeting', time: '6:30 PM', icon: HandHeart },
]

// ── Photos used in page banners ──────────────────────────────────────────────
export const heroImages = {
  home: imgCongregation,
  about: imgAbout,
  history: imgChoir,
  ministries: imgYouth,
  events: imgMission,
  watch: imgStringEnsemble,
  contact: imgSoulwinning,
}

// ── About ────────────────────────────────────────────────────────────────────
export const aboutStory = {
  image: imgAbout,
  paragraphs: [
    'Harvesters Baptist Church Calamba has faithfully served the Lord and the community for 14 years, growing from a humble beginning into a church committed to reaching people with the Gospel. Through the years, God has allowed the church to minister to individuals and families, build lasting relationships, and continue proclaiming His Word to the community.',
    'We believe that the church is called to make disciples, nurture the next generation, support missions, and reach souls for Christ. Through our Youth Ministry and Children’s Ministry, we seek to guide young people in knowing God and growing in their faith. We also support missions and actively participate in soul winning, sharing the Gospel and helping expand its reach to more people. As we continue moving forward, our desire remains the same: to serve God faithfully, reach more souls, and make Christ known.',
  ],
}

// The four callings named in the About story.
export const mission = [
  {
    title: 'Make Disciples',
    text: 'Grounding believers in God’s Word so they grow in faith and walk with Christ.',
    icon: BookHeart,
  },
  {
    title: 'Nurture the Next Generation',
    text: 'Guiding children and youth to know God through our Youth and Children’s ministries.',
    icon: Sprout,
  },
  {
    title: 'Support Missions',
    text: 'Standing with missionaries so the Gospel reaches beyond our own community.',
    icon: Globe2,
  },
  {
    title: 'Reach Souls for Christ',
    text: 'Sharing the Gospel through soul winning and everyday conversations.',
    icon: Footprints,
  },
]

export const beliefs = [
  {
    title: 'Grace First',
    text: 'We believe God meets people exactly where they are, not where they think they should be.',
    icon: Heart,
  },
  {
    title: 'KJV Scripture-Rooted',
    text: 'We read, preach, and teach from the Old King James Version. The Bible shapes how we teach, live, and love — it is our compass, not just our textbook.',
    icon: BookOpen,
  },
  {
    title: 'Community Matters',
    text: 'Faith grows best in relationship. We are built around small groups like youth and juniors, not just Sunday rows.',
    icon: Users,
  },
  {
    title: 'Serving and Seeking',
    text: 'We show up for our neighbors through soul winning, children ministry, and everyday acts of care.',
    icon: HandHeart,
  },
]

export const staff = [
  { name: 'Anjo Tongol', role: 'Pastor', image: imgPastor },
  { name: 'Eunice Balbutan Tongol', role: 'Pastor’s Wife', image: imgPastorWife },
  { name: 'Airish Pilapil', role: 'Youth Head', image: imgYouthHead },
  { name: 'Marc David', role: 'Multimedia & Worship', image: imgMultimedia },
]

// ── Ministries ───────────────────────────────────────────────────────────────
// `category` powers the filter chips on the Ministries page.
export const ministryCategories = ['Next Generation', 'Fellowship', 'Worship', 'Outreach']

export const ministries = [
  {
    title: 'Primary - Juniors',
    ages: 'Ages 4–12',
    category: 'Next Generation',
    icon: Puzzle,
    image: imgPrimaryJuniors,
    description: 'A safe, joyful space where kids learn Bible stories through songs, games, and crafts.',
  },
  {
    title: 'Youth',
    ages: 'Grades 7 to young pro',
    category: 'Next Generation',
    icon: Flame,
    image: imgYouth,
    description:
      'Meaningful conversations, heartfelt worship, fun games, and a growing faith that creates a space where young people can connect with God and build friendships.',
  },
  {
    title: "Women's Fellowship",
    ages: 'All Mothers',
    category: 'Fellowship',
    icon: Flower2,
    image: imgMothersFellowship,
    description: 'Monthly gatherings for encouragement, prayers, and sharing over snacks and conversation.',
  },
  {
    title: "Men's Fellowship",
    ages: 'All Fathers',
    category: 'Fellowship',
    icon: Coffee,
    image: imgMen,
    description:
      'Monthly gatherings of church men for small food or coffee fellowship to promote relationship building and encouragement.',
  },
  {
    title: 'Music Ministry',
    ages: 'Musicians & vocalists',
    category: 'Worship',
    icon: Guitar,
    image: imgMusicMinistry,
    description:
      'Leading our congregation in song each week — auditions open twice a year, all skill levels welcome to inquire.',
  },
  {
    title: 'Children Ministry',
    ages: 'Vacation Bible School',
    category: 'Outreach',
    icon: Smile,
    image: imgChildren,
    description:
      'Reaching children in our neighborhood with Bible stories, songs, and the Gospel through Vacation Bible School and community outreach.',
  },
  {
    title: 'Soul Winning',
    ages: 'Gospel Tracts Distribution',
    category: 'Outreach',
    icon: Footprints,
    image: imgSoulwinning,
    description:
      'Going out into the community to share the Gospel one conversation at a time and hand out Gospel tracts house to house.',
  },
  {
    title: 'Choir',
    ages: 'Church members',
    category: 'Worship',
    icon: MicVocal,
    image: imgChoir,
    description:
      'Church members lifting their voices together in special numbers that prepare hearts for the preaching of God’s Word.',
  },
  {
    title: 'Bible Study',
    ages: 'Thursday and Friday Nights',
    category: 'Fellowship',
    icon: BookOpen,
    image: imgBibleStudy,
    description:
      'Small-group Bible studies in homes on Thursday and Friday nights — open Bibles, honest questions, and growing together in the Word.',
  },
]

// ── Events ───────────────────────────────────────────────────────────────────
// `date` is YYYY-MM-DD. Past events hide automatically, and upcoming ones are
// sorted by date, so you can simply add new entries to this list.
// NOTE: these are sample events — replace them with real church events.
export const events = [
  {
    title: 'Fall Family Picnic',
    date: '2026-10-04',
    time: '11:00 AM – 2:00 PM',
    location: 'Church Grounds',
    image: imgYouth,
    description:
      'Bring a dish to share and enjoy an afternoon of games, food, and fellowship for the whole family.',
  },
  {
    title: 'Community Food Drive',
    date: '2026-10-18',
    time: '9:00 AM – 12:00 PM',
    location: 'Fellowship Hall',
    image: imgMission,
    description:
      'Help us pack and deliver grocery boxes to families in our neighborhood who need a little extra support.',
  },
  {
    title: "Women's Prayer Retreat",
    date: '2026-11-08',
    time: '9:00 AM – 4:00 PM',
    location: 'Hillside Retreat Center',
    image: imgMothersFellowship,
    description:
      'A day away from the noise — worship, teaching, and quiet space to reconnect with God and each other.',
  },
  {
    title: 'Christmas Candlelight Service',
    date: '2026-12-24',
    time: '6:00 PM & 8:00 PM',
    location: 'Main Sanctuary',
    image: imgChoir,
    description:
      'A quiet, candlelit evening of carols and scripture readings to welcome the season together.',
  },
]

// ── Videos (YouTube) ─────────────────────────────────────────────────────────
// `id` is the part after "watch?v=" in a YouTube link. Newest first.
// The Watch page also embeds the channel's latest uploads automatically.
export const videos = {
  preaching: [
    { id: 'ynm77_4mgbg', title: 'Emptiness Without God', date: '2026-09-27' },
    { id: 'nSNFGhcxENU', title: 'Komportableng Buhay?', date: '2026-09-20' },
    { id: 'A3n3cVAbiNg', title: 'The Path to Success', date: '2026-09-13' },
    { id: 'lVnOcJLcYMc', title: 'Changed?', date: '2026-09-06' },
    { id: 'yJkW3pOfSMA', title: 'The Fruit of Giving', date: '2026-08-30' },
    { id: 'oTusPnEVfNI', title: 'How to Lose Blessings from God', date: '2026-08-23' },
  ],
  specialNumbers: [
    { id: 'adui38atltQ', title: 'God’s Love Never Fails', date: '2026-09-27' },
    { id: '_qwzlPrxzQc', title: 'Come Find Rest', date: '2026-09-20' },
    { id: 'lD4WqP5k_28', title: 'What a Faithful God', date: '2026-08-30' },
    { id: 'ZeSiHROz1yg', title: 'Pagpapala Nya’y Bilangin Mo', date: '2026-08-23' },
    { id: 'XunXkXK12YE', title: 'Sumamba sa Haring Banal', date: '2026-08-16' },
    { id: '1xr88o1F7eo', title: 'Putungan Ang Hari', date: '2026-08-09' },
  ],
}

// ── Growth at a glance (animated counters) ───────────────────────────────────
export const stats = [
  { value: yearsOfMinistry, label: 'Years of God’s faithfulness', icon: Sprout },
  { value: ministries.length, label: 'Active ministries', icon: HeartHandshake },
  { value: serviceTimes.length, label: 'Weekly gatherings', icon: CalendarDays },
  { value: church.youtubeVideoCount, suffix: '+', label: 'Sermons & songs online', icon: MonitorPlay },
]

// ── Photo gallery (History page) ─────────────────────────────────────────────
export const gallery = [
  { src: imgCongregation, caption: 'Our church family, gathered together' },
  { src: imgStringEnsemble, caption: 'String ensemble leading worship' },
  { src: imgSoulwinningStreet, caption: 'Sharing the Gospel on the streets' },
  { src: imgPrimaryJuniors, caption: 'Primary – Juniors class' },
  { src: imgMensFellowship, caption: 'Men’s fellowship over coffee' },
  { src: imgChoir, caption: 'Choir special number' },
  { src: imgMission, caption: 'Serving together' },
  { src: imgChildren, caption: 'Reaching children in the neighborhood' },
  { src: imgMothersFellowship, caption: 'Women’s fellowship' },
  { src: imgAbout, caption: 'Sunday worship' },
]
