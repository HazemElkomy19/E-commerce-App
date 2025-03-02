import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  const  _PLATFORM_ID=inject(PLATFORM_ID);
const _router=inject(Router);
if (isPlatformBrowser(_PLATFORM_ID)) {
  if (localStorage.getItem("userToken")) {
    _router.navigate(["/home"]);
    return false;
  }

  return true;

}
else{
  return false;
}
};
