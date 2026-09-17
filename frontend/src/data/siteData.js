// All placeholder copy + dummy images live here so the site can be
// re-worded without touching any component code.
// Images are placeholders from picsum.photos — swap for real photos later.

export const church = {
  name: 'Harvesters Baptist Church Calamba',
  shortName: 'HBC',
  tagline: 'Faith, Family, Friends',
  address: 'South Spring Villas, Bucal, Calamba, Laguna',
  phone: '(049) 555-0182',
  email: 'anjotongol17@gmail.com',
}

export const serviceTimes = [
  { day: 'Sunday', name: 'Sunday School', time: '9:00 AM' },
  { day: 'Sunday', name: 'Worship Service', time: '10:00 AM' },
  { day: 'Wednesday', name: 'Prayer Meeting', time: '6:30 PM' },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Ministries', to: '/ministries' },
  { label: 'Events', to: '/events' },
  { label: 'Sermons', to: '/sermons' },
  { label: 'Contact', to: '/contact' },
]

import hbcAboutImage from '../assets/hbc_asset_about.jpg';
//export const heroImage = 'https://picsum.photos/seed/church-hero/1600/900'

export const hbcHeroImage = 'assets/HBC 14 YEARS.jpg';

export const aboutStory = {
  image: hbcAboutImage,
  paragraphs: [
    'Harvesters Baptist Church Calamba has faithfully served the Lord and the community for 14 years, growing from a humble beginning into a church committed to reaching people with the Gospel. Through the years, God has allowed the church to minister to individuals and families, build lasting relationships, and continue proclaiming His Word to the community.',
    'We believe that the church is called to make disciples, nurture the next generation, support missions, and reach souls for Christ. Through our Youth Ministry and Children’s Ministry, we seek to guide young people in knowing God and growing in their faith. We also support missions and actively participate in soul winning, sharing the Gospel and helping expand its reach to more people. As we continue moving forward, our desire remains the same: to serve God faithfully, reach more souls, and make Christ known.',
  ],
}

export const beliefs = [
  {
    title: 'Grace First',
    text: 'We believe God meets people exactly where they are, not where they think they should be.',
  },
  {
    title: 'Scripture-Rooted',
    text: 'The Bible shapes how we teach, live, and love — it is our compass, not just our textbook.',
  },
  {
    title: 'Community Matters',
    text: 'Faith grows best in relationship. We are built around small groups, not just Sunday rows.',
  },
  {
    title: 'Serving Our City',
    text: 'We show up for our neighbors through food drives, tutoring, and everyday acts of care.',
  },
]

export const staff = [
  {
    name: 'Pastor Daniel Reyes',
    role: 'Lead Pastor',
    image: 'https://picsum.photos/seed/pastor-daniel/400/400',
  },
  {
    name: 'Pastor Maria Santos',
    role: 'Associate Pastor',
    image: 'https://picsum.photos/seed/pastor-maria/400/400',
  },
  {
    name: 'James Cruz',
    role: 'Worship Director',
    image: 'https://picsum.photos/seed/james-worship/400/400',
  },
  {
    name: 'Anna Lim',
    role: 'Youth & Family Ministry',
    image: 'https://picsum.photos/seed/anna-youth/400/400',
  },
]

export const ministries = [
  {
    title: 'Kids Ministry',
    ages: 'Ages 3–11',
    image: 'https://picsum.photos/seed/kids-ministry/700/500',
    description: 'A safe, joyful space where kids learn Bible stories through songs, games, and crafts every Sunday.',
  },
  {
    title: 'Youth Group',
    ages: 'Grades 7–12',
    image: 'https://picsum.photos/seed/youth-group/700/500',
    description: 'Friday nights of honest conversation, worship, and games built for the questions teens are actually asking.',
  },
  {
    title: "Women's Fellowship",
    ages: 'All ages',
    image: 'https://picsum.photos/seed/womens-fellowship/700/500',
    description: 'Monthly gatherings for encouragement, prayer, and friendship over coffee and conversation.',
  },
  {
    title: "Men's Ministry",
    ages: 'All ages',
    image: 'https://picsum.photos/seed/mens-ministry/700/500',
    description: 'Weekly breakfast meetups focused on accountability, mentorship, and growing in faith together.',
  },
  {
    title: 'Worship Team',
    ages: 'Musicians & vocalists',
    image: 'https://picsum.photos/seed/worship-team/700/500',
    description: 'Leading our congregation in song each week — auditions open twice a year, all skill levels welcome to inquire.',
  },
  {
    title: 'Community Outreach',
    ages: 'Volunteers welcome',
    image: 'https://picsum.photos/seed/outreach-team/700/500',
    description: 'Monthly food drives, school-supply donations, and neighborhood clean-ups throughout the year.',
  },
]

export const events = [
  {
    title: 'Fall Family Picnic',
    date: 'Oct 4, 2026',
    time: '11:00 AM – 2:00 PM',
    location: 'Church Grounds',
    image: 'https://picsum.photos/seed/family-picnic/700/450',
    description: 'Bring a dish to share and enjoy an afternoon of games, food, and fellowship for the whole family.',
  },
  {
    title: 'Community Food Drive',
    date: 'Oct 18, 2026',
    time: '9:00 AM – 12:00 PM',
    location: 'Fellowship Hall',
    image: 'https://picsum.photos/seed/food-drive/700/450',
    description: 'Help us pack and deliver grocery boxes to families in our neighborhood who need a little extra support.',
  },
  {
    title: "Women's Prayer Retreat",
    date: 'Nov 8, 2026',
    time: '9:00 AM – 4:00 PM',
    location: 'Hillside Retreat Center',
    image: 'https://picsum.photos/seed/prayer-retreat/700/450',
    description: 'A day away from the noise — worship, teaching, and quiet space to reconnect with God and each other.',
  },
  {
    title: 'Christmas Candlelight Service',
    date: 'Dec 24, 2026',
    time: '6:00 PM & 8:00 PM',
    location: 'Main Sanctuary',
    image: 'https://picsum.photos/seed/candlelight-service/700/450',
    description: 'A quiet, candlelit evening of carols and scripture readings to welcome the season together.',
  },
]

export const sermons = [
  {
    title: 'Rooted, Not Shaken',
    speaker: 'Pastor Daniel Reyes',
    date: 'Sep 7, 2026',
    series: 'Foundations',
    image: 'https://picsum.photos/seed/sermon-rooted/700/450',
  },
  {
    title: 'The Weight of Waiting',
    speaker: 'Pastor Maria Santos',
    date: 'Aug 31, 2026',
    series: 'Foundations',
    image: 'https://picsum.photos/seed/sermon-waiting/700/450',
  },
  {
    title: 'Ordinary Faithfulness',
    speaker: 'Pastor Daniel Reyes',
    date: 'Aug 24, 2026',
    series: 'Everyday Faith',
    image: 'https://picsum.photos/seed/sermon-ordinary/700/450',
  },
  {
    title: 'A Table for Everyone',
    speaker: 'Pastor Maria Santos',
    date: 'Aug 17, 2026',
    series: 'Everyday Faith',
    image: 'https://picsum.photos/seed/sermon-table/700/450',
  },
  {
    title: 'When Prayer Feels Silent',
    speaker: 'James Cruz',
    date: 'Aug 10, 2026',
    series: 'Everyday Faith',
    image: 'https://picsum.photos/seed/sermon-prayer/700/450',
  },
  {
    title: 'Restless Hearts, Steady God',
    speaker: 'Pastor Daniel Reyes',
    date: 'Aug 3, 2026',
    series: 'Restless',
    image: 'https://picsum.photos/seed/sermon-restless/700/450',
  },
]

export const galleryImages = [
  'https://picsum.photos/seed/gallery-1/600/600',
  'https://picsum.photos/seed/gallery-2/600/600',
  'https://picsum.photos/seed/gallery-3/600/600',
  'https://picsum.photos/seed/gallery-4/600/600',
  'https://picsum.photos/seed/gallery-5/600/600',
  'https://picsum.photos/seed/gallery-6/600/600',
  'https://picsum.photos/seed/gallery-7/600/600',
  'https://picsum.photos/seed/gallery-8/600/600',
]
