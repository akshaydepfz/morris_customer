
// Unit tests for: ngOnInit


import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    PLATFORM_ID
} from '@angular/core';
import * as AOS from 'aos';
import { HomeComponent } from '../home.component';


import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';


jest.mock("aos", () => ({
  init: jest.fn(),
  refresh: jest.fn(),
}));

describe('HomeComponent.ngOnInit() ngOnInit method', () => {
  let component: HomeComponent;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    TestBed.configureTestingModule({
      providers: [
        HomeComponent,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    component = TestBed.inject(HomeComponent);
  });

  describe('Happy paths', () => {
    it('should initialize AOS when platform is browser', () => {
      // Arrange
      jest.spyOn(isPlatformBrowser, 'isPlatformBrowser').mockReturnValue(true);

      // Act
      component.ngOnInit();

      // Assert
      expect(AOS.init).toHaveBeenCalledWith({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
      });
    });

    it('should fetch banner data when platform is browser', () => {
      // Arrange
      jest.spyOn(isPlatformBrowser, 'isPlatformBrowser').mockReturnValue(true);
      const bannerData = [{ id: 1, name: 'Banner 1' }];
      httpClientMock.get.mockReturnValue(of(bannerData));

      // Act
      component.ngOnInit();

      // Assert
      expect(httpClientMock.get).toHaveBeenCalledWith(component.apiUrl1, expect.any(Object));
      expect(component.bannerlist).toEqual(bannerData);
    });

    it('should fetch company slider data', () => {
      // Arrange
      const companySliderData = [{ id: 1, name: 'Slider 1' }];
      httpClientMock.get.mockReturnValue(of(companySliderData));

      // Act
      component.ngOnInit();

      // Assert
      expect(httpClientMock.get).toHaveBeenCalledWith(component.apiUrl2, expect.any(Object));
      expect(component.companySlider).toEqual(companySliderData);
    });
  });

  describe('Edge cases', () => {
    it('should not initialize AOS when platform is not browser', () => {
      // Arrange
      jest.spyOn(isPlatformBrowser, 'isPlatformBrowser').mockReturnValue(false);

      // Act
      component.ngOnInit();

      // Assert
      expect(AOS.init).not.toHaveBeenCalled();
    });

    it('should handle error when fetching banner data fails', () => {
      // Arrange
      jest.spyOn(isPlatformBrowser, 'isPlatformBrowser').mockReturnValue(true);
      const error = new Error('Network error');
      httpClientMock.get.mockReturnValue(throwError(() => error));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      // Act
      component.ngOnInit();

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error occurred:', error);
    });

    it('should handle error when fetching company slider data fails', () => {
      // Arrange
      const error = new Error('Network error');
      httpClientMock.get.mockReturnValue(throwError(() => error));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      // Act
      component.ngOnInit();

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error occurred:', error);
    });
  });
});

// End of unit tests for: ngOnInit
