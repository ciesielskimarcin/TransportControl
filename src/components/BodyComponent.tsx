import { useEffect, useState } from "react";
import { TransportType } from "../Enums/TransportType";
import { TransportTypeEntity } from "../Entities/TransportTypeEntity";
import ActionBar from './ActionBar'
import TransportCategoriesList from "./TransportCategoriesList";
import CheckTransport from "./CheckTransport";
import _ from "lodash";
import { WorkspaceAPI } from "trimble-connect-workspace-api";
import { PropertiesNamesEntity } from "../Entities/PropertiesNamesEntity";
import { v4 as uuidv4 } from 'uuid';

type BodyComponentProps = {
    api: WorkspaceAPI
}

const initialState = [
    {
        name: "Standard",
        id: uuidv4(),
        checkOrder: 1,
        type: TransportType.Standard,
        transportFirstDimension: 2438.4,
        transportSecondDimension: 2590.8,
        transportThirdDimension: 16154.4,
        weight: 40823,
        elements: [],
    },
    {
        name: "One Escort",
        id: uuidv4(),
        checkOrder: 2,
        type: TransportType.Standard,
        transportFirstDimension: 2438.4,
        transportSecondDimension: 4343.4,
        transportThirdDimension: 16154.4,
        weight: 40823,
        elements: [],
    },
    {
        name: "Two Escorts",
        id: uuidv4(),
        checkOrder: 3,
        type: TransportType.Standard,
        transportFirstDimension: 2438.4,
        transportSecondDimension: 4978.4,
        transportThirdDimension: 16154.4,
        weight: 40823,
        elements: [],
    },
    {
        name: "Non-Standard",
        id: uuidv4(),
        checkOrder: 99,
        type: TransportType.NonStandard,
        transportFirstDimension: Number.MAX_VALUE,
        transportSecondDimension: Number.MAX_VALUE,
        transportThirdDimension: Number.MAX_VALUE,
        weight: Number.MAX_VALUE,
        elements: [],
    },
    {
        name: "No-Data",
        id: uuidv4(),
        checkOrder: 100,
        type: TransportType.NoData,
        transportFirstDimension: 0,
        transportSecondDimension: 0,
        transportThirdDimension: 0,
        weight: 0,
        elements: [],
    },]


const initialProperties = {
    widthProperty: "Dimensions.WIDTH",
    heightProperty: "Dimensions.HEIGHT",
    lengthProperty: "Dimensions.LENGTH",
    weightProperty: "Dimensions.WEIGHT",
}




export default function BodyComponent(props: BodyComponentProps) {

    const [transports, setTransports] = useState<TransportTypeEntity[]>(() => {
        const saved = localStorage.getItem("transports");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse transports from localStorage:", e);
            }
        }
        return initialState;
    });
    const [transportName, setTransportName] = useState("");
    const [selectedtransport, setSelectedTransport] = useState<TransportTypeEntity>();
    const container = document.querySelector("div[id='tree-with-transports']");
    const root = container?.querySelector('modus-tree-view');
    const addButton = container?.querySelector<HTMLButtonElement>("modus-button[id='add']");
    const removeButton = container?.querySelector<HTMLButtonElement>("modus-button[id='remove']");
    const editButton = container?.querySelector<HTMLButtonElement>("modus-button[id='edit']");
    const [propertiesNames, setPropertiesNames] = useState<PropertiesNamesEntity>(() => {
        const saved = localStorage.getItem("propertiesNames");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse propertiesNames from localStorage:", e);
            }
        }
        return initialProperties;
    });


    useEffect(() => {
        localStorage.setItem("transports", JSON.stringify(transports));
    }, [transports]);

    useEffect(() => {
        localStorage.setItem("propertiesNames", JSON.stringify(propertiesNames));
    }, [propertiesNames]);



    const sortTransportsByCheckOrder = () => {
        setTransports((prevTransports) => {
            return [...prevTransports].sort((a, b) => {
                if (a.checkOrder === null && b.checkOrder === null) return 0;
                if (a.checkOrder === null) return 1; // `null` values go to the end
                if (b.checkOrder === null) return -1;
                return a.checkOrder - b.checkOrder; // Sort ascending by `checkOrder`
            });
        });
    };

    function giveTransportName(id: string) {
        setTransportName(id);
        const transport = transports.find(item => item.name === id);
        setSelectedTransport(transport);
    };

    const resetTransports = () => {
        setTransports(initialState);
        localStorage.removeItem("transports");
    };

    const resetPropertiesNames = () => {
        setPropertiesNames(initialProperties);
        localStorage.removeItem("propertiesNames");
    };


    return (
        <>
            <div className="content-panel" id="tree-with-transports">
                <ActionBar
                    transports={transports}
                    setTransports={setTransports}
                    sortTransportsByCheckOrder={sortTransportsByCheckOrder}
                    transportName={transportName}
                    container={container}
                    root={root}
                    addButton={addButton}
                    removeButton={removeButton}
                    editButton={editButton}
                    selectedtransport={selectedtransport}
                    setSelectedTransport={setSelectedTransport}
                    resetTransports={resetTransports}
                    api={props.api}
                    setPropertiesNames={setPropertiesNames}
                    propertiesNames={propertiesNames} 
                    resetPropertiesNames={resetPropertiesNames}/>
                <TransportCategoriesList transports={transports} giveTransportName={giveTransportName} />
                <CheckTransport
                    transports={transports}
                    api={props.api}
                    sortTransportsByCheckOrder={sortTransportsByCheckOrder}
                    propertiesNames={propertiesNames} />
            </div>
        </>
    )

}