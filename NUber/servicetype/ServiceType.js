//
// ConciergeType.js
//
var mongoose = require('mongoose');

///////////////////////////////////////
// DEFINE CONCIERGE TYPE
///////////////////////////////////////
var ServiceSchema = new mongoose.Schema({
    nuberx:{
        initialFee:{type: Number, default: 0.40},
        pricePerMile:{type: Number, default: 0.97},
        pricePerMinute:{type: Number, default: 0.14},
        serviceCost:{type: Number, default: 1.58},
        numberOfRiders:{type: Number, default: 4},
        service:{type: String, default: 'economy'},
        classOfCar:{type: String, default: 'compact'}
    },
    nuberxl:{
        initialFee:{type: Number, default: 2.15},
        pricePerMile:{type: Number, default: 1.68},
        pricePerMinute:{type: Number, default: 0.26},
        serviceCost:{type: Number, default: 1.70},
        numberOfRiders:{type: Number, default: 6},
        service:{type: String, default: 'economy'},
        classOfCar:{type: String, default: 'economy'}
    },
    nuberselect:{
        initialFee:{type: Number, default: 4.02},
        pricePerMile:{type: Number, default: 2.17},
        pricePerMinute:{type: Number, default: 0.33},
        serviceCost:{type: Number, default: 1.70},
        numberOfRiders:{type: Number, default: 4},
        service:{type: String, default: 'economy'},
        classOfCar:{type: String, default: 'sedan/suv'}
    },
    nuberblack:{
        initialFee:{type: Number, default: 7.22},
        pricePerMile:{type: Number, default: 3.33},
        pricePerMinute:{type: Number, default: 0.44},
        serviceCost:{type: Number, default: 1.80},
        numberOfRiders:{type: Number, default: 4},
        service:{type: String, default: 'premium'},
        classOfCar:{type: String, default: 'black sedan'}
    },
    nubersuv:{
        initialFee:{type: Number, default: 14},
        pricePerMile:{type: Number, default: 4},
        pricePerMinute:{type: Number, default: 0.49},
        serviceCost:{type: Number, default: 0},
        numberOfRiders:{type: Number, default: 7},
        service:{type: String, default: 'premium'},
        classOfCar:{type: String, default: 'luxury suv'}
    },
    nuberlux:{
        initialFee:{type: Number, default: 15.65},
        pricePerMile:{type: Number, default: 4.35},
        pricePerMinute:{type: Number, default: 0.52},
        serviceCost:{type: Number, default: 1.80},
        numberOfRiders:{type: Number, default: 4},
        service:{type: String, default: 'premium'},
        classOfCar:{type: String, default: 'luxury sedan'}
    }
});
mongoose.model('ServiceType', ServiceSchema);
module.exports = mongoose.model('ServiceType');