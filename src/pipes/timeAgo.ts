import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: false // needed to react to array changes
})
@Injectable()
export class TimeAgo implements PipeTransform {
  public transform(timeMs: number): any {
    let secondsDiff = Math.floor((new Date().getTime() - timeMs) / 1000);

      let minutesAgo = Math.ceil(secondsDiff / 60);
      return `${minutesAgo} ${(minutesAgo === 1) ? 'minute' : 'minutes'} ago`;
  }
}
