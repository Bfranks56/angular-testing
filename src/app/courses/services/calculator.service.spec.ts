import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {

    // define objects/variables here for global utilization
    let calculator: CalculatorService;
    let loggerSpy: any;

    // beforeEach is used so that repeated code from unit tests only needs to be done once here.
    beforeEach(() => {
        console.log('Calling beforeEach');

        // done to create a full service w/ dependencies
        // array contains methods used in the service, if array is empty, no methods can be used by the spy object
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

        // Testbed is used for dependency injection
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: loggerSpy}
            ]
        });

        calculator = TestBed.get(CalculatorService);
    });

    it ('should add two numbers', () => {
        // if the spy would need to return a mock value, this is how you do it.
        // logger.log.and.returnValue(valueHere);
        console.log('addition test');
        const result = calculator.add(2, 2);

        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it ('should subtract two numbers', () => {
        console.log('subtraction test');
        const result = calculator.subtract(2, 2);

        expect(result).toBe(0, "unexpected subtraction result");
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
});