import styled from "styled-components"
import * as yup from "yup"
import { Field, Form, Formik } from "formik"
import { 
  Button, 
  TextField, 
  Select
} from "@cruk/cruk-react-components"
import Fetch from '../components/fetchHook'
import { useContext, useState } from "react"
import { LoadingContext } from "../components/loadingContext"

const SiteWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const ErrorMessageWrapper = styled.div`
  margin-bottom: 10px;
`

const style = {
  errorMessageMargin: {
    marginBottom: '10px'
  }
}

const Main = () => {
  const [isLoading, setLoading] = useContext(LoadingContext)
  const [showResult, setShowResult] = useState(false)
  const [queries, setQueries] = useState({
    keywords: '',
    mediaType: '',
    yearStart: ''
  })

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
 
  const validateKeywordsAsync = value => {
    return sleep(100).then(() => {
      if (!value) {
        return 'Please enter keywords to search.';
      }

      if (value.length < 2 || value.lengh > 50) {
        return 'Keywords must be between 2 and 50 characters.'
      }
    })
  }

  const validateMediaTypeAsync = value => {
    return sleep(100).then(() => {
      if (!['audio', 'video', 'image'].includes(value)) {
        return 'Please select a media type.';
      }
    })
  }

  const validateYearStartAsync = value => {
    return sleep(100).then(() => {
      if (!value) {
        return 'Please enter a year to start.'
      }

      if (value.length !== 4 || !value.match(/\d{4}/)) {
        return 'Please enter a valid year.'
      }

      var thisYear = new Date().getFullYear()
      if (parseInt(value) > thisYear) {
        return 'Year must not be in the future.'
      }
    })
  }

  return (
    <SiteWrapper>
      <div>
        <h1>CRUK technical exercise - React</h1>
      </div>
      <div>
        <Formik
          initialValues={{ keywords: '', mediaType: '', yearStart: ''}}
          onSubmit={(values) => {
            setLoading(true)
            setQueries({
              ...queries,
              keywords: values.keywords,
              mediaType: values.mediaType,
              yearStart: values.yearStart
            })
            setShowResult(true)
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field 
                validate={validateKeywordsAsync} 
                name="keywords">
                {({field}) => (
                  <>
                    <TextField
                      errorMessage={errors.keywords && touched.keywords &&
                        <div style={style.errorMessageMargin}>{errors.keywords}</div>
                      }
                      hasError
                      label="Keywords"
                      required
                      {...field}
                    />
                  </>
                )}
              </Field>
              <br />
              <Field 
                validate={validateMediaTypeAsync}
                name="mediaType">
                {({field}) => (
                  <>
                    <Select
                      errorMessage={errors.mediaType && touched.mediaType &&
                        <div>{errors.mediaType}</div>
                      }
                      hasError
                      label="Media type"
                      required
                      {...field}
                    >
                      <option disabled value="">None</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                      <option value="image">Image</option>
                    </Select>
                  </>
                )}
              </Field>
              <br />
              <Field 
                validate={validateYearStartAsync}
                name="yearStart">
                {({field}) => (
                  <>
                    <TextField
                      errorMessage={errors.yearStart && touched.yearStart &&
                        <ErrorMessageWrapper>{errors.yearStart}</ErrorMessageWrapper>
                      }
                      hasError
                      label="Year start"
                      required
                      {...field}
                    />
                  </>
                )}
              </Field>
              <br />
              <Button type="submit" disabled={isLoading}>
                {isLoading?'Submitting...':'Submit'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {showResult &&
        <div>
          <Fetch url={'https://images-api.nasa.gov/search'
            .concat(queries.keywords ? `?keywords=${queries.keywords}`:'')
            .concat(queries.keywords 
              ? (queries.mediaType ? `&media_type=${queries.mediaType}` : '') 
              : (queries.mediaType ? `?media_type=${queries.mediaType}` : ''))
            .concat(queries.keywords || queries.mediaType
              ? (queries.yearStart ? `&year_start=${queries.yearStart}` : '') 
              : (queries.yearStart ? `?year_start=${queries.yearStart}` : ''))} />
        </div>  
      }
      
    </SiteWrapper>
  )
}

export default Main