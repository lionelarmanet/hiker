import sampleData from "./sample.js";

class Location {
  constructor(title, lat, lng) {
    this.title = title;
    this.lat = lat;
    this.lng = lng;
  }
}

class HikingResult {
  constructor(title, image, mountain, kindOfActivity, location) {
    this.title = title;
    this.image = image;
    this.mountain = mountain;
    this.kindOfActivity = kindOfActivity;
    this.location = location;
  }

  get locationTitle() {
    return this.location.title;
  }
}

function findAll() {
  return sampleData
    .concat(sampleData)
    .map(
      x =>
        new HikingResult(
          x.libelle,
          x.img,
          x.massif.libelle,
          x.activite.libelle,
          new Location(
            x.adresse.libelle,
            x.adresse.latitude,
            x.adresse.longitude
          )
        )
    );
}

const searchService = { findAll, HikingResult, Location };
export default searchService;
