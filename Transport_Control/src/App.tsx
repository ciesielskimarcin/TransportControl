import { useState, useEffect } from 'react'

import * as WorkspaceAPI from "trimble-connect-workspace-api"
import Header from '../src/components/Header'
import ActionBar from './components/ActionBar'
import TransportCategoriesList from './components/TransportCategoriesList'
import CheckTransport from './components/CheckTransport'
import BodyComponent from './components/BodyComponent'
import './App.css'



function App() {
  const [tcAPI, setTcApi] = useState<WorkspaceAPI.WorkspaceAPI>()

  useEffect(() => {
    async function connectWithTcAPI() {
      const api = await WorkspaceAPI.connect(window.parent, (_event: any, _data: any) => {

      });
      setTcApi(api);
    }

    connectWithTcAPI();
  }, []);

  return (
    <>
      <Header />
      <div>
        {tcAPI && (<BodyComponent api={tcAPI}/>)}
      </div>
    </>
  )
}

export default App
