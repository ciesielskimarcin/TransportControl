import { ModusButton, ModusMessage, ModusTreeView, ModusTreeViewItem } from "@trimble-oss/modus-react-components";
import { TransportTypeEntity } from "../Entities/TransportTypeEntity";
import { useState, useEffect } from "react";
import { TransportType } from "../Enums/TransportType";

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
}


export default function ActionBar(props: ActionBarProps) {

    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
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

    const disableButtons = (disable: boolean): void => {
        if (props.addButton) {
            props.addButton.disabled = disable;
        }
        if (props.removeButton) {
            props.removeButton.disabled = disable;
        }
        if (props.editButton) {
            props.editButton.disabled = disable;
        }
        else {
            console.error('One or more buttons could not be found in the DOM.');
        }
    };

    if (props.container && props.root) {  // Ensure 'container' and 'root' exist before using them
        props.container.addEventListener('itemClick', () => {
            // Assuming 'root' has a property 'selectedItems'
            if (props.root.selectedItems.length > 0) {
                disableButtons(false);
            } else {
                disableButtons(true);
            }
            console.log("addEventListener")
        });
    } else {
        console.error('Container or root element is null.');
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
                    disabled={!props.transportName}
                    color="primary"
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
                    disabled={!props.transportName}
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
                    disabled={!props.transportName}
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
        </div>

    )

}


