import { gql, GraphQLClient } from 'graphql-request'
import Link from 'next/Link'
import Image from 'next/Image'
import NavBar from '../components/NavBar'
import Section from '../components/Section'
import disneyLogo from '../public/disney-button.png'
import marvelLogo from '../public/marvel-button.png'
import natgeoLogo from '../public/natgeo-button.png'
import starwarsLogo from '../public/star-wars-button.png'
import pixarLogo from '../public/pixar.png'

export const getStaticProps = async () => {
  const url = "https://api-ap-northeast-1.graphcms.com/v2/ckwmamts7065w01z25ysp28mq/master"
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzgyOTU1NTMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1ub3J0aGVhc3QtMS5ncmFwaGNtcy5jb20vdjIvY2t3bWFtdHM3MDY1dzAxejI1eXNwMjhtcS9tYXN0ZXIiLCJodHRwczovL21hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiI1ZWUwODc4OS0wMWQzLTRjOTEtODFlMC02MmU3N2IyNzcwYjUiLCJqdGkiOiJja3dtZXZmOGgwYjJ4MDF4dmRkMzU2NDI0In0.Wox4lrDauFVSgpNcYZFHXpzixmlOlGMu8dCJXg4OoyKBSxjKYFS6Y93a5TmrNbiD0pTtN3_jTkBufFNSx1_Fa7DfQ2f-oQSHuYDA0r4dUWETJx5YbQsu5jv1_Ba4w_5NU6CfkM5hGAodSjxBf3XrGKtadDAIs9HBmtWXnFNxxbFWBr-i7X7RXbe4Vt0TjDNX3Gzh_f7gJ054Nmr8TEbrrDA8cotDAiNjtXdmXFgMztuhogWiekOZJgFhxQtbCiy0b50L1t0_IsZ_QWRjhX33X6pjBoygVpokoQAGGOoP8WczPDk1h_K6LHDCR1WdWU6eqKBUP6imeyF7NQ43fWdsnayRhZyXvHlIIwOVbC9ymh0LsrQDHAnOQAf-KePJ9mUAf8Fqvuow4BvReeWPpEiBqJO1Epw6vIDnwgB6ym0GMShqvDxgRpcgGlZXitR_XfAfKG9eMrPbIwSqQY0N1xJM4iWTaKk5okIurzpROZ46taobrplZs4yK2TmFMGHC2WF8CnTmHDPdy3yxHPWY2Oe2VG-TOIDv5zmH1AQBbq4FB5vtRh3Eo819pMMrFnkwX_bHoTlrJYnpEvdWlBoHfuBGYYI7ShoT1thFViAbMCWNh5-iPKaLP6mEbCMQvk5So-hQhwJo8NOYuqILzu4ZhiUek5bQTAPNpTtYEhjrHPpSZ5o"
    }
  })

  const query = gql`
    query {
      videos{
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        banner{
          url
        },
        thumbnail{
          url
        },
        mp4{
          url
        }
      }
    }
    `

  const accountQuery = gql`
  query{
    account(where: {id:"ckwmc2kn40bd00b9166y9zwrt"}){
      username,
      avatar{
          url
      }
    }
  }
  `

  const data = await graphQLClient.request(query)
  const videos = data.videos
  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account

  return {
      props: {
          videos,
          account
      }
  }
}
const Home = ({ videos, account }) => {

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
  }

  console.log('not seen:', videos.filter(video => video.seen == false || video.seen == null))

  return (
    <>
      <NavBar account={account}/>
      <div className="app">
        <div className="main-video">
          <img src={randomVideo(videos).banner.url}
            alt={randomVideo(videos).title} />
        </div>

        <div className="video-feed">
                    <Link href="#disney">
                        <div className="franchise" id="disney">
                            <Image src={disneyLogo}/>
                        </div>
                    </Link>
                    <Link href="#pixar">
                        <div className="franchise" id="pixar">
                            <Image src={pixarLogo}/>
                        </div>
                    </Link>
                    <Link href="#star-wars">
                        <div className="franchise" id="star-wars">
                            <Image src={starwarsLogo}/>
                        </div>
                    </Link>
                    <Link href="#nat-geo">
                        <div className="franchise" id="nat-geo">
                            <Image src={natgeoLogo}/>
                        </div>
                    </Link>
                    <Link href="#marvel">
                        <div className="franchise" id="marvel">
                            <Image src={marvelLogo}/>
                        </div>
                    </Link>
                </div>

        <Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
        <Section genre={"Funny"} videos={filterVideos(videos, 'funny')} />
        <Section genre={"Animated"} videos={filterVideos(videos, 'animated')} />
        <Section genre={"Family"} videos={filterVideos(videos, 'family')} />
        <Section genre={"Ghost"} videos={filterVideos(videos, 'ghost')} />
      
    </div>

    </>
  )
}

export default Home