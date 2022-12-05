import Home from './index'
import '../styles/globals.css'
import reducer,{initialState} from './reducer'
import StateProvider from './StateProvider'

function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />
    

}

export default MyApp
