import { ModusButton } from "@trimble-oss/modus-react-components";
import { TransportTypeEntity } from "../Entities/TransportTypeEntity";
import { useState, useEffect } from "react";
import { TransportType } from "../Enums/TransportType";
import { WorkspaceAPI } from "trimble-connect-workspace-api";
import { PropertiesNamesEntity } from "../Entities/PropertiesNamesEntity";

type ActionBarProps = {
    transports: TransportTypeEntity[]
    setTransports: React.Dispatch<React.SetStateAction<TransportTypeEntity[]>>
    sortTransportsByCheckOrder: () => void
    transportName: string
    container: any
    root: any
    addButton: any
    removeButton: any
    editButton: any
    selectedtransport: TransportTypeEntity | undefined
    setSelectedTransport: React.Dispatch<React.SetStateAction<TransportTypeEntity | undefined>>
    resetTransports: () => void,
    api: WorkspaceAPI,
    setPropertiesNames: React.Dispatch<React.SetStateAction<PropertiesNamesEntity>>
    propertiesNames: PropertiesNamesEntity
}

type Property = {
    name: string;
    value: any;
    type: number;
};

type ProductNameProperty = {
    name: string;
    properties: Property[];
};

export default function ActionBar(props: ActionBarProps) {

    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showPropertiesForm, setShowPropertiesForm] = useState(false);
    const [newTransport, setNewTransport] = useState<TransportTypeEntity>({
        name: "",
        checkOrder: 0,
        type: TransportType.Standard,
        transportFirstDimension: 0,
        transportSecondDimension: 0,
        transportThirdDimension: 0,
        weight: 0,
        elements: [],
    });
    const [newEditTransport, setNewEditTransport] = useState<TransportTypeEntity | undefined>();
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);


    useEffect(() => {

        setNewEditTransport({ ...props.selectedtransport })

    }, [props.selectedtransport]);

    const handleAddTransport = () => {
        if (props.addButton?.disabled == false) {
            setShowForm((prev) => !prev);
        }
        else[
        ]
    };

    const handleNewInputChange = (field: keyof TransportTypeEntity, value: any) => {
        setNewTransport((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleEditInputChange = (field: keyof TransportTypeEntity, value: any) => {
        setNewEditTransport((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const handleSaveTransport = () => {
        props.setTransports((prevTransports) => [...prevTransports, newTransport]);
        setShowForm(false);
        setNewTransport({
            name: "",
            checkOrder: 0,
            type: TransportType.Standard,
            transportFirstDimension: 0,
            transportSecondDimension: 0,
            transportThirdDimension: 0,
            weight: 0,
            elements: [],
        });
        props.sortTransportsByCheckOrder();
    };

    const handleSaveEditTransport = () => {

        const updatedTransports = props.transports.map(transport =>
            transport.name === newEditTransport.name ? newEditTransport : transport
        );
        props.setTransports(updatedTransports);

        setShowEditForm(false);

    };

    const handleRemoveTransport = () => {
        if (props.addButton?.disabled == false) {
            props.setTransports((prevTransports) =>
                prevTransports.filter((transport) => transport.name !== props.transportName)
            );
        }
        else {

        }
    };

    const handleEditTransport = () => {
        if (props.addButton?.disabled == false) {
            setShowEditForm((prev) => !prev);
        }
        else[
        ]

    };

    const handleProperties = () => {
        {
            setShowPropertiesForm((prev) => !prev);
        }
    };

    if (props.container && props.root) {  // Ensure 'container' and 'root' exist before using them
        props.container.addEventListener('itemClick', () => {
            // Assuming 'root' has a property 'selectedItems'
            if (props.root.selectedItems.length === 0) {
                props.setSelectedTransport(undefined);
                setShowForm(false);
                setShowEditForm(false);
            }
        });
    } else {
        console.error('Container or root element is null.');
    }


    async function getPropertiesName() {
        const selection = await props.api.viewer.getSelection();
        if (selection.length == 0) return;

        // selecting first Model from TC 
        var firstSelection = selection[0];
        if (firstSelection.objectRuntimeIds === undefined) return;

        const bBoxes = await props.api.viewer.getObjectProperties(firstSelection.modelId, firstSelection.objectRuntimeIds);
        const productName = await props.api.viewer.getObjectProperties(firstSelection.modelId, [bBoxes[0].id]);

        console.log("productName: ", productName)

        const productNameProperties = productName[0].properties
        if (productNameProperties === undefined) return '';
        console.log("productNameProperties: ", productNameProperties)

        const getPropertyNames = (productNameProperties: ProductNameProperty[]): string[] => {
            return productNameProperties.flatMap((section) =>
                section.properties.map((prop) => `${section.name}.${prop.name}`)
            );
        };

        const results = getPropertyNames(productNameProperties);
        setSelectedProperties(results);
        console.log("result: ", results)
    }


    function setWidth(value: string) {
        props.setPropertiesNames(prevState => ({ ...prevState, widthProperty: value }));
    }

    function setHeight(value: string) {
        props.setPropertiesNames(prevState => ({ ...prevState, heightProperty: value }));
    }

    function setLength(value: string) {
        props.setPropertiesNames(prevState => ({ ...prevState, lengthProperty: value }));
    }

    function setWeight(value: string) {
        props.setPropertiesNames(prevState => ({ ...prevState, weightProperty: value }));
    }



    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                //width: '200px',
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    marginTop: '0.1rem',
                }}>
                <ModusButton onClick={() => handleAddTransport()}
                    button-style="borderless"
                    aria-label="Add"
                    title="Add"
                    size="small"
                    color="primary"
                    disabled={!props.selectedtransport}
                    id="add">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path d="M0,0H24V24H0Z" fill="none" />
                        <path d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z" fill="#252a2e" />
                    </svg>
                </ModusButton>
                <ModusButton onClick={() => handleRemoveTransport()}
                    button-style="borderless"
                    aria-label="Remove"
                    title="Remove"
                    size="small"
                    color="primary"
                    disabled={!props.selectedtransport}
                    id="remove">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path d="M0,0H24V24H0Z" fill="none" />
                        <path
                            d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM19,4H15.5l-1-1h-5l-1,1H5V6H19Z"
                            fill="#252a2e" />
                    </svg>
                </ModusButton>
                <ModusButton onClick={() => handleEditTransport()}
                    button-style="borderless"
                    size="small"
                    aria-label="Edit"
                    title="Edit"
                    color="primary"
                    disabled={!props.selectedtransport}
                    id="edit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path d="M0,0H24V24H0Z" fill="none" />
                        <path
                            d="M3,17.25V21H6.75L17.81,9.94,14.06,6.19ZM20.71,7.04a1,1,0,0,0,0-1.41L18.37,3.29a1,1,0,0,0-1.41,0L15.13,5.12l3.75,3.75,1.83-1.83Z"
                            fill="#252a2e" />
                    </svg>
                </ModusButton>
                <ModusButton onClick={() => props.resetTransports()}
                    button-style="borderless"
                    size="small"
                    aria-label="Reset"
                    title="Reset Transport Categories"
                    color="primary"
                    disabled={!props.selectedtransport}
                    id="reset">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="mi-solid mi-backup-restore-cloud"
                        viewBox="0 0 24 24">
                        <path d="M20.35 17.26c0-.1.02-.19.02-.29 0-2.02-1.64-3.67-3.67-3.67-1.36 0-2.62.77-3.24 1.97a3.393 3.393 0 0 0-3.97 3.34c0 1.87 1.52 3.39 3.39 3.39h6.69c1.34 0 2.44-1.09 2.44-2.44 0-1.06-.67-1.97-1.65-2.3Zm-.79 3.15h-6.69c-.99 0-1.8-.81-1.8-1.8s.81-1.8 1.8-1.8c.14 0 .28.02.41.05l1.07.26.46-1c.34-.73 1.08-1.21 1.88-1.21 1.14 0 2.07.93 2.07 2.07 0 .1-.01.19-.02.29l-.17 1.21 1.18.28c.38.09.65.43.65.81 0 .46-.38.84-.84.84m-6.3-11.97c.2.19.51.19.71 0a.5.5 0 0 0 .14-.35V6.3c2.95 0 5.41 2.14 5.9 4.96.08.47.49.82.98.82.62 0 1.1-.55.99-1.16-.66-3.76-3.93-6.61-7.87-6.61V2.52c0-.45-.54-.67-.85-.35l-2.79 2.79c-.2.2-.2.51 0 .71l2.79 2.79Zm-6.24-3.6c-.91.38-1.75.95-2.49 1.68-3.13 3.13-3.13 8.19 0 11.31L3.26 19.1c-.32.32-.09.86.35.85h3.95c.28 0 .5-.21.5-.49v-3.95c0-.45-.54-.67-.86-.35l-1.27 1.27c-2.34-2.34-2.34-6.14 0-8.49.56-.56 1.21-1 1.9-1.28.36-.15.57-.52.57-.9 0-.72-.74-1.2-1.4-.92Z" />
                    </svg>
                </ModusButton>
                <ModusButton onClick={() => handleProperties()}
                    button-style="borderless"
                    size="small"
                    aria-label="Properties"
                    title="IFC Properties"
                    color="primary"

                    id="properties">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="mi-outline mi-cell-properties"
                        viewBox="0 0 24 24">
                        <path d="M20.9 17.29c.02-.17.04-.34.04-.51s-.01-.34-.04-.51l.9-.72a.54.54 0 0 0 .13-.69l-.4-.69-.4-.69a.53.53 0 0 0-.66-.23l-1.06.42c-.27-.21-.57-.39-.89-.52l-.17-1.12a.55.55 0 0 0-.54-.46h-1.6c-.27 0-.5.2-.54.46l-.17 1.1c-.33.13-.63.31-.91.53l-1.04-.41a.53.53 0 0 0-.66.23l-.4.69-.4.69c-.13.23-.08.53.13.69l.87.7c-.02.17-.04.35-.04.53s.02.37.04.54l-.87.7a.54.54 0 0 0-.13.69l.4.69.4.69c.13.23.42.33.66.23l1.06-.41c.27.21.57.38.89.51l.17 1.12c.04.27.27.46.54.46h1.6c.27 0 .49-.19.54-.46l.17-1.14c.31-.13.61-.31.87-.51l1.08.42c.25.1.53 0 .66-.23l.4-.69.4-.69c.13-.23.08-.53-.13-.69zm-3.89.99c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M12.5 9.49H19v1.5c0 .55.45 1 1 1h1V3c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6.71c-.27-.58-.27-1.28.07-1.88l.07-.12H5V9.5h6.5v3.38l.09-.16c.21-.37.53-.64.91-.81V9.5Zm-1-1H5v-4.5h6.5z" />
                    </svg>
                </ModusButton>
            </div>
            {showForm && (
                <div style={{ padding: '10px 0px 0px 0px' }}>
                    <label className="teklaFont" >
                        Name:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="text"
                            value={newTransport.name}
                            onChange={(e) => handleNewInputChange("name", e.target.value)}
                        />
                    </label>
                    <label className="teklaFont">
                        Check order:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newTransport.checkOrder}
                            onChange={(e) => handleNewInputChange("checkOrder", e.target.value)}
                        />
                    </label>
                    <label className="teklaFont">
                        First Dimension:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newTransport.transportFirstDimension}
                            onChange={(e) =>
                                handleNewInputChange(
                                    "transportFirstDimension",
                                    parseFloat(e.target.value)
                                )
                            }
                        />
                    </label>
                    <label className="teklaFont">
                        Second Dimension:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newTransport.transportSecondDimension}
                            onChange={(e) =>
                                handleNewInputChange(
                                    "transportSecondDimension",
                                    parseFloat(e.target.value)
                                )
                            }
                        />
                    </label>
                    <label className="teklaFont">
                        Third Dimension:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newTransport.transportThirdDimension}
                            onChange={(e) =>
                                handleNewInputChange(
                                    "transportThirdDimension",
                                    parseFloat(e.target.value)
                                )
                            }
                        />
                    </label>
                    <label className="teklaFont">
                        Weight:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newTransport.weight}
                            onChange={(e) =>
                                handleNewInputChange("weight", parseFloat(e.target.value))
                            }
                        />
                    </label>
                    <ModusButton onClick={handleSaveTransport}>Add</ModusButton>
                </div>
            )}

            {showEditForm && (
                <div style={{ padding: '10px 0px 0px 0px' }}>
                    <label className="teklaFont" >
                        Name:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="text"
                            value={newEditTransport.name}
                            placeholder={props.transportName}
                            onChange={(e) => handleEditInputChange("name", e.target.value)}
                        />
                    </label>
                    <label className="teklaFont">
                        Check order:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newEditTransport.checkOrder}
                            onChange={(e) => handleEditInputChange("checkOrder", e.target.value)}
                        />
                    </label>
                    <label className="teklaFont">
                        First Dimension:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newEditTransport.transportFirstDimension}
                            onChange={(e) =>
                                handleEditInputChange(
                                    "transportFirstDimension",
                                    parseFloat(e.target.value)
                                )
                            }
                        />
                    </label>
                    <label className="teklaFont">
                        Second Dimension:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newEditTransport.transportSecondDimension}
                            onChange={(e) =>
                                handleEditInputChange(
                                    "transportSecondDimension",
                                    parseFloat(e.target.value)
                                )
                            }
                        />
                    </label>
                    <label className="teklaFont">
                        Third Dimension:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newEditTransport.transportThirdDimension}
                            onChange={(e) =>
                                handleEditInputChange(
                                    "transportThirdDimension",
                                    parseFloat(e.target.value)
                                )
                            }
                        />
                    </label>
                    <label className="teklaFont">
                        Weight:
                        <input style={{ flex: '2', maxWidth: '120px' }}
                            type="number"
                            value={newEditTransport.weight}
                            onChange={(e) =>
                                handleEditInputChange("weight", parseFloat(e.target.value))
                            }
                        />
                    </label>
                    <ModusButton onClick={handleSaveEditTransport}>Edit</ModusButton>
                </div>
            )}

            {showPropertiesForm && (
                <div style={{ padding: '10px 0px 0px 0px' }}>
                    <div className="teklaFont">
                        <label htmlFor="property-select" >WIDTH:</label>
                        <select
                            id="property-select"
                            value={props.propertiesNames.widthProperty}
                            onChange={(e) => setWidth(e.target.value)}
                            style={{ width: "150px", maxHeight: "150px", overflowY: "scroll" }}
                        >
                            <option value={props.propertiesNames.widthProperty}>
                                {props.propertiesNames.widthProperty}
                            </option>
                            {selectedProperties.map((item: any) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="teklaFont">
                        <label htmlFor="property-select" >HEIGHT:</label>
                        <select
                            id="property-select"
                            value={props.propertiesNames.heightProperty}
                            onChange={(e) => setHeight(e.target.value)}
                            style={{ width: "150px", maxHeight: "150px", overflowY: "scroll" }}
                        >
                            <option value={props.propertiesNames.heightProperty}>
                                {props.propertiesNames.heightProperty}
                            </option>
                            {selectedProperties.map((item: any) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="teklaFont">
                        <label htmlFor="property-select" >LENGTH:</label>
                        <select
                            id="property-select"
                            value={props.propertiesNames.lengthProperty}
                            onChange={(e) => setLength(e.target.value)}
                            style={{ width: "150px", maxHeight: "150px", overflowY: "scroll" }}
                        >
                            <option value={props.propertiesNames.lengthProperty}>
                                {props.propertiesNames.lengthProperty}
                            </option>
                            {selectedProperties.map((item: any) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="teklaFont">
                        <label htmlFor="property-select" >WEIGHT:</label>
                        <select
                            id="property-select"
                            value={props.propertiesNames.weightProperty}
                            onChange={(e) => setWeight(e.target.value)}
                            style={{ width: "150px", maxHeight: "150px", overflowY: "scroll" }}
                        >
                            <option value={props.propertiesNames.weightProperty}>
                                {props.propertiesNames.weightProperty}
                            </option>
                            {selectedProperties.map((item: any) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <ModusButton onClick={getPropertiesName}>Read in</ModusButton>
                    </div>
                </div>
            )}
        </div>
    )
}


