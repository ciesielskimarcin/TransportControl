import { ModusButton, ModusMessage, ModusTreeView, ModusTreeViewItem } from "@trimble-oss/modus-react-components"
import { useState } from "react";
import { ObjectProperties, WorkspaceAPI } from "trimble-connect-workspace-api";

type ObjectWithValue = {
    properties: ObjectProperties,
    value: string,
    productName: string | undefined,
    order: number
}

export default function CheckTransport({ api }: { api: WorkspaceAPI }) {

    const [listOfArrays, setListOfArrays] = useState<number[][]>([]);
    const [matchedObjects, setMatchedObjects] = useState<ObjectWithValue[]>([]);

    
    async function getPropertyValue(modelId: string, objectId: number, propertyName: string): Promise<string> {

        const splitted = propertyName.split('.')
        const set = splitted[0];
        const propertyType = splitted[1];

        const properties = await api.viewer.getObjectProperties(modelId, [objectId]);

        const props = properties[0].properties;
        if (props === undefined) return '';

        const propertySet = props.find(p => (p as any).name === set);
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

    async function triggerTest() {
        setListOfArrays([]);
        setMatchedObjects([]);
        const result: ObjectWithValue[] = [];

        // variable with all selected objects in TC. Selection is an array of ModelObjectsIds
        const selection = await api.viewer.getSelection();
        if (selection.length == 0) return;

        // selecting first Model from TC 
        var firstSelection = selection[0];
        if (firstSelection.objectRuntimeIds === undefined) return;

        //console.log("first selection.objectsRuntimeIds", firstSelection);

        const bBoxes = await api.viewer.getObjectProperties(firstSelection.modelId, firstSelection.objectRuntimeIds);
        for (let i = 0; i < bBoxes.length; i++) {
            const bBox = bBoxes[i];

            const newArray: number[] = [];

            const productName = await api.viewer.getObjectProperties(firstSelection.modelId, [bBox.id]);
            const productNameResult = productName[0].product?.name;

            const widthResult = await getPropertyValue(firstSelection.modelId, bBox.id, "Dimensions.WIDTH");
            const width = changeStringToNumber(widthResult);
            newArray.push(width);

            const heightResult = await getPropertyValue(firstSelection.modelId, bBox.id, "Dimensions.HEIGHT");
            const height = changeStringToNumber(heightResult);
            newArray.push(height);

            const lengthResult = await getPropertyValue(firstSelection.modelId, bBox.id, "Dimensions.LENGTH");
            const length = changeStringToNumber(lengthResult);
            newArray.push(length);

            const weightResult = await getPropertyValue(firstSelection.modelId, bBox.id, "Dimensions.WEIGHT");
            const weight = changeStringToNumber(weightResult);

            const sortedArray = [...newArray].sort((a, b) => a - b);

            // This collect arrays with dimenions of selected the elements. 
            setListOfArrays((prevList) => [...prevList, sortedArray]);

            const firstDimension = sortedArray[0];
            const secondDimension = sortedArray[1];
            const thirdDimension = sortedArray[2];


            const handleCheck = () => {
                let breakLogic = false;
                //sort transport according to check order
                // sortTransportsByCheckOrder();
                transports.forEach((transport) => {
                    if (
                        breakLogic == false &&
                        firstDimension <= transport.transportFirstDimension &&
                        secondDimension <= transport.transportSecondDimension &&
                        thirdDimension <= transport.transportThirdDimension &&
                        weight <= transport.weight
                    ) {
                        result.push({ properties: bBox, value: transport.name, productName: productNameResult, order: transport.checkOrder })
                        breakLogic = true;

                        setMatchedObjects(result);
                        return;
                    }
                    else {
                        return;
                    }
                });
            };

            handleCheck();

        };
        console.log([listOfArrays]);
        console.log("Matched Objects:", [matchedObjects]);

        //TODO - set message when "Check Transport" function is done
        const showMessage = () => {
            alert('Check Tranposrt is done');
        };

        showMessage();
        <ModusMessage type="info">Szlugi, Woda, Gruba baba!</ModusMessage>

    }


    return (
        <div>
            <br></br>
                <ModusButton >
                    Check Transport
                </ModusButton>
                <ModusTreeView className="filtered-objects" size="condensed">
                    {
                        _.map(_.groupBy(matchedObjects, (p => p.value)), (val, key) =>
                            <ModusTreeViewItem onItemClick={(() => showSelectedGroup(key))}
                                nodeId={key}
                                label={key}>
                                {
                                    val.map(o =>
                                        <ModusTreeViewItem
                                            nodeId={o.properties.id.toString()}
                                            label={o.productName + " - id: " + o.properties.id.toString()}>
                                        </ModusTreeViewItem>
                                    )
                                }
                            </ModusTreeViewItem>
                        )
                    }
                </ModusTreeView>
        </div>
        
    )
}