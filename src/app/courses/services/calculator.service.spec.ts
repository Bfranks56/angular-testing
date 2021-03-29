import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {

    it ('should add two numbers', () => {
        // done to create a full service w/ dependencies
        // array contains methods used in the service, if array is empty, no methods can be used by the spy object
        const logger = jasmine.createSpyObj('LoggerService', ["log"]);

        // if the spy would need to return a mock value, this is who you do it.
        // logger.log.and.returnValue(valueHere);

        const calculator = new CalculatorService(logger);

        const result = calculator.add(2, 2);

        expect(result).toBe(4);
        expect(logger.log).toHaveBeenCalledTimes(1);
    });

    it ('should subtract two numbers', () => {
        const calculator = new CalculatorService(new LoggerService());

        const result = calculator.subtract(2, 2);

        expect(result).toBe(0, "unexpected subtraction result");
    });


});