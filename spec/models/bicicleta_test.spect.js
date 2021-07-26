var mongosee =  require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www'); //Para Mongoose


describe('Testing  Bicicletas', function(){
  beforeEach(function(done) {
    var mongoDB = 'mongodb://localhost/testdb';
    mongosee.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

    const db= mongosee.connection;
    db.on('error', console.error.bind(console, 'conection error'));
    db.once('open', function(){
      console.log('we are connectet to test database');
      done();
    });
  });
  
  afterEach(function(done) {
    Bicicleta.deleteMany(function(err, success){
      if (err) console.log(err);
      done();
    });
  });
 
  afterEach(function(done) {
    Bicicleta.deleteMany({}, function(err, success){
        if (err) console.log(err);
        mongoose.disconnect();
        console.log('Disconnecting from test database');
        done();
    });
  });

  describe('Bicicleta.createInstance',() => {
    it('crea una instancia de Bicicleta', () => {
        var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

        expect(bici.code).toBe(1);
        expect(bici.color).toBe("verde");
        expect(bici.modelo).toBe("urbana");
        expect(bici.ubicacion[0]).toBe(-34.5);
        expect(bici.ubicacion[1]).toBe(-54.1);
    });
  });

  describe('Bicicleta.allBicis', () => {
    it('comienza vacia', (done) => {
        Bicicleta.allBicis(function(err, bicis){
            expect(bicis.length).toBe(0);
            done();
        });
    });
  });

  describe('Bicicleta.add', () => {
    it('agrega solo una bici', (done) => {
        var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
        Bicicleta.add(aBici, function(err, newBici){
            if (err) console.log(err);
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toEqual(1);
                expect(bicis[0].code).toEqual(aBici.code);
                expect(bicis[0].color).toEqual(aBici.color);
                expect(bicis[0].modelo).toEqual(aBici.modelo);
                expect(bicis[0].ubicacion[0]).toEqual(aBici.ubicacion[0]);
                expect(bicis[0].ubicacion[1]).toEqual(aBici.ubicacion[1]);

                done();
            });
        });
    });
  });

  describe('Bicicleta.findByCode', () => {
    it('debe devolver la bici con code 1', (done) => {
        Bicicleta.allBicis(function(err, bicis){
            expect(bicis.length).toBe(0);


            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
            Bicicleta.add(aBici, function(err, newBici){
                if (err) console.log(err);

                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);
                    Bicicleta.findByCode(1, function (error, targetBici){
                        expect(targetBici.code).toBe(aBici.code);
                        expect(targetBici.color).toEqual(aBici.color);
                        expect(targetBici.modelo).toEqual(aBici.modelo);
                        expect(targetBici.ubicacion[0]).toEqual(aBici.ubicacion[0]);
                        expect(targetBici.ubicacion[1]).toEqual(aBici.ubicacion[1]);

                        done();
                    });
                });
            });
        });
    });
});

describe('Bicicleta.removeByCode', () => {
    it('debe borrar la bici con code 1', (done) => {
        Bicicleta.allBicis(function(err, bicis){
            expect(bicis.length).toBe(0);

            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
            Bicicleta.add(aBici, function(err, newBici){
                if (err) console.log(err);

                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);
                    Bicicleta.allBicis(function(err, bicis){
                        expect(bicis.length).toBe(1);
                        Bicicleta.removeByCode(1, function(error, response) {
                            Bicicleta.allBicis(function(err, bicis){
                                expect(bicis.length).toBe(0);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});

});



/*
 describe('Bicicleta.allBicis', () => {
    it('comienza vacia', (done) =>{
      Bicicleta.allBicis(function(err, bicis){
        expect(bicis.length).tobe(0);
        done();
      });
    });
  });
describe('Bicicleta.createInstance',() => {
    it ('crea una instancia de bicicleta', () => {
      var bici = Bicicleta.createInstance(1,"verde","urbana",[-34.5, -54,1]);
      expect(bici.code).toBe(1);
      expect(bici.color).toBe("verde");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubucacion[0]).toEqual(-34.5);
      expect(bici.ubucacion[1]).toEqual(-54.1);
    });
  });







beforeEach(() => {Bicicleta.allBicis = []; });

describe('Bicicletas.allBicis', () =>{
  it('Comienza vacia', () => {
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});

describe('Bicicletas.add', () =>{
  it('agregar una', () => {
    expect(Bicicleta.allBicis.length).toBe(0);
    var a = new  Bicicleta (1, "rojo", "urbano", [-34.6012424, -58.3861497]);
    Bicicleta.add(a);

    expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(a);
  });
});


describe('Bicicletas.findById', () =>{
  it('Devuelve la bici id 1', () => {
    expect(Bicicleta.allBicis.length).toBe(0);
    var abici = new Bicicleta(1,"verde","urbano");
    var abici2 = new Bicicleta(2,"rojo","montaña");
    Bicicleta.add(abici);
    Bicicleta.add(abici2);

    var targetBici = Bicicleta.findById(1);
    expect(targetBici.id).toBe(1);
    expect(targetBici.color).toBe(abici.color);
    expect(targetBici.modelo).toBe(abici.modelo);
  });
});
*/