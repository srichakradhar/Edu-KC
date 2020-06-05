import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncate",
})
export class TruncatePipe implements PipeTransform {
  transform(value: String): String {
    const limit = 23;
    return value.length > limit ? value.substring(0, limit) : value;
  }
}
