import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import { 
  Avatar,
  Badge,
  Box,
  Text
} from "@cruk/cruk-react-components"
import _ from 'lodash'
import { LoadingContext } from "../components/loadingContext"

const GridWrapper = styled.div`
  display: flex;
  margin: 1rem 0.5rem 1rem 0rem;
  padding: 0rem;
  background: transparent;
  ${props => props.vertical && "flex-direction: column;"}

  > * {
    flex: 1;
    &:not(:first-child) {
      ${props => props.vertical ? "margin-top" : "margin-left"}: 1rem;
      ${props => props.vertical ? "height: auto" : "width: 80vw"};
    }
  }
`

const GridColumn = styled.div`
  padding: 0.25rem 0.5rem;
  background: transparent;
`

const Fetch = ({url}) => {
  const [isLoading, setLoading] = useContext(LoadingContext)
  const [items, setItems] = useState([])
  
  useEffect(() => {
    (async () => {
      const collection = await getSearchItemsByKeywords(url)
      if (collection) {
        setItems(collection.items)
      }

      if(isLoading) setLoading(false)
    })()
  }, [isLoading, setLoading, url])

  const getSearchItemsByKeywords = async (url) => {
    const response = await fetch(url)

    return (await response.json()).collection
  }

  return (
    <GridWrapper vertical>
      {items && 
        items.map((item, i) => (
            (i<10) ? (
              <GridWrapper key={i}>
                <GridColumn>
                  <div style={{margin: '10px auto'}}>
                  {item.links ? <Avatar size="xl" url={_.first(item.links).href} /> : <Badge textColor="textOnPrimary"> No Image</Badge>}
                  </div>
                </GridColumn>
                <GridWrapper vertical>
                  <GridColumn><h3>{_.first(item.data).title}</h3></GridColumn>
                  <GridWrapper>
                    <GridColumn>{_.first(item.data).media_type}</GridColumn>
                    <GridColumn>{_.first(item.data).keywords.toString()}</GridColumn>
                  </GridWrapper>
                  <GridColumn>{_.first(item.data).description}</GridColumn>
                </GridWrapper>
              </GridWrapper>
            ) : null
        ))
      }
      {
        (items.length <= 0) && 
          <GridWrapper>
            <GridColumn>
              <Box
                backgroundColor="primary"
                originalStoryFn={function noRefCheck(){}}
              >
                <Text role="alert" textColor="textOnPrimary">
                  No Data Found !!
                </Text>
              </Box>
            </GridColumn>
          </GridWrapper>
      }
    </GridWrapper>
  )
}

export default Fetch