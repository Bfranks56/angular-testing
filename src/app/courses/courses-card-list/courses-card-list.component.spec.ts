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
  let el: DebugElement;

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
        el = fixture.debugElement;
      });
  }));


  it("should create the component", () => {

   expect(component).toBeTruthy();

  });

  it("should display the course list", () => {

    component.courses = setupCourses();
    // fixes issue in PR 20, checks changes to the DOM, in this case without it, the nativeElement will always be blank.
    fixture.detectChanges();

    const cards = el.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12, 'Unexpected Number of Courses');
  });


  it("should display the first course", () => {

      component.courses = setupCourses();
      fixture.detectChanges();

      const course = component.courses[0];

      const card = el.query(By.css(".course-card:first-child"));
      const title = card.query(By.css('mat-card-title'));
      const image = card.query(By.css("img"));

      expect(card).toBeTruthy('card not shown');
      expect(title.nativeElement.textContent).toBe(course.titles.description);
      // needs .src to only pull the src, or else it will fail.
      expect(image.nativeElement.src).toBe(course.iconUrl);
  });


});


