//map API
export default class MapSearch {
  static postalCodeSearch(city, zipcode) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://dev.virtualearth.net/REST/v1/Locations?CountryRegion=US&adminDistrict=-&locality=${city}&postalCode=${zipcode}&addressLine=-&key=${process.env.BING_KEY}`;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
  static nurserySearchTwo(userLocation) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=nursery&userLocation=${userLocation}&key=${process.env.BING_KEY}`;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
  static staticMap(coordString2) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();

      const url = `https://dev.virtualearth.net/REST/v1/Imagery/Map/imagerySet?pushpin=${coordString2}&format=jpeg&mapMetadata=1&key=  
      ${process.env.BING_KEY}  
      `;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}