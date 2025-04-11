import { ModusButton } from "@trimble-oss/modus-react-components";
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
    setSelectedTransport: React.Dispatch<React.SetStateAction<TransportTypeEntity | undefined>>
    resetTransports: () => void
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


