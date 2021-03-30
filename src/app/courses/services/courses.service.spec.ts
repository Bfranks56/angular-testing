import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CoursesService } from "./courses.service";
import { COURSES } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";

describe("CoursesService", () => {

    let coursesService: CoursesService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoursesService
            ]
        });

        coursesService = TestBed.get(CoursesService);
        httpTestingController = TestBed.get(HttpTestingController);

    });

    it('should retrieve all courses', ()=>{
        // tests observables in findAllCourses() by subscribing
        coursesService.findAllCourses()
        .subscribe(courses => {
            // first test asserts that courses are indeed there
            expect(courses).toBeTruthy('No Courses Returned');
            // checks that there are indeed 12 courses available
            expect(courses.length).toBe(12, 'incorrect number of courses');

            const course = courses.find(course => course.id == 12);

            expect(course.titles.description).toBe('Angular Testing Course');
        });

        // sets up controller to only make one call
        const req = httpTestingController.expectOne('/api/courses');

        // tests the call that the method is GET
        expect(req.request.method).toEqual("GET");

        req.flush({payload: Object.values(COURSES)});
    });

    it('should find a course by id', ()=> {
        coursesService.findCourseById(12)
        .subscribe(course => {

            expect(course).toBeTruthy();
            expect(course.id).toBe(12);

        });

        const req = httpTestingController.expectOne('/api/courses/12');

        expect(req.request.method).toEqual("GET");

        req.flush(COURSES[12]);
    });

    it('should save the course data', () => {
        // testing that we can change the title of the course description
        const changes :Partial<Course> = {titles:{description: 'Testing Course'}};

        coursesService.saveCourse(12, changes)
        .subscribe(course => {

            expect(course.id).toBe(12);

        });

        const req = httpTestingController.expectOne('/api/courses/12');

        // verifies method is PUT
        expect(req.request.method).toEqual("PUT");
        // tests that description title was saved.
        expect(req.request.body.titles.description).toEqual(changes.titles.description);

        req.flush({
            // 3 dots are the spread operator
            ...COURSES[12],
            ...changes
        })
    });

    it('should give an error if save course fails', ()=> {
        const changes :Partial<Course> = {titles:{description: 'Testing Course'}};

        coursesService.saveCourse(12, changes)
        .subscribe(
            // intentionally fails the test
            () => fail('the save course operation should have failed'),

            (error: HttpErrorResponse) => {
                expect(error.status).toBe(500);
            }
        );

        const req = httpTestingController.expectOne('/api/courses/12');

        expect(req.request.method).toEqual("PUT");

        req.flush('Save course failed', {status:500, statusText: 'Internal Server Error'});
    });

    afterEach(() =>{
        // verifies that only one call was made
        httpTestingController.verify();
    });
});