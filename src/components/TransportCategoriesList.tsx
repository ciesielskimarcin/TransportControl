import { ModusTreeView, ModusTreeViewItem } from "@trimble-oss/modus-react-components"
import { TransportTypeEntity } from "../Entities/TransportTypeEntity";
import _ from "lodash";

type TransportCategoriesListProps = {
    transports: TransportTypeEntity[]
    giveTransportName: (id: string) => void
}

export default function TransportCategoriesList(props: TransportCategoriesListProps) {



    // const [transportName, setTransportName] = useState("");
    // function giveTransportName(id: string) {
    //     setTransportName(id);
    //     console.log("tranportname:", id);
    // };



    return (
        <div>
            <ModusTreeView size="condensed">
                <ModusTreeViewItem nodeId="2" label="Transport categories" id="tree-with-transports">
                    {
                        _.map(_.groupBy(props.transports, (p => p.name)), (val, key) =>
                            <ModusTreeViewItem id="transports_entities" onItemClick={(() => {
                                props.giveTransportName(key)
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