import { GraphQLClient } from 'graphql-request'

export default async ({ body}, res) => {
    const url = "https://api-ap-northeast-1.graphcms.com/v2/ckwmamts7065w01z25ysp28mq/master"
    const graphcms = new GraphQLClient(url, {
        headers: { "Authorization" : "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzgyOTU1NTMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1ub3J0aGVhc3QtMS5ncmFwaGNtcy5jb20vdjIvY2t3bWFtdHM3MDY1dzAxejI1eXNwMjhtcS9tYXN0ZXIiLCJodHRwczovL21hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiI1ZWUwODc4OS0wMWQzLTRjOTEtODFlMC02MmU3N2IyNzcwYjUiLCJqdGkiOiJja3dtZXZmOGgwYjJ4MDF4dmRkMzU2NDI0In0.Wox4lrDauFVSgpNcYZFHXpzixmlOlGMu8dCJXg4OoyKBSxjKYFS6Y93a5TmrNbiD0pTtN3_jTkBufFNSx1_Fa7DfQ2f-oQSHuYDA0r4dUWETJx5YbQsu5jv1_Ba4w_5NU6CfkM5hGAodSjxBf3XrGKtadDAIs9HBmtWXnFNxxbFWBr-i7X7RXbe4Vt0TjDNX3Gzh_f7gJ054Nmr8TEbrrDA8cotDAiNjtXdmXFgMztuhogWiekOZJgFhxQtbCiy0b50L1t0_IsZ_QWRjhX33X6pjBoygVpokoQAGGOoP8WczPDk1h_K6LHDCR1WdWU6eqKBUP6imeyF7NQ43fWdsnayRhZyXvHlIIwOVbC9ymh0LsrQDHAnOQAf-KePJ9mUAf8Fqvuow4BvReeWPpEiBqJO1Epw6vIDnwgB6ym0GMShqvDxgRpcgGlZXitR_XfAfKG9eMrPbIwSqQY0N1xJM4iWTaKk5okIurzpROZ46taobrplZs4yK2TmFMGHC2WF8CnTmHDPdy3yxHPWY2Oe2VG-TOIDv5zmH1AQBbq4FB5vtRh3Eo819pMMrFnkwX_bHoTlrJYnpEvdWlBoHfuBGYYI7ShoT1thFViAbMCWNh5-iPKaLP6mEbCMQvk5So-hQhwJo8NOYuqILzu4ZhiUek5bQTAPNpTtYEhjrHPpSZ5o"}
    })

    await graphcms.request(
        `
        mutation($slug: String!) {
          updateVideo(where: 
            { slug: $slug}, 
            data: { seen: true}
          ) {
            id,
            title,
            seen
          }
        }
        `,
        { slug: body.slug }
    )

    await graphcms.request(
        `mutation publishVideo($slug: String) {
        publishVideo(where: { slug: $slug}, to: PUBLISHED) {
            slug
            }
        }`,
        { slug: body.slug }
    )

    res.status(201).json({ slug: body.slug })
}