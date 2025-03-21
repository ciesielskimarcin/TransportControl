import { ModusTreeView, ModusTreeViewItem } from "@trimble-oss/modus-react-components"
import { useState } from "react";
import { TransportType } from "../Enums/TransportType";
import { TransportTypeEntity } from "../Entities/TransportTypeEntity";
import _ from "lodash";

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


export default function TransportCategoriesList() {

    const [transports, setTransports] = useState<TransportTypeEntity[]>(initialState)


    const [transportName, setTransportName] = useState("");

    function giveTransportName(id: string) {
        setTransportName(id);
        console.log("tranportname:", id);
    };



    return (
        <div>
            <ModusTreeView size="condensed">
                <ModusTreeViewItem nodeId="2" label="Transport categories" id="tree-with-transports">
                    {
                        _.map(_.groupBy(transports, (p => p.name)), (val, key) =>
                            <ModusTreeViewItem id="transports_entities" onItemClick={(() => {
                                giveTransportName(key)
                            })}
                                nodeId={key}
                                label={key}
                                key={key}>{
                                    val.map((transport, index) => (
                                        <>
                                            <ModusTreeViewItem nodeId={`${key}-${index}-check-order`} label={`Check Order: ${transport.checkOrder}`} />
                                            <ModusTreeViewItem nodeId={`${key}-${index}-first-dimension`} label={`First Dimension: ${transport.transportFirstDimension}`} />
                                            <ModusTreeViewItem nodeId={`${key}-${index}-second-dimension`} label={`Second Dimension: ${transport.transportSecondDimension}`} />
                                            <ModusTreeViewItem nodeId={`${key}-${index}-third-dimension`} label={`Third Dimension: ${transport.transportThirdDimension}`} />
                                            <ModusTreeViewItem nodeId={`${key}-${index}-weight`} label={`Weight: ${transport.weight}`} />
                                        </>
                                    ))
                                }
                            </ModusTreeViewItem>
                        )
                    }
                </ModusTreeViewItem>
            </ModusTreeView>
        </div>
    )
}