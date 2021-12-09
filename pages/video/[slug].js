import { gql, GraphQLClient } from 'graphql-request'
import { useState } from 'react';

export const getServerSideProps = async (pageContext) => {
  const url = "https://api-ap-northeast-1.graphcms.com/v2/ckwmamts7065w01z25ysp28mq/master"
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzgyOTU1NTMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1ub3J0aGVhc3QtMS5ncmFwaGNtcy5jb20vdjIvY2t3bWFtdHM3MDY1dzAxejI1eXNwMjhtcS9tYXN0ZXIiLCJodHRwczovL21hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiI1ZWUwODc4OS0wMWQzLTRjOTEtODFlMC02MmU3N2IyNzcwYjUiLCJqdGkiOiJja3dtZXZmOGgwYjJ4MDF4dmRkMzU2NDI0In0.Wox4lrDauFVSgpNcYZFHXpzixmlOlGMu8dCJXg4OoyKBSxjKYFS6Y93a5TmrNbiD0pTtN3_jTkBufFNSx1_Fa7DfQ2f-oQSHuYDA0r4dUWETJx5YbQsu5jv1_Ba4w_5NU6CfkM5hGAodSjxBf3XrGKtadDAIs9HBmtWXnFNxxbFWBr-i7X7RXbe4Vt0TjDNX3Gzh_f7gJ054Nmr8TEbrrDA8cotDAiNjtXdmXFgMztuhogWiekOZJgFhxQtbCiy0b50L1t0_IsZ_QWRjhX33X6pjBoygVpokoQAGGOoP8WczPDk1h_K6LHDCR1WdWU6eqKBUP6imeyF7NQ43fWdsnayRhZyXvHlIIwOVbC9ymh0LsrQDHAnOQAf-KePJ9mUAf8Fqvuow4BvReeWPpEiBqJO1Epw6vIDnwgB6ym0GMShqvDxgRpcgGlZXitR_XfAfKG9eMrPbIwSqQY0N1xJM4iWTaKk5okIurzpROZ46taobrplZs4yK2TmFMGHC2WF8CnTmHDPdy3yxHPWY2Oe2VG-TOIDv5zmH1AQBbq4FB5vtRh3Eo819pMMrFnkwX_bHoTlrJYnpEvdWlBoHfuBGYYI7ShoT1thFViAbMCWNh5-iPKaLP6mEbCMQvk5So-hQhwJo8NOYuqILzu4ZhiUek5bQTAPNpTtYEhjrHPpSZ5o"
    }
  })

  const pageSlug = pageContext.query.slug

  const query = gql`
    query($pageSlug : String!){
        video(where: {
          slug: $pageSlug
        }){
          createdAt,
          id,
          title,
          description,
          seen,
          slug,
          tags,
          thumbnail{
            url
          },
          mp4{
            url
          }
        }
      }
    `
  const variables = {
    pageSlug,
  }
  const data = await graphQLClient.request(query, variables)
  const video = data.video

  return {
    props: {
      video
    }
  }
}

const changeToSeen = async (slug) => {
  await fetch('/api/changeToSeen', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug })
  })
}

const Video = ({ video }) => {
  const [watching, setWatching] = useState(false)
  return (
    <>
      {!watching && <img className="video-image" src={video.thumbnail.url} alt={video.title} />}
      {!watching && <div className="info">
        <p>{video.tags.join(', ')}</p>
        <p>{video.description}</p>
        <a href="/"><p>go back</p></a>
        <button
          className="video-overlay"
          onClick={() => {
            changeToSeen(video.slug)
            watching ? setWatching(false) : setWatching(true)
          }}
        >PLAY</button>
      </div>}

      {watching && (
        <video width="100%" controls>
          <source src={video.mp4.url} type="video/mp4" />
        </video>
      )}
      <div className="info-footer"
        onClick={() => watching ? setWatching(false) : null}
      ></div>
    </>
  )
}

export default Video