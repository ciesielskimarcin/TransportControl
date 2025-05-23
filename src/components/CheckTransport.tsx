import { ModusButton, ModusTreeView, ModusTreeViewItem } from "@trimble-oss/modus-react-components"
import { useEffect, useRef, useState } from "react";
import { ObjectProperties, ObjectSelector, WorkspaceAPI } from "trimble-connect-workspace-api";
import { TransportTypeEntity } from "../Entities/TransportTypeEntity";
import _ from "lodash";
import { ModusTreeViewItemCustomEvent } from "@trimble-oss/modus-web-components/dist/types/components";
import { PropertiesNamesEntity } from "../Entities/PropertiesNamesEntity";

type ObjectWithValue = {
    properties: ObjectProperties,
    value: string,
    productName: string | undefined,
    order: number
}

type CheckTransportProps = {
    transports: TransportTypeEntity[],
    api: WorkspaceAPI,
    sortTransportsByCheckOrder: () => void,
    propertiesNames: PropertiesNamesEntity
}

export default function CheckTransport(props: CheckTransportProps) {

    const cancelTriggerRef = useRef(false);
    const [matchedObjects, setMatchedObjects] = useState<ObjectWithValue[]>([]);
    const modelId = useRef<string>('');
    const [showAllButton, setShowAllButton] = useState(false);

    useEffect(() => {
        async function getObjectsProperties() {

            const modelObjects = await props.api.viewer.getObjects();
            modelId.current = modelObjects[0].modelId;
        }
        getObjectsProperties();
    }, [matchedObjects]);


    async function getPropertyValue(modelId: string, objectId: number, propertyName: string): Promise<string> {

        const splitted = propertyName.split('.')
        const set = splitted[0];
        const propertyType = splitted[1];

        const properties = await props.api.viewer.getObjectProperties(modelId, [objectId]);

        const propss = properties[0].properties;
        if (propss === undefined) return '';

        const propertySet = propss.find(p => (p as any).name === set);
        if (propertySet === undefined || propertySet.properties === undefined) return '';

        const property = propertySet.properties.find(p => p.name === propertyType);
        if (property === undefined) return '';

        return property.value.toLocaleString();
    }

    function changeStringToNumber(result: string) {
        const sanitizedResult = result.replace(/,/g, "");
        // change string to number and round
        const numberValue = Math.round(parseFloat(sanitizedResult));

        return numberValue;
    }

    /**
     * Hightlight elements from selected group in TC Viewer 
     * @param groupName - Transport category group to highlight in TC
     */
    function showSelectedGroup(groupName: string) {

        const filtered = matchedObjects.filter(obj => obj.value === groupName);

        const newModelId = modelId.current;

        const objectSelector: ObjectSelector = {
            modelObjectIds: [{ modelId: newModelId, objectRuntimeIds: filtered.map(r => r.properties.id) }]
        };


        props.api.viewer.setSelection(objectSelector, "set");
    }

    function showSelectedItem(itemId: number, e: ModusTreeViewItemCustomEvent<boolean>) {
        e.stopPropagation();
        const filtered = matchedObjects.filter(obj => obj.properties.id === itemId);

        const newModelId = modelId.current;

        const objectSelector: ObjectSelector = {
            modelObjectIds: [{ modelId: newModelId, objectRuntimeIds: filtered.map(r => r.properties.id) }]
        };

        props.api.viewer.setSelection(objectSelector, "set");
    }

    function showAllGroups() {
        const newModelId = modelId.current;

        const objectSelector: ObjectSelector = {
            modelObjectIds: [{ modelId: newModelId, objectRuntimeIds: matchedObjects.map(r => r.properties.id) }]
        };

        props.api.viewer.setSelection(objectSelector, "set");
    }



    async function triggerTest() {
        setMatchedObjects([]);
        cancelTriggerRef.current = false;
        const result: ObjectWithValue[] = [];

        // variable with all selected objects in TC. Selection is an array of ModelObjectsIds
        const modelObjects = await props.api.viewer.getObjects();
        if (modelObjects.length !== 1) {
            alert('Please activate only one model.')
            return;
        }

        const selection = await props.api.viewer.getSelection();
        if (selection.length == 0) {
            alert('Please select the elements.');
            return;
        }

        // selecting first Model from TC 
        var firstSelection = selection[0];
        if (firstSelection.objectRuntimeIds === undefined) return;

        const bBoxes = await props.api.viewer.getObjectProperties(firstSelection.modelId, firstSelection.objectRuntimeIds);
        for (let i = 0; i < bBoxes.length; i++) {

            if (cancelTriggerRef.current) {
                setMatchedObjects([]);
                console.log('Trigger test was cancelled.');
                return;
            }

            const bBox = bBoxes[i];

            const newArray: number[] = [];
            const newWeight: number[] = [];

            const productName = await props.api.viewer.getObjectProperties(firstSelection.modelId, [bBox.id]);
            const productNameResult = productName[0].product?.name;

            const widthResult = await getPropertyValue(firstSelection.modelId, bBox.id, props.propertiesNames.widthProperty);
            const width = changeStringToNumber(widthResult);
            if (
                Number.isNaN(width) ||
                width == 0
            ) {
                result.push({
                    properties: bBox,
                    value: "NoData",
                    productName: productNameResult,
                    order: 100,
                });
                continue;
            }
            newArray.push(width);

            const heightResult = await getPropertyValue(firstSelection.modelId, bBox.id, props.propertiesNames.heightProperty);
            const height = changeStringToNumber(heightResult);
            if (
                Number.isNaN(height) ||
                height == 0
            ) {
                result.push({
                    properties: bBox,
                    value: "NoData",
                    productName: productNameResult,
                    order: 100,
                });
                continue;
            }
            else {
                newArray.push(height);
            }

            const lengthResult = await getPropertyValue(firstSelection.modelId, bBox.id, props.propertiesNames.lengthProperty);
            const length = changeStringToNumber(lengthResult);
            if (
                Number.isNaN(length) ||
                length == 0
            ) {
                result.push({
                    properties: bBox,
                    value: "NoData",
                    productName: productNameResult,
                    order: 100,
                });
                continue;
            }
            else {
                newArray.push(length);
            }

            const weightResult = await getPropertyValue(firstSelection.modelId, bBox.id, props.propertiesNames.weightProperty);
            const weight = changeStringToNumber(weightResult);
            if (
                Number.isNaN(weight) ||
                weight == 0
            ) {
                result.push({
                    properties: bBox,
                    value: "NoData",
                    productName: productNameResult,
                    order: 100,
                });
                continue;
            }
            else {
                newWeight.push(weight);
            }

            const sortedArray = [...newArray].sort((a, b) => a - b);

            const firstDimension = sortedArray[0];
            const secondDimension = sortedArray[1];
            const thirdDimension = sortedArray[2];

            const weightDimension = newWeight[0];

            let breakLogic = false;
            //sort transport according to check order
            props.sortTransportsByCheckOrder();
            props.transports.forEach((transport) => {
                if (
                    breakLogic == false &&
                    firstDimension <= transport.transportFirstDimension &&
                    secondDimension <= transport.transportSecondDimension &&
                    thirdDimension <= transport.transportThirdDimension &&
                    weightDimension <= transport.weight
                ) {
                    result.push({ properties: bBox, value: transport.name, productName: productNameResult, order: transport.checkOrder })
                    breakLogic = true;

                    return;
                }
                else {
                    return;
                }
            });
        };

        //TODO - set message when "Check Transport" function is done
        const showMessage = () => {
            if (!cancelTriggerRef.current) {
                alert('Check Transport has been completed.');
            }
        };

        setMatchedObjects(result);
        showMessage();

        if (showAllButton == false) {
            setShowAllButton((prev) => !prev);
        }else{
            
        }

    }

    function clear() {
        cancelTriggerRef.current = true;
        setMatchedObjects([]);
        setShowAllButton((prev) => !prev);
        console.log('Check was canceled')
    }


    return (
        <div>
            <br></br>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <ModusButton onClick={triggerTest}>
                    Check Transport
                </ModusButton>
                <ModusButton onClick={clear}>
                    Clear
                </ModusButton>
            </div>
            <ModusTreeView className="filtered-objects" size="condensed">
                {
                    _.map(_.groupBy(matchedObjects, (p => p.order)), (val, key) =>
                        <ModusTreeViewItem onItemClick={(() => showSelectedGroup(val[0].value))}
                            nodeId={key}
                            label={val[0].value}>
                            {
                                val.map(o =>
                                    <ModusTreeViewItem onItemClick={((e) => showSelectedItem(o.properties.id, e))}
                                        nodeId={key + "-" + o.properties.id.toString()}
                                        label={o.productName + " - id: " + o.properties.id.toString()}>
                                    </ModusTreeViewItem>
                                )
                            }
                        </ModusTreeViewItem>
                    )
                }
            </ModusTreeView>
            {showAllButton && (
                <ModusButton style={{ marginTop: '10px' }} onClick={showAllGroups}>Select All</ModusButton>
            )}
        </div>

    )
}