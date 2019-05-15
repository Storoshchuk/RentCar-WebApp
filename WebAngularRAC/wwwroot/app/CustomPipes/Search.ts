import { Pipe, PipeTransform } from "@angular/core";
import { CarModel } from "../Cars/Car.Model";

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(array: CarModel[], value: string) {
        if (array === undefined) {
            return null;
        }

        return array.filter((car: CarModel) => car.Model_Name.indexOf(value) !== -1 ||
                                                car.Fueltype.indexOf(value) !== -1);
    }
}