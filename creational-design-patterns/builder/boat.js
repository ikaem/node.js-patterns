class Boat {
  constructor(
    // hasMotor,
    // motorCount,
    // motorBrand,
    // motorModel,
    // hasSails,
    // sailsCount,
    // sailsMaterial,
    // sailsColor,
    // hullColor,
    // hasCabin
    params
  ) {
    /*  */
  }
}

// const myBoat = new Boat(
//   true,
//   2,
//   'Best Motor Co. ',
//   'OM123',
//   true,
//   1,
//   'fabric',
//   'white',
//   'blue',
//   false
// );

// const myBoat = new Boat({
//   hasMotor: true,
//   motorCount: 2,
//   motorBrand: 'Best Motor Co. ',
//   motorModel: 'OM123',
//   hasSails: true,
//   sailsCount: 1,
//   sailsMaterial: 'fabric',
//   sailsColor: 'white',
//   hullColor: 'blue',
//   hasCabin: false,
// });

class BoatBuilder {
  withMotors(count, brand, model) {
    this.hasMotor = true;
    this.motorCount = count;
    this.motorBrand = brand;
    this.motorModel = model;

    return this;
  }

  withSails(count, material, color) {
    this.hasSails = true;
    this.sailsCount = count;
    this.sailsMaterial = material;
    this.sailsColor = color;

    return this;
  }

  withHullColor(color) {
    // this is a clash? same property names? rename to withhullcolor
    this.hullColor = color;

    return this;
  }

  withCabin() {
    this.hasCabin = true;

    return this;
  }

  build() {
    return new Boat({
      hasMotor: this.hasMotor,
      motorCount: this.motorCount,
      motorBrand: this.motorBrand,
      motorModel: this.motorModel,
      hasSails: this.hasSails,
      sailsCount: this.sailsCount,
      sailsMaterial: this.sailsMaterial,
      sailsColor: this.sailsColor,
      hullColor: this.hullColor,
      hasCabin: this.hasCabin,
    });
  }
}

const myBoat = new BoatBuilder()
  .withMotors(2, 'Morot name', 'Some model')
  .withSails(2, 'some material', 'some color')
  .withCabin()
  .withHullColor('some color')
  .build();
