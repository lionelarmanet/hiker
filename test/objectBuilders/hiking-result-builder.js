import searchService from "../../src/services/search-service";

class HikingResultBuilder {
  constructor() {
    this.title = "title";
    this.image =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    this.mountain = "Chartreuse";
    this.kindOfActivity = "Hiking";
    this.location = new searchService.Location(
      "Quaix",
      45.26687933532907,
      5.720391698425374
    );
  }

  build() {
    return new searchService.HikingResult(
      this.title,
      this.image,
      this.mountain,
      this.kindOfActivity,
      this.location
    );
  }
}

export default HikingResultBuilder;
