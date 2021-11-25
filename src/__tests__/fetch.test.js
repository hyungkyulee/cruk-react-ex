// __tests__/fetch.test.js
import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from '../components/fetchHook'
import { ThemeProvider } from "styled-components"
import { 
  crukTheme
} from "@cruk/cruk-react-components";
import LoadingProvider from "../components/loadingContext"

const server = setupServer(
  rest.get("/search", (req, res, ctx) => {
    const query = req.url.searchParams
    const keywords = query.get("keywords")
    return res(ctx.json(
      {
        "collection": {
            "version": "1.0",
            "href": "http://images-api.nasa.gov/search?keywords=abc",
            "items": [
                {
                    "href": "https://images-assets.nasa.gov/video/iss063m261131609_EXP_63_ABC_NASA_Social_Cassidy_200422/collection.json",
                    "data": [
                        {
                            "center": "JSC",
                            "title": "iss063m261131609_EXP_63_ABC_NASA_Social_Cassidy_200422",
                            "keywords": [
                                "Expedition 63",
                                "Chris Cassidy",
                                "Earth Day",
                                "ABC"
                            ],
                            "nasa_id": "iss063m261131609_EXP_63_ABC_NASA_Social_Cassidy_200422",
                            "media_type": "video",
                            "date_created": "2020-04-22T00:00:00Z",
                            "description": "SPACE STATION COMMANDER DISCUSSES EARTH DAY ON ITS 50TH ANNIVERSARY  Aboard the International Space Station, Expedition 63 Commander Chris Cassidy of NASA discussed the view of Earth from orbit and other issues related to the 50th anniversary of Earth Day during a downlink conversation April 22 with ABC News. Cassidy also took the opportunity to answer questions about Earth Day for NASA social media sites during the in-flight event. Cassidy arrived at the station April 9 for a six-and-a-half month mission."
                        }
                    ],
                    "links": [
                        {
                            "href": "https://images-assets.nasa.gov/video/iss063m261131609_EXP_63_ABC_NASA_Social_Cassidy_200422/iss063m261131609_EXP_63_ABC_NASA_Social_Cassidy_200422~thumb.jpg",
                            "rel": "preview",
                            "render": "image"
                        },
                        {
                            "href": "https://images-assets.nasa.gov/video/iss063m261131609_EXP_63_ABC_NASA_Social_Cassidy_200422/iss063m261131609_EXP_63_ABC_NASA_Social_Cassidy_200422.srt",
                            "rel": "captions"
                        }
                    ]
                },
                {
                    "href": "https://images-assets.nasa.gov/video/iss061m260281119_EXP_61_PAO_ABC_NEWS_AP_Koch_2020_0128/collection.json",
                    "data": [
                        {
                            "center": "JSC",
                            "title": "iss061m260281119_EXP_61_PAO_ABC_NEWS_AP_Koch_2020_0128",
                            "nasa_id": "iss061m260281119_EXP_61_PAO_ABC_NEWS_AP_Koch_2020_0128",
                            "date_created": "2020-01-28T00:00:00Z",
                            "keywords": [
                                "Expedition 61",
                                "Christina Koch",
                                "ABC News",
                                "AP",
                                "Associated Press"
                            ],
                            "media_type": "video",
                            "description": "RECORD-SETTING SPACE STATION CREW MEMBER DISCUSSES END OF MISSION WITH THE MEDIA  Aboard the International Space Station, Expedition 61 Flight Engineer Christina Koch discussed the impending completion of her record-setting mission during a pair of interviews Jan. 28 with ABC News and the Associated Press. Koch is scheduled to return to Earth Feb. 6 on a Russian Soyuz spacecraft for a parachute-assisted landing in Kazakhstan having logged 328 days in space --- more than any woman in history in the second longest single spaceflight by a U.S. astronaut."
                        }
                    ],
                    "links": [
                        {
                            "href": "https://images-assets.nasa.gov/video/iss061m260281119_EXP_61_PAO_ABC_NEWS_AP_Koch_2020_0128/iss061m260281119_EXP_61_PAO_ABC_NEWS_AP_Koch_2020_0128~thumb.jpg",
                            "rel": "preview",
                            "render": "image"
                        },
                        {
                            "href": "https://images-assets.nasa.gov/video/iss061m260281119_EXP_61_PAO_ABC_NEWS_AP_Koch_2020_0128/iss061m260281119_EXP_61_PAO_ABC_NEWS_AP_Koch_2020_0128.srt",
                            "rel": "captions"
                        }
                    ]
                },
                {
                    "href": "https://images-assets.nasa.gov/video/iss065m261831419_Expedition_65_Inflight_Interview_with_CBS_News_and_ABC_News_210702/collection.json",
                    "data": [
                        {
                            "description": "SPACE STATION CREW DISCUSSES SPACEWALKS AND LIFE ON ORBIT WITH CBS AND ABC  Aboard the International Space Station, Expedition 65 Flight Engineers Shane Kimbrough of NASA and Thomas Pesquet of ESA (European Space Agency) discussed their recent spacewalks and life and work aboard the orbital outpost during a pair of in-flight interviews July 2 with CBS News and ABC News. Kimbrough and Pesquet launched to the station in April aboard a SpaceX Falcon 9 rocket and recently conducted a series of spacewalks to install and deploy the first pair of six new solar arrays that will augment the station’s power capability for the future.",
                            "title": "iss065m261831419_Expedition_65_Inflight_Interview_with_CBS_News_and_ABC_News_210702",
                            "keywords": [
                                "Expedition 65",
                                "ABC News",
                                "CBS News",
                                "Shane Kimbrough",
                                "Thomas Pesquet"
                            ],
                            "nasa_id": "iss065m261831419_Expedition_65_Inflight_Interview_with_CBS_News_and_ABC_News_210702",
                            "media_type": "video",
                            "date_created": "2021-07-02T00:00:00Z",
                            "center": "JSC"
                        }
                    ],
                    "links": [
                        {
                            "href": "https://images-assets.nasa.gov/video/iss065m261831419_Expedition_65_Inflight_Interview_with_CBS_News_and_ABC_News_210702/iss065m261831419_Expedition_65_Inflight_Interview_with_CBS_News_and_ABC_News_210702~thumb.jpg",
                            "rel": "preview",
                            "render": "image"
                        },
                        {
                            "href": "https://images-assets.nasa.gov/video/iss065m261831419_Expedition_65_Inflight_Interview_with_CBS_News_and_ABC_News_210702/iss065m261831419_Expedition_65_Inflight_Interview_with_CBS_News_and_ABC_News_210702.srt",
                            "rel": "captions"
                        }
                    ]
                },
                {
                    "href": "https://images-assets.nasa.gov/video/iss064m263571334_Expedition_64_Inflight_Interview_ABC_Fox5_201222/collection.json",
                    "data": [
                        {
                            "center": "JSC",
                            "title": "iss064m263571334_Expedition_64_Inflight_Interview_ABC_Fox5_201222",
                            "keywords": [
                                "Expedition 64",
                                "ABC News",
                                "Fox5",
                                "Kate Rubins",
                                "Victor Glover"
                            ],
                            "nasa_id": "iss064m263571334_Expedition_64_Inflight_Interview_ABC_Fox5_201222",
                            "date_created": "2020-12-22T00:00:00Z",
                            "media_type": "video",
                            "description": "SPACE STATION CREW DISCUSSES LIFE IN SPACE WITH ABC NEWS AND WNYW-TV  Aboard the International Space Station, Expedition 64 Flight Engineers Kate Rubins and Victor Glover of NASA discussed life and research on the orbital lab with ABC News and WNYW-TV, New York in a pair of in-flight interviews Dec. 22. Rubins arrived on the station in October aboard a Russian Soyuz spacecraft, while Glover followed a month later, launching on the SpaceX Crew Dragon spacecraft “Resilience”."
                        }
                    ],
                    "links": [
                        {
                            "href": "https://images-assets.nasa.gov/video/iss064m263571334_Expedition_64_Inflight_Interview_ABC_Fox5_201222/iss064m263571334_Expedition_64_Inflight_Interview_ABC_Fox5_201222~thumb.jpg",
                            "rel": "preview",
                            "render": "image"
                        },
                        {
                            "href": "https://images-assets.nasa.gov/video/iss064m263571334_Expedition_64_Inflight_Interview_ABC_Fox5_201222/iss064m263571334_Expedition_64_Inflight_Interview_ABC_Fox5_201222.srt",
                            "rel": "captions"
                        }
                    ]
                },
                {
                    "href": "https://images-assets.nasa.gov/video/iss065m261251454_Expedition_65_InFlight_AP_ABCNews_210505/collection.json",
                    "data": [
                        {
                            "center": "JSC",
                            "title": "iss065m261251454_Expedition_65_InFlight_AP_ABCNews_210505",
                            "keywords": [
                                "Expedition 65",
                                "Associated Press",
                                "ABC News",
                                "Megan McArthur",
                                "Shane Kimbrough",
                                "Mark Vande Hei"
                            ],
                            "nasa_id": "iss065m261251454_Expedition_65_InFlight_AP_ABCNews_210505",
                            "date_created": "2021-05-05T00:00:00Z",
                            "media_type": "video",
                            "description": "SPACE STATION CREW DISCUSSES LIFE IN SPACE ON ANNIVERSARY OF ALAN SHEPARD’S FLIGHT  Aboard the International Space Station, Expedition 65 Flight Engineers Mark Vande Hei, Shane Kimbrough and Megan McArthur of NASA shared their thoughts on their mission and the history surrounding the timing of their flight during a pair of in-flight interviews May 5 with the Associated Press and ABC News. The interviews took place on the 60th anniversary of Alan Shepard’s suborbital flight on May 5, 1961 aboard the Mercury capsule “Freedom 7” to become the first American to fly in space."
                        }
                    ],
                    "links": [
                        {
                            "href": "https://images-assets.nasa.gov/video/iss065m261251454_Expedition_65_InFlight_AP_ABCNews_210505/iss065m261251454_Expedition_65_InFlight_AP_ABCNews_210505~thumb.jpg",
                            "rel": "preview",
                            "render": "image"
                        },
                        {
                            "href": "https://images-assets.nasa.gov/video/iss065m261251454_Expedition_65_InFlight_AP_ABCNews_210505/iss065m261251454_Expedition_65_InFlight_AP_ABCNews_210505.srt",
                            "rel": "captions"
                        }
                    ]
                },
                {
                    "href": "https://images-assets.nasa.gov/video/NHQ_2018_0118_Station Crew Member Discusses Life in Space with Media/collection.json",
                    "data": [
                        {
                            "center": "HQ",
                            "title": "Station Crew Member Discusses Life in Space with Media",
                            "keywords": [
                                "NASA",
                                "International Space Station",
                                "Expedition 54",
                                "Flight Engineer",
                                "Scott Tingle",
                                "ABC Digital Network",
                                "Space.com",
                                "astronaut",
                                "interview"
                            ],
                            "nasa_id": "NHQ_2018_0118_Station Crew Member Discusses Life in Space with Media",
                            "date_created": "2018-01-18T00:00:00Z",
                            "media_type": "video",
                            "description": "Aboard the International Space Station, Expedition 54 Flight Engineer Scott Tingle of NASA discussed life and research on the orbital complex during an in-flight interview session Jan. 18 with the ABC Digital Network and Space.com."
                        }
                    ],
                    "links": [
                        {
                            "href": "https://images-assets.nasa.gov/video/NHQ_2018_0118_Station Crew Member Discusses Life in Space with Media/NHQ_2018_0118_Station Crew Member Discusses Life in Space with Media~thumb.jpg",
                            "rel": "preview",
                            "render": "image"
                        },
                        {
                            "href": "https://images-assets.nasa.gov/video/NHQ_2018_0118_Station Crew Member Discusses Life in Space with Media/NHQ_2018_0118_Station Crew Member Discusses Life in Space with Media.srt",
                            "rel": "captions"
                        }
                    ]
                },
                {
                    "href": "https://images-assets.nasa.gov/video/iss058m260661619_SpaceX_DM1_Network_Interviews_March_7_2019/collection.json",
                    "data": [
                        {
                            "center": "JSC",
                            "title": "SpaceX_DM1_Network_Interviews_with_Expedition_58_March_7_2019",
                            "keywords": [
                                "Space X",
                                "DM-1",
                                "Expedition 58",
                                "ABC",
                                "NBC",
                                "CBS",
                                "Crew Dragon",
                                "David Saint-Jacques",
                                "Anne McClain"
                            ],
                            "nasa_id": "iss058m260661619_SpaceX_DM1_Network_Interviews_March_7_2019",
                            "date_created": "2019-03-07T00:00:00Z",
                            "media_type": "video",
                            "description": "SPACE STATION CREW MEMBERS DISCUSS THE SPACEX CREW DRAGON’S FIRST MISSION TO SPACE  Aboard the International Space Station, Expedition 58 Flight Engineers Anne McClain of NASA and David Saint-Jacques of the Canadian Space Agency gather in the station’s Harmony module to discuss life in space during a live event on March 7, 2019. The crew provides remarks on the recent arrival of the uncrewed SpaceX Crew Dragon spacecraft during the company’s Demo-1 mission for NASA’s Commercial Crew Program, which docked to the space station on March 3, 2019. Crew Dragon is the first American spacecraft to autonomously dock to the space station. The spacecraft will spend five days attached to station before returning back to Earth by splashing down in the Atlantic ocean. McClain and Saint-Jacques are in the third month of a planned six-and-a-half month mission on the international laboratory."
                        }
                    ],
                    "links": [
                        {
                            "href": "https://images-assets.nasa.gov/video/iss058m260661619_SpaceX_DM1_Network_Interviews_March_7_2019/iss058m260661619_SpaceX_DM1_Network_Interviews_March_7_2019~thumb.jpg",
                            "rel": "preview",
                            "render": "image"
                        },
                        {
                            "href": "https://images-assets.nasa.gov/video/iss058m260661619_SpaceX_DM1_Network_Interviews_March_7_2019/iss058m260661619_SpaceX_DM1_Network_Interviews_March_7_2019.srt",
                            "rel": "captions"
                        }
                    ]
                }
            ],
            "metadata": {
                "total_hits": 7
            }
        }
      }
    ))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('GET with keywords of earth', async () => {
  render(
    <ThemeProvider theme={crukTheme}>
    <LoadingProvider>
      <Fetch url="/search?keywords=abc" />
    </LoadingProvider>
    </ThemeProvider>
  )
  
  await waitFor(() => {
    expect(screen.getByText('iss063m261131609_EXP_63_ABC_NASA_Social_Cassidy_200422')).toBeInTheDocument()
  })
})

test('handles server error', async () => {
  server.use(
    rest.get('/search', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(
    <ThemeProvider theme={crukTheme}>
    <LoadingProvider>
      <Fetch url="/search?keywords=abc" />
    </LoadingProvider>
    </ThemeProvider>
  )

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('No Data Found !!')
  // expect(screen.getByRole('button')).not.toBeDisabled()
})

test('GET with corner case', async () => {
  render(
    <ThemeProvider theme={crukTheme}>
    <LoadingProvider>
      <Fetch url="https://images-api.nasa.gov/search?keywords=aaaa&media_type=audio&year_start=2020" />
    </LoadingProvider>
    </ThemeProvider>
  )

  await waitFor(() => {
    expect(screen.getByText('No Data Found !!')).toBeInTheDocument()
  })
})
