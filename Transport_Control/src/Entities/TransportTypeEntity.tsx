import { AssemblyViewModel } from './AssemblyViewModel';
import { TransportType } from '../Enums/TransportType';


export interface TransportTypeEntity {
    name: string;
    checkOrder: number;
    type: TransportType;
    transportFirstDimension: number;
    transportSecondDimension: number;
    transportThirdDimension: number;
    weight: number;
    elements: AssemblyViewModel[];
}