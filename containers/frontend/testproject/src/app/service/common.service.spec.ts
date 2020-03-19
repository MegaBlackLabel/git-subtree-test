import { TestBed, async, inject  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CommonService
      ],
    });
    service = TestBed.inject(CommonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch posts as an Observable`, async(inject([HttpTestingController, CommonService],
    (httpClient: HttpTestingController, service: CommonService) => {

      const postItem = [
        {
          "userId": 1,
          "id": 1,
          "title": "title1",
          "body": "body1"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "title2",
          "body": "message2"
        },
        {
          "userId": 1,
          "id": 3,
          "title": "title3",
          "body": "comment3"
        }
      ];


      service.getPosts()
        .subscribe((posts: any) => {
          console.log(posts)
          expect(posts.length).toBe(3);
        });

      let req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(req.request.method).toBe("GET");

      req.flush(postItem);
      httpMock.verify();

    })));
});
