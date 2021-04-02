import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER')
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED')

  // waitForAsync used for the promise on line 33
  beforeEach(waitForAsync(() => {

    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: CoursesService, useValue: coursesServiceSpy }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService);
      });
  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {
    // uses the courseService and returns only courses tagged as beginner
    // 'of' is used by rxjs for observables is syncronously, no timeouts or anything like that.
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1, "unexpected number of tabs found")


  });


  it("should display only advanced courses", () => {

    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1, "unexpected number of tabs found")

  });


  it("should display both tabs", () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2, "expected only 2 tabs")

  });

  // after PR # 26, this test still fails.  the answer should be in PR 33... hopefully.
  // with done, jasime will only consider test completely when everything is properly run.
  xit("should display advanced courses when tab clicked", (done: DoneFn) => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    // simulates click interaction (user clicks on advanced courses tab)
    // el.nativeElement.click() -> this is one way to do it, but not how we'll do it here
    //This way is how we'll do it since we created a helper utility function in test-utils.ts
    click(tabs[1]);

    // adding this again still causes test to fail.
    fixture.detectChanges();
    // sets a timeout allowing the animation api to call and perform
    setTimeout(() => {
      // assigns all card titles into an array
      const cardTitles = el.queryAll(By.css('.mat-card-title'));

      expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');

      expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');

      // confirms all assertions are complete
      done();
    }, 500);


  });

});


