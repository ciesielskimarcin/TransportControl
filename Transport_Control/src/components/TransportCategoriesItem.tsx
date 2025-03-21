import { useState } from "react";
import { TransportType } from "../Enums/TransportType";
import { TransportTypeEntity } from "../Entities/TransportTypeEntity";


type TransportCategoriesItemProps = {
    name: string;
    checkOrder: number;
    type: TransportType;
    transportFirstDimension: number;
    transportSecondDimension: number;
    transportThirdDimension: number;
    weight: number;
    elements: AssemblyViewModel[];
}


export default function TransportCategoriesItem(props: TransportCategoriesItemProps) {

    
} 