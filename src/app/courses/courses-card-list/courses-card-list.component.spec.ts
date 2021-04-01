import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  // declaration for component setup in testing
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;

  // needs async or else tests will always fail due to never waiting for the promise .then()
  beforeEach(waitForAsync(() => {
    // Imports course module because it contains all the dependencies that we need for this test.
    TestBed.configureTestingModule({
      imports: [CoursesModule]
    })
      // promise that sets up fixture on beforeEach
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);

        component = fixture.componentInstance;
      });
  }));


  it("should create the component", () => {

   expect(component).toBeTruthy();

  });


  it("should display the course list", () => {

    pending();

  });


  it("should display the first course", () => {

      pending();

  });


});


