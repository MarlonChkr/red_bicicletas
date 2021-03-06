var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true}
    }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        unbicacion: ubicacion
    });
};

bicicletaSchema.methods.toString = function() {
    return 'code: ' + this.code + "| Color: "+ this.color;
};

bicicletaSchema.static.allBicis = function(cb){
    return this.find({}, cb);
};

bicicletaSchema.static.add = function(aBici, cb){
   this.create(aBici, cb);
};

bicicletaSchema.static.findByCode= function(aCode, cb){
    return this.findOne({code: aCode}, cb);
};

bicicletaSchema.static.removeByCode= function(aCode, cb){
    return this.deleteOne({code: aCode}, cb);
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);





// var Bicicleta   = function (id, color, modelo, ubicacion){
//     //constructor
//     this.id= id;
//     this.color= color;
//     this.modelo= modelo;
//     this.ubicacion= ubicacion;
// }

// Bicicleta.prototype.toString= function(){
//     return 'Id: ' + this.id + "| Color: "+ this.color;
// }

// Bicicleta.allBicis= [];
// Bicicleta.add= function (aBici){
//     Bicicleta.allBicis.push(aBici);
// }

// Bicicleta.findById= function(aBiciId){
//     var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
//     if(aBici)
//         return (aBici)
//     else
//         throw new Error (` No exixte una bicicleta con el ID ${aBiciId}`)
// }

// Bicicleta.removeById = function (aBiciId){
//     for(var i=0; i<Bicicleta.allBicis.length; i++){
//         Bicicleta.allBicis.splice(i,1);
//         break;
//     }
// }

// // var a = new  Bicicleta (1, "rojo", "urbano", [-34.6012424, -58.3861497]);
// // var b = new  Bicicleta (2, "blanco", "urbano", [-34.606932, -58.3868287]);

// //  Bicicleta.add(a);
// //  Bicicleta.add(b);

//  module.exports=Bicicleta;