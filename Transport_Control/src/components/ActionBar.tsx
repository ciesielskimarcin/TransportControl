import { ModusButton, ModusMessage, ModusTreeView, ModusTreeViewItem } from "@trimble-oss/modus-react-components";


export default function ActionBar() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '200px',
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                    marginTop: '0.1rem',
                }}>
                <ModusButton
                    button-style="borderless"
                    aria-label="Add"
                    title="Add"
                    size="small"
                    disabled
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
                <ModusButton 
                    button-style="borderless"
                    aria-label="Remove"
                    title="Remove"
                    size="small"
                    color="primary"
                    disabled
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
                <ModusButton
                    button-style="borderless"
                    size="small"
                    aria-label="Edit"
                    title="Edit"
                    color="primary"
                    disabled
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
                <ModusButton
                    button-style="borderless"
                    size="small"
                    aria-label="Drag"
                    title="Drag"
                    color="primary"

                    id="drag">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                            d="M11,18a2,2,0,1,1-2-2A2.006,2.006,0,0,1,11,18ZM9,10a2,2,0,1,0,2,2A2.006,2.006,0,0,0,9,10ZM9,4a2,2,0,1,0,2,2A2.006,2.006,0,0,0,9,4Zm6,4a2,2,0,1,0-2-2A2.006,2.006,0,0,0,15,8Zm0,2a2,2,0,1,0,2,2A2.006,2.006,0,0,0,15,10Zm0,6a2,2,0,1,0,2,2A2.006,2.006,0,0,0,15,16Z"
                            fill="#252a2e" />
                    </svg>
                </ModusButton>
            </div>
        </div>
    )

}


