import { Pipe, PipeTransform } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { Observable } from 'rxjs'

@Pipe({
    name: 'secure'
})
export class SecurePipe implements PipeTransform {

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

    transform(url): Observable<any> {
        return this.http
            .get(url)
    }

}
