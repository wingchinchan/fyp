import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'message'
})

export class MessagePipe implements PipeTransform {
    public transform(value: any, eventType: any) {
        if (!!value) {
            return value.slice(Math.max(value.length - 5, 1));
        }
        return [];
    }
}
