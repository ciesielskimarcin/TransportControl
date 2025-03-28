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
    api: WorkspaceAPI
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




export default function BodyComponent(props: BodyComponentProps) {

    const [transports, setTransports] = useState<TransportTypeEntity[]>(initialState)
    const [transportName, setTransportName] = useState("");
    const container = document.querySelector("div[id='tree-with-transports']");
    const root = container?.querySelector('modus-tree-view');
    const addButton = container?.querySelector<HTMLButtonElement>("modus-button[id='add']");
    const removeButton = container?.querySelector<HTMLButtonElement>("modus-button[id='remove']");
    const editButton = container?.querySelector<HTMLButtonElement>("modus-button[id='edit']");

    const dupaButton = container?.querySelector<HTMLButtonElement>("modus-button[id='dupa']");

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
        console.log("tranportname:", id);
        console.log("container:", container);
        console.log("root:", root);
        console.log("addButton:", addButton);
        console.log("removeButton:", removeButton);
        console.log("dupaButton:", dupaButton);

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
                    editButton={editButton} />
                <TransportCategoriesList transports={transports} giveTransportName={giveTransportName} />
                <CheckTransport transports={transports} api={props.api} sortTransportsByCheckOrder={sortTransportsByCheckOrder}/>
            </div>
        </>
    )

}