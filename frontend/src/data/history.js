// ─────────────────────────────────────────────────────────────────────────────
// Church history — shown on the /history page.
//
// ✏️  Update freely: `period` is the badge on each milestone (a year like
// '2015', or a phrase like 'Early years'). `image` is optional — import a
// photo from ../assets and set it, or leave it out.
//
// The milestones below are a starting outline drawn from the About story.
// Replace them with the church's actual dates and details.
// ─────────────────────────────────────────────────────────────────────────────
import img14Years from '../assets/hbc_14_years.jpg'
import imgPastorFamily from '../assets/hbc_pastor_family.jpg'
import imgPrimaryJuniors from '../assets/hbc_primary_juniors.jpg'
import imgSoulwinningStreet from '../assets/hbc_soulwinning_street.jpg'
import imgStringEnsemble from '../assets/hbc_string_ensemble.jpg'
import imgCongregation from '../assets/hbc_congregation.jpg'

export const anniversary = {
  theme: 'Growing Forward',
  image: img14Years,
  verse: {
    text: 'And let us not be weary in well doing: for in due season we shall reap, if we faint not.',
    reference: 'Galatians 6:9',
  },
}

export const historyIntro =
  'From a humble beginning in Bucal, Calamba, God has grown a small gathering of believers into a church family that worships together, raises up the next generation, and carries the Gospel into the community.'

export const milestones = [
  {
    period: '2012',
    title: 'A humble beginning',
    text: 'Harvesters Baptist Church Calamba begins with a small group of believers gathering to worship the Lord and hear the preaching of His Word.',
  },
  {
    period: 'Early years',
    title: 'Rooted in the Word',
    text: 'Sunday School, the worship service, and a midweek prayer meeting become the steady rhythm of church life, with the Old King James Version Bible at the center of it all.',
    image: imgCongregation,
  },
  {
    period: 'Growing years',
    title: 'Reaching the next generation',
    text: 'Youth and Children’s ministries take shape, including Primary–Juniors classes and Vacation Bible School, to guide young people in knowing God.',
    image: imgPrimaryJuniors,
  },
  {
    period: 'Growing years',
    title: 'Going out with the Gospel',
    text: 'Soul winning and Gospel tract distribution carry the message beyond the church walls, alongside the church’s support for missions.',
    image: imgSoulwinningStreet,
  },
  {
    period: 'Growing years',
    title: 'A family of ministries',
    text: 'Music ministry, choir, fellowships for men and women, and home Bible studies grow, giving every member a place to belong and serve.',
    image: imgStringEnsemble,
  },
  {
    period: '2026',
    title: '14 years of Growing Forward',
    text: 'The church celebrates 14 years of God’s faithfulness under the theme “Growing Forward” (Galatians 6:9–10) and looks ahead to the next chapter.',
    image: img14Years,
  },
]

export const pastorFeature = {
  image: imgPastorFamily,
  title: 'Shepherding with a family’s heart',
  text: 'Pastor Anjo Tongol and his wife Eunice lead the church family together, serving alongside a team of faithful workers who help the church keep growing forward.',
  caption: 'Pastor Anjo & Eunice Tongol with their family',
}
