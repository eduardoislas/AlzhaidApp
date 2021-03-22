import { TestBed } from '@angular/core/testing';

import { NotificationsListenerService } from './notificationsListener.service';

describe('NotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationsListenerService = TestBed.get(NotificationsListenerService);
    expect(service).toBeTruthy();
  });
});
