//
// ConciergeType.js
//
var mongoose = require('mongoose');

///////////////////////////////////////
// DEFINE CONCIERGE TYPE
///////////////////////////////////////
var ConciergeSchema = new mongoose.Schema({
    hunk:{
        initialFee:{type: Number, default: 9.00},
        pricePerMinute:{type: Number, default: 0.24},
        serviceCost:{type: Number, default: 2.90},
        tipPercentage:{type: Number, default: 0.15}
    },
    hottie:{
        initialFee:{type: Number, default: 12.90},
        pricePerMinute:{type: Number, default: 0.32},
        serviceCost:{type: Number, default: 3.15},
        tipPercentage:{type: Number, default: 0.18}
    },
    averageJoe:{
        initialFee:{type: Number, default: 7.85},
        pricePerMinute:{type: Number, default: 0.15},
        serviceCost:{type: Number, default: 1.70},
        tipPercentage:{type: Number, default: 0.10}
    },
    averageJane:{
        initialFee:{type: Number, default: 7.85},
        pricePerMinute:{type: Number, default: 0.18},
        serviceCost:{type: Number, default: 1.70},
        tipPercentage:{type: Number, default: 0.10}
    },
    averageJones:{
        initialFee:{type: Number, default: 2.00},
        pricePerMinute:{type: Number, default: 0.13},
        serviceCost:{type: Number, default: 0.75},
        tipPercentage:{type: Number, default: 0.05}
    }
});
mongoose.model('ConciergeType', ConciergeSchema);
module.exports = mongoose.model('ConciergeType');