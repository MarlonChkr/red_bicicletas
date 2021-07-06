var Bicicleta   = function (id, color, modelo, ubicacion){
    //constructor
    this.id= id;
    this.color= color;
    this.modelo= modelo;
    this.ubicacion= ubicacion;
}

Bicicleta.prototype.toString= function(){
    return 'Id: ' + this.id + "| Color: "+ this.color;
}

Bicicleta.allBicis= [];
Bicicleta.add= function (aBici){
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById= function(aBiciId){
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if(aBici)
        return (aBici)
    else
        throw new Error (` No exixte una bicicleta con el ID ${aBiciId}`)
}

Bicicleta.removeById = function (aBiciId){
    for(var i=0; i<Bicicleta.allBicis.length; i++){
        Bicicleta.allBicis.splice(i,1);
        break;
    }
}

var a = new  Bicicleta (1, "rojo", "urbano", [-34.6012424, -58.3861497]);
var b = new  Bicicleta (2, "blanco", "urbano", [-34.606932, -58.3868287]);

 Bicicleta.add(a);
 Bicicleta.add(b);

 module.exports=Bicicleta;