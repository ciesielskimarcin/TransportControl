import { ModusTreeView, ModusTreeViewItem } from "@trimble-oss/modus-react-components"
import { useState } from "react";
import { TransportType } from "../Enums/TransportType";
import { TransportTypeEntity } from "../Entities/TransportTypeEntity";
import ActionBar from './ActionBar'
import TransportCategoriesList from "./TransportCategoriesList";
import CheckTransport from "./CheckTransport";
import _ from "lodash";
import { WorkspaceAPI } from "trimble-connect-workspace-api";

type BodyComponentProps = {
    api : WorkspaceAPI
}

const initialState = [{
    name: "Standard",
    checkOrder: 1,
    type: TransportType.Standard,
    transportFirstDimension: 2438.4,
    transportSecondDimension: 2590.8,
    transportThirdDimension: 16154.4,
    weight: 151,
    elements: [],
},
{
    name: "withOneEscort",
    checkOrder: 2,
    type: TransportType.Standard,
    transportFirstDimension: 2438.4,
    transportSecondDimension: 4343.4,
    transportThirdDimension: 16154.4,
    weight: 22500,
    elements: [],
},
{
    name: "withTwoEscort",
    checkOrder: 3,
    type: TransportType.Standard,
    transportFirstDimension: 2438.4,
    transportSecondDimension: 4978.4,
    transportThirdDimension: 16154.4,
    weight: 40823.31,
    elements: [],
},
{
    name: "NonStandard",
    checkOrder: 99,
    type: TransportType.NonStandard,
    transportFirstDimension: Number.MAX_VALUE,
    transportSecondDimension: Number.MAX_VALUE,
    transportThirdDimension: Number.MAX_VALUE,
    weight: Number.MAX_VALUE,
    elements: [],
},]

export default function BodyComponent(props: BodyComponentProps){

    const [transports, setTransports] = useState<TransportTypeEntity[]>(initialState)

    return (
        <>
          <div>
            <ActionBar />
            <TransportCategoriesList chuj={transports} />
            <CheckTransport transports={transports} api={props.api}/>
            {/* <CheckTransport/> */}
          </div>
        </>
      )
    
}